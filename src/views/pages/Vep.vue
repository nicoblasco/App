<template>
	<div class="page-ecommerce-vep flex">		
		<div :class="{'sidebar':true, 'open':sidebarOpen}">
			<vue-scroll class="scroller">
				<div class="widget close-filter-box">
					<button @click="sidebarOpen = false">
						close filter
					</button>
				</div>
				<div class="widget">
					<div class="title">Busqueda rápida</div>
					<div class="content">
						<div>
							<span>Cliente</span>							
                              <el-select  size="mini" v-model="searchCustomer" filterable placeholder="Seleccione" @change="handleChangeSelect">
                                <el-option v-for="(i, index) in customers" :key="index" :label="i.names" :value="i.id"></el-option>
                            </el-select>
						</div>
						<div v-if="searchCustomer!=null">
							<span>Concepto</span>							
                              <el-select  size="mini" v-model="searchConcept" filterable clearable placeholder="Seleccione">
                                <el-option v-for="(j, index2) in conceptsFilter" :key="index2" :label="j.concept" :value="j.id"></el-option>
                            </el-select>
						</div>                        
					</div>
				</div>	
				<div class="widget select-color"  v-if="searchCustomer!=null">
					<div class="title">Operaciones</div>
					<div class="content">                     
						<el-row style="padding-left: 20px">
							<el-button type="primary" round v-on:click="open">Nuevo VEP</el-button>
						</el-row>
					</div>
				</div>							
				<div class="widget close-filter-box">
					<button @click="sidebarOpen = false">
						close filter
					</button>
				</div>
			</vue-scroll>
		</div>
        <vue-scroll class="table-box card-base card-outline" v-if="customerName!=null">
            <div class="list-container box grow flex column">                
                    <table class="styled striped hover" v-if="customerName!=null" >
                        <tbody>		
                            <el-row :gutter="20" >
                                <el-col :span="21" :offset="1">
                                    <h3 class="bg-accent-lighter b-rad-14" style="padding: 8px">
                                        {{customerName}}
                                    </h3>
                                </el-col>
                            </el-row>	
							<el-row :gutter="10">	
								<el-col :span="3" :offset="1">
									<div class="item-box item-product">
										<span>CONCEPTO</span>
									</div>												
								</el-col>	                                									
								    <el-col :span="3" :offset="1">
									<div class="item-box item-product">
										<span>FECHA</span>
									</div>												
									</el-col>	
									<el-col :span="6" >
										<div class="item-box item-product">
											<span>DETALLE</span>
										</div>												
									</el-col>								
									<el-col :span="1" >
										<div class="item-box item-product">
											<span>PRECIO</span>
										</div>												
									</el-col>																																			
									<el-col :span="1" :offset="2">
										<div class="item-box item-product">
											<span>PAGADO</span>
										</div>												
									</el-col>																						
							</el-row>	
                            <div v-if="vepsFilter!=null && vepsFilter!=undefined">
                                <div v-for="v in vepsFilter" :key="v.id">
                                        <el-row :gutter="20">	
                                            <el-col :span="3" :offset="1">
                                                <div class="item-box item-product">
                                                    <h4 class="color-concept">{{v.concept}}</h4>
                                                </div>												
                                            </el-col>	                                            									
                                            <el-col :span="3" :offset="1">
                                                <div class="item-box item-product">
                                                    <h4 class="color-attr">{{v.createdDate}}</h4>
                                                </div>												
                                            </el-col>	
                                            <el-col :span="6">
                                                <div class="item-box item-product">
                                                    <h4 class="color-attr">{{v.detail}}</h4>
                                                </div>												
                                            </el-col>								
                                            <el-col :span="1">
                                                <div class="item-box item-product">
                                                    <h4 class="color-attr">{{v.price}}</h4>
                                                </div>												
                                            </el-col>																																																				
                                            <el-col :span="1">
                                                <div class="item-box item-product switch">
                                                    <el-switch
                                                        class="pt-10"
                                                        v-model="v.paid"
                                                        active-color="#13ce66"
                                                        inactive-color="#ff4949"
                                                        @change="handleSwitch(v)">
                                                    </el-switch>
                                                </div>
                                            </el-col>
                                            <el-col :span="1" :offset="3">
                                                <el-button class="mv-15" size="mini" type="primary" icon="el-icon-edit" circle @click="edit(v)"></el-button>							
                                            </el-col>
                                            <el-col :span="1">
                                                <el-button class="mv-15" size="mini" type="danger"  icon="el-icon-delete" circle  @click="remove(v)"></el-button>
                                            </el-col>                                            
                                        </el-row>
                                    </div>
                            </div>
                            <div v-else>                                
                                <span>No hay datos</span>                            											
                            </div>
							
                        </tbody>
                    </table>                                
            </div>	
        </vue-scroll> 

		<el-dialog  :title=formTitle  :visible.sync="dialogvisible">
			<el-form :model="modelo" ref="modelo"  label-width="120px">
                        <el-form-item label="Concepto" prop="conceptId" 
                        :rules="[{ required: true, message:  'Por favor ingrese el concepto', trigger: 'blur'   }]">
                            <el-select  v-model="modelo.conceptId" filterable clearable placeholder="Seleccione">
                                <el-option v-for="(i, index) in conceptsFilter" :key="index" :label="i.concept" :value="i.id"></el-option>
                            </el-select>
                        </el-form-item>
						<el-form-item label="Detalle" prop="detail" 
				:rules="[{ required: true, message:  'Por favor ingrese el detalle del VEP', trigger: 'blur'   },{ min: 1, max: 100, message: 'Debe tener entre 1 y 100 caracteres' }]">					
							<el-input v-model="modelo.detail" ></el-input>
						</el-form-item>		
                        <el-form-item label="Precio" prop="price">
                            <el-input-number v-model="modelo.price" :controls="false" :precision="2" :step="0.1" :min="0"></el-input-number>
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
import 'tui-grid/dist/tui-grid.min.css'
import axios from 'axios'
import { Loading } from 'element-ui';


export default {
	name: 'Vep',
	data () {
		return {			
		    grid: null,
			gridData: [],
			resizing: false,
			height: 300,
			sidebarOpen: false,
			customers:null,
			customer:null,
			concepts:null,
			systemCustom: null,
			searchCustomer: null,
            searchConcept: null,
			allownew: false,
			dialogvisible: false,
            hasData: false,
			modelo: null,
            filterText: null,
			hasData: false,
			today: new Date().toLocaleString(),			
			companyName: null, 
			company: null,
            formTitle: null,
            editedIndex: -1,
            veps: null
		}
	},
	computed: {
		customerName:  function(){
			if (this.searchCustomer==null)
				return null;

			return this.customers.filter(x=>x.id==this.searchCustomer)[0].names.toUpperCase()				
		},
		conceptsFilter: function() {
            if (this.concepts == null || this.searchCustomer==null)
                return;
            return this.concepts.filter(x=> x.vep== true && x.enabled==true)			
		},
		vepsFilter: function() {
            if (this.veps == null || this.searchCustomer == null)
                return;

            var vep= this.veps.filter(				
                x => { 
                    return (x.tariff == this.searchConcept || this.searchConcept=="" || this.searchConcept==null) })					
            //Ordenos los ultimos primero
            return vep.sort((a, b) =>new Date(b.datetime) - new Date(a.datetime)) ;

		},

	},
	methods: {
		filterTag(value, row) {
			return row.tag === value;
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
     async  getCustomer(id){
        let me = this;
        await axios
            .get(this.URL_GET_CUSTOMER +id)
            .then(function(response) {
            me.customer= response.data
            })
            .catch(function(error) {
            me.showError();
            });
        },  		
        open() {
            this.formTitle = "Alta de VEP";
            this.dialogvisible = true;
        },
        edit(n){
            this.formTitle = "Modificar de VEP";
            this.editedIndex=0;
            this.modelo.id=n.id;
            this.modelo.detail=n.detail;
            this.modelo.conceptId=n.tariff;
			this.modelo.price=n.price;            
            this.modelo.paid = n.paid;
            this.dialogvisible = true;
        },
		close(){
			this.dialogvisible = false;
            this.clean();
		},
        clean(){
            this.modelo.id="";
            this.modelo.detail="";
            this.modelo.conceptId="";
			this.modelo.price=0;
            this.editedIndex=-1;
            this.modelo.createdDate= null;
            this.modelo.paid = false;
		},
		save() {	
			//this.data.id = objeto.id;
            var mensj= null;
            if (this.editedIndex === 0)
                mensj="¿Desea modificar el VEP?";
            else
                mensj="¿Desea dar de alta el VEP?";

			this.$confirm(mensj, 'Atención', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancelar',
                type: 'warning',
                center: true
                }
			).then(() => {
				let me = this;
                me.$refs["modelo"].validate((valid) => {             
                    if (valid) {    
                        if (me.editedIndex === 0) {
                            //Modifico
                            let objeto_upd = {
                                'Id':  me.modelo.id,
                                'Detail': me.modelo.detail,
                                'Price':  me.modelo.price,
                                'Paid': me.modelo.paid,
                                'TariffId': me.modelo.conceptId
                                };
                                
                            axios.put(me.URL_UPDATE,
                                objeto_upd
                            ).then(function(response){
                                 me.close();
                                me.getTariffs();   
                                me.clean();
                                me.showOk();
                                }).catch(function(error){
                                    me.showError(error);
                            }); 
                        }
                        else
                        {
                            //Grabo
                            let objeto_add = {
                                'TariffId': me.modelo.conceptId,
                                'Detail': me.modelo.detail,
                                'Price': me.modelo.price
                            };
                            axios.post(me.URL_CREATE,
                            objeto_add
                            ).then(function(response){
                                me.close();
                                me.getTariffs();   
                                me.clean();
                                me.showOk();
                                
                            }).catch(function(error){
                                    me.showError(error);
                            });                            
                        }
                    }
                
                });
			}).catch(() => {
				me.$message({
					type: 'info',
					message: 'Cancelado'
				});
			});
		},	
		remove(objeto) {	
			this.modelo.id = objeto.id;
			this.$confirm('El VEP se eliminara permanentemente. Continua?', 'Cuidado', {
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
                     me.getTariffs();   
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
	getTariffs() {
		let me = this;
		let url = me.URL_GET_TARIFFS
		axios.get(url,{	params : {
		   	'CompanyId' : parseInt(me.companyId),
			'CustomerId' : me.searchCustomer			
			}
		})
		.then(function(response) {
		me.concepts = response.data;
        me.doVeps();
		})
		.catch(function(error) {
		me.showError();
	    });     
    }, 	

    doVeps() {
        let me = this;
        me.veps= [];
        me.concepts.forEach(element => {
            if (element.vep){
                element.veps.forEach(vep => {
                    let objeto = {
                        id: vep.id,
                        tariff: element.id,
                        concept: element.concept,
                        paid: vep.paid,
                        price: vep.price,
                        detail: vep.detail,
                        createdDate: vep.createdDate,
                        datetime: vep.datetime
                    } 
                    me.veps.push(objeto);
                }); 
            }           
        });
    },

	  handleChangeSelect() {  
          this.searchConcept = '';   
          this.concepts = null;    
          this.getTariffs();    
		
	  },
	  handleSwitch(n){
		let me = this;
        var mensj="¿Desea guardar el cambio?"

		this.$confirm(mensj, 'Atención', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancelar',
                type: 'warning',
                center: true
                }
			).then(() => {
                let objeto = {
                    'Id':  n.id,
                    'Detail': n.detail,
                    'Price':  n.price,
                    'Paid': n.paid,
                    'TariffId': n.tariff
                    };
                    
                axios.put(me.URL_UPDATE,
                    objeto
                ).then(function(response){
                    me.showOk();
                    }).catch(function(error){
                        me.showError(error);
                }); 
         }).catch(() => {
                n.paid=!n.paid;
				me.$message({
					type: 'info',
					message: 'Cancelado'
				});
			});

	  },  

	},
	created() {
				this.URL_GET= this.$route.meta.URL_GET;	
                this.URL_CREATE= this.$route.meta.URL_CREATE;	
                this.URL_UPDATE= this.$route.meta.URL_UPDATE;	
                this.URL_DELETE= this.$route.meta.URL_DELETE;	
				this.URL_GET_CUSTOMERS = this.$route.meta.URL_GET_CUSTOMERS;
				this.URL_GET_CUSTOMER = this.$route.meta.URL_GET_CUSTOMER;
				this.URL_GET_SYSTEMCUSTOM = this.$route.meta.URL_GET_SYSTEMCUSTOM;
                this.URL_GET_TARIFFS = this.$route.meta.URL_GET_TARIFFS;                
				this.companyId = parseInt( this.$store.getters.user.CompanyId);
				this.userId =  parseInt( this.$store.getters.user.Id);
				this.modelo = this.$route.meta.modelo;
				this.getCustomers();
				this.getSystemCustom();
	},
	mounted() {
	}
}
</script>

<style lang="scss">
@import '../../assets/scss/_variables';



.page-ecommerce-vep {

	.el-checkbox  {
		margin-right: 100%!important;	
	}

    .accordion {
        width: 780px!important;
    }
    
	.card-base {
		width: 100%!important;
	}

	.switch {
		padding-left: 70px;
		padding-top: 10px;
	}

	.el-tree-node__content {
		.el-checkbox {
			margin-right: 8px!important;
		}
	}
	.sidebar {
		width: 200px!important;
		margin-right: 0px;
	}

	.el-date-editor.el-input, .el-date-editor.el-input__inner {
		width: 140px!important;
	}

	.color-attr {
		color: currentColor;
	}

    .color-concept {
		color: #5f8fdf;
	}

	.el-input-number.is-without-controls .el-input__inner {
		padding-left: 15px;
		padding-right: 15px;
		color: #5f8fdf;
		background-color: transparent;
		border-color: rgba(95,143,223,.3);
		font-family: inherit;
		font-weight: 800;
		border-left: 0px;
		border-right: 0px;
		border-top: 0px;
		font-size: initial;
		border-block-width: revert;
		width: 70%;
		}

	.btnNuevoProducto {
		width: 100%;
		margin-bottom: 10px;
	}

	.label2 {
		padding-right: 3pc;
		padding-top: 3px;
	}

	.label3 {
		padding-right: 3pc;
		padding-left: 4px;
		padding-top: 3px;
	}

	.añoMes {
		margin-bottom: 37px;
	}

	#grid {
		.tui-grid-cell[data-column-name="logo"] {
			.tui-grid-cell-content {
				padding: 0px!important; 
			}
		}

		.tui-grid-border-line-top {
			background-color: transparent;
		}
		.tui-grid-cell-head {
			border-top-color: transparent;
		}
	
/*		.tui-grid-cell-head[data-column-name="mergeColumn1"] ,
		.tui-grid-cell-head[data-column-name="mergeColumn2"] ,
		.tui-grid-cell-head[data-column-name="mergeColumn3"] ,
		.tui-grid-cell-head[data-column-name="mergeColumn4"] ,
		.tui-grid-cell-head[data-column-name="mergeColumn5"] ,
		.tui-grid-cell-head[data-column-name="mergeColumn6"] {
			background: #f4f4f4;
			color: #8e8e8e;
		}*/

		.tui-grid-cell-content {
			.en-espera {
				color: #9e9e9e;
				font-weight: bold;
			}
			.ultimos {
				color: #9e9e9e;
				font-weight: bold;
			}			
			.sin-stock {
				color: #ff005c;
				font-weight: bold;
			}
			.en-stock {
				color: #1ac367;
				font-weight: bold;
			}
		}
	}
	.sidebar {
		width: 280px!important;
		margin-right: 20px;
		margin-right: 10px;
		margin-left: -10px;

		.scroller {
			padding: 10px;
			padding-top: 0px;
			width: 100%;
			height: 100%;
			box-sizing: border-box;
		}

		.widget {
			background: white;
			border-radius: 4px;
			margin-bottom: 20px;
			box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.07), 0 3px 6px 0 rgba(0, 0, 0, 0.065);
			overflow: hidden;

			&.close-filter-box {
				display: none;
				text-align: center;

				button {
					width: 100%;
					border: none;
					text-transform: uppercase;
					outline: none;
					font-family: inherit;
					font-weight: bold;
					padding: 5px 0px;
					border-bottom: 2px solid;
					background: white;
					color: $text-color-accent;
					cursor: pointer;
				}
			}

		&.payment {
			.card {
				max-width: 400px;
			}

			.el-input {
				.el-input__inner {
					background: transparentize($text-color-accent, .9);
					border: 1px solid $text-color-accent;
					border-radius: 0;
					color: $text-color;
					font-family: inherit;
				}
				.el-input__prefix {
					color: $text-color;
					left: 10px;
				}
			}

			.total {
				text-align: right;
				font-size: 16px;

				.t-row {
					& > div {
						display: inline-block;
					}
					.label {
						padding: 5px 10px;
						opacity: .6;
					}
					.value {
						padding: 5px 10px;
						min-width: 100px;
						text-align: left;
					}

					&.tot {
						& > div {
							font-size: 20px;
							opacity: 1;
							font-weight: bold;
							border-top: 1px solid $text-color;
						}
					}
				}

				button {
					background: transparentize($text-color-accent, .9);
					border: 1px solid $text-color-accent;
					border-radius: 0;
					color: $text-color-accent;
					padding: 10px;
					margin-top: 10px;
					font-family: inherit;
					font-size: 20px;
					font-weight: bold;
					width: 100%;
					max-width: 300px;
					text-align: center;
					cursor: pointer;

					&:hover {
						background: $text-color-accent;
						color: white;
					}
				}
			}

			.small-info {
				display: none;
			}
		}

			&.select-color {
				ul, li {
					padding: 0;
					list-style: none;
					margin: 0;
				}

				li {
					margin-bottom: 10px;
				}

				.color-box {
					background: transparent;
					width: 12px;
					height: 12px;
					display: inline-block;
					margin-right: 10px;
				}
			}

			.title {
				border-bottom: 1px solid rgba(0, 0, 0, 0.1);
				padding: 15px 20px;
			}
			.content {
				padding: 15px 20px;
			}
		}
	}

	.toggle-filter-box {
		padding: 10px;
		padding-top: 0px;
		text-align: right;
		display: none;

		button {
			border: none;
			text-transform: uppercase;
			outline: none;
			font-family: inherit;
			font-weight: bold;
			padding: 1px 2px;
			border-bottom: 2px solid;
			color: $text-color-accent;
			background: transparent;
			cursor: pointer;
		}
	}

	.list {
		.item {
			display: block;
			width: 25%;
			height: 400px;
			padding: 0 10px;
			padding-bottom: 20px;
			box-sizing: border-box;
			float: left;

			.wrapper {
				box-sizing: border-box;
				height: 100%;
				position: relative;
				cursor: pointer;
				transition: all .25s;

				.image {
					box-sizing: border-box;
					height: 150px;
					width: 100%;
					background-color: white;	
					padding-bottom: 10px;		

					.bg {
						background-color: white;			
						background-size: contain;
						background-repeat: no-repeat;
						background-position: center center;
						width: 100%;
						height: 100%;
					}
				}

				.detail {
					padding-top: 10px;

					.rate {
						margin-top: 10px; 

						& > div {
							margin: 0 auto;
							display: block;
							width: 120px;
						}
					}

					.name {
						text-transform: uppercase;
						font-weight: bold;
						text-align: center;
						padding: 10px;
						padding-bottom: 5px;
					}

					.desc {
						text-align: center;
						font-size: 14px;
						opacity: .5;
					}

					.price {
						text-align: center;
						font-weight: bold;
						font-size: 22px;
						padding: 10px;
						color: $text-color-accent;
					}
				}

				.buttons {
					position: absolute;
					left: 20px;
					bottom: 20px;
					right: 20px; 

					button {
						background: white;
						color: $text-color;
						border: none;
						text-transform: uppercase;
						outline: none;
						font-family: inherit;
						font-weight: bold;
						padding: 3px 7px;
					}
				}

				&:hover {
					box-shadow: 0 8px 16px 0 rgba(40, 40, 90, 0.09), 0 3px 6px 0 rgba(0, 0, 0, 0.065), 0px 10px 0px 0px $text-color-accent;
				}
			}
		}
	}
}

@media (max-width: 1400px) {
	.page-ecommerce-vep {

		.list {
			.item {
				width: 33.33%;
			}
		}
	}
}


@media (max-width: 1100px) {
	.page-ecommerce-vep {

		.list {
			.item {
				width: 50%;
			}
		}
	}
}



@media (max-width: 900px) {
	.page-ecommerce-vep {

		.sidebar {
			width: 200px;
		}

	}
}

@media (max-width: 768px) {
	.page-ecommerce-vep {

		.sidebar {
			width: 280px;
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			margin: 0;
			z-index: 999;
			transform: translateX(-100%);
			transition: all .25s;
			background: white;

			.scroller {				
				padding: 15px;
				padding-top: 20px;
			}

			.widget {
				&.close-filter-box {
					display: block;
				}
			}

			&.open {
				transform: translateX(0%);
				box-shadow: 3px 0px 10px -3px rgba(0, 0, 0, 0.4);
				border-top-left-radius: 4px;
				border-top-right-radius: 4px;
			}
		}

		.toggle-filter-box {
			display: block;
		}

	}
}

@media (max-width: 480px) {
	.page-ecommerce-vep {

		.list {
			.item {
				width: 100%;
			}
		}
	}
}

</style>