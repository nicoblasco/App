import Sale from '../views/pages/sales/SaleNew.vue'

import layouts from '../layout'

//Hay q parametrizar: 
export default {
	path: '/sale/new',
	name: 'sales',
	component: Sale,
	meta: {
		auth: true,
		layout: layouts.navSales,		
		searchable: true,		
		URL_GET: 'api/Products/',
		URL_CREATE: 'api/Products/Create',
		URL_UPDATE: 'api/Products/Update',
		URL_DELETE: 'api/Products/Delete',	
		URL_GET_PRODUCTS: 'api/Products/',
		URL_GET_CUSTOMERS: 'api/Customers/',
		URL_GET_VOUCHER_TYPE: 'api/VoucherTypes/',
		URL_GET_DELIVERY_TYPE: 'api/DeliveryTypes/',
		URL_GET_PRICE_LIST: 'api/PriceLists/',
		URL_GET_DELIVERY_TURN: 'api/DeliveryTurns/',
		URL_GET_PAYMENT_METHODS: 'api/PaymentMethods/',		
		modelo: {
			id: null,
			customerId: null,
			voucherType: null,
			datetime: null,
			paymentId: null,
			priceListId: null,
			deliveryTypeId: null,
			priceListIds: null,
			address: null,
			deliveryDate: null,
			turnId: null,
			code: null,
			quantity: 1,
			price: null,
			discount: null,
			subtotal:null,
			total: null,
			validacionOK: false

		}
			
    }       
    
}