import Tipification from '../views/apps/tipification/Tipification.vue'
import Common from '../views/apps/tipification/Common.vue'
import Check from '../views/apps/tipification/CommonWithCheck.vue'
import Dependent from '../views/apps/tipification/Dependent.vue'
import Cascade from '../views/apps/tipification/Cascade.vue'
import Exchange from '../views/apps/tipification/Exchange.vue'

import layouts from '../layout'

export default {
	path: '/tipification',
	name: 'tipification',
	component: Tipification,
	meta: {
		auth: true,
		layout: layouts.navLeft
	},
	children: [
		{
			path: 'pricelist',
			name: 'pricelist',
			component: Common,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				URL_GET: 'api/PriceLists/',
				URL_CREATE: 'api/PriceLists/Create',
				URL_UPDATE: 'api/PriceLists/Update',
				URL_DELETE: 'api/PriceLists/Delete',					
				modelo: {
					id: '',
					description: '',					
					enabled: true
				},
				columns: [
					{
						label: 'Id',
						field: 'id',
						type: 'number',
						tdClass: 'text-center',
						width: '50px',
						filterable: true
					},
					{
						label: 'Lista de Precio',
						field: 'description',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
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
			path: 'salesstate',
			name: 'salesstate',
			component: Common,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				URL_GET: 'api/SalesStates/',
				URL_CREATE: 'api/SalesStates/Create',
				URL_UPDATE: 'api/SalesStates/Update',
				URL_DELETE: 'api/SalesStates/Delete',					
				modelo: {
					id: '',
					description: '',					
					enabled: true
				},
				columns: [
					{
						label: 'Id',
						field: 'id',
						type: 'number',
						tdClass: 'text-center',
						width: '50px',
						filterable: true
					},
					{
						label: 'Estado de Venta',
						field: 'description',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
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
			path: 'concept',
			name: 'concept',
			component: Check,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				URL_GET: 'api/Concepts/',
				URL_CREATE: 'api/Concepts/Create',
				URL_UPDATE: 'api/Concepts/Update',
				URL_DELETE: 'api/Concepts/Delete',					
				modelo: {
					id: '',
					description: '',
					permanent: false,					
					enabled: true
				}			
			}
		},			
		{
			path: 'deliveryturn',
			name: 'deliveryturn',
			component: Common,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				URL_GET: 'api/DeliveryTurns/',
				URL_CREATE: 'api/DeliveryTurns/Create',
				URL_UPDATE: 'api/DeliveryTurns/Update',
				URL_DELETE: 'api/DeliveryTurns/Delete',					
				modelo: {
					id: '',
					description: '',					
					enabled: true
				},
				columns: [
					{
						label: 'Id',
						field: 'id',
						type: 'number',
						tdClass: 'text-center',
						width: '50px',
						filterable: true
					},
					{
						label: 'Turno de Entrega',
						field: 'description',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
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
			path: 'deliverytype',
			name: 'deliverytype',
			component: Common,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				URL_GET: 'api/DeliveryTypes/',
				URL_CREATE: 'api/DeliveryTypes/Create',
				URL_UPDATE: 'api/DeliveryTypes/Update',
				URL_DELETE: 'api/DeliveryTypes/Delete',					
				modelo: {
					id: '',
					description: '',					
					enabled: true
				},
				columns: [
					{
						label: 'Id',
						field: 'id',
						type: 'number',
						tdClass: 'text-center',
						width: '50px',
						filterable: true
					},
					{
						label: 'Tipo de Entrega',
						field: 'description',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
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
			path: 'vouchertype',
			name: 'vouchertype',
			component: Common,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				URL_GET: 'api/VoucherTypes/',
				URL_CREATE: 'api/VoucherTypes/Create',
				URL_UPDATE: 'api/VoucherTypes/Update',
				URL_DELETE: 'api/VoucherTypes/Delete',					
				modelo: {
					id: '',
					description: '',					
					enabled: true
				},
				columns: [
					{
						label: 'Id',
						field: 'id',
						type: 'number',
						tdClass: 'text-center',
						width: '50px',
						filterable: true
					},
					{
						label: 'Tipo de Comprobante',
						field: 'description',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
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
			path: 'brand',
			name: 'brand',
			component: Common,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				URL_GET: 'api/Brands/',
				URL_CREATE: 'api/Brands/Create',
				URL_UPDATE: 'api/Brands/Update',
				URL_DELETE: 'api/Brands/Delete',					
				modelo: {
					id: '',
					description: '',					
					enabled: true
				},
				columns: [
					{
						label: 'Id',
						field: 'id',
						type: 'number',
						tdClass: 'text-center',
						width: '50px',
						filterable: true
					},
					{
						label: 'Marcas',
						field: 'description',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
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
			path: 'paymentmethod',
			name: 'paymentmethod',
			component: Common,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				URL_GET: 'api/PaymentMethods/',
				URL_CREATE: 'api/PaymentMethods/Create',
				URL_UPDATE: 'api/PaymentMethods/Update',
				URL_DELETE: 'api/PaymentMethods/Delete',					
				modelo: {
					id: '',
					description: '',					
					enabled: true
				},
				columns: [
					{
						label: 'Id',
						field: 'id',
						type: 'number',
						tdClass: 'text-center',
						width: '50px',
						filterable: true
					},
					{
						label: 'Metodos de Pago',
						field: 'description',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
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
			path: 'category',
			name: 'category',
			component: Common,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				URL_GET: 'api/Categories/',
				URL_CREATE: 'api/Categories/Create',
				URL_UPDATE: 'api/Categories/Update',
				URL_DELETE: 'api/Categories/Delete',					
				modelo: {
					id: '',
					description: '',					
					enabled: true
				},
				columns: [
					{
						label: 'Id',
						field: 'id',
						type: 'number',
						tdClass: 'text-center',
						width: '50px',
						filterable: true
					},
					{
						label: 'Rubros',
						field: 'description',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
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
			path: 'country',
			name: 'country',
			component: Common,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				URL_GET: 'api/Countries/',
				URL_CREATE: 'api/Countries/Create',
				URL_UPDATE: 'api/Countries/Update',
				URL_DELETE: 'api/Countries/Delete',					
				modelo: {
					id: '',
					description: '',					
					enabled: true
				},
				columns: [
					{
						label: 'Id',
						field: 'id',
						type: 'number',
						tdClass: 'text-center',
						width: '50px',
						filterable: true
					},
					{
						label: 'Paises',
						field: 'description',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
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
			path: 'service',
			name: 'service',
			component: Common,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				URL_GET: 'api/Services/',
				URL_CREATE: 'api/Services/Create',
				URL_UPDATE: 'api/Services/Update',
				URL_DELETE: 'api/Services/Delete',					
				modelo: {
					id: '',
					description: '',					
					enabled: true
				},
				columns: [
					{
						label: 'Id',
						field: 'id',
						type: 'number',
						tdClass: 'text-center',
						width: '50px',
						filterable: true
					},
					{
						label: 'Servicios',
						field: 'description',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
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
			path: 'contacttype',
			name: 'contacttype',
			component: Common,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				URL_GET: 'api/ContactTypes/',
				URL_CREATE: 'api/ContactTypes/Create',
				URL_UPDATE: 'api/ContactTypes/Update',
				URL_DELETE: 'api/ContactTypes/Delete',					
				modelo: {
					id: '',
					description: '',					
					enabled: true
				},
				columns: [
					{
						label: 'Id',
						field: 'id',
						type: 'number',
						tdClass: 'text-center',
						width: '50px',
						filterable: true
					},
					{
						label: 'Tipo de Contacto',
						field: 'description',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
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
			path: 'documenttype',
			name: 'documenttype',
			component: Common,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				URL_GET: 'api/DocumentTypes/',
				URL_CREATE: 'api/DocumentTypes/Create',
				URL_UPDATE: 'api/DocumentTypes/Update',
				URL_DELETE: 'api/DocumentTypes/Delete',					
				modelo: {
					id: '',
					description: '',					
					enabled: true
				},
				columns: [
					{
						label: 'Id',
						field: 'id',
						type: 'number',
						tdClass: 'text-center',
						width: '50px',
						filterable: true
					},
					{
						label: 'Tipo de Documento',
						field: 'description',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
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
			path: 'location',
			name: 'location',
			component: Common,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				URL_GET: 'api/Locations/',
				URL_CREATE: 'api/Locations/Create',
				URL_UPDATE: 'api/Locations/Update',
				URL_DELETE: 'api/Locations/Delete',					
				modelo: {
					id: '',
					description: '',					
					enabled: true
				},
				columns: [
					{
						label: 'Id',
						field: 'id',
						type: 'number',
						tdClass: 'text-center',
						width: '50px',
						filterable: true
					},
					{
						label: 'Ubicaciones',
						field: 'description',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
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
			path: 'salesunit',
			name: 'salesunit',
			component: Common,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				URL_GET: 'api/SalesUnits/',
				URL_CREATE: 'api/SalesUnits/Create',
				URL_UPDATE: 'api/SalesUnits/Update',
				URL_DELETE: 'api/SalesUnits/Delete',					
				modelo: {
					id: '',
					description: '',					
					enabled: true
				},
				columns: [
					{
						label: 'Id',
						field: 'id',
						type: 'number',
						tdClass: 'text-center',
						width: '50px',
						filterable: true
					},
					{
						label: 'Unidad de Venta',
						field: 'description',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
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
			path: 'subcategory',
			name: 'subcategory',
			component: Dependent,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				URL_GET: 'api/SubCategories/',
				URL_CREATE: 'api/SubCategories/Create',
				URL_UPDATE: 'api/SubCategories/Update',
                URL_DELETE: 'api/SubCategories/Delete',	
                URL_GET_PARENT: 'api/Categories/',					
				modelo: {
					id: '',
					description: '',
					parentId: '',				
					enabled: true
				},
				columns: [
					{
						label: 'Id',
						field: 'id',
						type: 'number',
						tdClass: 'text-center',
						width: '50px',
						filterable: true
					},
					{
						label: 'Rubro',
						field: 'parent',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
					},					
					{
						label: 'SubRubro',
						field: 'description',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
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
			path: 'state',
			name: 'state',
			component: Dependent,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				URL_GET: 'api/States/',
				URL_CREATE: 'api/States/Create',
				URL_UPDATE: 'api/States/Update',
                URL_DELETE: 'api/States/Delete',	
                URL_GET_PARENT: 'api/Countries/',					
				modelo: {
					id: '',
					description: '',
					parentId: '',				
					enabled: true
				},
				columns: [
					{
						label: 'Id',
						field: 'id',
						type: 'number',
						tdClass: 'text-center',
						width: '50px',
						filterable: true
					},
					{
						label: 'Pais',
						field: 'parent',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
					},					
					{
						label: 'Provincia',
						field: 'description',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
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
			path: 'city',
			name: 'city',
			component: Cascade,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				URL_GET: 'api/Cities/',
				URL_CREATE: 'api/Cities/Create',
				URL_UPDATE: 'api/Cities/Update',
                URL_DELETE: 'api/Cities/Delete',	
				URL_GET_GRANDPARENT: 'api/Countries/',					
				URL_GET_PARENT: 'api/States/GetByCountry/',
				modelo: {
					id: '',
					description: '',
					parentId: '',
					grandParentId:'',				
					enabled: true
				},
				columns: [
					{
						label: 'Id',
						field: 'id',
						type: 'number',
						tdClass: 'text-center',
						width: '50px',
						filterable: true
					},
					{
						label: 'Pais',
						field: 'grandParent',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
					},					
					{
						label: 'Provincia',
						field: 'parent',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
					},
					{
						label: 'Localidad',
						field: 'description',
						type: 'text',
						tdClass: 'text-left',
						filterable: true
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
			path: 'exchangecurrency',
			name: 'exchangecurrency',
			component: Exchange,
			meta: {
				auth: true,
				layout: layouts.navLeft,
				searchable: true,
				URL_GET: 'api/ExchangeCurrencies/',
				URL_CREATE: 'api/ExchangeCurrencies/Create',
				URL_UPDATE: 'api/ExchangeCurrencies/Update',
				URL_DELETE: 'api/ExchangeCurrencies/Delete',					
				modelo: {
					id: '',
					description: '',	
					quote: 0,
					dateEnd: Date,
					enabled: true
				},			
			}
		},				
	]
}

