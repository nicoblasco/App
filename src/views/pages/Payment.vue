<template>
	<div class="page-ecommerce-payments flex">		
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
							<span>Año / Mes</span>
							<el-date-picker
							v-model="añoMes"
							type="month"
							placeholder="Seleccione..."
							size="mini"
							width
							@change="handleChangeDate">
							</el-date-picker>				
						</div>
						<div class="cliente-concepto">
							<span>Cliente</span>							
                              <el-select  size="mini" v-model="searchCustomer" filterable placeholder="Seleccione" @change="handleChangeSelect">
                                <el-option v-for="(i, index) in customers" :key="index" :label="i.names" :value="i.id"></el-option>
                            </el-select>
						</div>
					</div>
				</div>	
				<div class="widget select-color"  v-if="hasData">
					<div class="title">Detalle Pago</div>
					<div class="content">                     
						<el-row>
							<label>Medio de Pago</label>
							<el-select  size="mini" v-model="paymentMethod" filterable placeholder="Seleccione...">
								<el-option v-for="(i, index) in paymentMethods" :key="index" :label="i.description" :value="i.id"></el-option>
							</el-select>
						</el-row>
						<el-row style="padding: 20px 0px 20px">
							<div class="box self-flex-end">
							<label class="font-weight-800 black-text ">
								TOTAL:<span class="accent-text"> $ {{total}}</span>
							</label>
						</div>
						</el-row>
						<el-row style="padding-left: 20px">
							<el-button type="primary" plain :disabled="total==0" v-on:click="save">PAGAR</el-button>
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
								<el-col :span="22" :offset="1">
									<h3 class="bg-accent-lighter b-rad-14" style="padding: 8px;">
										{{customerName}}
									</h3>
								</el-col>
							</el-row>	
							<el-row :gutter="20">										
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
											<span>PENDIENTE</span>
										</div>												
									</el-col>
									<el-col :span="1" :offset="3">
										<div class="item-box item-product">
											<span>PAGA</span>
										</div>												
									</el-col>																						
							</el-row>													
							<tr v-for="n in novelties" :key="n.noveltyId">																
									<el-row :gutter="20">										
										<el-col :span="4" :offset="1">
											<div class="item-box item-product">
												<h4 class="color-concept">{{n.concept}}</h4>
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
										<el-col :span="1" :offset="2">
											<div class="item-box item-product">
												<h4 class="color-concept">{{n.remainder-n.amount}}</h4>
											</div>												
										</el-col>																																																	
										<el-col :span="1" :offset="2">
											<div class="item-box item-product">
												<div>												
													<el-input-number
														v-model="n.amount" 
														:precision="2" 
														:controls="false"
														:value="0"
														:min="0">
													</el-input-number>
												</div>
											</div>												
										</el-col>
										<el-col :span="1" :offset="1">
											<div class="item-box item-product switch">
												<el-switch
													v-model="n.copy"
													active-color="#13ce66"
													inactive-color="#ff4949"
													@change="handleSwitch(n)">
												</el-switch>
											</div>
										</el-col>							
									</el-row>
							</tr>
							<span v-if="!hasData">No hay datos</span>
						</tbody>
					</table>
				
				
			</div>	
		</vue-scroll> 					
	</div>
</template>

<script>
import 'tui-grid/dist/tui-grid.min.css'
import axios from 'axios'
import { Loading } from 'element-ui';
import jsPDF from 'jspdf'
import 'jspdf-autotable'


export default {
	name: 'Payment',
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
			paymentMethods: null,
			paymentMethod: null,
			observation: null,
			systemCustom: null,
			searchCustomer: null,
			allownew: false,
			dialogvisible: false,
			modelo: null,
			novelties: null,
            filterText: null,
			añoMes: null,
			hasData: false,
			today: new Date().toLocaleString(),			
			companyName: null, 
			company: null
		}
	},
	computed: {
		customerName:  function(){
			if (this.searchCustomer==null)
				return null;

			return this.customers.filter(x=>x.id==this.searchCustomer)[0].names.toUpperCase()				
		},	
		total: function() {
			if (this.novelties==null)
				return;
			
			var total = 0;

			total= this.novelties.filter(x=>x.copy).reduce((acc, item) => acc + item.amount, 0);
			return Number(total.toFixed(2));

		},
		novelties_paid: function(){
			if (this.novelties==null)
				return;
			return this.novelties.filter(x=>x.amount>0);
		},
		paymentMethodDescription: function() {
			if (this.paymentMethods== null || this.paymentMethod== null)
				return

			return this.paymentMethods.filter(x=>x.id==this.paymentMethod)[0].description;
		}
	},
	methods: {
		filterTag(value, row) {
			return row.tag === value;
		},					
		getNovelties() {
			let me = this;
			let url = me.URL_GET_NOVELTIES;
			let year= null;
			let month = null;

			if (me.searchCustomer==null)
				return;

			 if (me.añoMes!=null)
			 {
			 	year = me.añoMes.getFullYear();
				month = me.añoMes.getMonth()+1;
			 }

			axios.get(url, {
				//Siempre va el atributos params

				params: {
			   	 'CompanyId': parseInt(me.companyId),
				 'CustomerId': parseInt(me.searchCustomer),
				 'Year': year,
				 'Month': month				
				}
			})
			.then(function(response) {
				me.novelties = response.data;
				me.hasData=response.data.length>0;
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
		save(){	
		   let me = this;	  		  	  
		   let lista = null;
		  
		   this.$prompt('¿Desea registrar el pago?. A continuación podra grabar un comentario', 'Atención', {
		 	confirmButtonText: 'OK',
		 	cancelButtonText: 'Cancelar',
		 	type: 'warning',
		 	center: true
		 	}
		 	).then(({ value }) => {
		 		let loadingInstance  = Loading.service({ fullscreen: true });
		 		try {			
					me.observation = value;
		 			lista = {
		 				'PaymentMethodId': me.paymentMethod,
		 				'Total': me.total,
		 				'SecurityUserId': me.userId,
		 				'CompanyId': me.companyId,	
						'Observation': me.observation,
		 				'Detail': []
		 			}

		 			me.novelties.forEach(n=> {
		 				let objeto = [];
		 				if (n.amount>0) {								
		 						objeto =  {
		 						'NoveltyId': n.noveltyId,
		 						'Amount':n.amount,
								'Remainder': n.remainder-n.amount
		 					}
		 				lista.Detail.push(objeto);
		 				} 						
		 			});											

		 			axios.post(this.URL_CREATE_PAYMENT,
		 			lista
		 			).then(function(response){
		 				loadingInstance.close();					
						me.print(response.data);
						
		 			}).catch(function(error){
		 				loadingInstance.close();
		 				me.showError(error);
		 			});
		 		} catch (error) {
		 			loadingInstance.close();
		 			me.showError(error);
					this.getNovelties();
		 		}
	
		 		}).catch(() => {
		 		this.$message({
		 			type: 'info',
		 			message: 'Cancelado'
		 		});

		 	});
		
			
	 },									
	  handleChangeDate() {
		  this.getNovelties();
	  },
	  handleChangeSelect() {
		  this.getNovelties();
	  },
	  handleSwitch(n){
		if (n.copy)
		  	n.amount = n.remainder;
	  },
	async print(factura){		
            await this.getCustomer(this.searchCustomer);
            let title = 'Recibo de Pago.'; 
            let name = title + " - "+this.companyName;
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

			var f = new Date();
			
            var heading2= [
                "Fecha de pago",
                f.getDate() + "-"+ f.getMonth() + 1 + "-" +f.getFullYear(),
                "N° de factura",
				factura
               // this.zeroFill(objeto.paymentId,6)
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
				{ title: "Concepto", dataKey: "concept" },
				{ title: "Año", dataKey: "year" },
				{ title: "Mes", dataKey: "month" },
                { title: "$ Precio", dataKey: "price" },
				{ title: "$ Pagó", dataKey: "amount" }
			];

            var footer = [];   
			var observation = "";
			var totalFacturado= this.calcularTotalFacturado();
			if (this.observation == null)
				observation="";
            footer.push("Método de pago: " + this.paymentMethodDescription); //1
            footer.push("Total parcial  $: "); //2
            footer.push(totalFacturado.toString()); //3
            footer.push("Descuento     %: "); //4
            footer.push("0,00"); //5
            footer.push("Total a pagar $: "); //6
            footer.push(totalFacturado.toString()); //7
            footer.push("Pagado $"); //8
            footer.push(this.total.toString()); //9
            footer.push("Observación: " + observation); //10
            footer.push("Firma"); //11
            
			try {
				this.generatePdf(name,heading,heading2,title,bodyName,body,columns,this.novelties_paid, this.logo, footer);	 			
				this.showOk();
				this.getNovelties();
			} catch (error) {
				this.getNovelties();
				me.showError(error);
				
			}
            						
		},
		calcularTotalFacturado(){
			var total=0;
			this.novelties_paid.forEach(element => {
				total += element.price;
			});
			return total;
		}	  

	},
	created() {
				this.URL_GET= this.$route.meta.URL_GET;	
				this.URL_GET_NOVELTIES= this.$route.meta.URL_GET_NOVELTIES;	
				this.URL_GET_CUSTOMERS = this.$route.meta.URL_GET_CUSTOMERS;
				this.URL_GET_CUSTOMER = this.$route.meta.URL_GET_CUSTOMER;
				this.URL_CREATE_PAYMENT = this.$route.meta.URL_CREATE_PAYMENT;
				this.URL_GET_PAYMENTMETHODS = this.$route.meta.URL_GET_PAYMENTMETHODS;
				this.URL_GET_SYSTEMCUSTOM = this.$route.meta.URL_GET_SYSTEMCUSTOM;
				this.URL_GET_COMPANY = this.$route.meta.URL_GET_COMPANY;
				this.companyId = parseInt( this.$store.getters.user.CompanyId);
				this.userId =  parseInt( this.$store.getters.user.Id);
				this.companyName = this.$store.getters.user.Nombre;
				this.logo = this.$store.getters.user.Logo;
				this.modelo = this.$route.meta.modelo;
				this.getCustomers();
				this.getNovelties();	
				this.getCompany(this.companyId);	
				this.getPaymentMethods();	
				this.getSystemCustom();
	},
	mounted() {
	}
}
</script>

<style lang="scss">
@import '../../assets/scss/_variables';



.page-ecommerce-payments {

	.el-checkbox  {
		margin-right: 100%!important;	
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

	.color-concept {
		color: currentColor;
	}

	.cliente-concepto {
		margin-top: -30px;
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
	.page-ecommerce-payments {

		.list {
			.item {
				width: 33.33%;
			}
		}
	}
}


@media (max-width: 1100px) {
	.page-ecommerce-payments {

		.list {
			.item {
				width: 50%;
			}
		}
	}
}



@media (max-width: 900px) {
	.page-ecommerce-payments {

		.sidebar {
			width: 200px;
		}

	}
}

@media (max-width: 768px) {
	.page-ecommerce-payments {

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
	.page-ecommerce-payments {

		.list {
			.item {
				width: 100%;
			}
		}
	}
}

</style>