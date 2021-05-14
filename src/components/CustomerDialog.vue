<template>
	<el-dialog :show-close="true" :custom-class="'user-dialog'" :visible="dialogvisible" @close="$emit('update:dialogvisible', false)">
		<div class="avatar-box">
			<!-- <img :src="data.id ? '/static/images/users/user-'+data.id+'.jpg' : imagePlaceholder" alt="user avatar"> -->
				<el-upload
					class="avatar-uploader"		
					ref="upload"					
					action=""	
					:show-file-list="false"		
					:on-change="uploadFile"
					:auto-upload="false">
					<img :src="data.logo ? data.logo : imagePlaceholder"  alt="user avatar">
					<!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
				</el-upload> 	
			<div class="star" @click="data.favorite = !data.favorite">
				<i class="mdi mdi-star align-vertical-middle" v-if="data.favorite"></i>
				<i class="mdi mdi-star-outline align-vertical-middle" v-if="!data.favorite"></i>
			</div>
			
		</div>
		<div class="form-box">
			<el-form label-width="100px" size="small" :model="data" ref="data" class="formClient">	<!-- Agregado -->
			    <el-tabs v-model="activeName" @tab-click="handleTabClick">
					<el-tab-pane label="Datos Personales" name="first">
						<el-form-item label="Cliente" prop="names"
				:rules="[{ required: true, message:  'Por favor ingrese el nombre del cliente', trigger: 'blur'   },{ min: 1, max: 50, message: 'Debe tener entre 1 y 50 caracteres' }]">					
							<el-input v-model="data.names"></el-input>
						</el-form-item>
						<el-form-item label="Documento">
							<el-select v-model="data.documentTypeId" placeholder="Tipo" class="selectType">
								<el-option
									v-for="item in documentType"
									:key="item.id"
									:label="item.description"
									:value="item.id">
								</el-option>
							</el-select>				
							<el-input v-model="data.documento" placeholder="Documento" class="inputDocument"></el-input>
						</el-form-item>
						<el-form-item label="Dirección">					
							<el-input v-model="data.address"></el-input>
						</el-form-item>	
						<el-form-item label="Localidad">
							<el-cascader
								v-model="data.cityId"
								class="cascade"
								placeholder="Seleccione..."            
								:options="cities"
								filterable clearable>
							</el-cascader>								
						</el-form-item> 	
						<el-form-item label="Telefono">
							<el-col :span="9">
								<el-input v-model="data.phone"></el-input>					
							</el-col>
							<el-col class="label2" :span="4"> Email </el-col>
							<el-col :span="11">
								<el-input  v-model="data.email"></el-input>					
							</el-col>
						</el-form-item>				
						<el-form-item label="Clave Fiscal">
							<el-col :span="9">
								<el-input v-model="data.keyFiscal"></el-input>					
							</el-col>
							<el-col class="label2" :span="4"> Arba </el-col>
							<el-col :span="11">
								<el-input  v-model="data.keyArba"></el-input>					
							</el-col>				
						</el-form-item> 
						<el-form-item label="Legajo Munic.">
							<el-col :span="9">
								<el-input v-model="data.legajoMunicipal"></el-input>					
							</el-col>
							<el-col class="label2" :span="4"> Clave </el-col>
							<el-col :span="11">
								<el-input  v-model="data.keyMunicipal"></el-input>					
							</el-col>
						</el-form-item>										  							
						<el-form-item label="Observaciones">
							<el-input
								type="textarea"
								:rows="2"
								v-model="data.observation">
							</el-input>
						</el-form-item>							
					</el-tab-pane>
					<el-tab-pane label="Conceptos" name="second">
						<!-- <div v-for="t in tariffs" :key="t.conceptId" class="flex contact"> -->
							<vue-scroll class="table-box card-base card-outline">
								<table class="styled striped hover">
									<tbody>										
										<tr v-for="item in tariffs" :key="item.conceptId">
											<!-- <td class="text-right">
												<status-indicator class="ml-10"
													:active="item.enabled == true" 
													:negative="item.enabled == false"
													pulse 
												/>
											</td>											 -->
											<td>
												<div class="item-box item-product">
													<div>
														<h4 class="m-0 mb-5">{{item.concept}}</h4>
													</div>
												</div>
											</td>
											<td>
												<div class="item-box item-product">
													<div>
														<el-input-number  v-if="item.permanent"
															v-model="item.price" 
															:precision="2" 
															:controls="false"
															:min="0">
														</el-input-number>
													</div>
												</div>												
											</td>
											<td>
												<el-switch
													v-model="item.enabled"
													active-color="#13ce66"
													inactive-color="#ff4949">
												</el-switch>
											</td>
										</tr>
									</tbody>
								</table>
							</vue-scroll>
						<!-- </div> -->
					</el-tab-pane>
					<el-tab-pane label="Documentación" name="third">
						<vue-scroll class="table-box card-base card-outline">
															<!-- :on-change="handleChange" -->
							<el-upload
								ref="uploadfiles"
								class="upload-demo"
								action="''"
								:http-request="addFile"
								:on-remove="handleRemove"
								:before-upload="handleBeforeUpload"
								:limit="10"
								:on-exceed="handleExceed"
								:file-list="data.documentationsCreated"
								:on-preview="handlePreview">								
								<el-button slot="trigger" size="small" type="primary">Selecciona un archivo</el-button>
								<div slot="tip" class="el-upload__tip">Solo con un tamaño menor de 5Mb</div>
							</el-upload>
						</vue-scroll>
					</el-tab-pane>
				</el-tabs>				
				<el-form-item size="large" class="bottom">
          			<el-button type="primary" v-on:click="$emit('addContact')">GUARDAR</el-button>
					<el-button type="danger" v-on:click="$emit('deleteContact')" v-if="data.id>0">Borrar</el-button>
				</el-form-item>					 
			</el-form>
		</div>
	</el-dialog>
</template>

<script>

import axios from 'axios'
import * as download from 'downloadjs'

export default {
	name: 'UserDialog',
	props: ['data', 'dialogvisible','cities','documentType','tariffs'],
	data() {
		return {
			imagePlaceholder: 'data:image/jpeg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAAAeAAD/4QMvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjYtYzE0MCA3OS4xNjA0NTEsIDIwMTcvMDUvMDYtMDE6MDg6MjEgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkExM0RGNDdBMzM1QzExRThCNjhCOTFBMEVCQUQzNDYxIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkExM0RGNDc5MzM1QzExRThCNjhCOTFBMEVCQUQzNDYxIiB4bXA6Q3JlYXRvclRvb2w9IkFkb2JlIFBob3Rvc2hvcCBDQyAyMDE1IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkRBMUEyQ0NDMjc2QzExRTg5QUMyOTk2OTcxQkYxODMyIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOkRBMUEyQ0NEMjc2QzExRTg5QUMyOTk2OTcxQkYxODMyIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+/+4AIUFkb2JlAGTAAAAAAQMAEAMCAwYAAAWZAAAGSQAACC7/2wCEABALCwsMCxAMDBAXDw0PFxsUEBAUGx8XFxcXFx8eFxoaGhoXHh4jJSclIx4vLzMzLy9AQEBAQEBAQEBAQEBAQEABEQ8PERMRFRISFRQRFBEUGhQWFhQaJhoaHBoaJjAjHh4eHiMwKy4nJycuKzU1MDA1NUBAP0BAQEBAQEBAQEBAQP/CABEIAGQAZAMBIgACEQEDEQH/xACdAAEAAgMBAQAAAAAAAAAAAAAABQYBBAcCAwEBAAMBAAAAAAAAAAAAAAAAAAECAwQQAAEEAgMBAQEAAAAAAAAAAAECAwQFEQYAIDAQQBIRAAIBAgMCCwcFAAAAAAAAAAECAxEEACExYRIgMEFRcYGRodFSExBAsSIyQnKSsiMzBRIAAQQDAQEBAAAAAAAAAAAAAQAgMBEQITFxYYH/2gAMAwEAAhEDEQAAAOgAAHzPo09syAAAACF57IRXRjichFq9f9QE/wA24RIAAHLNGyVvpwGbRebPHSPNuFZAAERLfqVa2dct+x1eKmOuOedBy19CsgAY5b1LnOlIUb5ALzSL/nawDDYABjIgIK+L155I3IjS3SlwAAAAAAAAP//aAAgBAgABBQDxQkAEAgjB6JOU8Ucq+gEkIUnhSs8Ukp6NEZ+OEfz0DihwuK4Tny//2gAIAQMAAQUA8VqyQSOA5HRQweJGB9JxwqSeZSOJUD0czj4jOehQk8/hPn//2gAIAQEAAQUA/E9IYjobtqt1Xlsl+mojypcmY7gcodmlVjrbiHW/DZ5SpN590uSp+l8L0EXX3Q0kVfhutWtif8SlS1UNcayr8JjcN6PYaK8lbek3a10+t11Mrw2C+ap482dLsHod/cQkubhfLTJlSZblDtMqucbcQ632up67Gz66NYKehdVAKF9rUmqX0ZZdfd1fXnKlHYgEWOnVUwv6JZoKdKvFGJoSs11RX1iP3f/aAAgBAgIGPwCH6VRRDRgllBaKokDxbYb7mj+N7jcX/9oACAEDAgY/AIrCtpwGWVsLQv2Xkn//2gAIAQEBBj8A9y355FiTzOwUd+NyO8hdjookUn48WFiAe8mr6SnRQNXbBmupWmkP3Ma06BoOr2LFO7TWJNGQmpjHmQnm5sLJGwZHAZWGhBzB4m6LHKJvSQcwQU+NeAI3NTbyNGPxyZf3cTfA5fzue014E7chnNOpV4kf6CLWC5ADkaLIopn+QHtVEBZ2ICqMySdAMQ2rf20Ly087Zns04lob3cMEvylZCADXTXlwX/zZleM5iKXJhsDitevAVxFGvKxevcowk9xKst23ypI9FVSeSNSde/iRQCS6lr6MR0y+5tgwZryUyudK/SuxV0GAkF0+4Mgj0kUdG/WmN311Tasag99cerdSvM/mclqdHNhYLtmmsjka5vHtU82zswskbBkcBlYaEHMHhz3JNVLFYhzRrkvjwpbGQ1NswMdfI9cuog8IqdCKHDSxAzWJzWQZlNknjwVhhQySuaKiipJw9xctW6nUKyKaqig1ptPDIIqDkQcGSCtpKcyY/oJ2ocuymD6E0Mo5K7yH4MO/FCsSjnMnguAb66G7ypCM/wBT+GN2zhCMcmkPzO3Sxz9//9k=',
			activeName: 'first'
	}
  },
	created() {
		this.URL_GET_DOCUMENTATION = this.$route.meta.URL_GET_DOCUMENTATION;
	},  
    watch: { 
      	dialogvisible: function(newVal, oldVal) { // watch it
          if (oldVal){
			  this.activeName= 'first';			 
		  }
		  	
		}
    }, 
  	methods: {	  
		uploadFile(file, files) {
			this.encodeImage(file.raw)
	  
		},		
   	    encodeImage (input) {;
			if (input) {
				this.data.logoName= input.name
				const reader = new FileReader()
				reader.onload = (e) => {
				this.data.logo = e.target.result;								
				}
				reader.readAsDataURL(input);
			}
		},
   	    encodeFiles (file) {;
			if (file) {				
			    let objeto = {
					'name': file.name,
					'size': file.size
				}
				const reader = new FileReader()
				reader.onload = (e) => {
				objeto.file = e.target.result;
				this.data.documentations.push(objeto);
				}
				reader.readAsDataURL(file);
			}
		},		
		handleTabClick(tab, event) {
			this.activeName = tab.name;
      	},	
       //Files
		getDoc(file) {
			let me = this;
			let url = me.URL_GET_DOCUMENTATION+ parseInt(file.id);
            axios.get(url).then (function(response){
				download(response.data,file.name);

            }).catch (function (error){
				me.showError("Ocurrio un error al descargar el documento");
			});
		},    
	    handlePreview(file) {
			if (file.id>0){
				this.getDoc(file);
			}
			else
			{
				this.downloadFile(file.raw, file.name);
			}
		},	   	
	    handleBeforeUpload(file) {
			 if (!this.checkSize(file)) {
			 	this.$message.warning('El archivo no puede ser mayor a 5Mb');				
				return false;
			 }
			 if (!this.checkDuplicated(file)) {
			 	this.$message.warning('El archivo se encuentra repetido.');				
			 	return false;
			 }
		//	this.docList.push(file);
		},
		handleRemove(file, fileList) {
			var i = 0;
			var eleRmv =0;
			var y = 0;
			var eleRmvY =0;
			var isDocumentation=false;
			var isDocumentationCreated=false;
			//Lo elimino si es uno que acabo de dar de alta
			this.data.documentations.forEach(element => {
				if (element.name == file.name){
					eleRmv=i;
					isDocumentation=true;
				}
				i++;
			});
			if (isDocumentation)
			{
				this.data.documentations.splice(eleRmv, 1);
			}
				
			//Si es uno que ya estaba creado guardo el id

			this.data.documentationsCreated.forEach(element => {
				if (element.name == file.name){
					eleRmvY = y;
					isDocumentationCreated=true;
					this.data.documentationsRemoved.push(element);
				}
				y++;
			});

			if (isDocumentationCreated)
				this.data.documentationsCreated.splice(eleRmvY, 1);

		},
		handleExceed(files, fileList) {
			this.$message.warning(`El límite es 10, haz seleccionado ${files.length} archivos esta vez, añade hasta ${files.length + fileList.length}`);
		},
		addFile (files){
			this.encodeFiles(files.file);
		},
		 checkSize(file) {
			const isLt5M = file.size / 1024 / 1024 < 5;
			if (!isLt5M) {
				return false;				
			}
			else
			{
				return true;
			}	
		 },
		 checkDuplicated(file){
			 var exito = true;
			 this.data.documentations.forEach(element => {
				 if (element.name == file.name){
					 exito = false;
				 }
			 });
			 this.data.documentationsCreated.forEach(element => {
				 if (element.name == file.name){
					 exito = false;
				 }
			 });

			 return exito;
		 },


	},
	
}
</script>

<style lang="scss">
@import '../assets/scss/_variables';

.el-dialog.user-dialog {
	max-width: 600px;
	margin-top: 0vh!important;

	.el-dialog__header {
		padding: 0;

		.el-dialog__headerbtn {
			z-index: 1;
			background: rgba(0, 0, 0, 0.05);
			min-width: 18px;
			min-height: 18px;
			border-radius: 4px;
			
			.el-dialog__close {
				color: $background-color;
			}
		}
	}

	.formClient {
		min-height: 500px;
	}

	.el-dialog__body {
		padding: 0;
	}

	.label2 {
		padding-left: 10px;
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
	.el-input-number{
				.el-input__inner {
					background: none;
					border: none;
					border-bottom: 2px solid $text-color-accent;
					border-radius: 0;
					color: $text-color-accent;
					font-family: inherit;
					font-size: large;
					font-weight: 800;
		}
		.el-input__prefix {
					color: $text-color;
					left: 10px;
		}
	}

	.bottom {
		bottom: 0%;
    	position: absolute;
		margin-bottom: 0px!important;
	}

	.avatar-box {
		justify-content: center; //centrado
		display: flex;//centrado
		background: $text-color-accent;
		margin-bottom: 50px;
		position: relative;

		img {
			width: 100px;
			height: 100px;
			border-radius: 50%;
			position: relative;
			bottom: -50px;
			display: block;
			margin: 0 auto;
			background: white;
			border: 2px solid $text-color-accent;
			box-sizing: border-box;
		}

		.star {
			position: absolute;
			top: 50%;
			left: 50%;
			z-index: 1;
			background: white;
			box-sizing: border-box;
			width: 30px;
			height: 30px;
			text-align: center;
			line-height: 28px;
			font-size: 20px;
			border-radius: 50%;
			border: 2px solid $text-color-accent;
			cursor: pointer;
			margin-top: 35px;
			margin-left: 35px;

			.mdi-star {
				color: #ffd730;
			}
			.mdi-star-outline {
				opacity: .5;
			}
		}
	}

	.form-box {
		padding: 10px;
		padding-right: 50px;
		box-sizing: border-box;

		& > * {
			margin: 0px 0;
		}
	}

	.selectType {
		width: 100px;
	}
	.inputDocument {
		width: 200px;
		margin-left: 10px;
	}

  .cascade {
    width: 100%;
  }

	.table-box {
		max-height: 350px;
		.item-box {
			&.item-product {
				.product-image {
					width: 50px;
					margin-right: 15px;
					float: left;

					img {
						width: 100%;
					}
				}
			}

			&.item-status {
				padding: 5px 10px;

				&.status- {
					&Complete { background: rgba(44, 196, 120, 0.25); }
					&Pending { background: rgba(247, 186, 42, 0.25); }
					&Returned { background: rgba(243, 24, 71, 0.25); }
					&Paid { background: rgba(45, 109, 211, 0.25); }
				}
			}
		}
	}

}
</style>
