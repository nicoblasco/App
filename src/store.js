import Vue from 'vue'
import Vuex from 'vuex'
import decode from 'jwt-decode'
import createPersistedState from 'vuex-persistedstate'
import router from './router/index'
import axios from 'axios'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'
const URL_USER_GETCONF='api/SecurityUsers/GetConfiguration/'

export default new Vuex.Store({
	state: {
		layout: {
			navPos: 'left', //top, bottom, left, right, false
			toolbar: 'top', //top, bottom, false
			footer: false, //above, below, false
			boxed: false, //true, false
			roundedCorners: false, //true, false
			viewAnimation: 'fade-top', // fade-left, fade-right, fade-top, fade-top-in-out, fade-bottom, fade-bottom-in-out, fade, false
			layoutPicker: true //false, true
		},

		splashScreen: true,
		token: null,
		usuario: null,    		
		logged: null,
		userConfiguration: null,
		userActions:null,
	},
	mutations: {
		setConfiguration(state,payload ){	
			state.userConfiguration =payload
		},
		setLayout(state, payload) {
			if(payload && payload.navPos !== undefined)
				state.layout.navPos = payload.navPos

			if(payload && payload.toolbar !== undefined)
				state.layout.toolbar = payload.toolbar
				
			if(payload && payload.footer !== undefined)
				state.layout.footer = payload.footer
		
			if(payload && payload.boxed !== undefined)
				state.layout.boxed = payload.boxed

			if(payload && payload.roundedCorners !== undefined)
				state.layout.roundedCorners = payload.roundedCorners

			if(payload && payload.viewAnimation !== undefined)
				state.layout.viewAnimation = payload.viewAnimation

			if(payload && payload.layoutPicker !== undefined)
				state.layout.layoutPicker = payload.layoutPicker				
		},
		setLogin(state, payload) {		
			state.logged = true
		},
		setLogout(state, payload) {
			state.layout.navPos = null
			state.layout.toolbar = null
			state.logged = false
			state.token=null
			state.usuario=null
			localStorage.removeItem("tokenSales")			
		},
		setToken (state,token){ 
			state.token=token
			state.logged = true
		},
		setUsuario (state,usuario){
			state.usuario=usuario
		},		
		setSplashScreen(state, payload) {
			state.splashScreen = payload
		},
		sortBy: function(sortKey){
			debugger
			const names = this.fields
			names.sort((a, b) => {
				var compare = 0;
				if (a[sortKey] > b[sortKey]) {
					compare = 1;
				} else if (b[sortKey] > a[sortKey]) {
					compare = -1;
				}
				return compare;
			});
			this.fields = names;
		},		
	},
	actions: {
		guardarToken({commit},token){  
			commit("setToken", token)
			commit("setUsuario", decode(token))
		    localStorage.setItem("tokenSales", token)
			if (token){	
				
				axios.get(URL_USER_GETCONF + this.state.usuario.Id).then (function(response){				
					commit("setConfiguration",response.data)
				}).catch (function (error){
						console.log(error)
				})
			}
			
		  },
		  autoLogin({commit, dispatch}){		  
			let token = localStorage.getItem("tokenSales")
			if (token){				
			  commit("setToken", token)
			  commit("setUsuario", decode(token))
			  dispatch('fetchUserConfig');
			  router.push({name: 'dashboard'})
			}
			else
			{
				router.push({name: 'login'})
			}
			 //.catch (err=>{})  
		  },
		  salir({commit}){
			commit("setToken", null)
			commit("setUsuario", null)
			localStorage.removeItem("tokenSales")
			router.push({name: 'login'})
		  },
		  fetchUserConfig({commit,state}) {		
			axios.get(URL_USER_GETCONF + state.usuario.Id).then (function(response){				
				commit("setConfiguration",response.data)
			}).catch (function (error){
					console.log(error)
			})
					  
		  }		  
	},
	getters: {
		layout(state, getters) {
			return state.layout
		},
		navPos(state, getters) {
			return state.layout.navPos
		},
		toolbar(state, getters) {			
			return state.layout.toolbar
		},
		footer(state, getters) {
			return state.layout.footer
		},
		boxed(state, getters) {
			return state.layout.boxed
		},
		roundedCorners(state, getters) {
			return state.layout.roundedCorners
		},
		viewAnimation(state, getters) {
			return state.layout.viewAnimation
		},
		layoutPicker(state, getters) {
			return state.layout.layoutPicker
		},
		isLogged(state, getters) {
			return state.logged
		},
		splashScreen(state, getters) {
			return state.splashScreen
		},
		user (state, getters) {
			return state.usuario
		},	
		userProfile(state, getters) {
		 	return state.userConfiguration
		 }
		 
	},
	plugins: [createPersistedState({paths: ['layout']})],
	strict: debug
})
