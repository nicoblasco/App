<template>    
      <el-row class="mt-10" :gutter="20">
        <el-col :xs="24" :sm="12" :md="6" :lg="4" :xl="4">
          <input
            placeholder="Codigo"
            v-model="action.code"
          />
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <input
            placeholder="Descripcion"
            v-model="action.description"            
          />
        </el-col>        
     
        <el-col :xs="24" :sm="12" :md="4" :lg="3" :xl="3">
          <el-switch inactive-text class="mr-20 themed" 
          v-model="action.enabled" active-text="Activo"
          ></el-switch>
        </el-col>    
        <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1" v-if="!isinvisible">
          <el-button type="danger"  icon="el-icon-delete" v-on:click="$emit('deleteaction')"></el-button>
        </el-col>        
      </el-row>
</template>

<script>
export default {  
  name: "Actions",  
  props: {  
      action: {
        id: Number,
        code: String,
        description: String,
        enabled: Boolean,        
        systemScreenId: Number
      },
      isinvisible: Boolean
    },
computed: {    
  inputListeners: function () {
    var vm = this
    return Object.assign({},
          this.$listeners,{
          input: function (event) {
            vm.$emit('input', event.target.value)
          }
        }
    )
  }
}
};
</script>