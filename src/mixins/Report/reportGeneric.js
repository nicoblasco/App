import Vue from 'vue'
import axios from 'axios'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import { Footer } from 'element-ui'

Vue.mixin({
  methods: {
		generatePdf(name, headingLeft, headingRight, title, bodyName, body, columns, data, logo, footer){		
			let y = 0;
			let cant = data.length + 1;
			var doc = new jsPDF({
				orientation: "portrait",
				unit: "in",
				format: "letter"
			});

			//TITLE
			doc.setFont("Arial", 'normal');
			doc.setTextColor(127, 127, 127);
			doc.setFontSize(24).text(title, 0.5,1.3);


			//LOGO
			doc.setFont("Arial", 'normal');
			doc.addImage(logo, 'JPEG', 6.0, 0.3, 1.8, 1.5);

			//HEAD LEFT
			doc.setFont("Arial", 'normal');
			doc.setTextColor(51, 63, 79);
			doc.setFontSize(11).text(headingLeft, 0.5,2.2);

			//HEAD Right 2.1
			if (headingRight != null)
			{
                if (headingRight[0]!=null){
                    doc.setFont("Arial", 'bold');
                    doc.setTextColor(31, 56, 100);							
                    doc.setFontSize(10).text(headingRight[0], 6.5,2.1);
    
                    doc.setFont("Arial", 'normal');
                    doc.setTextColor(51, 63, 79);
                    doc.setLineWidth(0.001).line(6.0, 2.15, 7.9, 2.15);
    
                    doc.setTextColor(51, 63, 79);
                    doc.setFontSize(9).text(headingRight[1], 6.6,2.3);
                }

                if (headingRight[2]!=null){
                    doc.setFont("Arial", 'bold');
                    doc.setTextColor(31, 56, 100);							
                    doc.setFontSize(10).text(headingRight[2], 6.5,2.5);
    
                    doc.setFont("Arial", 'normal');
                    doc.setTextColor(51, 63, 79);
                    doc.setLineWidth(0.001).line(6.0, 2.55, 7.9, 2.55);
    
                    doc.setTextColor(51, 63, 79);
                    doc.setFontSize(9).text(headingRight[3], 6.7,2.7);	
                }			
			}

            y= 3,9;
			// BODY NAME
			if (bodyName != null){
				doc.setFont("Arial", 'bold');
				doc.setTextColor(31, 56, 100);	
				doc.setFontSize(11).text(bodyName, 0.5,y);

                y= y + 0.05;

				doc.setFont("Arial", 'normal');
				doc.setTextColor(51, 63, 79);
				doc.setLineWidth(0.001).line(0.4, y, 7.9, y);				
			}

			//Body
			if (body !=null){
                y = y + 0.15
				doc.setFont("Arial", 'normal');
				doc.setTextColor(51, 63, 79);
				doc.setFontSize(11).text(body, 0.5, y); //3.7
                y= y + 1,3;
			}

			
			//Table
			var height = 0;
			doc.autoTable({
				columns,
				body: data, 
				// headStyles:{
				// 	valign: 'middle',
				// 	halign : 'center'
				// },			
				styles: {
					halign: 'right'
				},	
				margin: { left: 0.5, top: y }			
			});
			
			//Footer
			y= y + (cant*0.4);

			
			
			if (footer!=null){
				//Metodo de pago
				if (footer[0]!=null){
					doc.setFont("Arial", 'normal');
					doc.setTextColor(51, 63, 79);						
					doc.setFontSize(11).text(footer[0], 0.5,y);
				}

				//total parcial
				if (footer[1]!=null){
					doc.setFont("Arial", 'bold');
					doc.setTextColor(31, 56, 100);					
					doc.setFontSize(11).text(footer[1],5.6,y);

					
					doc.setTextColor(51, 63, 79);
					doc.setFontSize(11).text(footer[2],7.9,y, {align: 'right'});

					y= y + 0.05
					doc.setFont("Arial", 'normal');
					doc.setLineWidth(0.001).line(6.7, y, 7.9, y);
				}

				//Descuento
				y= y + 0.3
				if (footer[3]!=null){
					doc.setFont("Arial", 'bold');
					doc.setTextColor(31, 56, 100);					
					doc.setFontSize(11).text(footer[3],5.6,y);
					
					doc.setTextColor(51, 63, 79);
					doc.setFontSize(11).text(footer[4],7.9,y, {align: 'right'});

					y= y + 0.05
					doc.setFont("Arial", 'normal');
					doc.setLineWidth(0.001).line(6.7, y, 7.9, y);
				}	
				
				//Total a pagar
				y= y + 0.3
				if (footer[5]!=null){
					doc.setFont("Arial", 'bold');
					doc.setTextColor(31, 56, 100);					
					doc.setFontSize(11).text(footer[5],5.6,y);

					
					doc.setTextColor(51, 63, 79);
					doc.setFontSize(11).text(footer[6],7.9,y, {align: 'right'});

					y= y + 0.05
					doc.setLineWidth(0.01).line(5.0, y, 7.9, y);
				}	
				//Pagado				
				y= y + 0.3
				if (footer[7]!=null){
					doc.setFont("Arial", 'bold');
					doc.setTextColor(31, 56, 100);					
					doc.setFontSize(14).text(footer[7],5.6,y);

					
					doc.setTextColor(51, 63, 79);
					doc.setFontSize(14).text(footer[8],7.9,y, {align: 'right'});

					y= y + 0.05
					doc.setLineWidth(0.02).line(6.7, y, 7.9, y);
				}		

				y= y + 0.2				
				if (footer[9]!=null){
					doc.setFont("Arial", 'normal');
					doc.setTextColor(51, 63, 79);						
					doc.setFontSize(13).text(footer[9], 0.5,y);
					y= y + 0.05
					doc.setLineWidth(0.01).line(0.5, y, 4.0, y);					
				}			
				
				y= y + 1				
				if (footer[10]!=null){
					doc.setFont("Arial", 'bold');
					doc.setTextColor(51, 63, 79);						
					doc.setFontSize(10).text(footer[10], 4.0,y);
					y= y + 0.05
					doc.setLineWidth(0.01).line(4, y, 6, y);	
				}					

			}

			doc.save(`${name}.pdf`);



				
		}			   
  }
})


			// Using array of sentences
			// doc
			// 	.setFont("helvetica")
			// 	.setFontSize(12)
			// 	.text(moreText, 0.5, 3.5, { align: "left", maxWidth: "7.5" });
      
			// Creating footer and saving file
			// doc
			// 	// .setFont("times")
			// 	// .setFontSize(11)
			// 	// .setFontStyle("italic")
			// 	.setTextColor(0, 0, 255)
			// 	.text(
			// 	companyName,
			// 	0.5,
			// 	doc.internal.pageSize.height - 0.5
			// 	)
			// 	.save(`${name}.pdf`);