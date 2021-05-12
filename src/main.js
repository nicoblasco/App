/* ═ ═ ═ ═ ═ ═ ═ ═ ═ *\
|      CORE LIBS      |
\* ═ ═ ═ ═ ═ ═ ═ ═ ═ */
import 'es6-promise/auto'
//import 'es7-shim'
import _ from 'lodash'
import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import Vuebar from 'vuebar'
import vClickOutside from 'v-click-outside'
import VueFloatLabel from 'vue-float-label'
import VuePerfectScrollbar from './components/vue-ps'
import axios from 'axios'

/* ═ ═ ═ ═ ═ ═ ═ ═ ═ *\
|  THIRD PARTS LIBS   |
\* ═ ═ ═ ═ ═ ═ ═ ═ ═ */
import VueI18n from 'vue-i18n'
import moment from 'moment-timezone'
import Fullscreen from 'vue-fullscreen'
import VueResize from 'vue-resize'
import 'vue-resize/dist/vue-resize.css'
//import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import * as Vue2Leaflet from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import 'flag-icon-css/css/flag-icon.css'
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css'
import 'leaflet-fullscreen/dist/Leaflet.fullscreen'
import * as VueGoogleMaps from 'vue2-google-maps' 
import GmapCluster from 'vue2-google-maps/dist/components/cluster' // replace src with dist if you have Babel issues
import VueGoodTable from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.min.css'
import { StatusIndicator } from 'vue-status-indicator'
/* ═ ═ ═ ═ ═ ═ ═ ═ ═ *\
|     CORE ASSETS     |
\* ═ ═ ═ ═ ═ ═ ═ ═ ═ */
//import './assets/scss/element-variables.scss'
import './assets/scss/global.scss'
import 'flex.box'
import 'animate.css'
//import '../node_modules/mdi/scss/materialdesignicons.scss'
import '../node_modules/@mdi/font/css/materialdesignicons.min.css'
import Affix from './directives/affix'
import App from './App.vue'
import router from './router/' 
import store from './store' 
import i18n_messages from './i18n.json' 


/* ═ ═ ═ ═ ═ ═ ═ ═ ═ *\
|     CUSTOM COMPONENTS    |
\* ═ ═ ═ ═ ═ ═ ═ ═ ═ */
import PageHeader from './components/PageHeader.vue'
import '@/mixins/shared'
import '@/mixins/Customer/customerGeneric'
import '@/mixins/Report/reportGeneric'
//import './vue-error-handler'

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ 
	iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'), 
	iconUrl: require('leaflet/dist/images/marker-icon.png'), 
	shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});
Vue.component('l-map', Vue2Leaflet.LMap)
Vue.component('l-marker', Vue2Leaflet.LMarker)
Vue.component('l-tile-layer', Vue2Leaflet.LTileLayer)
Vue.component('pageheader', PageHeader)

Vue.config.productionTip = false


//axios.defaults.baseURL ='http://104.41.24.57/'
axios.defaults.baseURL ='http://localhost:64440/'

/* ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ *\
|  THIRD PARTS COMPONENTS |
\* ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ ═ */
Vue.component('StatusIndicator', StatusIndicator)
Vue.use(VueGoogleMaps, {
	load: {
		key: 'AIzaSyBC2vJqO-E5kopBBuAJ5a6ag6ugwkeBYds',	
		libraries: 'places', // This is required if you use the Autocomplete plugin
		// OR: libraries: 'places,drawing'
		// OR: libraries: 'places,drawing,visualization'
		// (as you require)
	}
})
Vue.component('GmapCluster', GmapCluster)
Vue.use(VueResize)
Vue.use(Fullscreen)
Vue.use(VueI18n)
Vue.use(VueGoodTable)


/* ═ ═ ═ ═ ═ ═ ═ ═ *\
|  CORE COMPONENTS  |
\* ═ ═ ═ ═ ═ ═ ═ ═ */
Vue.use(Element, {locale})
Vue.use(vClickOutside)
Vue.use(VueFloatLabel)
Vue.use(Vuebar)


Vue.component('vue-scroll', VuePerfectScrollbar)
Vue.directive('affix', Affix)

const i18n = new VueI18n({ locale: 'ar', messages:i18n_messages })


new Vue({
	i18n,
	router,
	store,
	render: h => h(App)
}).$mount('#app')
