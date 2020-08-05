<template>    
      <el-row class="mt-10" :gutter="20">
        <el-col :xs="24" :sm="12" :md="6" :lg="4" :xl="4">
          <input
            placeholder="Nombre"
            v-model="line.description"

          />
        </el-col>
        <el-col :xs="24" :sm="12" :md="4" :lg="2" :xl="2">
          <el-switch inactive-text class="mr-20 themed" 
           v-model="line.enabled"
          ></el-switch>
        </el-col>
        <el-col :xs="24" :sm="12" :md="4" :lg="2" :xl="2">
          <el-switch inactive-text class="mr-20 themed" v-if="isvisible"
          v-model="line.isDefault"
          ></el-switch>
        </el-col>
        <el-col :xs="24" :sm="12" :md="4" :lg="3" :xl="3">
          <input
            placeholder="Tabla"
            v-model="line.entity"
          />
        </el-col>
        <el-col :xs="24" :sm="12" :md="4" :lg="3" :xl="3">
          <input v-if="isvisible"
            placeholder="Path"
            v-model="line.path"
          />
        </el-col>
        <el-col :xs="24" :sm="12" :md="4" :lg="3" :xl="3">
          <input
            placeholder="Icono"
            v-model="line.icon"
          />
        </el-col>
        <el-col :xs="24" :sm="12" :md="4" :lg="2" :xl="2">
          <input
            placeholder="Orden"
            type="number"
            v-model="line.orden"
          />
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1" v-if="line.id!=null &&  enablechild">
          <el-button type="success"  icon="el-icon-plus" v-on:click="$emit('addchild')"></el-button>
        </el-col>
        <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1" v-if="line.id===null">
          <el-button type="primary"  icon="el-icon-check" v-on:click="$emit('addparent')"></el-button>
        </el-col>        
        <el-col :xs="2" :sm="2" :md="2" :lg="1" :xl="1" v-if="isvisible">
          <el-button type="danger"  icon="el-icon-delete" v-on:click="$emit('deletechild')"></el-button>
        </el-col>        
      </el-row>
</template>

<script>
export default {  
  name: "Screen",  
  props: {  
      line: {
        description: String,
        entity: String,
        enabled: Boolean,
        icon: String,
        id: Number,
        isDefault: Boolean,
        orden: Number,
        parentId: Number,
        path: String
      },
      enablechild: Boolean,
      isvisible:Boolean
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