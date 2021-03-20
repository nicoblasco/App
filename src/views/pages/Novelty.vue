<template>
	<div class="page-ecommerce-products flex">
		
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
						<div class="añoMes">
							<el-col class="label2" :span="3"> 
								Año 
							</el-col>
							<el-col :span="18">
								<el-input-number size="mini" :min="2000" :max="2100" v-model="year" @change="handleChangeDate"></el-input-number>					
							</el-col>
							<el-col class="label2" :span="3"> 
								Mes 
							</el-col>
							<el-col :span="18">
								<el-input-number size="mini" :min="1" :max="12"  v-model="month" @change="handleChangeDate" ></el-input-number>					
							</el-col>						
						</div>
						<div class="cliente-concepto">
							<el-input size="mini" placeholder="CLIENTE" v-model="searchCustomer"  clearable> </el-input>
							<!-- <div style="margin: 10px 0;"></div>
							<el-input size="mini" placeholder="CONCEPTO" v-model="searchConcept"  clearable> </el-input> -->
						</div>
					</div>
				</div>				
				<div class="widget select-color">
					<div class="title">Clientes</div>
                        <!-- <el-input
                            placeholder="buscar"
                            prefix-icon="el-icon-search"
                            size="mini"
                            v-model="filterText">  
                        </el-input>                      -->
					<div class="content">                     
						<el-checkbox :indeterminate="isIndeterminateCustomer" v-model="checkAllCustomers" @change="handleCheckAllCustomersChange">Marcar todos</el-checkbox>                        
						<div style="margin: 15px 0;"></div>
						<el-checkbox-group v-model="checkedCustomers" @change="handleCheckedCustomersChange">
							<el-checkbox v-for="b in customers" :label="b.id" :key="b.id">{{b.names}}</el-checkbox>
						</el-checkbox-group>
					</div>
				</div>
				<!-- <div class="widget select-color">
					<div class="title">Conceptos</div>
                      <el-input
                            placeholder="buscar"
                            prefix-icon="el-icon-search"
                            size="mini"
                            v-model="filterText">  
                        </el-input>                       
					<div class="content">
						<el-checkbox :indeterminate="isIndeterminateConcept" v-model="checkAllConcepts" @change="handleCheckAllConceptsChange">Marcar todos</el-checkbox>
						<div style="margin: 15px 0;"></div>
						<el-checkbox-group v-model="checkedConcepts" @change="handleCheckedConceptsChange">
							<el-checkbox v-for="b in concepts" :label="b.id" :key="b.id">{{b.description}}</el-checkbox>
						</el-checkbox-group>
					</div>
				</div>	 -->
				<div class="widget close-filter-box">
					<button @click="sidebarOpen = false">
						close filter
					</button>
				</div>
			</vue-scroll>
		</div>

		<div class="list-container box grow flex column">
	   		<vue-scroll class="table-box card-base card-outline">
				<table class="styled striped hover">
					<tbody>										
						<tr v-for="cliente in noveltiesFilter" :key="cliente.customerId">
							<el-row :gutter="20" >
								<el-col :span="22" :offset="1">
									<h3 class="bg-accent-lighter b-rad-14" style="padding: 8px;">
										{{cliente.customerName}}
									</h3>
								</el-col>
							</el-row>

							<div v-for="tarifa in cliente.novelties" :key="tarifa.tariffId">																
								<el-row :gutter="20" v-if="tarifa.tariffEnabled">										
									<el-col :span="8" :offset="3">
										<div class="item-box item-product">
											<h4 class="color-concept">{{tarifa.concept.description}}</h4>
										</div>												
									</el-col>																	
									<el-col :span="1" :offset="3">
										<div class="item-box item-product">
											<div>												
												<el-input-number
													v-model="tarifa.price" 
													:precision="2" 
													:controls="false"
													:min="0"
													:disabled="noveltyDisabled(tarifa) ">
												</el-input-number>
											</div>
										</div>												
									</el-col>
								
									<el-col :span="1" :offset="6">
										<el-switch
											v-model="tarifa.noveltyEnabled"
											active-color="#13ce66"
											inactive-color="#ff4949"
											:disabled="tarifa.hasPaidPartial">
										</el-switch>
									</el-col>
								</el-row>
							</div>
						</tr>
					</tbody>
				</table>
			</vue-scroll> 

       		<el-button v-if="noveltiesFilter!=null" type="primary" v-on:click="save">GUARDAR</el-button>

		</div>	
	</div>
</template>

<script>
import 'tui-grid/dist/tui-grid.min.css'
import axios from 'axios'
import { Loading } from 'element-ui';

export default {
	name: 'Novelties',
	data () {
		return {			
		    grid: null,
			gridData: [],
			resizing: false,
			height: 300,
			sidebarOpen: false,
			customers:null,
			concepts:null,
			searchCustomer: null,
			searchConcept: null,
			allownew: false,
			checkAllCustomers: false,
			checkedCustomers: [],
			isIndeterminateCustomer: true,
			checkAllConcepts: false,
			checkedConcepts: [],
			isIndeterminateConcept: true,            
			dialogvisible: false,
			modelo: null,
			novelties: null,
            filterText: null,
			month: new Date().getMonth()+1,
			year: new Date().getFullYear()
		}
	},
	computed: {
		noveltiesFilter: function() {			
		let cliente = null;
		let concepto = null;
		if (this.novelties == null)
			return;

		if (this.searchCustomer!=null)
		{
			cliente=this.searchCustomer.toUpperCase();
		}
		if (this.searchConcept!=null)
		{
			concepto=this.searchConcept.toUpperCase();
		}		
		return this.novelties.filter(				
			x => { 
				return (x.customerName.includes(cliente) || cliente==null) 		
				&& (this.checkedCustomers.length==0 || this.checkedCustomers.includes(x.customerId))
			//	&& (x.novelties.concepts.includes(concepto) || concepto==null)
			// x => { 
			// 	return (x.customerName.includes(cliente) || cliente==null) 
			// 	 && (x.name.includes(concepto) || concepto==null)
			// 	&& (this.checkedCustomers.length==0 || this.checkedCustomers.includes(x.customerId) )
            //     && (this.checkedConcepts.length==0 || this.checkedConcepts.includes(x.conceptId) )

			})			
		}
	},
	methods: {

		filterTag(value, row) {
			return row.tag === value;
		},	
		noveltyDisabled(tarifa) {	
			if (tarifa.hasPaidPartial)
				return tarifa.hasPaidPartial;		

			if (!tarifa.noveltyEnabled)
				return true;
			else
				return false;
		},				
		getNovelties() {
			let me = this;
			let url = me.URL_GET_NOVELTIES;
			axios.get(url,{	params : {
			   	'CompanyId' : parseInt(me.companyId),
				'Year' : me.year,
				'Month': me.month				
				}
			})
			.then(function(response) {
				me.novelties = response.data;
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

		save(){	
		  let me = this;	  		  	  
		  let lista = '';
		  
		  this.$confirm('¿Desea guardar los datos?', 'Atención', {
			confirmButtonText: 'OK',
			cancelButtonText: 'Cancelar',
			type: 'warning',
			center: true
			}
			).then(() => {
				let loadingInstance  = Loading.service({ fullscreen: true });
				try {			
					
					lista = {
						'CompanyId': me.companyId,
						'SecurityUserId': me.userId,
						'Year': parseInt( me.year),
						'Month': parseInt( me.month),	
						'Novelties': []
					}

					me.novelties.forEach(customers=> {
						customers.novelties.forEach(novelty => {
							let objeto = [];
							if (novelty.tariffEnabled) {								
									objeto =  {
									'TariffId': novelty.tariffId,
									'Price':novelty.price,
									'Enabled':novelty.noveltyEnabled,
								}
								lista.Novelties.push(objeto);
							} 

						});
						
					});											

					axios.post(this.URL_CREATE_NOVELTIES,
					lista
					).then(function(response){
						loadingInstance.close();
						me.showOk();
						
						
					}).catch(function(error){
						loadingInstance.close();
						me.showError(error);
					});
				} catch (error) {
					loadingInstance.close();
					me.showError(error);
				}
	
				}).catch(() => {
					loadingInstance.close();
				this.$message({
					type: 'info',
					message: 'Cancelado'
				});

			});
		
			
		},									
		//CHECKBOX -INI
      handleCheckAllCustomersChange(val) {
	
		this.checkedCustomers=[];
		if (val)
		{
			this.customers.forEach(element => {
				this.checkedCustomers.push(element.id);
			});
		}

		 this.isIndeterminateBrand = false;
      },
      handleCheckedCustomersChange(value) {
        let checkedCount = value.length;
        this.checkAllCustomers = checkedCount === this.customers.length;
        this.isIndeterminateCustomer = checkedCount > 0 && checkedCount < this.customers.length;
	  }	,

      handleCheckAllConceptsChange(val) {
		this.checkedConcepts=[];
		if (val)
		{
			this.concepts.forEach(element => {
				this.checkedConcepts.push(element.id);
			});
		}

		 this.isIndeterminateProviders = false;
      },
      handleCheckedConceptsChange(value) {
        let checkedCount = value.length;
        this.checkAllConcepts = checkedCount === this.concepts.length;
        this.isIndeterminateConcepts = checkedCount > 0 && checkedCount < this.brands.length;
	  },

	  handleChangeDate() {
		  this.getNovelties();
	  }
	  
	},
	created() {
				this.URL_GET= this.$route.meta.URL_GET;	
				this.URL_GET_NOVELTIES= this.$route.meta.URL_GET_NOVELTIES;	
				this.URL_GET_CUSTOMERS = this.$route.meta.URL_GET_CUSTOMERS;
				this.URL_GET_CONCEPTS = this.$route.meta.URL_GET_CONCEPTS;
				this.URL_CREATE_NOVELTIES = this.$route.meta.URL_CREATE_NOVELTIES;
				this.companyId = parseInt( this.$store.getters.user.CompanyId);
				this.userId =  parseInt( this.$store.getters.user.Id);
				this.modelo = this.$route.meta.modelo;
				this.getCustomers();
				this.getConcepts();
				this.getNovelties();			
	},
	mounted() {
	}
}
</script>

<style lang="scss">
@import '../../assets/scss/_variables';


.el-checkbox  {
	margin-right: 100%!important;	
}

.el-tree-node__content {
	.el-checkbox {
		margin-right: 8px!important;
	}
}

.color-concept {
	color: currentColor;
}

.cliente-concepto {
    margin-top: 55px;
    padding-top: 10px;
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
    font-size: larger;
	border-block-width: revert;
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

.page-ecommerce-products {
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
		width: 300px;
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
	.page-ecommerce-products {

		.list {
			.item {
				width: 33.33%;
			}
		}
	}
}


@media (max-width: 1100px) {
	.page-ecommerce-products {

		.list {
			.item {
				width: 50%;
			}
		}
	}
}



@media (max-width: 900px) {
	.page-ecommerce-products {

		.sidebar {
			width: 200px;
		}

	}
}

@media (max-width: 768px) {
	.page-ecommerce-products {

		.sidebar {
			width: 230px;
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
	.page-ecommerce-products {

		.list {
			.item {
				width: 100%;
			}
		}
	}
}

</style>


