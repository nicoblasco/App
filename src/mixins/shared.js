import Vue from 'vue'
import axios from 'axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Footer } from 'element-ui'

Vue.mixin({
  methods: {
	 zeroFill( number, width )
		{
		width -= number.toString().length;
		if ( width > 0 )
		{
			return new Array( width + (/\./.test( number ) ? 2 : 1) ).join( '0' ) + number;
		}
		return number + ""; // always return a string
		},	  
		showError(mensj){
			let me= this;
			let mensaje = "";
			let userId = this.$store.getters.user.Id;
			let path = this.$route.fullPath;
			let company = this.$store.getters.user.CompanyId;		
			if (mensj!=null)
				mensaje=': '+ mensj;


            axios.post('api/LogErrors/Create',{
					'CompanyId': parseInt(company),
					'SecurityUserId': parseInt(userId),
					'Path': path,
					'Error': mensaje
            }).then(function(response){
				me.$message({
					showClose: true,
					type: 'error',
					duration: 8000,
					message: 'Ha ocurrido un error, código: ' + response.data
				});				
                     
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
  }
})
