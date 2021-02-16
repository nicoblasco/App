<template>
	<div class="page-contacts flex column" id="page-contacts">
		<resize-observer @notify="__resizeHanlder" />
		
		<div class="contacts-root box grow flex gaps justify-center" :class="contactsClass">
			<div class="card-base card-shadow--small search-card scrollable only-y">
				<h1 class="mt-0">{{title}}</h1>
				
				<el-input
					prefix-icon="el-icon-search"
					placeholder="Buscar ..."
					clearable
					v-model="search">
				</el-input>

				<div class="o-050 text-right mt-10 mb-30"><strong>{{contactsFiltered.length}}</strong> {{title}}</div>

				<el-button icon="mdi mdi-account-plus" @click="openDialog(null)"> Agregar {{title}}</el-button>

				<div class="p-20">
					<p>{{title}} favoritos</p>
					<ul class="contacts-favourites">
						<li v-for="c in contactsFavourite" :key="c.id" @click="openDialog(c)">
							<img :src="c.logo ? c.logo : avatarDefault"  alt="user favourite avatar">
							<span>{{c.names}}</span>
						</li>
					</ul>
				</div>

			</div>
			<div class="contacts-list box grow scrollable only-y">
				<div v-for="c in contactsFiltered" :key="c.id" class="flex contact" @click="openDialog(c)">
					<div class="star align-vertical p-10 fs-22">
						<i class="mdi mdi-star align-vertical-middle" v-if="c.favorite"></i>
						<i class="mdi mdi-star-outline align-vertical-middle" v-if="!c.favorite"></i>
					</div>
					<div class="avatar align-vertical">
						<img :src="c.logo ? c.logo : avatarDefault"  class="align-vertical-middle" alt="user avatar">

					</div>
					<div class="info box grow flex">
						<div class="name box grow flex column justify-center p-10">
							<div class="fullname fs-18"><strong>{{c.names}}</strong></div>
							<div class="phone fs-14 secondary-text">{{c.phone}}</div>
							<div class="email fs-14 secondary-text">{{c.city}}</div>
						</div>
						<div class="phone align-vertical p-10"><span class="align-vertical-middle">{{c.phone}}</span></div>
					</div>
				</div>
			</div>
		</div>		

		<user-dialog 
			:dialogvisible.sync="dialogvisible" 
			:documentType="documentType" 
            :tariffs = "data.tariffs"
			:cities="cities" ref="dialog-provider" 
			:data="data" 
			v-on:addContact="save('dialog-provider')"
			v-on:deleteContact="openDelete()">
		</user-dialog>
	</div>
</template>

<script>
import UserDialog from '@/components/CustomerDialog';
import axios from 'axios'

export default {
	name: 'Contacts',
	data() {
		return {
			FIELD_ID: 0,
			FIELD_DOCUMENT_TYPE: 2,
			FIELD_DOCUMENT: 3,
			FIELD_ADDRESS: 4,
			FIELD_CITY: 5,
			FIELD_PHONE: 6,
			FIELD_EMAIL: 7,
			FIELD_OBSERVATION: 8,
			search: '',
			dialogvisible: false,
			pageWidth: 0,
			avatarDefault: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MCA3OS4xNjA0NTEsIDIwMTcvMDUvMDYtMDE6MDg6MjEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkExM0RGNDdBMzM1QzExRThCNjhCOTFBMEVCQUQzNDYxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkExM0RGNDc5MzM1QzExRThCNjhCOTFBMEVCQUQzNDYxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRBMUEyQ0NDMjc2QzExRTg5QUMyOTk2OTcxQkYxODMyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRBMUEyQ0NEMjc2QzExRTg5QUMyOTk2OTcxQkYxODMyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4AIUFkb2JlAGTAAAAAAQMAEAMCAwYAAAWZAAAGSQAACC7/2wCEABALCwsMCxAMDBAXDw0PFxsUEBAUGx8XFxcXFx8eFxoaGhoXHh4jJSclIx4vLzMzLy9AQEBAQEBAQEBAQEBAQEABEQ8PERMRFRISFRQRFBEUGhQWFhQaJhoaHBoaJjAjHh4eHiMwKy4nJycuKzU1MDA1NUBAP0BAQEBAQEBAQEBAQP/CABEIAGQAZAMBIgACEQEDEQH/xACdAAEAAgMBAQAAAAAAAAAAAAAABQYBBAcCAwEBAAMBAAAAAAAAAAAAAAAAAAECAwQQAAEEAgMBAQEAAAAAAAAAAAECAwQFEQYAIDAQQBIRAAIBAgMCCwcFAAAAAAAAAAECAxEEACExYRIgMEFRcYGRodFSExBAsSIyQnKSsiMzBRIAAQQDAQEBAAAAAAAAAAAAAQAgMBEQITFxYYH/2gAMAwEAAhEDEQAAAOgAAHzPo09syAAAACF57IRXRjichFq9f9QE/wA24RIAAHLNGyVvpwGbRebPHSPNuFZAAERLfqVa2dct+x1eKmOuOedBy19CsgAY5b1LnOlIUb5ALzSL/nawDDYABjIgIK+L155I3IjS3SlwAAAAAAAAP//aAAgBAgABBQDxQkAEAgjB6JOU8Ucq+gEkIUnhSs8Ukp6NEZ+OEfz0DihwuK4Tny//2gAIAQMAAQUA8VqyQSOA5HRQweJGB9JxwqSeZSOJUD0czj4jOehQk8/hPn//2gAIAQEAAQUA/E9IYjobtqt1Xlsl+mojypcmY7gcodmlVjrbiHW/DZ5SpN590uSp+l8L0EXX3Q0kVfhutWtif8SlS1UNcayr8JjcN6PYaK8lbek3a10+t11Mrw2C+ap482dLsHod/cQkubhfLTJlSZblDtMqucbcQ632up67Gz66NYKehdVAKF9rUmqX0ZZdfd1fXnKlHYgEWOnVUwv6JZoKdKvFGJoSs11RX1iP3f/aAAgBAgIGPwCH6VRRDRgllBaKokDxbYb7mj+N7jcX/9oACAEDAgY/AIrCtpwGWVsLQv2Xkn//2gAIAQEBBj8A9y355FiTzOwUd+NyO8hdjookUn48WFiAe8mr6SnRQNXbBmupWmkP3Ma06BoOr2LFO7TWJNGQmpjHmQnm5sLJGwZHAZWGhBzB4m6LHKJvSQcwQU+NeAI3NTbyNGPxyZf3cTfA5fzue014E7chnNOpV4kf6CLWC5ADkaLIopn+QHtVEBZ2ICqMySdAMQ2rf20Ly087Zns04lob3cMEvylZCADXTXlwX/zZleM5iKXJhsDitevAVxFGvKxevcowk9xKst23ypI9FVSeSNSde/iRQCS6lr6MR0y+5tgwZryUyudK/SuxV0GAkF0+4Mgj0kUdG/WmN311Tasag99cerdSvM/mclqdHNhYLtmmsjka5vHtU82zswskbBkcBlYaEHMHhz3JNVLFYhzRrkvjwpbGQ1NswMdfI9cuog8IqdCKHDSxAzWJzWQZlNknjwVhhQySuaKiipJw9xctW6nUKyKaqig1ptPDIIqDkQcGSCtpKcyY/oJ2ocuymD6E0Mo5K7yH4MO/FCsSjnMnguAb66G7ypCM/wBT+GN2zhCMcmkPzO3Sxz9//9k=',
			userdata: {},
			cities:null,
            documentType:null,
            //tariffs:null,
			data: {
				id:null,
				names: null,
				documento: null,
				documentTypeId: null,
				address:null,
				cityId:[],
                email:null,
                tariffs:null,
				favorite:false,
				observation:null,
				phone:null,
				logo: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MCA3OS4xNjA0NTEsIDIwMTcvMDUvMDYtMDE6MDg6MjEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkExM0RGNDdBMzM1QzExRThCNjhCOTFBMEVCQUQzNDYxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkExM0RGNDc5MzM1QzExRThCNjhCOTFBMEVCQUQzNDYxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRBMUEyQ0NDMjc2QzExRTg5QUMyOTk2OTcxQkYxODMyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRBMUEyQ0NEMjc2QzExRTg5QUMyOTk2OTcxQkYxODMyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4AIUFkb2JlAGTAAAAAAQMAEAMCAwYAAAWZAAAGSQAACC7/2wCEABALCwsMCxAMDBAXDw0PFxsUEBAUGx8XFxcXFx8eFxoaGhoXHh4jJSclIx4vLzMzLy9AQEBAQEBAQEBAQEBAQEABEQ8PERMRFRISFRQRFBEUGhQWFhQaJhoaHBoaJjAjHh4eHiMwKy4nJycuKzU1MDA1NUBAP0BAQEBAQEBAQEBAQP/CABEIAGQAZAMBIgACEQEDEQH/xACdAAEAAgMBAQAAAAAAAAAAAAAABQYBBAcCAwEBAAMBAAAAAAAAAAAAAAAAAAECAwQQAAEEAgMBAQEAAAAAAAAAAAECAwQFEQYAIDAQQBIRAAIBAgMCCwcFAAAAAAAAAAECAxEEACExYRIgMEFRcYGRodFSExBAsSIyQnKSsiMzBRIAAQQDAQEBAAAAAAAAAAAAAQAgMBEQITFxYYH/2gAMAwEAAhEDEQAAAOgAAHzPo09syAAAACF57IRXRjichFq9f9QE/wA24RIAAHLNGyVvpwGbRebPHSPNuFZAAERLfqVa2dct+x1eKmOuOedBy19CsgAY5b1LnOlIUb5ALzSL/nawDDYABjIgIK+L155I3IjS3SlwAAAAAAAAP//aAAgBAgABBQDxQkAEAgjB6JOU8Ucq+gEkIUnhSs8Ukp6NEZ+OEfz0DihwuK4Tny//2gAIAQMAAQUA8VqyQSOA5HRQweJGB9JxwqSeZSOJUD0czj4jOehQk8/hPn//2gAIAQEAAQUA/E9IYjobtqt1Xlsl+mojypcmY7gcodmlVjrbiHW/DZ5SpN590uSp+l8L0EXX3Q0kVfhutWtif8SlS1UNcayr8JjcN6PYaK8lbek3a10+t11Mrw2C+ap482dLsHod/cQkubhfLTJlSZblDtMqucbcQ632up67Gz66NYKehdVAKF9rUmqX0ZZdfd1fXnKlHYgEWOnVUwv6JZoKdKvFGJoSs11RX1iP3f/aAAgBAgIGPwCH6VRRDRgllBaKokDxbYb7mj+N7jcX/9oACAEDAgY/AIrCtpwGWVsLQv2Xkn//2gAIAQEBBj8A9y355FiTzOwUd+NyO8hdjookUn48WFiAe8mr6SnRQNXbBmupWmkP3Ma06BoOr2LFO7TWJNGQmpjHmQnm5sLJGwZHAZWGhBzB4m6LHKJvSQcwQU+NeAI3NTbyNGPxyZf3cTfA5fzue014E7chnNOpV4kf6CLWC5ADkaLIopn+QHtVEBZ2ICqMySdAMQ2rf20Ly087Zns04lob3cMEvylZCADXTXlwX/zZleM5iKXJhsDitevAVxFGvKxevcowk9xKst23ypI9FVSeSNSde/iRQCS6lr6MR0y+5tgwZryUyudK/SuxV0GAkF0+4Mgj0kUdG/WmN311Tasag99cerdSvM/mclqdHNhYLtmmsjka5vHtU82zswskbBkcBlYaEHMHhz3JNVLFYhzRrkvjwpbGQ1NswMdfI9cuog8IqdCKHDSxAzWJzWQZlNknjwVhhQySuaKiipJw9xctW6nUKyKaqig1ptPDIIqDkQcGSCtpKcyY/oJ2ocuymD6E0Mo5K7yH4MO/FCsSjnMnguAb66G7ypCM/wBT+GN2zhCMcmkPzO3Sxz9//9k=',
				logoName: null,
				keyFiscal: null,
				tariffs: []
			},
			formLabelWidth: '120px',
			fields: null,
			screen: null,
			datos: [],
			actions:'',
			user:null,
			columns: null,
			title: '',
			company: null,	
			editedIndex: -1
		}
	},
	created() {
		try {
				this.companyId = parseInt( this.$store.getters.user.CompanyId);
				this.columns = this.$route.meta.columns;
				this.URL_GET= this.$route.meta.URL_GET;
				this.URL_CREATE= this.$route.meta.URL_CREATE;
				this.URL_UPDATE= this.$route.meta.URL_UPDATE;
				this.URL_DELETE= this.$route.meta.URL_DELETE;
				this.URL_GET_DOCUMENT_TYPE = this.$route.meta.URL_GET_DOCUMENT_TYPE;
                this.URL_CITIES = this.$route.meta.URL_CITIES;
                this.URL_GET_TARIFFS = this.$route.meta.URL_GET_TARIFFS;
				this.screen= this.$store.getters.userProfile.role.screens.filter(x=>x.path===this.$route.fullPath)[0];	
				if (this.screen !=null)
				{
					this.title = this.screen.description;
					this.fields = this.screen.fields.slice().sort(function(a, b) {
						var textA = a.orden
						var textB = b.orden
						return (textA < textB) ? -1 : (textA > textB) ? 1 : 0
						});		
                    this.actions = this.screen.actions;	
                    this.get();
                    this.getDocumentType();
                    this.getCities();
                    
				}
				else
					this.showError("No se pudo recuperar la configuración de la pantalla");
			} catch (error) {
				this.showError(error);
			}					
	},
	computed: {
		contactsFiltered() {
			return this.datos.filter(({names, email, phone}) => (names+email+phone).toString().toLowerCase().indexOf(this.search.toString().toLowerCase()) !== -1)
		},
		contactsClass() {
			return this.pageWidth >= 870 ? 'large' : this.pageWidth >= 760 ? 'medium' : 'small'
		},
		contactsFavourite() {
			return this.datos.filter(({favorite})=>favorite)
		}
	},
	methods: {

		openDialog(objeto) {
			this.clean();

			if (objeto!=null){

				this.data.id=objeto.id;		
				this.data.names= objeto.names;
				this.data.documento= objeto.documento;
				this.data.documentTypeId= objeto.documentTypeId;
				this.data.address=objeto.address;
				this.data.cityId.push(objeto.countryId);
				this.data.cityId.push(objeto.stateId);
				this.data.cityId.push(objeto.cityId);
				this.data.email=objeto.email;
				this.data.keyFiscal = objeto.keyFiscal;
				this.data.webSite=objeto.webSite;
				this.data.favorite=objeto.favorite;
				this.data.observation=objeto.observation;
				this.data.phone=objeto.phone;
				this.data.logo= objeto.logo;
                this.data.logoName= objeto.logoName;
                this.data.tariffs=objeto.tariffs;
				this.editedIndex=0;
				
			}
			else
			{
				this.editedIndex=-1;				
			}
				
			this.getTariffs();
			this.dialogvisible = true
		},
		setPageWidth() {
			this.pageWidth = document.getElementById('page-contacts').offsetWidth
			
		},

		getDocumentType() {
			let me = this;
			let url = me.URL_GET_DOCUMENT_TYPE+ parseInt(me.companyId);
			axios.get(url)
			.then(function(response) {
			me.documentType = response.data;
			})
			.catch(function(error) {
			me.showError();
			});
		},  
		getCities() {
			let me = this;
			let url = me.URL_CITIES+ parseInt(me.companyId);
			axios.get(url)
			.then(function(response) {
			me.cities = response.data;
			})
			.catch(function(error) {
			me.showError();
			});
        }, 
		getTariffs() {
			let me = this;
			let url = me.URL_GET_TARIFFS;
			axios.get(url,{	params : {
			   	'CompanyId' : parseInt(me.companyId),
				'CustomerId' : me.data.id				
				}
			})
			.then(function(response) {
			me.data.tariffs = response.data;
			})
			.catch(function(error) {
			me.showError();
			});
		}, 		         			
		get(){
			let me = this;
			let url = this.URL_GET+ parseInt(me.companyId);
            axios.get(url).then (function(response){
                me.datos = response.data;
            }).catch (function (error){
					me.showError(error);
            });
		},
		save(formName){	
		  let me = this;	  
		  this.$refs[formName].$refs["data"].validate((valid) => {

          if (valid) {
			  	let ciudad=null;
				let provincia=null;
				let pais=null;
                let documentoId=null;
				if (me.data.cityId.length>0)
				{
					pais=me.data.cityId[0];
					provincia=me.data.cityId[1];
					ciudad=me.data.cityId[2];
				}
				if (me.data.documentTypeId>0){
					documentoId=me.data.documentTypeId;
                } 				

            if (me.editedIndex === 0) {
				//Editar

				 let objeto_upd = {
                    'Id': me.data.id,
					'Names':me.data.names,
					'DocumentTypeId': documentoId,	
					'Documento':me.data.documento,
					'Address':me.data.address,
					'CountryId':pais,
					'StateId':provincia,
					'CityId':ciudad,
					'Email':me.data.email,
					'KeyFiscal': me.data.keyFiscal,
					'Favorite':me.data.favorite,
					'Observation':me.data.observation,
					'Phone':me.data.phone,
					'Logo': me.data.logo,
                    'LogoName': me.data.logoName,
                    'Tariffs': []					 
				 }

				
				me.data.tariffs.forEach(tarifa=> {
					let objTarifa= {
						Id: tarifa.id,
						ConceptId: tarifa.conceptId,
						Price: tarifa.price,
						Enabled: tarifa.enabled
					}
					objeto_upd.Tariffs.push(objTarifa);
				});

                axios.put(this.URL_UPDATE,objeto_upd
				).then(function(response){
                     me.close();
                     me.get();   
					 me.clean();
					 me.showOk();
                     
                }).catch(function(error){
                    me.showError(error);
                });
                
            } else {	
				 let objeto_add = {
					'CompanyId': me.companyId,
					'Names':me.data.names,
					'DocumentTypeId': documentoId,	
					'Documento':me.data.documento,
					'Address':me.data.address,
					'CountryId':pais,
					'StateId':provincia,
					'CityId':ciudad,
					'Email':me.data.email,
					'KeyFiscal': me.data.keyFiscal,
					'Favorite':me.data.favorite,
					'Observation':me.data.observation,
					'Phone':me.data.phone,
					'Logo': me.data.logo,
                    'LogoName': me.data.logoName,
                    'Tariffs': []					 
				 }

				
				me.data.tariffs.forEach(tarifa=> {
					let objTarifa= {
						Id: tarifa.id,
						ConceptId: tarifa.conceptId,
						Price: tarifa.price,
						Enabled: tarifa.enabled
					}
					objeto_add.Tariffs.push(objTarifa);
				});				

                axios.post(this.URL_CREATE,
				 objeto_add
                ).then(function(response){
                     me.close();
                     me.get();   
					 me.clean();
					 me.showOk();
                     
                }).catch(function(error){
						me.showError(error);
				});

			}
			}
		  });
		},
		openDelete() {	
			//this.data.id = objeto.id;
			this.$confirm('Se eliminara permanentemente. Continua?', 'Cuidado', {
			confirmButtonText: 'OK',
			cancelButtonText: 'Cancelar',
			type: 'warning',
			center: true
			}
			).then(() => {
				let me = this;
                axios.put(this.URL_DELETE,{
                    'Id':me.data.id
                }).then(function(response){
                     me.close();
                     me.get();   
					 me.clean();
					 me.showOk();
                     
                }).catch(function(error){
						me.showError(error);
				});

			}).catch(() => {
				this.$message({
					type: 'info',
					message: 'Cancelado'
				});
			});
		},
		close(){
			this.dialogvisible = false;
            this.clean();
		},
        clean(){
            this.data.id=null;		
			this.data.names= null;
			this.data.documento= null;
			this.data.address=null;
			this.data.cityId=[];
			this.data.email=null;
			this.data.keyFiscal=null;
            this.data.documentTypeId=null;
            this.data.tariffs=null;
			this.data.favorite=false;
			this.data.observation=null;
			this.data.phone=null;
			this.data.logo= 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MCA3OS4xNjA0NTEsIDIwMTcvMDUvMDYtMDE6MDg6MjEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkExM0RGNDdBMzM1QzExRThCNjhCOTFBMEVCQUQzNDYxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkExM0RGNDc5MzM1QzExRThCNjhCOTFBMEVCQUQzNDYxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRBMUEyQ0NDMjc2QzExRTg5QUMyOTk2OTcxQkYxODMyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRBMUEyQ0NEMjc2QzExRTg5QUMyOTk2OTcxQkYxODMyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4AIUFkb2JlAGTAAAAAAQMAEAMCAwYAAAWZAAAGSQAACC7/2wCEABALCwsMCxAMDBAXDw0PFxsUEBAUGx8XFxcXFx8eFxoaGhoXHh4jJSclIx4vLzMzLy9AQEBAQEBAQEBAQEBAQEABEQ8PERMRFRISFRQRFBEUGhQWFhQaJhoaHBoaJjAjHh4eHiMwKy4nJycuKzU1MDA1NUBAP0BAQEBAQEBAQEBAQP/CABEIAGQAZAMBIgACEQEDEQH/xACdAAEAAgMBAQAAAAAAAAAAAAAABQYBBAcCAwEBAAMBAAAAAAAAAAAAAAAAAAECAwQQAAEEAgMBAQEAAAAAAAAAAAECAwQFEQYAIDAQQBIRAAIBAgMCCwcFAAAAAAAAAAECAxEEACExYRIgMEFRcYGRodFSExBAsSIyQnKSsiMzBRIAAQQDAQEBAAAAAAAAAAAAAQAgMBEQITFxYYH/2gAMAwEAAhEDEQAAAOgAAHzPo09syAAAACF57IRXRjichFq9f9QE/wA24RIAAHLNGyVvpwGbRebPHSPNuFZAAERLfqVa2dct+x1eKmOuOedBy19CsgAY5b1LnOlIUb5ALzSL/nawDDYABjIgIK+L155I3IjS3SlwAAAAAAAAP//aAAgBAgABBQDxQkAEAgjB6JOU8Ucq+gEkIUnhSs8Ukp6NEZ+OEfz0DihwuK4Tny//2gAIAQMAAQUA8VqyQSOA5HRQweJGB9JxwqSeZSOJUD0czj4jOehQk8/hPn//2gAIAQEAAQUA/E9IYjobtqt1Xlsl+mojypcmY7gcodmlVjrbiHW/DZ5SpN590uSp+l8L0EXX3Q0kVfhutWtif8SlS1UNcayr8JjcN6PYaK8lbek3a10+t11Mrw2C+ap482dLsHod/cQkubhfLTJlSZblDtMqucbcQ632up67Gz66NYKehdVAKF9rUmqX0ZZdfd1fXnKlHYgEWOnVUwv6JZoKdKvFGJoSs11RX1iP3f/aAAgBAgIGPwCH6VRRDRgllBaKokDxbYb7mj+N7jcX/9oACAEDAgY/AIrCtpwGWVsLQv2Xkn//2gAIAQEBBj8A9y355FiTzOwUd+NyO8hdjookUn48WFiAe8mr6SnRQNXbBmupWmkP3Ma06BoOr2LFO7TWJNGQmpjHmQnm5sLJGwZHAZWGhBzB4m6LHKJvSQcwQU+NeAI3NTbyNGPxyZf3cTfA5fzue014E7chnNOpV4kf6CLWC5ADkaLIopn+QHtVEBZ2ICqMySdAMQ2rf20Ly087Zns04lob3cMEvylZCADXTXlwX/zZleM5iKXJhsDitevAVxFGvKxevcowk9xKst23ypI9FVSeSNSde/iRQCS6lr6MR0y+5tgwZryUyudK/SuxV0GAkF0+4Mgj0kUdG/WmN311Tasag99cerdSvM/mclqdHNhYLtmmsjka5vHtU82zswskbBkcBlYaEHMHhz3JNVLFYhzRrkvjwpbGQ1NswMdfI9cuog8IqdCKHDSxAzWJzWQZlNknjwVhhQySuaKiipJw9xctW6nUKyKaqig1ptPDIIqDkQcGSCtpKcyY/oJ2ocuymD6E0Mo5K7yH4MO/FCsSjnMnguAb66G7ypCM/wBT+GN2zhCMcmkPzO3Sxz9//9k=';
			this.data.logoName= null;
			this.editedIndex=-1;			
		},
		__resizeHanlder: _.throttle(function (e) {
			this.setPageWidth()
		}, 700),					
	},
	mounted() {
		this.setPageWidth()
	},
	components: {
		UserDialog
	}
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

.page-contacts {
	height: 100%;
	margin: 0 !important;
	padding: 20px;
	padding-bottom: 10px;
	box-sizing: border-box;

	.search-card {
		padding: 50px;
		max-width: 350px;
		//max-height: 320px;
		box-sizing: border-box;
		margin-bottom: 15px; 

		.el-input, .el-button {
			width: 100%;
		}

		.contacts-favourites {
			margin: 0;
			padding: 0;
			list-style: none;
			overflow: auto;

			li {
				list-style: none;
				padding: 0;
				margin: 0;
				margin-right: 10px;
				margin-bottom: 10px;
				float: left;
				cursor: pointer;
				background: $background-color;
				color: $text-color;
				border-radius: 4px;
				overflow: hidden;

				&:hover {
					color: $text-color-accent;	
				}

				img {
					width: 30px;
					height: 30px;
					float: left;
				}

				span {
					line-height: 30px;
					padding: 0 10px;
				}
			}
		}
	}

	.search-wrap {
		margin: 0 auto;
		margin-bottom: 10px;
		padding: 0px 30px;
		box-sizing: border-box;
		width: 100%;
		max-width: 600px;

		i {
			display: inline-block;
			width: 22px;
		}

		input {
			outline: none;
			background: transparent;
			border: none;
			font-size: 15px;
			position: relative;
			top: -2px;
			width: 100%;
			padding: 0;
			color: $text-color;
		}

		.contacts-tot {
			margin-right: 20px;
			margin-left: 10px;
		}

		a {
			border-bottom: 1px solid;
			text-decoration: none;
			color: $text-color;

			&:hover {
				opacity: .6;
			}
		}
	}

	.contacts-root {
		max-height: 100%;
	}

	.contacts-list {
		//margin: 0 auto;
		width: 100%;
		max-width: 965px;
		padding: 0px 30px;
		box-sizing: border-box;

		.contact {
			margin: 10px 0;
			padding: 5px;
			box-sizing: border-box;
			cursor: pointer;
			transition: all .5s .25s;

			.star {
				.mdi-star {
					color: #ffd730;
				}
				.mdi-star-outline {
					opacity: .5;
				}
			}

			.avatar {
				width: 60px;
				transition: all .5s .25s;

				img {
					border: 1px solid transparentize($text-color, .9);
					box-sizing: border-box;
					width: 50px;
					height: 50px;
					border-radius: 50%;
					transition: all .5s .25s;
				}
			}

			.info {
				word-break: break-word;

				.name {
					
					//.fullname {}

					.email {
						opacity: 0;
						line-height: 0;
						transition: all .5s .25s;
					}

					.phone {
						display: none;
					}
				}

				//.phone {}
			}

			&:hover {
				margin: 15px -20px;
				padding: 10px;
				background-color: lighten($background-color, 20%);
				border-radius: 5px;
				box-shadow: 0 8px 16px 0 rgba(40,40,90,.09),0 3px 6px 0 rgba(0,0,0,.065);

				.avatar {
					width: 90px;

					img {
						width: 90px;
						height: 90px;
					}
				}
				
				.info {
					.name {
						.email {
							opacity: 1;
							line-height: 1.4;
						}
					}
				}
			}
		}
	}

	.contacts-root {
		&.medium {
			.search-card {
				padding: 20px;
				max-width: 260px;
				//max-height: 260px;
			}
		}
		&.small {
			overflow-y: auto;
			display: block;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-ms-flex-direction: column;
			flex-direction: column;
			padding: 5px;

			.search-card {
				padding: 20px;
				max-width: 100%;
				width: 100%;
				//max-height: 240px;
				flex: none;
				-webkit-box-flex: none;
				-ms-flex: none;
				display: block;
				overflow: hidden !important;
			}
			
			.contacts-list {
				flex: none;
				-webkit-box-flex: none;
				-ms-flex: none;
				display: block;
				overflow: hidden !important;
			}
		}
	}
}

@media (max-width: 768px) {
	.page-contacts {
		.search-wrap {
			padding: 0;
		}
		.contacts-list {
			padding: 0px;

			.contact { 
				.avatar {
					width: 40px;

					img {
						width: 40px;
						height: 40px;
					}
				}

				.info {
					.phone {
						display: none;
					}

					.name {
						.phone {
							display: block;
						}
					}
				}

				&:hover {
					margin: 15px 0px;

					.avatar {
						width: 60px;

						img {
							width: 60px;
							height: 60px;
						}
					}
				}
			}
		}

		.contacts-root {
			&.medium {
				.contacts-list {
					padding: 0 30px;
				}
			}
			&.small {
				.contacts-list {
					padding: 8px;
				}
			}
		}
	}
}
</style>

