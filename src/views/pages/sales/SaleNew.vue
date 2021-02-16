<template>
	<vue-scroll class="page-ecommerce-checkout">
        <el-form :inline="true" :model="modelo" class="demo-form-inline">        		
            <div class="widget shipping card-shadow--small b-rad-4">
                <div class="title">
                    Datos del comprobante
                </div>
                <div class="content">                    
					<el-row>
						<el-col :xs="24" :sm="24" :md="12" :lg="5" :xl="5">	
							<div class="flex justify-space-between margen-top-10 label-arriba margen-boton-25-less">					
								<el-form-item label="Cliente">
								<el-select 
									v-model="modelo.customerId" 
									size="mini"
									placeholder="Seleccione" 
									filterable
									:no-match-text="datoNoEncontrado"
									:no-data-text= "noHayDatos">
									<el-option v-for="item in customers" :key="item.id" :label="item.names" :value="item.id"></el-option>
								</el-select>
								</el-form-item>
							</div>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="5" :xl="5">	
							<div class="flex justify-space-between margen-top-10 label-arriba margen-boton-25-less">
								<el-form-item label="Tipo de Comprobante">
								<el-select 
									v-model="modelo.voucherType" 
									size="mini"
									placeholder="Seleccione" 
									filterable
									:no-match-text="datoNoEncontrado"
									:no-data-text= "noHayDatos"		
								>
									<el-option v-for="item in voucherTypes" :key="item.id" :label="item.description" :value="item.id"></el-option>
								</el-select>
								</el-form-item>
							</div>	
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="5" :xl="5">	
							<div class="flex justify-space-between margen-top-10 label-arriba margen-boton-25-less">
								<el-form-item label="Fecha">
									<el-date-picker
									v-model="modelo.datetime"
									size="mini"
									type="datetime"
									placeholder="Seleccione la fecha"
									:picker-options="pickerOptions">
									</el-date-picker>
								</el-form-item>		
							</div>										
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="5" :xl="5">	
							<div class="flex justify-space-between  margen-top-10 label-arriba margen-boton-25-less">					
								<el-form-item label="Condición de pago">
								<el-select 
									v-model="modelo.paymentId" 
									size="mini"
									placeholder="Seleccione" 
									filterable
									:no-match-text="datoNoEncontrado"
									:no-data-text= "noHayDatos"		
								>
									<el-option v-for="(i, index) in paymentMethods" :key="index" :label="i.description" :value="i.id"></el-option>
								</el-select>
								</el-form-item>
							</div>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="4" :xl="4">	
							<div class="flex justify-space-between  margen-top-10 label-arriba margen-boton-25-less">											
								<el-form-item label="Lista de precio">
								<el-select 
									v-model="modelo.priceListId" 
									size="mini"
									placeholder="Seleccione" 
									filterable
									:no-match-text="datoNoEncontrado"
									:no-data-text= "noHayDatos"		
								>
									<el-option v-for="(i, index) in priceLists" :key="index" :label="i.description" :value="i.id"></el-option>
								</el-select>
								</el-form-item>
							</div>
						</el-col>						
					</el-row>
					<el-row>
						<el-col :xs="24" :sm="24" :md="12" :lg="10" :xl="10">	
							<div class="flex label-arriba">					
								<el-form-item label="Dirección">
									<el-input v-model="modelo.address" size="mini" style="width: 240%"></el-input>
								</el-form-item>
							</div>
						</el-col>
						<el-col :xs="24" :sm="24" :md="12" :lg="5" :xl="5">	
							<div class="flex label-arriba">										
								<el-form-item label="Tipo de entrega">
								<el-select 
									v-model="modelo.deliveryTypeId" 
									size="mini"
									placeholder="Seleccione" 
									filterable
									:no-match-text="datoNoEncontrado"
									:no-data-text= "noHayDatos"		
								>
									<el-option v-for="(i, index) in deliveryTypes" :key="index" :label="i.description" :value="i.id"></el-option>
								</el-select>
								</el-form-item>		
							</div>										
						</el-col>						
						<el-col :xs="24" :sm="24" :md="6" :lg="5" :xl="5">	
							<div class="flex  label-arriba">		
								<el-form-item label="Fecha de entrega">									
									<el-date-picker
									size="mini"
									v-model="modelo.deliveryDate"
									type="date"
									placeholder="Pick a day"
									:picker-options="pickerOptions">
									</el-date-picker>
								</el-form-item>
							</div>
						</el-col>
						<el-col :xs="24" :sm="24" :md="6" :lg="4" :xl="4">	
							<div class="flex justify-space-between label-arriba margen-boton-25-less">										
								<el-form-item label="Turno de entrega">
								<el-select 
									v-model="modelo.turnId" 
									size="mini"
									placeholder="Seleccione" 
									clearable
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

            <div class="widget review card-shadow--small b-rad-4">
                <div class="title">
                    Detalle del comprobante
                </div>
                <div class="content">
					<el-row>
						<el-col :xs="24" :sm="24" :md="4" :lg="2" :xl="2">	
							<div class="flex  margen-top-10 label-arriba margen-boton-25-less">					
								<el-form-item label="Código">
									<el-select
										v-model="modelo.code"
										size="mini"
										filterable
										remote
										reserve-keyword
										placeholder="Please enter a keyword">
										<el-option
										v-for="item in products"
										:key="item.id"
										:label="item.codigo"
										:value="item.id">
										</el-option>										
									</el-select>									
								</el-form-item>																
							</div>							
						</el-col>
						<el-col :xs="24" :sm="24" :md="4" :lg="1" :xl="1">	
							<div class="flex justify-space-between margen-top-40">
								<el-button type="primary" icon="el-icon-search" circle size="mini"  @click="openDialogProduct()"></el-button>
							</div>
						</el-col>
						<el-col :xs="24" :sm="24" :md="8" :lg="6" :xl="6">	
							<div class="flex margen-top-10 label-arriba margen-boton-25-less">
								<el-form-item label="Producto">
									<el-select
										v-model="modelo.product"
										size="mini"
										filterable
										remote
										reserve-keyword
										style="width: 120%"
										placeholder="Ingrese el producto">
										<el-option
										v-for="item in products"
										:key="item.id"
										:label="item.name"
										:value="item.name">
										</el-option>
									</el-select>
								</el-form-item>
							</div>	
						</el-col>
						<el-col :xs="24" :sm="24" :md="4" :lg="1" :xl="1">	
							<div class="flex margen-top-40">
								<el-button type="primary" icon="el-icon-search" circle size="mini"></el-button>
							</div>
						</el-col>						
						<el-col :xs="24" :sm="24" :md="4" :lg="2" :xl="2">	
							<div class="flex margen-top-10 label-arriba margen-boton-25-less">
								<el-form-item label="Cantidad">
									<el-input v-model="modelo.quantity" size="mini" ></el-input>
								</el-form-item>
							</div>										
						</el-col>
						<el-col :xs="24" :sm="24" :md="4" :lg="3" :xl="3">	
							<div class="flex justify-space-between margen-top-10 label-arriba margen-boton-25-less">
								<el-form-item label="Precio">
									<el-input v-model="modelo.price" size="mini" ></el-input>
								</el-form-item>
							</div>										
						</el-col>
						<el-col :xs="24" :sm="24" :md="4" :lg="2" :xl="2">	
							<div class="flex justify-space-between margen-top-10 label-arriba margen-boton-25-less">
								<el-form-item label="Desc.">
									<el-input v-model="modelo.discount" size="mini" ></el-input>
								</el-form-item>
							</div>										
						</el-col>						
						<el-col :xs="24" :sm="24" :md="4" :lg="3" :xl="3">	
							<div class="flex justify-space-between margen-top-10 label-arriba margen-boton-25-less">
								<el-form-item label="SubTotal">
									<el-input v-model="modelo.subtotal" size="mini" ></el-input>
								</el-form-item>
							</div>										
						</el-col>	
						<el-col :xs="24" :sm="24" :md="4" :lg="3" :xl="3">	
							<div class="flex justify-space-between margen-top-10 label-arriba margen-boton-25-less">
								<el-form-item label="Total">
									<el-input v-model="modelo.total" size="mini" ></el-input>
								</el-form-item>
							</div>										
						</el-col>	
						<el-col :xs="24" :sm="24" :md="4" :lg="1" :xl="1">	
							<div class="flex margen-top-40">
								<el-button type="primary" icon="el-icon-plus" circle size="mini" @click="addProduct"></el-button>
							</div>
						</el-col>																							
					</el-row>
                </div>
				<el-dialog title="Productos" :visible.sync="dialogProductVisible" width="80%">
					<el-table :data="products.filter(x => !search || x.name.toLowerCase().includes(search.toLowerCase())|| x.codigo.toLowerCase().includes(search.toLowerCase()))" 
						@selection-change="handleSelectionChange" 
						:default-sort = "{prop: 'name', order: 'ascending'}"
						height="400"

						:row-class-name="tableRowClassName">
					    <el-table-column type="selection" width="30"></el-table-column>
						<el-table-column property="codigo" label="Codigo" width="90" sortable fixed></el-table-column>
						<el-table-column property="name" label="Producto" width="200" sortable fixed></el-table-column>
						<el-table-column property="stock" label="Stock" width="70" ></el-table-column>
						<el-table-column property="price" label="Precio" width="70"></el-table-column>
						<el-table-column property="brand" label="Marca" width="150"></el-table-column>
						<el-table-column property="category" label="Rubro" width="150"></el-table-column>
						<el-table-column property="subCategory" label="SubRubro" width="150"></el-table-column>
						<el-table-column
							sortable
							prop="status"
							label="Estado"
							width="120"
							:filters="[{ text: 'En Stock', value: 'En Stock' }, { text: 'Sin Stock', value: 'Sin Stock' }, { text: 'En Espera', value: 'En Espera' }, { text: 'Ultimos', value: 'Ultimos' }]"
							:filter-method="filterTag"
							filter-placement="bottom-end">				
							<template slot-scope="scope">
								<el-tag
								:type="scope.row.status === 'En Stock' ? 'success' : (scope.row.status === 'Sin Stock'? 'danger': 'warning' ) "
								disable-transitions>{{scope.row.status}}</el-tag>
							</template>	
						</el-table-column>
						<el-table-column align="left" width="200">
							<template slot="header">
								<el-input
								v-model="search"
								size="mini"
								placeholder="Buscar"/>
							</template>	
						</el-table-column>					
					</el-table>
					<span slot="footer" class="dialog-footer">
						<el-button @click="dialogProductVisible = false">Cancelar</el-button>
						<el-button type="primary" @click="pushSaleDetail()">Agregar</el-button>
					</span>
				</el-dialog>
            </div>
        
            <div class="widget detail card-shadow--small b-rad-4">
                <div class="title">
                    Detalle de la venta
                </div>
                <div class="content">
					<div class="margen-top-20"> 
						<el-row class="product-header">
							<el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
								<span> Código </span>
							</el-col>
							<el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
								<span> Producto </span>
							</el-col>	
							<el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
								<span> Cantidad </span>
							</el-col>
							<el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
								<span> Precio </span>
							</el-col>
							<el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
								<span> Desc. </span>
							</el-col>
							<el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
								<span> Subtotal </span>
							</el-col>		
							<el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
								<span> Total </span>
							</el-col>																																							
						</el-row>						
						<div v-for="(c,index) in sale_details" :key="index">
							<el-row>
								<el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
									<span> {{c.code}} </span>
								</el-col>
								<el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7">
									<span> {{c.product}} </span>
								</el-col>	
								<el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
									<el-input class="input-product" v-model="c.quantity" size="mini"></el-input>
								</el-col>
								<el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
									<el-input v-model="c.price" size="mini" class="input-product" ></el-input>
								</el-col>
								<el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
									<el-input v-model="c.discount" size="mini" class="input-product" ></el-input>
								</el-col>
								<el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
									<span> {{c.subtotal}} </span>
								</el-col>		
								<el-col :xs="3" :sm="3" :md="3" :lg="2" :xl="2">
									<span> {{c.total}} </span>
								</el-col>
								<!-- <el-col :xs="1" :sm="1" :md="2" :lg="2" :xl="2">	
									<div>
										  <el-link><i class="el-icon-edit el-icon--right color-green"></i> </el-link>
										  <el-link><i class="el-icon-delete el-icon--right color-red"></i> </el-link>
									</div>
								</el-col>									 -->
							</el-row>
						</div>
					</div>
                </div>
            </div>
			<div class="widget payment card-shadow--small pay">
				<div class="content">
				<div class="flex justify-space-between">
					<div class="box grow mt-40 pr-30 info">
						<!-- <h3 class="m-0 mb-10">General Info</h3> -->
					</div>

					<div class="box grow flex column mt-40 card">
						<!-- <h3 class="m-0 mb-10">Credit Card</h3> -->
						<el-row :gutter="20" class="fs-20">
						</el-row>
					</div>

					<div class="box grow mt-40 total">
						<div class="t-row">
							<div class="label">Total</div>
							<div class="value">$ 1000</div>
						</div>
						<div class="t-row">
							<div class="label">Descuento</div>
							<div class="value">$ 100,00</div>
						</div>
						<div class="t-row tot">
							<div class="label">Total a Pagar</div>
							<div class="value">$ 1000</div>
						</div>
						<button>Confirmar</button>
					</div>
				</div>
			</div>

		</div>			
        </el-form>
	</vue-scroll>
</template>

<script>
import moment from 'moment'
import Chance from 'chance'
const chance = new Chance()
import axios from 'axios'
export default {
	name: 'EcommerceCheckout',
	data () {
		return {
			modelo: null,
			customers: null,
			voucherTypes: null,
			deliveryTypes: null,
			priceLists: null,
			deliveryTurns: null,
			paymentMethods: null,
			products: [],
			sale_details: [],
			multipleSelection: [],
			dialogProductVisible: false,
			search: '',
			datoNoEncontrado: "Dato no encontrado",
			noHayDatos: "No hay datos",			
			pickerOptions: {
				shortcuts: [{
					text: 'Hoy',
					onClick(picker) {
					picker.$emit('pick', new Date());
					}
				}, {
					text: 'Ayer',
					onClick(picker) {
					const date = new Date();
					date.setTime(date.getTime() - 3600 * 1000 * 24);
					picker.$emit('pick', date);
					}
				}, {
					text: 'Semana pasada',
					onClick(picker) {
					const date = new Date();
					date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
					picker.$emit('pick', date);
					}
				}]
			},            
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
      handleSelectionChange(val) {
        this.multipleSelection = val;
	   },		
	  filterTag(value, row) {
			return row.tag === value;
		},	   
	   tableRowClassName({row, rowIndex}) {
        if (row.stock > row.stockMin && row.stock >0) {
          return 'success-row';
		} 
		if (row.stock ===0)
		{
			return 'error-row'
		}
		else
		{
			return 'warning-row'
		}

        return '';
	   },
	    pushSaleDetail() {
		 	this.dialogProductVisible = false;
			this.addProductFromGrid();
		},
		addProductFromGrid() {
			let me = this;
			let objeto = null; 
			me.multipleSelection.forEach(element => {				
				me.objeto= {
				code: element.codigo,
				product: element.name,
				quantity: 1,
				price: element.price,
				discount: 0,
				subtotal: element.price,
				total: element.price
				}
				me.sale_details.push(me.objeto);
			});			
			me.clearProduct();
		},
		addProduct() {
			let me = this;
			let objeto = null; 
			me.objeto= {
			   code: me.modelo.code,
			   product: me.modelo.product,
			   quantity: me.modelo.quantity,
			   price: me.modelo.price,
			   discount: me.modelo.discount,
			   subtotal: me.modelo.subtotal,
			   total: me.modelo.total
			}
			me.sale_details.push(me.objeto);
			me.clearProduct();
		},
		openDialogProduct() {
			this.getLista('products',this.URL_GET_PRODUCTS);
			this.dialogProductVisible=true;
		},
		clearProduct(){
			   this.modelo.code= null;
			   this.modelo.product= null;
			   this.modelo.quantity= null;
			   this.modelo.price= null;
			   this.modelo.discount= null;
			   this.modelo.subtotal= null;
			   this.modelo.total= null;			
		}

	},
	created() {
		this.modelo = this.$route.meta.modelo;
		this.companyId = parseInt( this.$store.getters.user.CompanyId);
		this.modelo = this.$route.meta.modelo;
		this.URL_GET_CUSTOMERS= this.$route.meta.URL_GET_CUSTOMERS;
		this.URL_GET_PRODUCTS= this.$route.meta.URL_GET_PRODUCTS;
		this.URL_GET_VOUCHER_TYPE= this.$route.meta.URL_GET_VOUCHER_TYPE;
		this.URL_GET_DELIVERY_TYPE= this.$route.meta.URL_GET_DELIVERY_TYPE;
		this.URL_GET_PRICE_LIST= this.$route.meta.URL_GET_PRICE_LIST;
		this.URL_GET_DELIVERY_TURN= this.$route.meta.URL_GET_DELIVERY_TURN;
		this.URL_GET_PAYMENT_METHODS= this.$route.meta.URL_GET_PAYMENT_METHODS;
		this.getLista('customers',this.URL_GET_CUSTOMERS);
		this.getLista('products',this.URL_GET_PRODUCTS);
		this.getLista('voucherTypes',this.URL_GET_VOUCHER_TYPE);
		this.getLista('deliveryTypes',this.URL_GET_DELIVERY_TYPE);
		this.getLista('priceLists',this.URL_GET_PRICE_LIST);
		this.getLista('deliveryTurns',this.URL_GET_DELIVERY_TURN);
		this.getLista('paymentMethods',this.URL_GET_PAYMENT_METHODS);
	}
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.page-ecommerce-checkout {
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
	.page-ecommerce-checkout {

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
	.page-ecommerce-checkout {

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
	.page-ecommerce-checkout {

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


