<template>
	<div class="page-vue-good-table scrollable only-y">

		
		<pageheader v-bind:path="this.$route.fullPath"></pageheader>

		<div class="vue-good-table-box card-base card-shadow--medium">
			<vue-good-table
				:columns="columns"
				:rows="datos"
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
					
					<el-button type="primary" round v-on:click="create()" v-if="canCreate()" ><b>AGREGAR</b></el-button>
				</div>		
				  <div slot="emptystate">
						Sin Datos
				  </div>		
				<template slot="table-row" slot-scope="props">
					<span v-if="props.column.field == 'actions'">
						<el-button type="success" icon="el-icon-edit" circle @click.prevent='edit(props.row)' v-if="canEdit()" ></el-button>
						<el-button type="danger" icon="el-icon-delete" circle @click="openDelete(props.row)" v-if="canDelete()" ></el-button>
					</span>
				</template>
			</vue-good-table>
		</div>

		<el-dialog  :title=formTitle  :visible.sync="dialogFormVisible">
			<el-form :model="modelo" ref="modelo"  label-width="120px">
				<el-form-item v-if="editedIndex !=-1 && fields[FIELD_ID].visible" v-bind:label="fields[FIELD_ID].name" :label-width="formLabelWidth" >
					<el-input v-model="modelo.id" auto-complete="off" :disabled="!fields[FIELD_ID].enabled"></el-input>
				</el-form-item>	
				<el-form-item v-if="fields[FIELD_GRANDPARENT].visible" v-bind:label="fields[FIELD_GRANDPARENT].name" :label-width="formLabelWidth"  prop="grandParentId"
					:rules="[{ required: fields[FIELD_GRANDPARENT].required, message:  'Por favor ingrese: '+fields[FIELD_PARENT].name, trigger: 'blur'   }]">
                    <el-select v-model="modelo.grandParentId" :placeholder= fields[FIELD_GRANDPARENT].description
						v-on:change="handleChangeGrandParent($event)">
                    <el-option
                        v-for="item in grandParents"
                        :key="item.id"
                        :label="item.description"
                        :value="item.id">
                    </el-option>                    
                    </el-select>                    
                </el-form-item>

			    <el-form-item v-if="fields[FIELD_PARENT].visible" v-bind:label="fields[FIELD_PARENT].name" :label-width="formLabelWidth"  prop="parentId"
					:rules="[{ required: fields[FIELD_PARENT].required, message:  'Por favor ingrese: '+fields[FIELD_PARENT].name, trigger: 'blur'   }]">
                    <el-select v-model="modelo.parentId" :placeholder= fields[FIELD_PARENT].description  :disabled="modelo.grandParentId==0 || modelo.grandParentId=='' || modelo.grandParentId==undefined "
						>
                    <el-option
                        v-for="item in parents"
                        :key="item.id"
                        :label="item.description"
                        :value="item.id">
                    </el-option>                    
                    </el-select>                    
                </el-form-item>
				<el-form-item v-if="fields[FIELD_DESCRIPTION].visible" v-bind:label="fields[FIELD_DESCRIPTION].name" :label-width="formLabelWidth"  prop="description"
					:rules="[{ required: fields[FIELD_DESCRIPTION].required, message:  'Por favor ingrese: '+fields[FIELD_DESCRIPTION].name, trigger: 'blur'   },{ min: 1, max: 50, message: 'Debe tener entre 1 y 50 caracteres' }]">
					<el-input v-model="modelo.description" auto-complete="off" :disabled="!fields[FIELD_DESCRIPTION].enabled">
					</el-input>
				</el-form-item>	
				<el-form-item v-if="fields[FIELD_ENABLED].visible" v-bind:label="fields[FIELD_ENABLED].name" :label-width="formLabelWidth"  >
					<el-switch inactive-text class="mr-20 themed" v-model="modelo.enabled"></el-switch>	
				</el-form-item>		
													
			</el-form>			
			<span slot="footer" class="dialog-footer">
				<el-button @click="close()">Cancelar</el-button>
				<el-button type="primary" @click="save('modelo')">Guardar</el-button>
			</span>
		</el-dialog>

	</div>
</template>

<script>

import axios from 'axios'
export default {
	name: 'Cascade',
	data(){
		return {
				URL_GET: null,
				URL_CREATE: null,
				URL_UPDATE: null,
				URL_DELETE: null,
				URL_GET_GRANDPARENT: null,
                URL_GET_PARENT: null,
				FIELD_ID: 0,	
				FIELD_DESCRIPTION: 1,
				FIELD_ENABLED: 2,
				FIELD_PARENT: 3,
				FIELD_GRANDPARENT: 4,
				dialogFormVisible: false,
				editedIndex: -1,
                valida: 0,
                validaMensaje: [],	
				formLabelWidth: '120px',
				fields: null,
				datos: [],
				actions:'',
				user:null,
				modelo: null,
                columns: null,
				grandParents: null,
				parents: null,
                title: '',
				screen: null,
				companyId: null,
				grandparentselect:''
			}		
	},
        created () {			
			try {
				this.URL_GET= this.$route.meta.URL_GET;
				this.URL_CREATE= this.$route.meta.URL_CREATE;
				this.URL_UPDATE= this.$route.meta.URL_UPDATE;
				this.URL_DELETE= this.$route.meta.URL_DELETE;				
				this.URL_GET_PARENT= this.$route.meta.URL_GET_PARENT;
				this.URL_GET_GRANDPARENT= this.$route.meta.URL_GET_GRANDPARENT;
				this.modelo = this.$route.meta.modelo;
				this.columns = this.$route.meta.columns;
				this.companyId = parseInt( this.$store.getters.user.CompanyId);
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
                    this.getGrandParent();
				}
				else
					this.showError("No se pudo recuperar la configuración de la pantalla");
			} catch (error) {
				this.showError(error);
			}


        }, 	
	computed: {
		formTitle() {
			return this.editedIndex === -1? 'Crear '+this.title:'Editar '+this.title
		}	
	},

	methods: {
		canCreate(){
			if (this.actions=='')			
				return false;
			else
				return  this.actions.find(x => x.code === "CREATE")
		},
		canEdit(){
			if (this.actions=='')			
				return false;
			else
				return  this.actions.find(x => x.code === "EDIT")
		},
		canDelete(){
			if (this.actions=='')			
				return false;
			else
				return  this.actions.find(x => x.code === "DELETE")
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
		getGrandParent(){			
			let me = this;
			let url = this.URL_GET_GRANDPARENT+ parseInt(me.companyId);
            axios.get(url).then (function(response){
                me.grandParents = response.data;
            }).catch (function (error){
					me.showError(error);
            });
		},    		
		getParent(id){
			if (id==null || id== undefined || id=="") 
				return null;
			let me = this;
			let url = this.URL_GET_PARENT+ id;
            axios.get(url).then (function(response){
                me.parents = response.data;
            }).catch (function (error){
					me.showError(error);
            });
        },  		     
		save(formName){		  
		  this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.editedIndex === 0) {
				//Editar
                let me = this;
                axios.put(this.URL_UPDATE,{
                    'Id': me.modelo.id,
					'Description':me.modelo.description,					
					'ParentId':me.modelo.parentId
                }).then(function(response){
                     me.close();
                     me.get();   
					 me.clean();
					 me.showOk();
                     
                }).catch(function(error){
                    me.showError(error);
                });
                
            } else {
				let me = this;
                axios.post(this.URL_CREATE,{
                    'Description':me.modelo.description,
                    'ParentId':me.modelo.parentId
                }).then(function(response){
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
		openDelete(objeto) {	
			this.modelo.id = objeto.id;
			this.$confirm('La ' + this.title + ' se eliminara permanentemente. Continua?', 'Cuidado', {
			confirmButtonText: 'OK',
			cancelButtonText: 'Cancelar',
			type: 'warning',
			center: true
			}
			).then(() => {
				let me = this;
                axios.put(this.URL_DELETE,{
                    'Id':me.modelo.id
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
		create() {

			 this.dialogFormVisible = true;	
			 this.editedIndex=-1;	
			 this.modelo.description == this.fields[this.FIELD_DESCRIPTION].defaultValue;
			 this.clean();	
			 			 
		},
		edit(objeto) {		
			 this.modelo.id = objeto.id; 
			 this.modelo.description= objeto.description;
			 this.modelo.parentId = objeto.parentId;
			 this.modelo.grandParentId= objeto.grandParentId;
			 this.dialogFormVisible = true;			 
			 this.handleChangeGrandParent(this.modelo.grandParentId);
			 this.editedIndex=0;
		},
		close(){
			this.dialogFormVisible = false;
            this.clean();
		},
        clean(){
            this.modelo.id="";
			this.modelo.description="";
			this.modelo.parentId=null;
			this.grandparentselect="";
			this.modelo.grandParentId="";
            this.editedIndex=-1;
		},
		    handleChangeGrandParent(event){
			  this.grandparentselect= event;
			  this.getParent(this.grandparentselect);
    	}, 
            			  	
	 }
}
</script>

<style lang="scss">
.page-vue-good-table {
	overflow: hidden;
	
}


</style>

