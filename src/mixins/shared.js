import Vue from 'vue'
import axios from 'axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

Vue.mixin({
  methods: {
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
		} ,
		generatePdf(name,heading,title, columns, data, companyName){		
			var doc = new jsPDF({
				orientation: "portrait",
				unit: "in",
				format: "letter"
			});

			doc.setFontSize(10).text(heading, 0.5,0.2);
			// text is placed using x, y coordinates
			doc.setFontSize(16).text(title, 0.5, 1.0);
     		// create a line under heading 
      		doc.setLineWidth(0.01).line(0.5, 1.1, 8.0, 1.1);
      		// Using autoTable plugin
			doc.autoTable({
				columns,
				body: data,
				margin: { left: 0.5, top: 1.25 }
			});
			// Using array of sentences
			// doc
			// 	.setFont("helvetica")
			// 	.setFontSize(12)
			// 	.text(moreText, 0.5, 3.5, { align: "left", maxWidth: "7.5" });
      
			// Creating footer and saving file
			doc
				// .setFont("times")
				// .setFontSize(11)
				// .setFontStyle("italic")
				.setTextColor(0, 0, 255)
				.text(
				companyName,
				0.5,
				doc.internal.pageSize.height - 0.5
				)
				.save(`${name}.pdf`);
				
		}			   
  }
})
