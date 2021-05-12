<template>
    <div class="customer-resume">
        <div class="page-vue-good-table scrollable only-y">	            
            <div class="widget shipping card-shadow--small b-rad-4">
                <div class="title">
                    Resumen de Cuenta - Cliente
                </div>
                <div class="content">
                    <div class="flex justify-space-between">
                        <div class="box grow flex column mt-20 fs-20 info">
                            <div class="mb-15"><i class="mdi mdi-account mr-10"></i>
                                <el-select  size="small" v-model="searchCustomer" filterable placeholder="Seleccione" @change="handleChangeSelect">
                                    <el-option v-for="(i, index) in customers" :key="index" :label="i.names" :value="i.id"></el-option>
                                </el-select>
                                <el-tooltip v-if="searchCustomer!=null"  content="Imprimir resumen" placement="bottom" effect="light">
                                    <el-button style="margin-left: 60px;" size="small" type="primary" icon="el-icon-printer" @click="printResumen()"></el-button>
                                </el-tooltip>
                            </div>
                            <div class="mb-15"><i class="mdi mdi-phone mr-10"></i>{{customerPhone}}</div>
                            <div><i class="mdi mdi-cash-multiple mr-10"></i>$ {{customerDebt}}                                
                            </div>
                            
                            
                        </div>
                        
                        <div class="box grow flex column mt-20 fs-20 info">
                            <div class="mb-15"><i class="mdi mdi-calendar-multiple-check mr-10"></i>
                                <el-date-picker
                                v-model="añoMes"
                                type="month"
                                placeholder="Seleccione"
                                size="small"
                                width
                                @change="handleChangeDate"
                                :disabled="searchCustomer==null">
                                </el-date-picker>				
                            </div>  
                            <div class="mb-15"><i class="mdi mdi-alpha-c-box mr-10"></i>
                                <el-select  size="small" clearable v-model="searchConcept" filterable placeholder="Seleccione" @change="handleChangeSelect" :disabled="searchCustomer==null">
                                    <el-option v-for="(i, index) in concepts" :key="index" :label="i.description" :value="i.id"></el-option>
                                </el-select>
                            </div>  
                            <div><i class="mdi mdi-cash-refund mr-10"></i>
                                <el-select size="small" clearable  v-model="searchCondition" placeholder="Seleccione" @change="handleChangeSelect" :disabled="searchCustomer==null">
                                    <el-option
                                    v-for="item in conditionOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>                                                   
                        </div>
                    </div>
                </div>
            </div>
            <div class="vue-good-table-box card-base card-shadow--medium">
                <vue-good-table
                    :columns="columns"
                    :rows="noveltiesFilter"
                    styleClass="vgt-table condensed"
                    :search-options="{
                        enabled: true,
                        placeholder: 'Buscar'
                    }"
                    :pagination-options="{
                        enabled: true,
                        mode: 'records',
                        perPage: 10,
                        perPageDropdown: [10, 20, 30, 40, 50],
                        nextLabel: 'Sig',
                        prevLabel: 'Ant',
                        rowsPerPageLabel: 'Filas por página',
                        ofLabel: 'de',
                        pageLabel: 'página', // for 'pages' mode
                        allLabel: 'All',
                    }"
                    :lineNumbers="false"
                    class="styled">
                    <div slot="table-actions">
                        
                    </div>		
                    <div slot="emptystate">
                            Sin Datos
                    </div>		
                    <template slot="table-row" slot-scope="props">
                        <span v-if="props.column.field == 'actions'">
                            <el-tooltip content="Ver Pago" placement="top" effect="light">
                                <el-button v-if="props.row.paid" type="info" size="mini" icon="el-icon-view" circle @click.prevent='open(props.row)'></el-button>
                            </el-tooltip>
                            <!-- <el-tooltip content="Modificar Pago" placement="top" effect="light">
                                <el-button v-if="props.row.paid" type="success" size="mini" icon="el-icon-edit" circle @click.prevent='edit(props.row)'></el-button>
                            </el-tooltip>
                            <el-tooltip content="Eliminar Pago" placement="top" effect="light">
                                <el-button v-if="props.row.paid" type="danger" size="mini" icon="el-icon-delete" circle @click="openDelete(props.row)"></el-button>
                            </el-tooltip> -->
                            <!-- <el-tooltip content="Comprobante Pago" placement="top" effect="light">                            
                                <el-button v-if="props.row.paid" type="warning" size="mini" icon="el-icon-tickets" circle @click="openDelete(props.row)"></el-button>
                            </el-tooltip> -->
                            <el-tooltip content="Pagar" placement="top" effect="light">                            
                                <el-button v-if="!props.row.paid" type="primary" size="mini" icon="el-icon-sold-out" circle @click="create(props.row)"></el-button>
                            </el-tooltip>
                        </span>
                    </template>
                </vue-good-table>
            </div>

        </div>

		<el-dialog  :title=formTitle  :visible.sync="dialogFormVisible">
			<el-form :model="modelo" ref="modelo"  label-width="260px">
				<!-- Tabla Principal -->
				<table class="styled striped hover">
					<tbody>	
						<el-row :gutter="20" v-if="!modelo.paid">	
						<div class="card-shadow--small p-20 bg-accent-lighter">	
							<label>Medio de Pago</label>
							<el-select class="pl-10" size="mini" v-model="paymentMethod" filterable placeholder="Seleccione...">
								<el-option v-for="(i, index) in paymentMethods" :key="index" :label="i.description" :value="i.id"></el-option>
							</el-select>					
						</div>
						</el-row>
						<el-row :gutter="20" class="pv-10">										
							<el-col :span="4" :offset="1">
								<div class="item-box item-product">
									<span>CONCEPTO</span>
								</div>												
								</el-col>	
								<el-col :span="1" :offset="2">
									<div class="item-box item-product">
										<span>AÑO</span>
									</div>												
								</el-col>								
								<el-col :span="1" :offset="1">
									<div class="item-box item-product">
										<span>MES</span>
									</div>												
								</el-col>																																			
								<el-col :span="1" :offset="1">
									<div class="item-box item-product">
										<span>IMPORTE</span>
									</div>												
								</el-col>	
								<el-col :span="1" :offset="2">
									<div class="item-box item-product">
										<span>ADEUDA</span>
									</div>												
								</el-col>
								<el-col :span="1" :offset="3">
									<div class="item-box item-product">
										<span>PAGA</span>
									</div>												
								</el-col>																						
						</el-row>
                        <el-row :gutter="20">										
							<el-col :span="4" :offset="1">
								<div class="item-box item-product">
									<h4 class="color-concept">{{modelo.conceptName}}</h4>
								</div>												
							</el-col>	
							<el-col :span="1" :offset="2">
								<div class="item-box item-product">
									<h4 class="color-concept">{{modelo.year}}</h4>
								</div>												
							</el-col>								
							<el-col :span="1" :offset="1">
								<div class="item-box item-product">
									<h4 class="color-concept">{{modelo.month}}</h4>
								</div>												
							</el-col>					
							<el-col :span="1" :offset="1">
								<div class="item-box item-product">
									<h4 class="color-concept">{{modelo.price}}</h4>
								</div>												
							</el-col>
							<el-col :span="1" :offset="2">
								<div class="item-box item-product">
									<h4 class="color-concept">{{modelo.remainder}}</h4>
								</div>												
							</el-col>							
							<el-col :span="1" :offset="2">
								<div class="item-box item-product">
									<div>												
										<el-input-number
											v-model="modelo.amount" 
											:precision="2" 
											:controls="false"
											:value="0"
											:min="0"
											:disabled="!modalEditable">
										</el-input-number>
									</div>									
								</div>												
							</el-col>
							<el-col :span="1" :offset="4"  v-if="!modelo.paid">
								<div class="item-box item-product switch">
									<el-switch
										v-model="modelo.copy"
										active-color="#13ce66"
										inactive-color="#ff4949"
										:disabled="!modalEditable"
										@change="handleSwitch(modelo)">
									</el-switch>
								</div>
							</el-col>							
						</el-row>
					</tbody>
				</table>    
				<!-- /**Tabla Detalle */-->
				<el-collapse accordion>
					<el-collapse-item title="Pagos parciales" name="1">
						<el-table
							:data="modelo.details"
							border
							height="200"
							:summary-method="getSummaries"
							show-summary							
							style="width: 70%">
							<el-table-column
							fixed
							prop="paymentDate"
							label="Fecha"
							width="180">
							</el-table-column>
							<el-table-column
							prop="invoice"
							label="Factura"
							width="180">
							</el-table-column>
							<el-table-column
							prop="paymentMethod"
							label="Metodo de Pago">
							</el-table-column>
							<el-table-column
							prop="amount"
							label="Precio">
							</el-table-column>					
						</el-table>
					</el-collapse-item>
				</el-collapse>
			</el-form>			
			<span slot="footer" class="dialog-footer">
				<el-button @click="close()">Cancelar</el-button>
				<el-button v-if="!modelo.paid" type="primary" @click="save('modelo')">Guardar</el-button>
			</span>
		</el-dialog>

    </div>
</template>

<script>

import axios from 'axios'
export default {
	name: 'Customer-resume',
	data(){
		return {
				URL_GET: null,
                URL_GET_CUSTOMERS: null,
                URL_GET_CUSTOMER: null,
				URL_CREATE_PAYMENT: null,
				//Estan ordenados alfabeticamente	
				companyName: null,
                customers: null,
                customer: null,
                customerPhone: null,
                customerDebt: null,
                searchCustomer: null,	
                concepts: null,
                searchConcept: null,
				paymentMethods: null,
				paymentMethod: null,
				systemCustom: null,
                añoMes: null,		
				dialogFormVisible: false,
                formTitle: null,
				editedIndex: -1,
				modalEditable: false,
                valida: 0,
                validaMensaje: [],	
				formLabelWidth: '80px',
				fields: null,
				screen: null,
				datos: [],
				actions:'',
				user:null,
				modelo: null,
				columns: null,
				title: '',
				company: null,
                conditionOptions: [{
                    value: 'PAGO',
                    label: 'Pagó'
                    }, {
                    value: 'IMPAGO',
                    label: 'Adeudado'
                    }],
                searchCondition: null

			}		
	},
	computed: {
		noveltiesFilter: function() {			
		let concept = null;
        let month = null;
        let year = null;
        let condition = null;

		if (this.datos == null)
			return;

		if (this.searchConcept!=null)
		{
			concept=this.searchConcept;
		}

	    if (this.añoMes!=null)
		{
			year = this.añoMes.getFullYear();
			month = this.añoMes.getMonth()+1;
	    } 
        
        if (this.searchCondition != null)
        {
            if (this.searchCondition=="PAGO")
                condition=true;
            else
                condition=false;


        }

	
		return this.datos.filter(				
			x => { 
				return (x.conceptId==concept || concept==null) 		
                && (x.year == year || year == null)
                && (x.month == month || month == null)
                && (x.paid == condition || condition == null)

			})			
		},
		paymentMethodDescription: function() {
			if (this.paymentMethods== null || this.paymentMethod== null)
				return

			return this.paymentMethods.filter(x=>x.id==this.paymentMethod)[0].description;
		},
		customerDescription: function() {
			if (this.customers== null || this.searchCustomer== null)
				return

			return this.customers.filter(x=>x.id==this.searchCustomer)[0].names;
		}					
	},    
        created () {			
			try {
				this.modelo = this.$route.meta.modelo;
				this.companyId = parseInt( this.$store.getters.user.CompanyId);
				this.companyName = this.$store.getters.user.Nombre;
				this.user =  parseInt( this.$store.getters.user.Id);
				this.logo = this.$store.getters.user.Logo;
				this.columns = this.$route.meta.columns;
				
                this.URL_GET_CUSTOMERS= this.$route.meta.URL_GET_CUSTOMERS;
                this.URL_GET_CUSTOMER= this.$route.meta.URL_GET_CUSTOMER;
                this.URL_GET_CONCEPTS = this.$route.meta.URL_GET_CONCEPTS;
				this.URL_CREATE_PAYMENT= this.$route.meta.URL_CREATE_PAYMENT;
				this.URL_GET_PAYMENTMETHODS = this.$route.meta.URL_GET_PAYMENTMETHODS;
				this.URL_GET_SYSTEMCUSTOM = this.$route.meta.URL_GET_SYSTEMCUSTOM;
				this.URL_GET_COMPANY = this.$route.meta.URL_GET_COMPANY;

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
					this.getCustomers();
                    this.getConcepts();
					this.getPaymentMethods();	
					this.getSystemCustom();	
					this.getCompany(this.companyId);				
				}
				else
					this.showError("No se pudo recuperar la configuración de la pantalla");
			} catch (error) {
				this.showError(error);
			}


        }, 	

	methods: {	
        getCompany(id){
        let me = this;
        axios
            .get(this.URL_GET_COMPANY +id)
            .then(function(response) {
            me.company = response.data
            })
            .catch(function(error) {
            me.showError();
            });
        }, 			
		getCustomers() {
			let me = this;
			let url = me.URL_GET_CUSTOMERS+ parseInt(me.companyId);
			axios.get(url)
			.then(function(response) {
			me.customers = response.data;
			})
			.catch(function(error) {
			me.showError();
			});
		}, 	  
		getCustomer() {
			let me = this;
			let url = me.URL_GET_CUSTOMER + parseInt(me.searchCustomer);
			axios.get(url)
			.then(function(response) {
			    me.customer = response.data;
                if (me.customer!= null){
                    me.customerPhone= me.customer.phone;
                    me.customerDebt= me.customer.pendingDebt;
                    me.datos = me.customer.novelties;
                }
			})
			.catch(function(error) {
			me.showError();
			});
		}, 	              
		getConcepts() {
			let me = this;
			let url = me.URL_GET_CONCEPTS+ parseInt(me.companyId);
			axios.get(url)
			.then(function(response) {
			me.concepts = response.data;
			})
			.catch(function(error) {
			me.showError();
			});
		}, 	
		getPaymentMethods() {
			let me = this;
			let url = me.URL_GET_PAYMENTMETHODS+ parseInt(me.companyId);
			axios.get(url)
			.then(function(response) {
			me.paymentMethods = response.data;
			})
			.catch(function(error) {
			me.showError();
			});
		},		    
		getSystemCustom() {
			let me = this;
			let url = me.URL_GET_SYSTEMCUSTOM + parseInt(me.companyId);
			axios.get(url)
			.then(function(response) {
			me.systemCustom = response.data;
			me.paymentMethod = me.systemCustom.paymentMethodId;
			})
			.catch(function(error) {
			me.showError();
			});
		},				     						
		create(objeto) {
			 this.modelo.details = objeto.details;
			 this.modelo.id = objeto.noveltyId; 
			 this.modelo.conceptName= objeto.conceptName;
             this.modelo.year= objeto.year;
             this.modelo.month= objeto.month;
             this.modelo.price= objeto.price;
             this.modelo.remainder= objeto.remainder;
			 this.modelo.paid= objeto.paid;
             this.modelo.amount= 0;			 
			 this.dialogFormVisible = true;
			 this.modalEditable = true;	
			 this.modelo.copy= false;
			 			 
		},
		open(objeto) {		
			 this.modelo.id = objeto.noveltyId; 
			 this.modelo.conceptName= objeto.conceptName;
             this.modelo.year= objeto.year;
             this.modelo.month= objeto.month;
             this.modelo.price= objeto.price;
             this.modelo.remainder= objeto.remainder;
			 this.modelo.paid= objeto.paid;
             this.modelo.amount= objeto.price;
			 this.dialogFormVisible = true;
			 this.modalEditable = false;
			 this.modelo.details = objeto.details;
		},        
		edit(objeto) {		
			 this.modelo.id = objeto.noveltyId; 
			 this.modelo.conceptName= objeto.conceptName;
             this.modelo.year= objeto.year;
             this.modelo.month= objeto.month;
             this.modelo.price= objeto.price;
             this.modelo.remainder= objeto.remainder;
			 this.modelo.paid= objeto.paid;
             this.modelo.amount= objeto.price;
			 this.dialogFormVisible = true;
			 this.modalEditable = true;
		},
		close(){
			this.dialogFormVisible = false;
            this.clean();
		},
        clean(){
			 this.modelo.id = "";
			 this.modelo.conceptName= "";
             this.modelo.year= "";
             this.modelo.month= "";
             this.modelo.price= "";
             this.modelo.remainder= "";
             this.modelo.amount= 0;
			 this.modelo.paid= false;
			 this.dialogFormVisible = false;
			 this.modalEditable = false;
			 this.editedIndex=-1;
             this.editedIndex=-1;
			 this.modalEditable = false;
			 this.paymentMethod = this.systemCustom.paymentMethodId;
		},
		save(){
			let me = this;
			me.modelo.paymentMethodId= me.paymentMethod;
            axios.post(this.URL_CREATE_PAYMENT,{
				'NoveltyId':me.modelo.id,
				'Total':me.modelo.amount,
				'SecurityUserId':me.user,
				'CompanyId': me.companyId,
				'Observation': null,
				'Amount':me.modelo.amount,
				'PaymentMethodId': me.modelo.paymentMethodId
                }).then(function(response){
					 me.printTicket(response.data);
                     me.close();
                     me.getCustomer();					 
					 me.showOk();
                     
                }).catch(function(error){
						me.close();
						me.showError(error);
				});								   
		},

	  printResumen() {

            let title = 'Resumen de Cuenta'; 
            let name = title + " - "+this.customerDescription;
            let bodyName = 'Cliente';

            var heading= [
            this.companyName,
            ];
            if (this.company.address!=null)
            {
                 heading.push(this.company.address)
            }
            if (this.company.phone!=null)
            {
                 heading.push(this.company.phone)
            }
            if (this.company.emails!=null)
            {
                 heading.push(this.company.emails)
            }            

            var heading2= [
                "Fecha de Emisión",
                new Date().toLocaleString(),
                null,
                null
            ]; 

            var body = [
                this.customer.names
            ];   

            if (this.customer.documento != null){
                body.push(this.customer.documento)
            }
            if (this.customer.address != null){
                body.push(this.customer.address)
            }
            if (this.customer.phone != null){
                body.push(this.customer.phone)
            }
            if (this.customer.email != null){
                body.push(this.customer.email)
            }			

			const columns = [
				{ title: "Concepto", dataKey: "conceptName" },
				{ title: "Año", dataKey: "year" },
				{ title: "Mes", dataKey: "month" },
				{ title: "Precio", dataKey: "price" },
				{ title: "Adeuda", dataKey: "remainder" }
			];			

            var footer = [];   
            footer.push(""); //1
            footer.push("Total adeudado $: "); //2
            footer.push(this.customerDebt.toString()); //3
            footer.push(null); //4
            footer.push(null); //5
            footer.push(null); //6
            footer.push(null); //7
            footer.push(null); //8
            footer.push(null); //9
            footer.push(null); //10
            footer.push(null); //11

            this.generatePdf(name,heading,heading2,title,bodyName,body,columns, this.noveltiesFilter, this.logo, footer);


	  },

	 printTicket(factura) {
            let title = 'Recibo de Pago'; 
			let data= [];
		 	let name = title + " - "+this.customerDescription;
			let bodyName = 'Cliente';
            var body = null;
		//	var adeuda =0;
					
			data.push(this.modelo);

		//	adeuda = this.modelo.remainder - this.modelo.amount;

            var heading= [
            this.companyName,
            ];
            if (this.company.address!=null)
            {
                 heading.push(this.company.address)
            }
            if (this.company.phone!=null)
            {
                 heading.push(this.company.phone)
            }
            if (this.company.emails!=null)
            {
                 heading.push(this.company.emails)
            }            

            var heading2= [
                "Fecha de Emisión",
                new Date().toLocaleString(),
                "N° de factura",
                factura
            ];            

            var body = [
                this.customer.names
            ];   

            if (this.customer.documento != null){
                body.push(this.customer.documento)
            }
            if (this.customer.address != null){
                body.push(this.customer.address)
            }
            if (this.customer.phone != null){
                body.push(this.customer.phone)
            }
            if (this.customer.email != null){
                body.push(this.customer.email)
            }		
		 	const columns = [
		 		{ title: "Concepto", dataKey: "conceptName" },
		 		{ title: "Año", dataKey: "year" },
		 		{ title: "Mes", dataKey: "month" },
				{ title: "Precio", dataKey: "price" },
				{ title: "Debia", dataKey: "remainder" },
				{ title: "Abona", dataKey: "amount" },
		 	];

            var footer = [];  
			if (this.paymentMethodDescription!=null) 
			{
				footer.push("Método de pago: " + this.paymentMethodDescription); //1
			}
			else{
				footer.push(""); //1
			}            
            var footer = [];  
			var observation = "";          
            footer.push("Método de pago: " + this.paymentMethodDescription); //1
            footer.push("Total parcial  $: "); //2
            footer.push(this.modelo.remainder.toString()); //3
            footer.push("Descuento     %: "); //4
            footer.push("0,00"); //5
            footer.push("Total a pagar $: "); //6
            footer.push(this.modelo.remainder.toString()); //7
            footer.push("Pagado $"); //8
            footer.push(this.modelo.amount.toString()); //9
            footer.push("Observación: " + observation); //10
            footer.push("Firma"); //11

            this.generatePdf(name,heading,heading2,title,bodyName,body,columns, data, this.logo, footer);

	
	  },

	  handleChangeSelect() {
          if (this.searchCustomer!=null){
              this.getCustomer();
          }
		  
	  },        
	  handleChangeDate() {
		//  this.getNovelties();
	  },      
	  handleSwitch(n){
		  if (n.copy)
		  	n.amount = n.remainder;
	  },         
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = 'Total de pagos';
            return;
          }
		  if (index === 1 ||  index === 2) {
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = '$ ' + values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      }	  
	  
	 }
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.customer-resume {
    overflow-y: auto;
    height: 700px;

    .input-width {
        width: 250px;
    }

    .el-dialog  {
        width: 75% !important;
    }

    .page-vue-good-table {
	    overflow-y: auto !important;
	}
    .widget {
            position: relative;
            border: 4px solid $text-color-accent;
            box-sizing: border-box;
            padding: 20px;
            margin-bottom: 20px;
            background: white;

            .title {
                background: $text-color-accent;
                color: $background-color;
                position: absolute;
                top: 0;
                left: 0;
                padding: 2px 12px 6px 8px;
                font-size: 16px;
                font-weight: bold;
                text-transform: uppercase;
            }

            &.shipping {
                .info {
                    background: $background-color;
                    padding: 30px;
                    margin-right: 10px;
                    box-sizing: border-box;
                }
                .type {
                    background: $background-color;
                    margin-left: 10px;
                    padding: 30px;
                    box-sizing: border-box;

                    .type-btn {
                        background: transparentize($text-color-accent, .9);
                        border: 1px solid $text-color-accent;
                        color: $text-color-accent;
                        padding: 20px;
                        text-align: center;

                        &.active {
                            background: $text-color-accent;
                            color: white;
                        }
                    }
                }
            }
        }
}
</style>

