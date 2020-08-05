import Product from '../views/pages/Product.vue'

import layouts from '../layout'

export default {
	path: '/product',
	name: 'product',
	component: Product,
	meta: {
		auth: true,
		layout: layouts.navLeft,		
		searchable: true,
		URL_GET: 'api/Products/',
		URL_CREATE: 'api/Products/Create',
		URL_UPDATE: 'api/Products/Update',
		URL_DELETE: 'api/Products/Delete',	
		URL_GET_CATEGORIES: 'api/Categories/GetComboFull/',
		URL_GET_BRANDS: 'api/Brands/',
		URL_GET_PROVIDERS: 'api/Providers/',
		URL_GET_LOCATIONS: 'api/Locations/',
		URL_GET_PRICE_LISTS: 'api/PriceLists/',
		modelo: {
			id: null,
			codigo: null,
			name: null,
			nameShort: null,
			description: null,
			categororyId: null,
			subCategoryId: null,
			priceListIds: null,
			brandId: null,
			locationId: null,
			stock: null,
			stockMin: null,
			cost: null,
			gain: null,
			price: null,
			exchangeCurrencyId: null,
			discount: null,
			inStock: null,
			awaiting: null,
			outOfStock: null,
			logo: null,
			logoName: null,
			checkStock: false,
			enabled: null
		}
			
    }       
    
}