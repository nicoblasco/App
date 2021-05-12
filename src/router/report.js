import Report from '../views/apps/report/Report.vue'
import Customer from '../views/apps/report/CustomerDetail.vue'
import Daily from '../views/apps/report/Daily.vue'
import layouts from '../layout'

export default {
	path: '/report',
	name: 'report',
	component: Report,
	meta: {
		auth: true,
		layout: layouts.navSystem,
	},
	children: [
		{
			path: 'customer',
			name: 'customer',
			component: Customer,
			meta: {
				auth: true,
				layout: layouts.navSystem,
				searchable: true,
                URL_GET_CUSTOMERS: 'api/Customers/',
				URL_GET_CUSTOMER: 'api/Customers/GetCustomer/',
                URL_GET_CONCEPTS: 'api/Concepts/',
				URL_CREATE_PAYMENT: 'api/Payments/CreatePayment',	
				URL_GET_PAYMENTMETHODS: 'api/PaymentMethods/',		
				URL_GET_SYSTEMCUSTOM: 'api/SystemCustoms/',	
				URL_GET_COMPANY: 'api/Companies/',
				modelo: {
					id: '',
					conceptName: '',					
					year: '',
					month:'',
					price: '',
					remainder: '',
					amount: 0
				},
				columns: [
					{
						label: 'Id',
						field: 'noveltyId',
						type: 'number',
						tdClass: 'text-center',
						width: '50px',
						filterable: true
					},				
					{
						label: 'Año',
						field: 'year',
						type: 'number',
						tdClass: 'text-left',
						width: '50px',
						filterable: true
					},	
					{
						label: 'Mes',
						field: 'month',
						type: 'number',
						tdClass: 'text-left',
						width: '50px',
						filterable: true
					},											
					{
						label: 'Concepto',
						field: 'conceptName',
						type: 'text',
						tdClass: 'text-left',
						
						filterable: true
					},	
					{
						label: 'Valor',
						field: 'price',
						type: 'number',
						tdClass: 'text-left',
						width: '50px',
						filterable: false
					},	
					{
						label: 'Adeuda',
						field: 'remainder',
						type: 'number',
						tdClass: 'text-left',
						width: '50px',
						filterable: false
					},															
					{
						label: 'Acciones',
						field: 'actions',
						width: '180px',
						tdClass: 'text-left',
						html: true
					}  				
				]				
			}
		},
		{
			path: 'daily',
			name: 'daily',
			component: Daily,
			meta: {
				auth: true,
				layout: layouts.navSystem,
				searchable: true,
                URL_GET_CUSTOMERS: 'api/Customers/',
				URL_GET_CUSTOMER: 'api/Customers/GetCustomer/',
				URL_GET_PAYMENT: 'api/Payments/',
				URL_GET_COMPANY: 'api/Companies/',
                URL_GET_PAYMENTMETHODS: 'api/PaymentMethods/',
				URL_UPDATE_PAYMENT: 'api/Payments/Update',
				URL_DELETE: 'api/Payments/Delete/',	
				modelo: {
					id: '',
					description: '',					
					enabled: true
				},
				columns: [
					{
						label: 'Id',
						field: 'paymentId',
						type: 'number',
						tdClass: 'text-center',
						width: '50px',
						filterable: true
					},
					{
						label: 'Fecha de Pago',
						field: 'paymentDate',
						type: 'text',
						tdClass: 'text-left',
						width: '150px',
						filterable: false
					},	
					{
						label: 'Factura',
						field: 'invoice',
						type: 'text',
						tdClass: 'text-left',
						width: '50px',
						filterable: true
					},										
					{
						label: 'Cliente',
						field: 'customerName',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
					},												
					{
						label: 'Medio de Pago',
						field: 'paymentMethod',
						type: 'text',
						tdClass: 'text-left',
						width: '150px',
						filterable: false
					},	
					{
						label: 'Total',
						field: 'total',
						type: 'number',
						tdClass: 'text-left',
						width: '70px',
						filterable: false
					},															
					{
						label: 'Acciones',
						field: 'actions',
						width: '150px',
						tdClass: 'text-left',
						html: true
					}  				
				]				
			}
		}
	]
}

