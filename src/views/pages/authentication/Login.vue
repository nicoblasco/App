<template>
	<div class="login-page flex">
		<div class="box grow scrollable align-vertical side-box box-left">
			<!--<div class="align-vertical-middle wrapper text-center">
				<img class="image-logo" src="@/assets/images/logo.png" alt="logo-left"/>
				<h1 class="h-big" style="color: #f3f7fa;">V-Tracking</h1>
				
			</div>-->
		</div>
		<div class="box grow scrollable align-vertical side-box box-right">
			<div class="align-vertical-middle wrapper">
				<div class="image-login">
					<img style="width: 20%;" src="@/assets/images/logo.jpg" alt="logo-left"/>
				</div>				
				<form class="form-box" @submit.prevent="ingresar" style="margin-top: 0px;">
					<h2>Ingrese a su cuenta</h2>
					
					
					<float-label class="styled">
						<input type="text" name="email" placeholder="E-mail" v-model="email" autofocus required>
					</float-label>
					<float-label class="styled">
						<input  type="password"  name="password" placeholder="Password" v-model="password" required>
					</float-label>
					

					<div v-if="error!=null">
						<span class="error">{{error}}</span>
					</div>

					<div class="flex text-center center pt-30 pb-10">			
						<el-button  plain size="small" native-type="submit" class="login-btn pulse animated themed">
							Ingresar
						</el-button>
					</div>

				</form>
			</div>
			
		</div>

	</div>
</template>

<script>
import axios from 'axios'
export default {
	name: 'Login',
	data() {
		return {
			email: '',
			password: '',
            error: null
		}
	},
    methods :{
        ingresar(){        			
            this.error=null;
            axios.post('api/SecurityUsers/Login', {Email: this.email, Password: this.password})
            .then(respuesta => {
                return respuesta.data                
            })
            .then(data => {    
                this.$store.dispatch("guardarToken", data.token)
                this.$router.push({ name: 'dashboard' })
            })
            .catch(err => {
				if (err.response!=undefined)
				{
					if (err.response.status==400){
						this.error="No es un email válido";
					} else if (err.response.status==404){
						this.error="No existe el usuario o sus datos son incorrectos";
					}else{
						this.error="Ocurrió un error";
					}
				}
				else
				{
					this.error="Ocurrió un error desconocido";
				}
            })
        }

    } 
}
</script>

<style lang="scss">
@import '../../../assets/scss/_variables';

.error {
	color: red;
}
.login-page {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 0 !important;

	.side-box {
		.wrapper {
			width: 100%;
			box-sizing: border-box;
			padding: 20px;
		}
	}

	.image-login {
		display: flex;
		justify-content: center;
	}

	.box-left {
		background-image: url('../../../assets/images/sales1.jpg');
		background-size: cover;
		background-position: 50% 50%;

		.wrapper {
			.image-logo {
				width: 90%;
				max-width: 150px;
				margin-top: 20px;
			}

		}
	}
	.box-right {
		background: white;
		color: var(--background-color);
	}
	
	.form-box {
		width: 100%;
		max-width: 340px;
		padding: 30px;
		box-sizing: border-box;
		margin: 20px auto;
		//background: transparent;

		a {
			font-size: 14px;
			color: var(--color-accent);
			text-decoration: none;
			font-weight: 500;
		}

		.image-logo {
			width: 80px;
			margin: 0px auto;
			margin-bottom: 70px;
			display: block;
		}

		.login-btn {
			background: rgba(var(--color-accent-rgb), .2);
			color: var( --text-color);
			border-color: var(--text-color);
			border-width: 2px;
			font-weight: bold;
			border-radius: 0;

			&:hover {
				background: rgba(var(--color-accent-rgb), 1);
				border-color: var(--text-color);
				color: var( --text-color);
			}
		}
	}
}

@media (max-width: 1200px) {
.login-page {
	.box-left {
		.wrapper {
			.h-big {
				font-size: 50px;
			}
		}
	}
}
}
@media (max-width: 900px) {
.login-page {
	.box-left {
		.wrapper {
			.h-big {
				font-size: 30px;
			}
		}
	}
}
}
@media (max-width: 768px) {
.login-page {
	display: block;
	overflow: auto;
	
	.side-box {
		display: block;
	}
}
}
</style>
