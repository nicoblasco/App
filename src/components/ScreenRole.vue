<template>    
      <el-row class="mt-10" :gutter="50">
        <el-col :xs="24" :sm="12" :md="4" :lg="4" :xl="4">
          <el-switch class="mr-20 themed" 
          v-model="line.enabled"
         v-on:change="$emit('changeSwitch')">
          </el-switch>
        </el-col>          
        <el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8">
            <h4 style="margin-top: 2px;">{{line.screenName}}</h4>
        </el-col>


        <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1" >
          <el-button type="success"  icon="el-icon-arrow-right" v-on:click="$emit('viewActions')" :disabled="!line.enabled"></el-button>
        </el-col>        
      </el-row>
</template>

<script>
export default {  
  name: "ScreenRole",  
  props: {  
      line: {
        enabled: Boolean,
        systemRoleid: Number,
        systemScreenId: Number,
        screenName: String,
        parentId: Number
      }
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