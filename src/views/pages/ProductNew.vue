<template>

	<el-dialog :show-close="true" :custom-class="'user-dialog'" :visible="dialogvisible" @close="close">
		<el-form :model="modelo" ref="modelo" :rules="rules"  style="form-item-content">
		<vue-scroll class="page-ecommerce-new-product">
		<el-row>
			<el-col>
				<div class="item-box card-shadow--small b-rad-4">
					<el-row>
						<el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8">
							<el-row>
								<el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
									<div class="gallery-box">
										<div class="main-photo">
											<el-upload
												class="avatar-uploader"		
												ref="upload"					
												action=""	
												:show-file-list="false"		
												:on-change="uploadFile"
												:auto-upload="false">
												<img :src="modelo.logo"  alt="product logo" v-if="modelo.logo!=null">
												<img src="@/assets/images/product.png"  alt="product logo" v-else>
												<!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
											</el-upload> 
										</div>
									</div>
								</el-col>
							</el-row>
						</el-col>
						<el-col :xs="24" :sm="12" :md="12" :lg="16" :xl="16">
							<div class="detail-box">
								<el-row>
									<el-col>
										<el-form-item  prop="name">
											<input class="title" v-model="modelo.name" placeholder="Nombre del Producto">
										</el-form-item>
									</el-col>
								</el-row>
								<el-row :gutter="20">
									<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
										<div class="select-box mb-10">											
											<el-input placeholder="Código" v-model="modelo.codigo" size="small" :disabled="modelo.id>0"></el-input>
										</div>
									</el-col>
									<el-col :xs="24" :sm="12" :md="12" :lg="10" :xl="10">
										<div class="select-box mb-10">
											<el-input placeholder="Nombre Corto" v-model="modelo.nameShort" size="small"></el-input>
										</div>
									</el-col>
									<el-col :xs="24" :sm="12" :md="12" :lg="8" :xl="8">
										<div class="select-box mb-10" style="padding-top: 6px;">
											<el-switch
												v-model="modelo.checkStock"
												active-text="Usa Stock">
											</el-switch>											
										</div>
									</el-col>
								</el-row>								
								<el-row>
									<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
										<div class="number-input">
											<label>Costo ($)</label>
											<el-form-item  prop="cost"> 
												<el-input-number size="small" v-model="modelo.cost" controls-position="right" :min="0"  @change="priceRecall" class="themed mr-10 mb-10"></el-input-number>
											 </el-form-item> 
										</div>
									</el-col>
									<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
										<div class="number-input">
											<label>Ganancia (%)</label>
											<el-form-item  prop="gain"> 
												<el-input-number size="small" v-model="modelo.gain" controls-position="right" :min="0" @change="priceRecall" class="themed mr-10 mb-10"></el-input-number>
											</el-form-item>
										</div>
									</el-col>
									<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
										<div class="number-input">
											<label>Stock Minimo</label>
											<el-form-item  prop="stockMin"> 
												<el-input-number size="small" v-model="modelo.stockMin" controls-position="right" :min="0" class="themed mr-10 mb-10" :disabled="!modelo.checkStock" ></el-input-number>
											</el-form-item>
										</div>
									</el-col>
								</el-row>								
								<el-row>
									<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
										<div class="number-input">
											<label>Precio ($)</label>
											<el-form-item  prop="price"> 
												<el-input-number size="small" v-model="modelo.price" @change="priceCalc" :controls="false" :min="0" class="themed mr-10 mb-10"></el-input-number>
											</el-form-item>
										</div>
									</el-col>
									<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
										<div class="number-input">
											<label>Descuento (%)</label>
											<el-form-item  prop="discount"> 
												<el-input-number size="small" v-model="modelo.discount" controls-position="right" :min="0" class="themed mr-10 mb-10"></el-input-number>
											</el-form-item>
										</div>
									</el-col>
									<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
										<div class="number-input">
											<label>Stock</label>
											<el-form-item  prop="stock"> 
												<el-input-number size="small" v-model="modelo.stock" controls-position="right" :min="0" class="themed mr-10 mb-10" :disabled="!modelo.checkStock"></el-input-number>
											</el-form-item>
										</div>
									</el-col>
								</el-row>
								<el-row>
									<el-col class="final-price">
										precio final: <strong>$ {{finalPrice}}</strong>, descuento: <strong>$ {{discountPrice}}</strong>
									</el-col>
								</el-row>
								<el-row>
									<el-col class="description-box">
										<el-input
											type="textarea"
											v-model="modelo.description"
											size="small"
											:rows="1"
											:min-height="100"
											placeholder="Descripción">
										</el-input>
									</el-col>
								</el-row>
								<el-row  :gutter="20">
									<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
										<div class="select-box mb-10">
										<el-cascader
											v-model="modelo.categoryId"
											class="cascade"
											placeholder="Categorias..." 
											size="small" 
											:props="treeProps"          
											:options="categories"
											filterable clearable>
										</el-cascader>	
										</div>
									</el-col>
									<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
										<div class="select-box mb-10">
											<el-select 
												v-model="modelo.brandId" 
												size="small"
												placeholder="Marca" 
												clearable
												class="themed" 
												:popper-class="'themed color-accent-'+colorAccent"
												filterable
												:allow-create="allownew"
												:no-match-text="datoNoEncontrado"
												:no-data-text= "noHayDatos"		
											>
												<el-option v-for="(i, index) in brands" :key="index" :label="i.description" :value="i.id"></el-option>
											</el-select>
										</div>
									</el-col>									
								</el-row>

								<el-row :gutter="20">

									<el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
										<div class="select-box mb-10">
											<el-select 
												v-model="modelo.locationId" 
												size="small"
												placeholder="Ubicación" 
												clearable
												class="themed" 
												:popper-class="'themed color-accent-'+colorAccent"
												filterable
												:allow-create="allownew"
												:no-match-text="datoNoEncontrado"
												:no-data-text= "noHayDatos"																							
											>
												<el-option v-for="(i, index) in locations" :key="index" :label="i.description" :value="i.id"></el-option>
											</el-select>
										</div>
									</el-col>
									<el-col :xs="24" :sm="6" :md="6" :lg="6" :xl="6">
										<div class="select-box mb-10">
											<el-select 
												v-model="modelo.exchangeCurrencyId" 
												size="small"
												placeholder="Moneda" 
												clearable
												class="themed" 
												:popper-class="'themed color-accent-'+colorAccent"
												no-data-text="No hay datos">
												<el-option v-for="(i, index) in exchanges" :key="index" :label="i.description" :value="i.id"></el-option>
											</el-select>
										</div>
									</el-col>

									<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
										<div class="select-box mb-10">
											<el-select
												v-model="modelo.providerId"
												size="small"
												multiple
												filterable
												:allow-create="allownew"
												:no-match-text="datoNoEncontrado"
												:no-data-text= "noHayDatos"											
												default-first-option
												placeholder="Proveedor"
												class="themed" 												
												:popper-class="'themed color-accent-'+colorAccent">
												<el-option v-for="(i, index) in providers" :key="index" :label="i.razonSocial" :value="i.id"></el-option>
											</el-select>
										</div>
									</el-col>									
								</el-row>
								<div v-for="(item,index) in preciosDeLista" :key="index">								
									<price-list 
										:price="item" 
										:pricelists="pricelists" 
										v-on:addprice="handleAddPrice()"
										v-on:deleteprice="handleDeletePrice(item)"
										 v-on:pricecalc="priceListCalc()"> 

									</price-list> 
								</div>
								<el-row v-if="!modelo.checkStock">
									<el-col class="text-right">
										<el-radio-group v-model="modelo.status" class="themed">
											<el-radio-button label="En Stock"></el-radio-button>
											<el-radio-button label="En Espera"></el-radio-button>
											<el-radio-button label="Sin Stock"></el-radio-button>
										</el-radio-group>
									</el-col>
								</el-row>

								<el-row>
									<el-col>
										<div class="actions-box text-right">
											<el-switch v-model="modelo.active" active-text="Activo" inactive-text="" class="mr-20 themed"></el-switch>
											<el-button class="themed mb-10 mr-10" type="primary" plain @click="save"><i class="mdi mdi-content-save" ></i> Guardar</el-button>
											<el-button class="themed mb-10" type="primary" plain @click="clear"><i class="mdi mdi-refresh"></i> Limpiar</el-button>
										</div>
									</el-col>
								</el-row>

							</div>
						</el-col>
					</el-row>
				</div>
			</el-col>
		</el-row>
	
		</vue-scroll>
		</el-form>
	</el-dialog>
</template>

<script>
import _ from 'lodash'
import PriceList from '@/components/PriceList'
import axios from "axios";
import { Loading } from 'element-ui';

export default {
	name: 'EcommerceNewProduct',
	props: ['dialogvisible','categories','brands','providers','locations','pricelists','modelo', 'lists','exchanges','allownew'],
	data () {
		return {
			imagePlaceholder: '@/assets/images/product.png',
			discount: 15,
			price: 155,
			stock: 100,
			datoNoEncontrado: "Dato no encontrado",
			noHayDatos: "No hay datos",
			default: {
				id : null,
				price :0
			},
			treeProps: {
				
				children: 'children',
				label: 'label',
				value: 'id'
			},
			tags: [],
			title: '',
			description: '',
			status: 'En Espera',
			active: true,
			rules: {
						name: [
						{ required: true, message: 'Por favor ingrese el Nombre del Producto', trigger: 'blur' },
						{ min: 1, max: 200, message: 'Debe tener entre 1 y 200 caracteres', trigger: 'blur' }
						],
						cost: [
							{ required: true, message: 'Costo requerido'},
							{ type: 'number', message: 'Debe ser numerico'}
						]	
						,
						gain: [
							{ required: true, message: 'Ganancia requerido'},
							{ type: 'number', message: 'Debe ser numerico'}
						]
						,
						stockMin: [
							{ required: true, message: 'Stock min requerido'},
							{ type: 'number', message: 'Debe ser numerico'}
						]
						,
						price: [
							{ required: true, message: 'Precio requerido'},
							{ type: 'number', message: 'Debe ser numerico'}
						]
						,
						discount: [
							{ required: true, message: 'Descuento requerido'},
							{ type: 'number', message: 'Debe ser numerico'}
						]
						,
						stock: [
							{ required: true, message: 'Stock requerido'},
							{ type: 'number', message: 'Debe ser numerico'}
						]																								
					}				
		}
	},
	computed: {
		finalPrice() {
			return (this.modelo.price - this.modelo.discount).toFixed(2)
		},
		discountPrice() {
			return (this.modelo.price / 100 * this.modelo.discount).toFixed(2)
		},
		colorAccent() {
			return this.$store.getters.colorAccent
		},
		preciosDeLista: function() {
			return this.lists.filter(
				x =>  x.isRemoved == false
			);
		},
	/*	priceNeto: {
			get() {
				return (this.modelo.cost + (this.modelo.cost * this.modelo.gain / 100 )).toFixed(2)
			},
			set(newValue){
				this.modelo.price = newValue;
				this.lists[0].Price=newValue;
				this.lists[0].PriceList=5;
				
			}
			
		},*/		
	},
	created() {
		this.URL_CREATE= this.$route.meta.URL_CREATE;
		this.URL_UPDATE= this.$route.meta.URL_UPDATE;
		this.URL_DELETE= this.$route.meta.URL_DELETE;	
	},
	methods: {
		kebabCase: _.kebabCase,
		uploadFile(file, files) {
			this.encodeImage(file.raw)
	  
		},		
   	    encodeImage (input) {
			if (input) {
				this.modelo.logoName= input.name
				const reader = new FileReader()
				reader.onload = (e) => {
				this.modelo.logo = e.target.result;								
				}
				reader.readAsDataURL(input);
			}
		},
    	handleAddPrice() {
			let objeto = {
				Id: null,
				PriceList: null,
				Price: null,
				isNew: true,
				isRemoved: false,
				isDefault: false		
			};
			this.lists.push(objeto);
		},		
    	handleDeletePrice(obj) {
			obj.isRemoved = true;
		},	
		priceCalc() {
				this.lists[0].Price=this.modelo.price;
				this.lists[0].PriceList=5;							
		},		
		priceRecall(){
			this.modelo.price =this.modelo.cost + (this.modelo.cost * this.modelo.gain / 100 );//.toFixed(2);
			this.priceCalc();
		},
		priceListCalc(){
			this.modelo.price=this.lists[0].Price;
		},
		save() {
			
			let me = this;
      		let objeto = null; 
			this.validate();  
			if (this.validateListaPrecio()==false)
			{
				this.showWarning("Existen Listas de precio duplicadas");
				return;
			}
			if( this.modelo.validacionOK)
			{
				let loadingInstance  = Loading.service({ fullscreen: true });
				let categoryId=null;
				let subCategoryId=null;
				let inStock = false;
				let awaiting = false;
				let outOfStock= false;				
				if (me.modelo.categoryId!= null && me.modelo.categoryId.length>0){
					categoryId=me.modelo.categoryId[0];
					subCategoryId=me.modelo.categoryId[1];
				}

				 switch (this.modelo.status) {
					case "En Stock":
						inStock= true;
						break; 
					case "En Espera": 
						awaiting= true;
						break; 
					case "Sin Stock": 
						outOfStock= true;
						break; 
				 }


					//Create
					me.objeto= {
						   Name: me.modelo.name,
						   Awaiting: awaiting,
						   BrandId: me.modelo.brandId,
						   CategoryId: categoryId,
						   SubCategoryId: subCategoryId,
						   Codigo: me.modelo.codigo,
						   CompanyId: parseInt( this.$store.getters.user.CompanyId),
						   Cost: me.modelo.cost,
						   Description: me.modelo.description,
						   Discount: me.modelo.discount,
						   ExchangeCurrencyId: me.modelo.exchangeCurrencyId,
						   Gain: me.modelo.gain,
						   InStock: inStock,
						   LocationId: me.modelo.locationId,
						   NameShort: me.modelo.nameShort,
						   OutOfStock: outOfStock,
						   Price: me.modelo.price,
						   Stock: me.modelo.stock,
						   StockMin: me.modelo.stockMin,						   
						   CheckStock: me.modelo.checkStock,
						   Providers: [],
						   ProductPriceLists: []

						}

				if (me.modelo.id==null)		
				{						
					    me.modelo.providerId.forEach(prov=> {
								me.objeto.Providers.push(prov);
						});
						me.lists.filter(
        					x => x.isRemoved == false && x.PriceList !=null
      					).forEach(price=> {
								let productPriceList = {
									PriceList: price.PriceList,
									Price: price.Price
								};
								me.objeto.ProductPriceLists.push(productPriceList);
						});

				

					axios.post(this.URL_CREATE, me.objeto)
					.then(function(response) {
						me.clear();

						loadingInstance.close();
						me.showOk();
					})
					.catch(function(error) {						
						loadingInstance.close();
						if (error.response.data.message=="Código repetido")
							me.showWarning(error.response.data.message)
						else
							me.showError();
					});
					loadingInstance.close();
				}
				else
				{
					//update
					me.objeto.Id= me.modelo.id;
					me.modelo.providerId.forEach(prov=> {
						me.objeto.Providers.push(prov);
					});

					me.lists.filter(
        					x =>  x.PriceList !=null
      				).forEach(price=> {
								let productPriceList = {
									Id: null,									
									PriceList: price.PriceList,
									Price: price.Price,
									IsNew: price.isNew,
									IsRemoved: price.isRemoved
								};
								productPriceList.Id = price.Id ? price.Id : 0
								me.objeto.ProductPriceLists.push(productPriceList);
					});

					axios.put(this.URL_UPDATE, me.objeto)
					.then(function(response) {
						me.close();

						loadingInstance.close();
						me.showOk();
					})
					.catch(function(error) {
						loadingInstance.close();
						me.showError();
					});
					loadingInstance.close();
				}
			}

		},
		validate(){
			this.$refs['modelo'].validate((valid) => {
				this.modelo.validacionOK= valid;
			});
		},
		close() {
			
			this.clear();
			this.$emit('update:dialogvisible', false);
			this.$emit('refreshgrid');
		},
		clear() {
			this.modelo.id= null;
			this.modelo.codigo= null;
			this.modelo.name= null;
			this.modelo.nameShort= null;
			this.modelo.description= null;
			this.modelo.categoryId= [];
			this.modelo.subCategoryId= null;
			this.modelo.priceListIds= null;
			this.modelo.brandId= null;
			this.modelo.locationId= null;
			this.modelo.stock= 0;
			this.modelo.stockMin= 0;
			this.modelo.price= 0;
			this.modelo.exchangeCurrencyId= 6;
			this.modelo.discount= 0;
			this.modelo.inStock= null;
			this.modelo.awaiting= null;
			this.modelo.outOfStock= null;
			this.modelo.logo= null;
			this.modelo.logoName= null;
			this.modelo.checkStock= true;
			this.modelo.active= true;
			this.modelo.status= "En Stock";
			this.modelo.validacionOK= false;
			for (let index = 0; index < this.lists.length; index++) {
				if (index>0)
					this.lists.splice(index);				
			}	
			//this.priceNeto=0;
			this.modelo.cost= 0;
			this.modelo.gain= 0;
			this.lists[0].Price=0;
		},
		validateListaPrecio()			
		{
			let arr=[];
			let esCorrecto=true;
			this.lists.filter(x=>x.isRemoved==false).forEach(element => {
				if (arr.length>0)
				{
					if( arr.includes(element.PriceList))
					{
						esCorrecto= false;
						return;
					}
				}
				arr.push(element.PriceList);
			});
			return esCorrecto;
		}
	},

	components: {
		PriceList
	}		
}
</script>

<style lang="scss">
@import '../../assets/scss/_variables';

.page-ecommerce-new-product {
	width: 850px;
	.page-header {
		margin-bottom: 20px;
	}

	.el-form-item__error {
		position: relative!important;	
		margin-top: -10px;	
	}

	.el-form-item {
		margin-bottom: 0px;
		margin-left: 0px!important;
	}

	.el-form-item__content  {
		line-height: 0px!important;	
	}

	.color-list {
		color: #5f8fdf;
	}

	.row-listaprecio {
		margin-left: 0px!important;
    	margin-right: 0px!important;
    	margin-top: 90px!important;
	}

	.item-box {
		background: white;

		.main-photo, .a-photo {
			position: relative;

			img {
				width: 100%;
			}

			.btn-close {
				position: absolute;
				right: 30px;
				top: 30px;
				background: rgba(0, 0, 0, .1);
				width: 20px;
				height: 20px;
				text-align: center;
				line-height: 20px;
			}
		}

		.main-photo {
			padding: 30px;
			box-sizing: border-box;
		}
		.other-photos {
			padding: 0 15px;		
			padding-bottom: 15px;	
			box-sizing: border-box;

			.a-photo {
				width: 33.3333333%;
				box-sizing: border-box;
				padding: 0 15px;
				display: inline-block;

				.btn-close {
					position: absolute;
					right: 15px;
					top: 0px;
				}

				.add-photo {
					width: 100%;
					height: 100%;
					box-sizing: border-box;
					padding-bottom: 100%;
					position: relative;

					.dashed-box {
						border: 4px dashed transparentize($text-color-accent, .5);
						position: absolute;
						top: 0;
						left: 0;
						right: 0;
						bottom: 0;
					}

					.mdi {
						position: absolute;
						top: 50%;
						left: 50%;
						font-size: 30px;
						transform: translateX(-50%) translateY(-50%);
						opacity: .7;
					}
				}
			}
		}

		.detail-box {
			padding: 30px;
			padding-left: 0;

			.title {
				background: transparent;
				font-size: 30px;
				border: none;
				outline: none;
				border-bottom: 2px solid transparentize($text-color, .8);
				font-family: inherit;
				width: 100%;
				margin-bottom: 20px;
				color: $text-color;
				font-weight: bold;
			}

			.number-input {
				margin-bottom: 1px;

				label {
					display: block;
					clear: both;
					opacity: .5;
					margin-bottom: 6px;
					font-size: 14px;
				}
			}

			.final-price {
				color: transparentize($text-color, .3);
				margin-bottom: 10px;
				strong {
					color: $text-color-accent;
				}
			}

			.description-box {
				margin-top: 20px;
				margin-bottom: 10px;

				textarea {
					border: 1px solid transparentize($text-color-accent, 0.7);
					outline: none;
					width: 100%;
					resize: vertical;
					background: white;
					font-family: inherit;
					padding: 10px;
					box-sizing: border-box;
					color: $text-color;
					font-size: 16px;
					border-radius: 4px;
					margin-top: -25px;
				}
			}

			.el-input-number {
				width: 150px;

				.el-input__inner {
					color: $text-color-accent;
					background-color: transparent;
					border-color: transparentize($text-color-accent, 0.7);
					font-family: inherit;
					font-weight: bold;
					padding-left: 5px;
					padding-right: 45px;
				}
			}

			.el-button {
				font-family: inherit;
				margin-left: 0;
			}

			.select-box {
				box-sizing: border-box;
			}

			.el-select {
				width: 100%;

				.el-input__inner {
					border-color: transparentize($text-color-accent, 0.7);
					color: $text-color-accent;
					font-family: inherit;
				}
				
			}

			.actions-box {
				text-align: right;
				margin-top: 20px;
			}

			.el-radio-group {
				.el-radio-button__inner {
					background-color: transparentize($text-color-accent, 0.9);
					border-color: transparentize($text-color-accent, 0.7);
					color: $text-color-accent;
				}
				.el-radio-button__orig-radio:checked + .el-radio-button__inner {
					background-color: $text-color-accent;
					color: white;
				}
			}
		}

		.meta-form {
			input,button {
				border: 1px solid transparentize($text-color-accent, 0.7);
				outline: none;
				border-radius: 4px;
				color: $text-color;
				padding: 8px 13px;
				background: white;
				width: 100%;
				margin-bottom: 7px;
				box-sizing: border-box;
				font-family: inherit;
				font-size: 14px;
			}

			button {
				cursor: pointer;
				border-bottom: 1px solid $text-color-accent;
				font-family: inherit;
				text-transform: uppercase;
				line-height: 0;
				padding: 16px 2px;
				color: $text-color-accent;
				
				i {
					position: relative;
					top: 3px;
				}
			}
		}
	}
}

@media (max-width: 768px) {
	.page-ecommerce-new-product {

		.item-box {
			.detail-box {
				padding-left: 10px;
			}
		}
	}
}

</style>


