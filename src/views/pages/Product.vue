<template>
	<div class="page-ecommerce-products flex">
		
		<div :class="{'sidebar':true, 'open':sidebarOpen}">
			<vue-scroll class="scroller">
				<div class="widget close-filter-box">
					<button @click="sidebarOpen = false">
						close filter
					</button>
				</div>
				<div>
					<el-button class="btnNuevoProducto" type="primary" plain @click="openDialog(null)">NUEVO PRODUCTO</el-button>
				</div>
				<div class="widget">
					<div class="title">Busqueda rápida</div>
					<div class="content">
						<el-input size="mini" placeholder="CÓDIGO"  clearable> </el-input>
						<div style="margin: 10px 0;"></div>
						<el-input size="mini" placeholder="DESCRIPCIÓN"  clearable> </el-input>
					</div>
				</div>				
				<div class="widget">
					<div class="title">Categorias</div>
					<div class="content">
						<el-tree :data="categories" :props="treeProps" node-key="id" :default-expanded-keys="[1]"></el-tree>
					</div>
				</div>
				<div class="widget">
					<div class="title">Precio</div>
					<div class="content">
						<el-slider
							v-model="range"
							range
							:max="100"
							class="themed"
						></el-slider>
						<div class="flex justify-space-between o-060">
							<span>$ {{range[0]}}</span>
							<span>$ {{range[1]}}</span>
						</div>
					</div>
				</div>
				<div class="widget select-color">
					<div class="title">Marcas</div>
					<div class="content">
						<el-checkbox :indeterminate="isIndeterminateBrand" v-model="checkAllBrands" @change="handleCheckAllBrandsChange">Marcar todos</el-checkbox>
						<div style="margin: 15px 0;"></div>
						<el-checkbox-group v-model="checkedBrands" @change="handleCheckedBrandsChange">
							<el-checkbox v-for="b in brands" :label="b.id" :key="b.id">{{b.description}}</el-checkbox>
						</el-checkbox-group>
					</div>
				</div>
				<div class="widget select-color">
					<div class="title">Proveedores</div>
					<div class="content">
						<el-checkbox :indeterminate="isIndeterminateProviders" v-model="checkAllProviders" @change="handleCheckAllProvidersChange">Marcar todos</el-checkbox>
						<div style="margin: 15px 0;"></div>
						<el-checkbox-group v-model="checkedProviders" @change="handleCheckedProvidersChange">
							<el-checkbox v-for="b in providers" :label="b.id" :key="b.id">{{b.razonSocial}}</el-checkbox>
						</el-checkbox-group>
					</div>
				</div>		
				<div class="widget close-filter-box">
					<button @click="sidebarOpen = false">
						close filter
					</button>
				</div>
			</vue-scroll>
		</div>

		<div class="list-container box grow flex column">
			<div class="toggle-filter-box">
				<button @click="sidebarOpen = !sidebarOpen">
					<span v-if="!sidebarOpen">open filter</span>
					<span v-if="sidebarOpen">close filter</span>
				</button>
			</div>

			<div class="list scrollable only-y box grow">
				<div v-for="i in gridData" :key="i.id" class="item" @click="gotoDetail">
					<div class="wrapper card-shadow--medium">
						<div class="image p-20">
							<div class="bg" :style="'background-image: url('+i.photo+')'"></div>
						</div>
						<div class="detail p-20">
							<div class="rate">
								<el-rate v-model="i.rate" disabled></el-rate>
							</div>
							<div class="name">
								{{i.product}}
							</div>
							<div class="desc">
								Lorem ipsum sit dolor amet
							</div>
							<div class="price">
								$ {{i.price}}
							</div>
							<div class="buttons flex justify-space-between">
								<div>
									<button><i class="mdi mdi-heart-outline"></i></button>
									<button class="ml-5"><i class="mdi mdi-magnify"></i></button>
								</div>
								<button>add to cart <i class="mdi mdi-cart-outline ml-5"></i></button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<product-dialog 
			:dialogvisible.sync="dialogvisible" 
			:modelo="modelo" 
			:categories="categories" 
			:brands="brands" 
			:providers="providers" 
			:locations="locations" 
			:pricelists="pricelists" >
			<!-- v-on:addContact="save('dialog-provider')"
			v-on:deleteContact="openDelete()"> -->
		</product-dialog>		
	</div>
</template>

<script>
import ProductDialog from '@/views/pages/ProductNew'
import axios from 'axios'
export default {
	name: 'Products',
	data () {
		return {
			gridData: [],
			sidebarOpen: false,
			range: [1, 100000],
			categories:null,
			brands:null,
			providers:null,
			locations: null,
			pricelists: null,
			treeProps: {
				children: 'children',
				label: 'label'
			},
			checkAllBrands: false,
			checkedBrands: [],
			isIndeterminateBrand: true,
			checkAllProviders: false,
			checkedProviders: [],
			isIndeterminateProviders: true,
			dialogvisible: false,
			modelo: null
		}
	},
	computed: {},
	methods: {
		initGridData() {
			_.times(50, (number) => {
				let price = chance.floating({ min: 1, max: 100, fixed: 2 })

				this.gridData.push({
					photo: '/static/images/shop/'+chance.integer({ min: 0, max: 19 })+'.jpg',
					product: chance.sentence({ words: 3 }),
					price: _.replace(price.toFixed(2).toString(), '.', ','),
					rate: chance.integer({ min: 3, max: 5 }),
					id: number,
				})
			})
		},
		openDialog(objeto) {
		/*	this.clean();

			if (objeto!=null){

				this.data.id=objeto.id;		
				this.data.razonSocial= objeto.razonSocial;
				this.data.documento= objeto.documento;
				this.data.documentTypeId= objeto.documentTypeId;
				this.data.address=objeto.address;
				this.data.cityId.push(objeto.countryId);
				this.data.cityId.push(objeto.stateId);
				this.data.cityId.push(objeto.cityId);
				this.data.email=objeto.email;
				this.data.webSite=objeto.webSite;
				this.data.favorite=objeto.favorite;
				this.data.observation=objeto.observation;
				this.data.phone=objeto.phone;
				this.data.logo= objeto.logo;
				this.data.logoName= objeto.logoName;
				this.editedIndex=0;
				
			}
			else
			{
				this.editedIndex=-1;				
			}*/
				

			this.dialogvisible = true
		},		
		getCategories() {
			let me = this;
			let url = me.URL_GET_CATEGORIES+ parseInt(me.companyId);
			axios.get(url)
			.then(function(response) {
			me.categories = response.data;
			})
			.catch(function(error) {
			me.showError();
			});
		}, 	
		getBrands() {
			let me = this;
			let url = me.URL_GET_BRANDS+ parseInt(me.companyId);
			axios.get(url)
			.then(function(response) {
			me.brands = response.data;
			})
			.catch(function(error) {
			me.showError();
			});
		}, 
		getProviders() {
			let me = this;
			let url = me.URL_GET_PROVIDERS+ parseInt(me.companyId);
			axios.get(url)
			.then(function(response) {
			me.providers = response.data;
			})
			.catch(function(error) {
			me.showError();
			});
		}, 	
		getLocations() {
			let me = this;
			let url = me.URL_GET_LOCATIONS+ parseInt(me.companyId);
			axios.get(url)
			.then(function(response) {
			me.locations = response.data;
			})
			.catch(function(error) {
			me.showError();
			});
		}, 	
		getPriceList() {
			let me = this;
			let url = me.URL_GET_PRICE_LISTS+ parseInt(me.companyId);
			axios.get(url)
			.then(function(response) {
			me.pricelists = response.data;
			})
			.catch(function(error) {
			me.showError();
			});
		}, 								
		gotoDetail() {
			this.$router.push({name:'ecommerce-product-detail'})
		},
		//CHECKBOX -INI
      handleCheckAllBrandsChange(val) {
		//this.checkedBrands = val ? this.brands.id : [];
		this.checkedBrands=[];
		if (val)
		{
			this.brands.forEach(element => {
				this.checkedBrands.push(element.id);
			});
		}

		 this.isIndeterminateBrand = false;
      },
      handleCheckedBrandsChange(value) {
        let checkedCount = value.length;
        this.checkAllBrands = checkedCount === this.brands.length;
        this.isIndeterminateBrand = checkedCount > 0 && checkedCount < this.brands.length;
	  }	,
      handleCheckAllProvidersChange(val) {
		this.checkedProviders=[];
		if (val)
		{
			this.providers.forEach(element => {
				this.checkedProviders.push(element.id);
			});
		}

		 this.isIndeterminateProviders = false;
      },
      handleCheckedProvidersChange(value) {
        let checkedCount = value.length;
        this.checkAllProviders = checkedCount === this.brands.length;
        this.isIndeterminateProviders = checkedCount > 0 && checkedCount < this.brands.length;
      }		  
	  
	},
	created() {
				this.URL_GET= this.$route.meta.URL_GET;
				this.URL_CREATE= this.$route.meta.URL_CREATE;
				this.URL_UPDATE= this.$route.meta.URL_UPDATE;
				this.URL_DELETE= this.$route.meta.URL_DELETE;		
				this.URL_GET_CATEGORIES = this.$route.meta.URL_GET_CATEGORIES;
				this.URL_GET_BRANDS = this.$route.meta.URL_GET_BRANDS;
				this.URL_GET_PROVIDERS = this.$route.meta.URL_GET_PROVIDERS;
				this.URL_GET_BRANDS = this.$route.meta.URL_GET_BRANDS;
				this.URL_GET_LOCATIONS = this.$route.meta.URL_GET_LOCATIONS;
				this.URL_GET_PRICE_LISTS = this.$route.meta.URL_GET_PRICE_LISTS;
				this.companyId = parseInt( this.$store.getters.user.CompanyId);
				this.modelo = this.$route.meta.modelo;
				this.getCategories();
				this.getBrands();
				this.getProviders();
				this.getLocations();
				this.getPriceList();
				this.initGridData()
	},
	mounted() {},
	components: {
		ProductDialog
	}	
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';


.el-checkbox  {
	margin-right: 100%!important;	
}

.btnNuevoProducto {
	width: 100%;
	margin-bottom: 10px;
}

.page-ecommerce-products {
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


