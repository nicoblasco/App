<template>    
      <el-row class="mt-10" :gutter="20">
        <el-col :xs="24" :sm="12" :md="6" :lg="5" :xl="5">
          <input
            placeholder="Nombre"
            v-model="role.name"

          />
        </el-col>
        <el-col :xs="24" :sm="12" :md="6" :lg="6" :xl="6">
          <input
            placeholder="Descripcion"
            v-model="role.description"

          />
        </el-col>        
     
        <el-col :xs="24" :sm="12" :md="4" :lg="3" :xl="3">
          <el-switch inactive-text class="mr-20 themed" 
          v-model="role.enabled" active-text="Activo"
          ></el-switch>
        </el-col>    
        <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1" v-if="!isinvisible">
          <el-button type="danger"  icon="el-icon-delete" v-on:click="$emit('deleterole')"></el-button>
        </el-col>        
      </el-row>
</template>

<script>
export default {  
  name: "Roles",  
  props: {  
      role: {
        id: Number,
        name: String,
        description: String,
        enabled: Boolean
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