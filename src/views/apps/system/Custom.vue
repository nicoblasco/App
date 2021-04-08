<template>
	<vue-scroll class="page-custom">
        <el-form :inline="true" :model="modelo" ref="modelo" class="demo-form-inline">        		
            <div class="widget shipping card-shadow--small b-rad-4">
                <div class="title">
                    Configuracion de Sistema
                </div>
                <div class="content">                    
					<el-row>
						<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="10">	
							<div class="flex justify-space-between margen-top-10 label-arriba margen-boton-25-less">					
								<el-form-item label="Tipo de Comprobante predeterminado">
								<el-select 
									v-model="modelo.voucherTypeId" 
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
								<el-form-item label="Metodo de pago predeterminada">
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
import { Loading } from 'element-ui';
export default {
	name: 'SystemCustom',
	data () {
		return {
			modelo: null,
			companyId: null,
			paymentMethods: null,
			voucherTypes: null,
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
				debugger
				me.showError();
			});   
	 }, 
    get() {
      let me = this;
      axios
        .get(this.URL_GET+ parseInt(me.companyId))
        .then(function(response) {
			if (!response.data== null) {
				me.modelo = response.data;
			}
          		
        })
        .catch(function(error) {
          me.showError();
        });
    },	 
        save()
        {
			let loadingInstance  = Loading.service({ fullscreen: true });
			try {				
				let me = this;

				axios.put(this.URL_UPDATE, {
					'Id': me.modelo.id,
					'CompanyId': parseInt(me.companyId),
					'VoucherTypeId': me.modelo.voucherTypeId,
					'PaymentMethodId':  me.modelo.paymentMethodId
					})
				.then(function(response) {
				me.modelo.id = response.data.id;
				loadingInstance.close();
				me.showOk();
				})
				.catch(function(error) {
				loadingInstance.close();
				me.showError();
				});  
			} catch (error) {
				loadingInstance.close();
				me.showError();
			}

	}
  },
	created() {		
		this.companyId = parseInt( this.$store.getters.user.CompanyId);
		this.modelo = this.$route.meta.modelo;
		this.companyId = parseInt( this.$store.getters.user.CompanyId);
		this.URL_GET_VOUCHER_TYPE= this.$route.meta.URL_GET_VOUCHER_TYPE;
		this.URL_GET= this.$route.meta.URL_GET;
		this.URL_UPDATE= this.$route.meta.URL_UPDATE;
        this.URL_GET_PAYMENT_METHODS= this.$route.meta.URL_GET_PAYMENT_METHODS;
		this.getLista('voucherTypes',this.URL_GET_VOUCHER_TYPE);
		this.getLista('paymentMethods',this.URL_GET_PAYMENT_METHODS);
		this.get();
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


