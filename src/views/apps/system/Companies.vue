<template>
	<div class="page-ecommerce-product-list flex column">

		<div class="page-header card-base header-accent">
			<h1>
				<span>Empresas</span>
				<button @click="newCompany">Nueva Empresa</button>
			</h1>
			<div class="flex justify-space-between">
				<el-breadcrumb separator="/">
					<el-breadcrumb-item :to="{ path: '/' }"><i class="mdi mdi-home-outline"></i></el-breadcrumb-item>
					<el-breadcrumb-item>Empresas</el-breadcrumb-item>
				</el-breadcrumb>
				<input placeholder="Buscar...">
			</div>
		</div>



    <div class="vue-good-table-box card-base card-shadow--medium">
			<vue-good-table
				:columns="columns"
				:rows="companies"
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
						<el-button type="warning" icon="el-icon-edit" circle @click.prevent='editCompany(props.row)'></el-button>
						<el-button v-if="props.row.enabled" type="danger" icon="el-icon-remove-outline" circle @click="changestate(props.row)" ></el-button>						
						<el-button v-if="props.row.enabled==false" type="success" icon="el-icon-check" circle @click="changestate(props.row)" ></el-button>	
					</span>
				</template>
			</vue-good-table>
		</div>

	</div>
</template>

<script>
import 'tui-grid/dist/tui-grid.min.css'
import tuiGrid from 'tui-grid'
import Chance from 'chance'
import axios from 'axios'
const chance = new Chance()

export default {
	name: 'Companies',
	data() {
		return {
			URL_GET_COMPANIES: 'api/Companies',
			URL_UPDATE_STATE: 'api/Companies/UpdateState',
			URL_GET_ACTIONS: 'api/SecurityRoleActions/GetConfigScreenByCompanyByScreen',
			grid: null,
			gridData: [],
			resizing: false,
			height: 300,
					title: 'Empresas',
			subtitle: 'Empresas',
			thirdtitle: null,
			companies: [],
				columns: [
					{
						label: 'Id',
						field: 'id',
						type: 'number',
						filterable: true
					},
					{
						label: 'Logo',
						field: this.fnimage,
						type: 'string',
						html: true
					},					
					{
						label: 'Razon Social',
						field: 'name',
						type: 'string',
						filterable: true
					},
					{
						label: 'Fecha Inicio',
						field: 'initialDate',
						type: 'string',
						filterable: false
					},
					{
						label: 'Email',
						field: 'email',
						type: 'string',
						filterable: true
					},										
					{
						label: 'Acciones',
						field: 'actions',
						width: '180px',
						tdClass: 'text-center',
						html: true
					}  				
				],
		}
	},
	methods: {
		fnimage(rowObj) {
			if (rowObj.logo != null)
				return '<img class="avatar" src='+  rowObj.logo +' alt="logo"  />';
			else
				return
		},
		changestate(objeto) {
			let mensaje='';
			if (objeto.enabled)
				mensaje='desabilitara';
			else
				mensaje='habilitara';
			this.$confirm('La empresa ' + this.title + ' se ' + mensaje+ '. Continua?', 'Cuidado', {
			confirmButtonText: 'OK',
			cancelButtonText: 'Cancelar',
			type: 'warning',
			center: true
			}
			).then(() => {
				let me = this;
                axios.put(this.URL_UPDATE_STATE,{
					'Id': objeto.id
                }).then(function(response){						
					 me.showOk();
					 me.getCompanies();
                     
                }).catch(function(error){
						me.showError();
				});

			}).catch(() => {
				this.$message({
					type: 'info',
					message: 'Cancelado'
				});
			});
		},
		objectAttr(fieldName){
			return  this.fields.configScreenFields.find(conf => conf.fieldName === fieldName)
		},
		canCreate(){
			if (this.actions=='')			
				return false;
			else
				return  this.actions.find(x => x.actionCode === "CREATE")
		},
		canEdit(){
			if (this.actions=='')			
				return false;
			else
				return  this.actions.find(x => x.actionCode === "EDIT")
		},
		canDelete(){
			if (this.actions=='')			
				return false;
			else
				return  this.actions.find(x => x.actionCode === "DELETE")
		},						
		getActions(){
			let me = this;
			let url = this.URL_GET_ACTIONS+"/"+me.user.Rol+"/"+me.fields.id;
            axios.get(url).then (function(response){				
                me.actions = response.data;
            }).catch (function (error){
					me.showError();
            });
		},		
		getCompanies(){
			let me = this;
			let url = this.URL_GET_COMPANIES;
            axios.get(url).then (function(response){				
                me.companies = response.data;
            }).catch (function (error){
					me.showError();
            });
		},    
		newCompany() {
		this.$router.push({name: 'company', params: {companyId: null}}); 
		},
		editCompany(item) {
		this.$router.push({name: 'company', params: {companyId: item.id }}); 
		},

		showError(){
			//Aqui debe guardar y mostrar el ide del error
			this.$message({
						showClose: true,
						type: 'error',
						message: 'Ha ocurrido un error'
					});
		},

		showOk(){
			//Aqui debe guardar y mostrar el ide del error
			this.$message({
						showClose: true,
						type: 'success',
						message: 'Operación Exitosa'
					});
		},	
		showWarning(mensaje){
			//Aqui debe guardar y mostrar el ide del error
			this.$message({
						showClose: true,
						type: 'warning',
						message: mensaje
					});
		}	 

	},
	mounted() {
		this.getCompanies();
	}
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.avatar {
	width: 50px;
	height: 50px;
}

.page-ecommerce-product-list {
	.page-header {
		margin-bottom: 8px;

		h1 {
			button {
				float: right;
				padding: 5px 10px;
				background: rgba(255, 255, 255, .2);
				text-transform: uppercase;
				border: none;
				outline: none;
				cursor: pointer;
				color: white;
				opacity: .8;
				font-family: inherit;

				i {
					position: relative;
					top: 2px;
				}

				&:hover {
					opacity: 1;
				}
			}
		}
		
		input {
			background: rgba(255, 255, 255, .2);
			border: none;
			outline: none;
			height: 20px;
			margin-top: 5px;
			padding: 4px 8px;
			min-width: 200px;
			font-family: inherit;
			color: white;
			font-size: 16px;
		}
	}

	#table-box {
		overflow: hidden;
	}

	#grid {
		.tui-grid-cell[data-column-name="photo"] {
			.tui-grid-cell-content {
				padding: 0; 
			}
		}

		.tui-grid-border-line-top {
			background-color: transparent;
		}
		.tui-grid-cell-head {
			border-top-color: transparent;
		}
	
		.tui-grid-cell-head[data-column-name="mergeColumn1"] ,
		.tui-grid-cell-head[data-column-name="mergeColumn2"] ,
		.tui-grid-cell-head[data-column-name="mergeColumn3"] ,
		.tui-grid-cell-head[data-column-name="mergeColumn4"] ,
		.tui-grid-cell-head[data-column-name="mergeColumn5"] ,
		.tui-grid-cell-head[data-column-name="mergeColumn6"] {
			background: #f4f4f4;
			color: #8e8e8e;
		}

		.tui-grid-cell-content {
			.awaiting {
				color: #9e9e9e;
				font-weight: bold;
			}
			.out-of-stock {
				color: #ff005c;
				font-weight: bold;
			}
			.in-stock {
				color: #1ac367;
				font-weight: bold;
			}
		}
	}
}


@media (max-width: 900px) {
	.page-ecommerce-product-list {

		.page-header {
			.el-breadcrumb {
				display: none;
			}
		}
	}
}

@media (max-width: 480px) {
	.page-ecommerce-product-list {

		.page-header {
			h1 {
				display: none;
			}
		}
	}
}
</style>





