<template> 
	<el-row :gutter="20" >
		<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
			<el-select 
				v-model="price.PriceList" 
				size="small"
				placeholder="Lista De Precio" 
				clearable
				class="themed" 
				:popper-class="'themed color-accent-'+colorAccent">
			<el-option v-for="(i, index) in pricelists" :key="index" :label="i.description" :value="i.id"></el-option>
	        </el-select>										
		</el-col>
		<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
			<div class="number-input">
			<el-input-number  size="small" v-model="price.Price" controls-position="right" :min="0" class="themed mr-10 mb-10" style="width: auto"></el-input-number>
			</div>										
		</el-col>
		<el-col :xs="24" :sm="2" :md="2" :lg="2" :xl="2">
			<el-button type="primary" icon="el-icon-plus" v-on:click="$emit('addprice')" size="mini" circle ></el-button>
		</el-col>         
        <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1" v-if="price.isDefault==false" style="padding-left: 0px">
          <el-button type="danger"  icon="el-icon-delete" v-on:click="$emit('deleteprice')"  size="mini" circle></el-button>
        </el-col>        
      </el-row>
</template>
<script>
import _ from 'lodash'

export default {
	name: 'NewPriceList',
	props: ['pricelists','price'],
	data () {
		return {
		}
	},
	computed: {
		colorAccent() {
			return this.$store.getters.colorAccent
		}        
	},
	methods: {
		kebabCase: _.kebabCase	
	}

}
</script>