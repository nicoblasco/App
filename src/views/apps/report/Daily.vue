<template>
    <div class="daily">
        <div class="page-vue-good-table scrollable only-y">	

            <div class="widget shipping card-shadow--small b-rad-4">
                <div class="title">
                    Reporte de Ingresos
                </div>
                <div class="content">
                    <div class="flex justify-space-between">
                        <div class="box grow flex column mt-20 fs-20 info">
                            <div class="mb-15"><i class="mdi mdi-calendar-multiple-check mr-10"></i>
                                <el-date-picker
                                    v-model="rangoFechas"
                                    type="datetimerange"
                                    align="right"
                                    size="small"
                                    unlink-panels
                                    range-separator="A"
                                    start-placeholder="Fecha Desde"
                                    end-placeholder="Fecha Hasta"
                                    @change="handleChangeDate"
                                    :picker-options="pickerOptions">
                                </el-date-picker>
                            </div>                         
                            <div class="mb-15"><i class="mdi mdi-cash-multiple mr-10"></i>$ {{totalCalculado}}                                
                            </div>
                            <div>
                                <el-tooltip v-if="rangoFechas != null" content="Imprimir resumen" placement="bottom" effect="light">
                                    <el-button size="small" type="primary" icon="el-icon-printer" @click="printResumen()"></el-button>
                                </el-tooltip>                            
                            </div>
                        </div>
                        
                        <div class="box grow flex column mt-20 fs-20 info">
                            <div class="mb-15"><i class="mdi mdi-account mr-10"></i>
                                <el-select  size="small" clearable="" v-model="searchCustomer" filterable placeholder="Seleccione" @change="handleChangeSelect" :disabled="rangoFechas==null">
                                    <el-option v-for="(i, index) in customers" :key="index" :label="i.names" :value="i.id"></el-option>
                                </el-select>
                            </div>  
                            <div class="mb-15"><i class="mdi mdi-credit-card-settings mr-10"></i>
                                <el-select  size="small" clearable v-model="searchPayment" filterable placeholder="Seleccione" @change="handleChangeSelect" :disabled="rangoFechas==null">
                                    <el-option v-for="(i, index) in paymentMethods" :key="index" :label="i.description" :value="i.id"></el-option>
                                </el-select>
                            </div>                                                  
                        </div>
                    </div>
                </div>
            </div>
            <div class="vue-good-table-box card-base card-shadow--medium">
                <vue-good-table
                    :columns="columns"
                    :rows="paymentFilter"
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
                            <el-tooltip content="Imprimir Comprobante" placement="top" effect="light">                            
                                <el-button type="warning" size="mini" icon="el-icon-tickets" circle @click="printTicket(props.row)"></el-button>
                            </el-tooltip>
                            <el-tooltip content="Ver Pago" placement="top" effect="light">
                                <el-button type="info" size="mini" icon="el-icon-view" circle @click.prevent='open(props.row)'></el-button>
                            </el-tooltip>
                            <el-tooltip content="Modificar Pago" placement="top" effect="light">
                                <el-button type="success" size="mini" icon="el-icon-edit" circle @click.prevent='edit(props.row)'></el-button>
                            </el-tooltip>
                            <el-tooltip content="Eliminar Pago" placement="top" effect="light">
                                <el-button  type="danger" size="mini" icon="el-icon-delete" circle @click="openDelete(props.row)"></el-button>
                            </el-tooltip>                             
                        </span>
                    </template>
                </vue-good-table>
            </div>

        </div>

		<el-dialog  :title=formTitle  :visible.sync="dialogFormVisible">
			<el-form :model="modelo" ref="modelo"  label-width="260px">
				<table class="styled striped hover">
					<tbody>	
							
						<div class="card-shadow--small p-20 bg-accent-lighter">	
                            <el-row :gutter="20">	
                                <label class="header 2 primary-text pr-10 titulo">Fecha de Pago: </label>
                                <span class="bold"> {{modelo.paymentDate}}</span>
                            </el-row>			                            
                            <el-row :gutter="20">
                                <label class="header 2 primary-text pr-10 titulo">Medio de Pago</label>
                                <el-select class="pl-10" size="mini" v-model="modelo.paymentMethodId" filterable placeholder="Seleccione..." :disabled="!modalEditable">
                                    <el-option v-for="(i, index) in paymentMethods" :key="index" :label="i.description" :value="i.id" ></el-option>
                                </el-select>	
                            </el-row>	
                             <el-row :gutter="20">

                                <label class="header 2 primary-text pr-70 titulo" >TOTAL: </label> 
                                <span class="bold">$ {{totalFacturaCalculado}}</span>
                            </el-row>	
                             <el-row :gutter="20">

                                <label class="header 2 primary-text pr-70 titulo" >Observación: </label> 
                                <span class="bold"> {{modelo.observation}}</span>
                            </el-row>	                            		
						</div>
						

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
								<!-- <el-col :span="1" :offset="2">
									<div class="item-box item-product">
										<span>PENDIENTE</span>
									</div>												
								</el-col> -->
								<el-col :span="1" :offset="3">
									<div class="item-box item-product">
										<span>PAGA</span>
									</div>												
								</el-col>																						
						</el-row>
                        <tr v-for="n in modelo.detail" :key="n.paymentDetailId">	
                            <el-row v-if="!n.remove" :gutter="20">										
                                <el-col :span="4" :offset="1">
                                    <div class="item-box item-product">
                                        <h4 class="color-concept">{{n.conceptName}}</h4>
                                    </div>												
                                </el-col>	
                                <el-col :span="1" :offset="2">
                                    <div class="item-box item-product">
                                        <h4 class="color-concept">{{n.year}}</h4>
                                    </div>												
                                </el-col>								
                                <el-col :span="1" :offset="1">
                                    <div class="item-box item-product">
                                        <h4 class="color-concept">{{n.month}}</h4>
                                    </div>												
                                </el-col>					
                                <el-col :span="1" :offset="1">
                                    <div class="item-box item-product">
                                        <h4 class="color-concept">{{n.price}}</h4>
                                    </div>												
                                </el-col>	
                                <!-- <el-col :span="1" :offset="2">
                                    <div class="item-box item-product">									
                                        <h4 class="color-concept">{{ n.remainder= (n.price - n.amount)}}</h4>
                                    </div>												
                                </el-col>																																																	 -->
                                <el-col :span="1" :offset="2">
                                    <div class="item-box item-product">
                                        <div>												
                                            <el-input-number
                                                v-model="n.amount" 
                                                :precision="2" 
                                                :controls="false"
                                                :value="0"
                                                :min="0"
                                                :disabled="!modalEditable">
                                            </el-input-number>
                                        </div>									
                                    </div>												
                                </el-col>
                                <el-col :span="1" :offset="4" v-if="modalEditable && deleteAllow">
                                    <div class="item-box item-product switch">
                                        <el-tooltip  content="Borrar item" placement="bottom" effect="light">
                                            <el-button size="small" type="danger" icon="el-icon-delete" @click="n.remove=true"></el-button>
                                         </el-tooltip>     
                                    </div>
                                </el-col>							
                            </el-row>
                        </tr>
					</tbody>
				</table>                                                    													
			</el-form>			
			<span slot="footer" class="dialog-footer">
				<el-button @click="close()">Cancelar</el-button>
				<el-button v-if="modalEditable" type="primary" @click="save('modelo')">Guardar</el-button>
			</span>
		</el-dialog>        
    </div>
</template>

<script>

import axios from 'axios'
import { Loading } from 'element-ui';

export default {
	name: 'Daily',
	data(){
		return {
                URL_GET_CUSTOMERS: null,
                URL_GET_PAYMENT: null,
                URL_UPDATE_PAYMENT: null,
                URL_DELETE: null,
				//Estan ordenados alfabeticamente	
                companyName: null,
                customers: null,
                customer: null,
                paymentMethods: null,
                searchPayment: null,
                customerPhone: null,
                formTitle: null,
                payments: null,
                searchCustomer: null,	
                concepts: null,
                searchConcept: null,
                total: null,
                añoMes: null,
                rangoFechas: null,		
				dialogFormVisible: false,
				editedIndex: -1,
                valida: 0,
                validaMensaje: [],	
				formLabelWidth: '120px',
                modalEditable: true,
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
                searchCondition: null,
                pickerOptions: {
                shortcuts: [{
                    text: 'Ultima Semana',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: 'Ultimo Mes',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: 'Ultimas 3 semanas',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
                },                
			}	
	},
	computed: {
		paymentFilter: function() {			
		let customer = null;
        let paymentMethod = null;

		if (this.datos == null)
			return;

		if (this.searchCustomer!=null)
		{
			customer=this.searchCustomer;
		}

		if (this.searchPayment!=null)
		{
			paymentMethod=this.searchPayment;
		}
    

	
		return this.datos.filter(				
			x => { 
				return (x.customerId==customer || customer==null) 		
                && (x.paymentMethodId == paymentMethod || paymentMethod == null)
			})			
		},
        totalCalculado: function() {		
            let total =0;

            if (this.paymentFilter.length>0)
            {
                this.paymentFilter.forEach(element => {
                     total += element.total;
                });
                return total;
            }
            else
                return total;
        } ,        

        totalFacturaCalculado: function() {		
            let total =0;
            if (this.modeloSinEliminados == null)
                return total;                

            if (this.modeloSinEliminados.length>0)
            {
                this.modeloSinEliminados.forEach(element => {
                     total += element.amount;
                });
                return total;
            }
            else
                return total;
        } ,   
        modeloSinEliminados: function() {
            if (this.modelo==null)
                return null;

            if (this.modelo.detail==null)
                return null;
            
            if (this.modelo.detail.length>0)            
                return this.modelo.detail.filter(x=>x.remove==false);
            else
                return null;
        } ,  
		paymentMethodDescription: function() {
			if (this.paymentMethods== null || this.searchPayment== null)
				return

			return this.paymentMethods.filter(x=>x.id==this.searchPayment)[0].description;
		},   
		customerDescription: function() {
			if (this.customers== null || this.searchCustomer== null)
				return

			return this.customers.filter(x=>x.id==this.searchCustomer)[0].names;
		},
        deleteAllow: function() {
            if (this.modelo==null)
                return false;

            if (this.modelo.detail.filter(x=>x.remove==false).length==1){
                return false;
            }
            else
                return true;
        }	                    
	},    
        created () {			
			try {
				this.modelo = this.$route.meta.modelo;
				this.companyId = parseInt( this.$store.getters.user.CompanyId);
				this.columns = this.$route.meta.columns;
                this.companyName = this.$store.getters.user.Nombre;
                this.URL_GET_CUSTOMERS= this.$route.meta.URL_GET_CUSTOMERS;
                this.URL_GET_PAYMENT= this.$route.meta.URL_GET_PAYMENT;
                this.URL_GET_PAYMENTMETHODS = this.$route.meta.URL_GET_PAYMENTMETHODS;
                this.URL_UPDATE_PAYMENT = this.$route.meta.URL_UPDATE_PAYMENT;
                this.URL_DELETE = this.$route.meta.URL_DELETE;
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
                    this.getPaymentMethods();
				}
				else
					this.showError("No se pudo recuperar la configuración de la pantalla");
			} catch (error) {
				this.showError(error);
			}


        }, 	

	methods: {		
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
		getPayment() {
			let me = this;
			let url = me.URL_GET_PAYMENT;
            let startDate = me.rangoFechas[0];
            let endDate = me.rangoFechas[1];
                
			axios.get(url, {
				//Siempre va el atributos params
				params: {
			   	 'CompanyId': parseInt(me.companyId),
                 'StartDate': startDate,
				 'EndDate': endDate	

				}
			})
			.then(function(response) {
			    me.payments = response.data;
                me.datos = response.data.header;
                //me.total = response.data.total;
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
		open(objeto) {		
			 this.modelo = _.cloneDeep(objeto);
			 this.dialogFormVisible = true;
			 this.modalEditable = false;
		},        
		edit(objeto) {	            	
             this.modelo = _.cloneDeep(objeto);
			 this.dialogFormVisible = true;
			 this.modalEditable = true;
		},
		openDelete(objeto) {
			this.$confirm('El Pago se eliminara permanentemente. Continua?', 'Cuidado', {
			confirmButtonText: 'OK',
			cancelButtonText: 'Cancelar',
			type: 'warning',
			center: true
			}
			).then(() => {
				let me = this;
                axios.put(this.URL_DELETE,{
                    'Id': objeto.paymentId
                }).then(function(response){
		 				me.showOk();
						me.getPayment();
                     
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
            this.clean();
            this.dialogFormVisible = false;
		},
        clean(){
            this.modalEditable = true;
            this.modelo.detail = null;
            
		},
		save(){	
		   let me = this;	  		  	  
		   let lista = '';

		   this.$confirm('¿Desea modificar el pago?', 'Atención', {
		 	confirmButtonText: 'OK',
		 	cancelButtonText: 'Cancelar',
		 	type: 'warning',
		 	center: true
		 	}
		 	).then(() => {
		 		let loadingInstance = Loading.service({ fullscreen: true });
		 		try {	
                     me.modelo.total = me.totalFacturaCalculado;		
		 			lista = {
                        'Id': me.modelo.paymentId,
		 				'PaymentMethodId': me.modelo.paymentMethodId,
		 				'Total': me.modelo.total,
						'Observation': me.modelo.observation,
		 				'Detail': []
		 			}

		 			me.modelo.detail.forEach(n=> {
		 				let objeto = [];								
		 						objeto =  {
                                'Id': n.paymentDetailId,
		 						'NoveltyId': n.noveltyId,
		 						'Amount':n.amount,
								'Remainder': n.remainder,
                                'Remove': n.remove
		 					}
		 				lista.Detail.push(objeto);					
		 			});											

		 			axios.post(this.URL_UPDATE_PAYMENT,
		 			lista
		 			).then(function(response){
		 				loadingInstance.close();						
						me.printTicket(me.modelo);
		 				me.showOk();
						me.getPayment();
                        me.close();
						
		 			}).catch(function(error){
		 				loadingInstance.close();
		 				me.showError(error);
                         me.close();
		 			});
		 		} catch (error) {
		 			loadingInstance.close();
		 			me.showError(error);
                     me.close();
		 		}
	
		 		}).catch(() => {
		 			loadingInstance.close();
		 		this.$message({
		 			type: 'info',
		 			message: 'Cancelado'
		 		});

		 	});
		
			
	 },	        
        printResumen() {
            let title = 'Resumen de Ingresos'; 
            let name = title + " - "+this.companyName;
            var heading= [
            "Fecha: " + new Date().toLocaleString(),
            "Total: $" + this.totalCalculado			
            ];

            if (this.searchPayment!=null)
             {
                 heading.push("Medio de Pago: $" + this.paymentMethodDescription)
             }

            if (this.searchCustomer!=null)
             {
                 heading.push("Cliente: $" + this.customerDescription)
             }             

            const columns = [
                { title: "Fecha de Pago", dataKey: "paymentDate" },
                { title: "Cliente", dataKey: "customerName" },
                { title: "Medio de Pago", dataKey: "paymentMethod" },
                { title: "Total", dataKey: "total" }
            ];
            this.generatePdf(name,heading,title,columns,this.paymentFilter,this.companyName)
        },
        printTicket(objeto) {
            let title = 'Comprobante de Pago'; 
            let name = title + " - "+this.companyName;
            var heading= [
            "Fecha de Pago: " + objeto.paymentDate,
            "Cliente: " + objeto.customerName,
            "Medio de Pago: " + objeto.paymentMethod,
            "Total: $" + objeto.total			
            ];

			const columns = [
				{ title: "Concepto", dataKey: "conceptName" },
				{ title: "Año", dataKey: "year" },
				{ title: "Mes", dataKey: "month" },
				{ title: "Valor", dataKey: "amount" }
			];

            this.generatePdf(name,heading,title,columns,objeto.detail,this.companyName);
        },
	  handleChangeSelect() {

		  
	  },        
	  handleChangeDate() {
		  if (this.rangoFechas!= null ){
              this.getPayment();
          }
          else{
              this.datos = [];
              this.total = null;
          }
	  },            			  	
	 }
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.daily {

    overflow-y: auto;
    height: 700px;

    .page-vue-good-table {
        overflow: hidden;	
    }

    .el-dialog  {
        width: 75% !important;
    }

    .bold {
        font-weight: bold;
        font-size: large;
    }

    .titulo {
       font: caption;
       font-weight: bold;
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

