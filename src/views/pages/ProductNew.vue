<template>

	<el-dialog :show-close="true" :custom-class="'user-dialog'" :visible="dialogvisible" @close="$emit('update:dialogvisible', false)">
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
												<img src="modelo.logo"  alt="user avatar" v-if="modelo.logo!=null">
												<img src="@/assets/images/product.png"  alt="user avatar" v-else>
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
										<input class="title" v-model="modelo.name" placeholder="Nombre del Producto">
									</el-col>
								</el-row>
								<el-row :gutter="20">
									<el-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
										<div class="select-box mb-10">
											<el-input placeholder="Código" v-model="modelo.codigo" size="small"></el-input>
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
											<el-input-number size="small" v-model="modelo.cost" controls-position="right" :min="0" class="themed mr-10 mb-10"></el-input-number>
										</div>
									</el-col>
									<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
										<div class="number-input">
											<label>Ganancia (%)</label>
											<el-input-number size="small" v-model="modelo.gain" controls-position="right" :min="0" class="themed mr-10 mb-10"></el-input-number>
										</div>
									</el-col>
									<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
										<div class="number-input">
											<label>Stock Minimo</label>
											<el-input-number size="small" v-model="modelo.stockMin" controls-position="right" :min="0" class="themed mr-10 mb-10"></el-input-number>
										</div>
									</el-col>
								</el-row>								
								<el-row>
									<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
										<div class="number-input">
											<label>Precio ($)</label>
											<el-input-number size="small" v-model="modelo.price" controls-position="right" :min="0" class="themed mr-10 mb-10"></el-input-number>
										</div>
									</el-col>
									<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
										<div class="number-input">
											<label>Descuento (%)</label>
											<el-input-number size="small" v-model="modelo.discount" controls-position="right" :min="0" class="themed mr-10 mb-10"></el-input-number>
										</div>
									</el-col>
									<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
										<div class="number-input">
											<label>Stock</label>
											<el-input-number size="small" v-model="modelo.stock" controls-position="right" :min="0" class="themed mr-10 mb-10"></el-input-number>
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
											placeholder="Catagorias..." 
											size="small"           
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
											>
												<el-option v-for="(i, index) in brands" :key="index" :label="i.description" :value="kebabCase(i.description)"></el-option>
											</el-select>
										</div>
									</el-col>									
								</el-row>

								<el-row :gutter="20">

									<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
										<div class="select-box mb-10">
											<el-select 
												v-model="modelo.locationId" 
												size="small"
												placeholder="Ubicación" 
												clearable
												class="themed" 
												:popper-class="'themed color-accent-'+colorAccent"
											>
												<el-option v-for="(i, index) in locations" :key="index" :label="i.description" :value="kebabCase(i.description)"></el-option>
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
												allow-create
												default-first-option
												placeholder="Proveedor"
												class="themed" 
												:popper-class="'themed color-accent-'+colorAccent">
												<el-option v-for="(i, index) in providers" :key="index" :label="i.razonSocial" :value="kebabCase(i.razonSocial)"></el-option>
											</el-select>
										</div>
									</el-col>									
								</el-row>								
								<price-list 
									:modelo="modelo" 
									:pricelists="pricelists" >
									<!-- v-on:addContact="save('dialog-provider')"
									v-on:deleteContact="openDelete()"> -->
								</price-list>
								<el-row >
									<el-col class="text-right">
										<el-radio-group v-model="status" class="themed">
											<el-radio-button label="En Stock"></el-radio-button>
											<el-radio-button label="En Espera"></el-radio-button>
											<el-radio-button label="Sin Stock"></el-radio-button>
										</el-radio-group>
									</el-col>
								</el-row>

								<el-row>
									<el-col>
										<div class="actions-box text-right">
											<el-switch v-model="active" active-text="Activo" inactive-text="" class="mr-20 themed"></el-switch>
											<el-button class="themed mb-10 mr-10" type="primary" plain><i class="mdi mdi-content-save"></i> Guardar</el-button>
											<el-button class="themed mb-10" type="primary" plain><i class="mdi mdi-refresh"></i> Limpiar</el-button>
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
	</el-dialog>
</template>

<script>
import _ from 'lodash'
import PriceList from '@/components/PriceList'

export default {
	name: 'EcommerceNewProduct',
	props: ['dialogvisible','categories','brands','providers','locations','pricelists','modelo'],
	data () {
		return {
			imagePlaceholder: '@/assets/images/product.png',
			discount: 15,
			price: 155,
			stock: 100,
			tags_options: [
				{
					value: 'Chairs',
					label: 'Chairs'
				}, 
				{
					value: 'Foldable',
					label: 'Foldable'
				}, 
				{
					value: 'Garden',
					label: 'Garden'
				}
			],
			tags: [],
			title: '',
			description: '',
			cat: '',//bar-stools
			cat_list: ['Dining chairs', 'Foldable chairs', 'Bar Stools', 'Garden chairs', 'Step stools', 'Junior chairs', 'High chairs', 'Fabric armchairs', 'Leather armchairs', 'Rattan armchairs', 'Swivel chairs', 'Office chairs'],
			status: 'En Espera',
			active: true,
		}
	},
	computed: {
		finalPrice() {
			return (this.price - this.discountPrice).toFixed(2)
		},
		discountPrice() {
			return (this.price / 100 * this.discount).toFixed(2)
		},
		colorAccent() {
			return this.$store.getters.colorAccent
		}
	},
	methods: {
		kebabCase: _.kebabCase,
		uploadFile(file, files) {
			this.encodeImage(file.raw)
	  
		},		
   	    encodeImage (input) {
			if (input) {
				this.data.logoName= input.name
				const reader = new FileReader()
				reader.onload = (e) => {
				this.data.logo = e.target.result;								
				}
				reader.readAsDataURL(input);
			}
		},		
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


