<template>
	<div class="page-profile-edit">

		<el-form ref="form" :model="form" :rules="rules" label-width="120px" :label-position="labelPosition">
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Razon Social" prop="name">
						<el-input v-model="form.name"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p" >
					<span>Logo</span>
					<el-upload
					class="avatar-uploader"		
					ref="upload"					
					action=""	
					:show-file-list="false"		
					:on-change="uploadFile"
					:auto-upload="false">
					<img v-if="form.logo" :src="form.logo" class="avatar">
					<i v-else class="el-icon-plus avatar-uploader-icon"></i>					
<!-- 					
					<el-button slot="trigger" size="small" type="primary">Selecciona un archivo</el-button>
					<div slot="tip" class="el-upload__tip">Solo archivos jpg/png con un tamaño menor de 500kb</div> -->
					</el-upload> 
				</el-col>					
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Nombre">
						<el-input v-model="form.contactName"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Apellido">
						<el-input v-model="form.contactLastName"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Fecha Inicio">
						<el-date-picker type="date" placeholder="Seleccione una fecha" v-model="form.initialDate" style="width: 100%;"></el-date-picker>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Email" prop="email">
						<el-input v-model="form.email" type="email"/>
					</el-form-item>
				</el-col>				
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Telefono">
						<el-input v-model="form.phone"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Website">
						<el-input v-model="form.website" placeholder="www.ejemplo.com"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Dirección">
						<el-input v-model="form.address"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Codigo Postal">
						<el-input v-model="form.postal"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Cuidad">
						<el-input v-model="form.city"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Provincia">
						<el-input v-model="form.state"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Pais">
						<el-input v-model="form.country"/>
					</el-form-item>
				</el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Horario">
						<el-input v-model="form.schedule"/>
					</el-form-item>
				</el-col>
			</el-col>
			<el-col>
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Rubro">
						<el-select
							class="select-wide"
							v-model="form.sectors"
							multiple
							filterable
							allow-create
							default-first-option
							placeholder="Seleccionar">
							<el-option
							v-for="item in sectors"
							:key="item.id"
							:label="item.description"							
							:value="item.id">
							</el-option>
						</el-select>
					</el-form-item>
				</el-col>	
				<el-col :span="12" :md="12" :sm="24" :xs="24" class="col-p">
					<el-form-item label="Email Contacto">
						<el-input v-model="form.emails"/>
					</el-form-item>
				</el-col>						
			</el-col>	
			<el-col class="col-p">
				<el-form-item label="Comentario">
					<el-input type="textarea" v-model="form.comment" autosize></el-input>
				</el-form-item>
			</el-col>			
								 
			<el-col class="col-p" v-if="enableButtons">
				<el-form-item label="Comentarios">
					<el-input type="textarea" v-model="form.comment" autosize></el-input>
				</el-form-item>
			</el-col>
			<el-col class="col-p" v-if="enableButtons">
				<el-form-item>
					<el-button type="primary" @click="onSubmit">Save</el-button>
					<el-button>Cancel</el-button>
				</el-form-item>
			</el-col>
		</el-form>
	</div>
</template>

<script>
import axios from "axios";
export default {
  name: 'ProfileEdit',
  props: {  
      form: {
        name: String,
		contactName: String,
		contactLastName: String,
		initialDate: Date,
		email: String,
		emails: String,
		phone: String,
		website: String,
		address: String,
		postal: String,
		city: String,
		state: String,
		country: String,
		schedule: String,
		comment: String,
		logo: String,
		logoname: String,
		validacionOK: Boolean,
		sectors: []
      },
	  enableButtons: Boolean
	  
    },	
	data() {
		return {
			URL_GET_SECTORS: "api/Sectors",
			labelPosition: 'right',
			sectors: [],
			imagen: null,
			rules: {
						name: [
						{ required: true, message: 'Por favor ingrese la Razon Social', trigger: 'blur' },
						{ min: 1, max: 200, message: 'Debe tener entre 1 y 200 caracteres', trigger: 'blur' }
						],						
						email: [
						{ required: true, message: 'Por favor ingrese el Email', trigger: 'blur' },
						{ min: 1, max: 200, message: 'Debe tener entre 1 y 100 caracteres', trigger: 'blur' }
						]
					}	
				}		
	},
	created() {
		this.getSector();
		
	},	
	methods: {
		getSector() {
		let me = this;
		axios
			.get(this.URL_GET_SECTORS)
			.then(function(response) {
			me.sectors = response.data;
			})
		   .catch(function(error) {
          console.log("Error: "+error)
        });
		},		
		onSubmit() {
			console.log('submit!');
		},
		validate(){
			this.$refs['form'].validate((valid) => {
				this.form.validacionOK= valid;
			});
		},
		uploadFile(file, files) {
			this.encodeImage(file.raw)
	  
		},		
   	    encodeImage (input) {
			if (input) {
				this.form.logoname= input.name
				const reader = new FileReader()
				reader.onload = (e) => {
				this.form.logo = e.target.result;								
				}
				reader.readAsDataURL(input);
				//this.$emit('update:form.logo', this.imagen)
			}
		},
		resizeLabelPosition() {
			if(window.innerWidth <= 768) {
				this.labelPosition = 'top'	
			}
		},

	},
	mounted() {
		this.resizeLabelPosition();
		window.addEventListener('resize', this.resizeLabelPosition);
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.resizeLabelPosition);
	},
computed: {    
  inputListeners: function () {
    var vm = this
    return Object.assign({},
          this.$listeners,{
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
    )
  }
}	
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables';

	.logo {
		    padding-left: 80px!important;
	}
   .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9!important;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF!important;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
	margin-left: 120px;
    margin-top: -30px;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
	margin-left: 120px;
    margin-top: -30px;
  }
.page-profile-edit {
	.label-switch-box {
		display: block;
		clear: both;
		width: 100%;
		text-align: right;
		margin-bottom: 20px;
	}
	.col-p {
		padding: 0 10px;
		box-sizing: border-box;
	}
	.select-wide {
		width: 100%;
	}
}
</style>
