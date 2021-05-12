import Vue from 'vue'
import axios from 'axios'

Vue.mixin({
    data() {
        return {
            URL_GET_CUSTOMERS: 'api/Customers/',
            URL_GET_CUSTOMER: 'api/Customers/GetCustomer/'    
        };
      },
    methods: {
     async  getCustomerGeneric(id){
        let me = this;
        await axios
            .get(this.URL_GET_CUSTOMER +id)
            .then(function(response) {
                debugger
            return response.data
            })
            .catch(function(error) {
            me.showError();
            });
        },
		 getCustomersGeneric(companyId) {
			let me = this;
			let url = me.URL_GET_CUSTOMERS+ parseInt(companyId);
		    axios.get(url)
			.then(function(response) {
			    return response.data;
			})
			.catch(function(error) {
			me.showError();
			});
		}, 	        
    }

})        