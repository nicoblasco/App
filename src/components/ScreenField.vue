<template>    
      <el-row class="mt-5" :gutter="5">
        <el-col :xs="24" :sm="12" :md="6" :lg="4" :xl="4">
          <input
            placeholder="Nombre"
            v-model="field.name"

          />
        </el-col>
        <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
          <el-switch inactive-text class="mr-20 themed" 
           v-model="field.required" active-text="Requerido"
          ></el-switch>
        </el-col>
        <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
          <input
            placeholder="Field"
            v-model="field.fieldName"
          />
        </el-col>        
        <el-col :xs="24" :sm="12" :md="4" :lg="3" :xl="3">
          <el-switch inactive-text class="mr-20 themed" 
          v-model="field.enabled" active-text="Activo"
          ></el-switch>
        </el-col>
        <el-col :xs="24" :sm="12" :md="4" :lg="3" :xl="3">
          <el-switch inactive-text class="mr-20 themed" 
          v-model="field.visible" active-text="Visible"
          ></el-switch>
        </el-col>        
        <el-col :xs="24" :sm="12" :md="4" :lg="3" :xl="3">
          <input
            placeholder="Valor"
            v-model="field.defaultValue"
          />
        </el-col>
        <el-col :xs="24" :sm="12" :md="4" :lg="2" :xl="2">
          <input
            placeholder="Orden"
            type="number"
            v-model="field.orden"
          />
        </el-col>        
        <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1" v-if="!isinvisible">
          <el-button type="danger"  icon="el-icon-delete" v-on:click="$emit('deletefield')"></el-button>
        </el-col>        
      </el-row>
</template>

<script>
export default {  
  name: "ScreenField",  
  props: {  
      field: {
        id: Number,
        name: String,
        required: Boolean,
        fieldName: String,
        enabled: Boolean,        
        visible: Boolean,
        orden: Number,
        defaultValue: String,
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