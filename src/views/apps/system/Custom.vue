<template>
	<vue-scroll class="page-custom">
        <el-form :inline="true" :model="modelo" class="demo-form-inline">        		
            <div class="widget shipping card-shadow--small b-rad-4">
                <div class="title">
                    Configuracion de Venta rápida
                </div>
                <div class="content">                    
					<el-row>
						<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="10">	
							<div class="flex justify-space-between margen-top-10 label-arriba margen-boton-25-less">					
								<el-form-item label="Cliente predeterminado">
								<el-select 
									v-model="modelo.customerId" 
									size="mini"
                                    clearable 
									placeholder="Seleccione" 
									filterable
									:no-match-text="datoNoEncontrado"
									:no-data-text= "noHayDatos">
									<el-option v-for="item in customers" :key="item.id" :label="item.names" :value="item.id"></el-option>
								</el-select>
								</el-form-item>
							</div>
						</el-col>					
					</el-row>	
					<el-row>
						<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="10">	
							<div class="flex justify-space-between margen-top-10 label-arriba margen-boton-25-less">					
								<el-form-item label="Tipo de Comprobante predeterminado">
								<el-select 
									v-model="modelo.voucherType" 
									size="mini"
                                    clearable 
									placeholder="Seleccione" 
									filterable
									:no-match-text="datoNoEncontrado"
									:no-data-text= "noHayDatos">
									<el-option v-for="item in voucherTypes" :key="item.id" :label="item.description" :value="item.id"></el-option>
								</el-select>
								</el-form-item>
							</div>
						</el-col>					
					</el-row>		

					<el-row>
						<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="10">	
							<div class="flex justify-space-between margen-top-10 label-arriba margen-boton-25-less">					
								<el-form-item label="Condición de pago predeterminada">
								<el-select 
									v-model="modelo.paymentMethodId" 
									size="mini"
                                    clearable 
									placeholder="Seleccione" 
									filterable
									:no-match-text="datoNoEncontrado"
									:no-data-text= "noHayDatos">
									<el-option v-for="(i, index) in paymentMethods" :key="index" :label="i.description" :value="i.id"></el-option>
								</el-select>
								</el-form-item>
							</div>
						</el-col>					
					</el-row>	
					<el-row>
						<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="10">	
							<div class="flex justify-space-between margen-top-10 label-arriba margen-boton-25-less">					
								<el-form-item label="Tipo de entrega predeterminado">
								<el-select 
									v-model="modelo.deliveryTypeId" 
									size="mini"
                                    clearable 
									placeholder="Seleccione" 
									filterable
									:no-match-text="datoNoEncontrado"
									:no-data-text= "noHayDatos">
									<el-option v-for="(i, index) in deliveryTypes" :key="index" :label="i.description" :value="i.id"></el-option>
								</el-select>
								</el-form-item>
							</div>
						</el-col>					
					</el-row>	
					<el-row>
						<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="10">	
							<div class="flex justify-space-between margen-top-10 label-arriba margen-boton-25-less">					
								<el-form-item label="Turno de entrega predeterminado">
								<el-select 
									v-model="modelo.deliveryTurnId" 
									size="mini"
                                    clearable 
									placeholder="Seleccione" 
									filterable
									:no-match-text="datoNoEncontrado"
									:no-data-text= "noHayDatos">
									<el-option v-for="(i, index) in deliveryTurns" :key="index" :label="i.description" :value="i.id"></el-option>
								</el-select>
								</el-form-item>
							</div>
						</el-col>					
					</el-row>																						             
                </div>
            </div>	
            <el-form-item size="large" style="float: right;">
          		<el-button type="primary" v-on:click="save">GUARDAR</el-button>
			</el-form-item>			
        </el-form>
	</vue-scroll>
</template>

<script>
import moment from 'moment'
import Chance from 'chance'
const chance = new Chance()
import axios from 'axios'
export default {
	name: 'SystemCustom',
	data () {
		return {
			modelo: null,
			customers: null,
			voucherTypes: null,
			deliveryTypes: null,
			priceLists: null,
			deliveryTurns: null,
			paymentMethods: null,
			search: '',
			datoNoEncontrado: "Dato no encontrado",
			noHayDatos: "No hay datos"           
		}
	},
	methods: {
	 getLista(lista,ruta) {
			let me = this;
			let url = ruta + parseInt(me.companyId);
			axios.get(url)
			.then(function(response) {	
			  me[lista]=response.data;
			})
			.catch(function(error) {
				me.showError();
			});
        },
    getConfiguration(id){
        let me = this;
        axios
            .get(this.URL_GET + '/'+id)
            .then(function(response) {
            me.modelo.name = response.data.name;
            me.company.contactName =response.data.contactName;
            me.company.contactLastName =response.data.contactLastName;
            me.company.initialDate =response.data.initialDate;
            me.company.email =response.data.email;
            me.company.phone =response.data.phone;
            me.company.website =response.data.website;
            me.company.address =response.data.address;
            me.company.postal =response.data.postal;
            me.company.city =response.data.city;
            me.company.state =response.data.state;
            me.company.country =response.data.country;
            me.company.schedule =response.data.schedule;
            me.company.comment =response.data.comment;
            me.company.logo =response.data.logo;
            me.company.logoName= response.data.logoName;
            me.company.id =id;
            me.company.sectors= response.data.sectors
            })
            .catch(function(error) {
            me.showError();
            });
        },        
        save()
        {
           let loadingInstance  = Loading.service({ fullscreen: true });
            let me = this;
            let objeto = {
            Id: id,
            Name: me.company.name,
            ContactName: me.company.contactName,
            ContactLastName: me.company.contactLastName,
            InitialDate: me.company.initialDate,
            Email: me.company.email,
            Phone: me.company.phone,
            Website: me.company.website,
            Address: me.company.address,
            Postal: me.company.postal,
            City: me.company.city,
            State: me.company.state,
            Country: me.company.country,
            Schedule: me.company.schedule,
            Logo: me.company.logo,
            LogoName: me.company.logoName,
            Comment: me.company.comment,
            ConfigScreens: [],
            SecurityRoles:[],
            CompanySectors: []
            }
         axios.post(this.URL_UPDATE_COMPANY, objeto)
        .then(function(response) {
          me.isOk = true;
          loadingInstance.close();
          me.avanzarStep();
          me.company.password= response.data;
        })
        .catch(function(error) {
          me.isOk = false;
          loadingInstance.close();
          me.showError();
        });  
	},
	created() {
		this.modelo = this.$route.meta.modelo;
		this.companyId = parseInt( this.$store.getters.user.CompanyId);
		this.modelo = this.$route.meta.modelo;
		this.URL_GET_CUSTOMERS= this.$route.meta.URL_GET_CUSTOMERS;
		this.URL_GET_VOUCHER_TYPE= this.$route.meta.URL_GET_VOUCHER_TYPE;
		this.URL_GET_DELIVERY_TYPE= this.$route.meta.URL_GET_DELIVERY_TYPE;
		this.URL_GET_DELIVERY_TURN= this.$route.meta.URL_GET_DELIVERY_TURN;
        this.URL_GET_PAYMENT_METHODS= this.$route.meta.URL_GET_PAYMENT_METHODS;
        this.getConfiguration(this.companyId);
		this.getLista('customers',this.URL_GET_CUSTOMERS);
		this.getLista('voucherTypes',this.URL_GET_VOUCHER_TYPE);
		this.getLista('deliveryTypes',this.URL_GET_DELIVERY_TYPE);
		this.getLista('deliveryTurns',this.URL_GET_DELIVERY_TURN);
		this.getLista('paymentMethods',this.URL_GET_PAYMENT_METHODS);
    }
  }
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.page-custom {
	.page-header {
		margin-bottom: 20px;
	}

	.margen-top-10 {
		margin-top: 10px;
	}

	.margen-top-20 {
		margin-top: 15px;
	}	

	.margen-top-40 {
		margin-top: 40px;
	}

	.product-header {
		font-weight: bold;
	}

	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}

	.el-table .error-row {
		background: #e4aeae;
	}

	.label-arriba {
		label {
			display: block;
			clear: both;
			opacity: .8;
			margin-bottom: -15px;
			font-size: 14px;
			text-align: inherit;
		}
	}
	.margen-boton-25-less {
		margin-bottom: -25px;
	}	

	.btn-delete-product {
		margin-bottom: -15px;
		margin-top: -7px;
	}

	/*.input-product {
		background: none;
		border: none;
		font-size: initial;
		padding: 0px;
    	margin-top: -10px;
	}*/

	.color-green {
		color: green;
	}

	.color-red {
		color: red;
	}

	.dialog-product{
		width: 80%;
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

		&.review {
			.items {
				.item {
					background: transparentize($text-color, .9);
					box-sizing: border-box;

					.photo {
						width: 65px;
						padding: 10px;
						background: white;

						img {
							width: 100%;
							display: block;
						}
					}

					.box {
						padding-left: 20px;
						padding-right: 20px;

						.product-name {
							font-size: 16px;
						}
						.price {
							font-size: 14px;
							margin-top: 2px;
							color: $text-color-accent;
						}
					}

					&:hover {
						.photo {
							.add-btn {
								opacity: 1;
							}
						}
					}

				}
			}
		}

		&.detail {
			.card {
				max-width: 400px;
			}

			.el-input {
				.el-input__inner {
					/*background: transparentize($text-color-accent, .9);
					border: 1px solid $text-color-accent;
					border-radius: 0;
					color: $text-color;
					font-family: inherit;*/
					color: $text-color;
					font-family: inherit;
					background: none;
					border: none;
					font-size: initial;
					padding: 0px;
					margin-top: -10px;
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

		&.payment {
			position: relative;
			border: 0px solid $text-color-accent;
			box-sizing: border-box;
			padding: 0px;
			margin-bottom: 20px;
			background: none;
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
	}
}

@media (max-width: 1100px) {
	.page-custom {

		.widget {
			&.payment {
				.info {
					display: none;
				}
				.small-info {
					display: block;
				}
			}
		}
	}
}
@media (max-width: 850px) {
	.page-custom {

		.widget {
			&.shipping {
				.content {
					& > .flex {
						display: block;
						clear: both;
						width: 100%;
					}
				}

				.info {
					display: block;
					clear: both;
					width: 100%;
					margin: 0;
					margin-top: 40px;
				}
				.type {
					display: block;
					clear: both;
					width: 100%;
					margin: 0;
				}
			}

			&.payment {
				.content {
					& > .flex {
						display: block;
						clear: both;
						width: 100%;
					}
				}

				.card {
					display: block;
					clear: both;
					width: 100%;
					margin: 0 auto;
					margin-top: 40px;
				}
				.total {
					display: block;
					clear: both;
					width: 100%;
					margin: 0 auto;
					margin-top: 20px;
				}
			}
		}
	}
}

@media (max-width: 450px) {
	.page-custom {

		.widget {

			&.payment {
				.total {
					font-size: 12px;

					.t-row {
						.value {
							min-width: inherit;
						}
						&.tot {
							& > div {
								font-size: 14px;
							}
						}
					}
				}
			}
		}
	}
}


</style>


