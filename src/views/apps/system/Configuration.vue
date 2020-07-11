

<template>
  <vue-scroll class="page-ecommerce-new-product">
    <el-steps :active="active" finish-status="success">
      <el-step title="Pantallas"></el-step>
      <el-step title="Atributos"></el-step>
      <el-step title="Acciones"></el-step>
      <el-step title="Roles"></el-step>
      <el-step title="Roles y Acciones"></el-step>
    </el-steps>

    <el-button style="margin-top: 12px; margin-botton: 12px" @click="next" v-if="this.active <= 4">Siguiente</el-button>

    <div id="stepScreen" v-if="active ==0">
      <el-row class="mt-20">
        <el-col>
          <div class="item-box p-30 card-shadow--small b-rad-4">
            <el-row>
              <el-col :lg="20">
                <div class="meta-form">
                  <h3 class="m-0">Pantallas</h3>
                </div>
              </el-col>
              <el-col :lg="4">
                <el-button type="primary" plain @click="newMenuScreen()">Nuevo Menu</el-button>
              </el-col>
            </el-row>
            <el-row class="mt-30" :gutter="20">
              <el-col :xs="24" :sm="12" :md="6" :lg="4" :xl="4">
                <span>Nombre</span>
              </el-col>
              <el-col :xs="24" :sm="12" :md="4" :lg="2" :xl="2">
                <span>Activo</span>
              </el-col>
              <el-col :xs="24" :sm="12" :md="4" :lg="2" :xl="2">
                <span>Default</span>
              </el-col>
              <el-col :xs="24" :sm="12" :md="4" :lg="3" :xl="3">
                <span>Tabla</span>
              </el-col>
              <el-col :xs="24" :sm="12" :md="4" :lg="3" :xl="3">
                <span>Path</span>
              </el-col>
              <el-col :xs="24" :sm="12" :md="4" :lg="3" :xl="3">
                <span>Icono</span>
              </el-col>
              <el-col :xs="24" :sm="12" :md="4" :lg="3" :xl="3">
                <span>Orden</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :lg="24">
                <div class="meta-form scroll-screen">
                  <div v-for="(item,index) in menuScreens" :key="index">
                    <screen
                      v-bind:line="item"
                      v-bind:enablechild="true"
                      :isvisible="true"
                      v-on:addchild="handleChild(item.id)"
                      v-on:deletechild="handleDelete(item)"
                      v-on:addparent="handleParent(item)"
                    ></screen>
                    <div v-for="(child,index) in childScreens(item.id)" :key="index">
                      <screen
                        :line="child"
                        v-bind:enablechild="true"
                        v-bind:isvisible="true"
                        v-on:addchild="handleChild(child.id)"
                        v-on:addparent="handleParent(child)"
                        v-on:deletechild="handleDelete(child)"
                        class="margin-screenChild"
                      ></screen>
                      <div v-for="(lastchild,index) in childScreens(child.id)" :key="index">
                        <screen
                          :line="lastchild"
                          v-bind:enablechild="true"
                          v-bind:isvisible="true"
                          v-on:addchild="handleChild(lastchild.id)"
                          v-on:addparent="handleParent(lastchild)"
                          v-on:deletechild="handleDelete(lastchild)"
                          class="margin-screenChildLast"
                        ></screen>
                        <div v-for="(last,index) in childScreens(lastchild.id)" :key="index">
                          <screen
                            :line="last"
                            v-bind:enablechild="false"
                            v-bind:isvisible="true"
                            class="margin-screenLast"
                            v-on:addchild="handleChild(last.id)"
                            v-on:addparent="handleParent(last)"
                            v-on:deletechild="handleDelete(last)"
                          ></screen>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>


    <div id="stepAtributos" v-if="active ==1">
      <el-row class="tac">
        <el-col :span="5">
          <h5>Atributos</h5>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          
            <el-submenu v-for="item in menuScreens" :key="item.id" :index="`${item.id}`">
              <template slot="title">
                <i :class="item.icon" ></i>
                <span>{{item.description}}</span>
              </template>
              <el-submenu  v-for="second in subMenu(item.id)" :key="second.id" :index="`${second.id}`">
                <template slot="title">
                  <i :class="second.icon" ></i>
                  <span>{{second.description}}</span>
                </template>
                <el-submenu  v-for="third in subMenu(second.id)" :key="third.id" :index="`${third.id}`">
                  <template slot="title">
                    <i :class="third.icon" ></i>
                    <span>{{third.description}}</span>
                  </template>
                  <el-menu-item :index="`${fchild.id}`"  @click="handleClikMenu(fchild)" v-for="fchild in itemMenu(third.id)" :key="fchild.id">
                    <i :class="fchild.icon" ></i>
                    <span>{{fchild.description}}</span>
                  </el-menu-item>     
                </el-submenu>
                <el-menu-item :index="`${tchild.id}`"   @click="handleClikMenu(tchild)" v-for="tchild in itemMenu(second.id)" :key="tchild.id">
                  <i :class="tchild.icon" ></i>
                  <span>{{tchild.description}}</span>
                </el-menu-item>                
              </el-submenu>
                <el-menu-item :index="`${schild.id}`"   @click="handleClikMenu(schild)" v-for="schild in itemMenu(item.id)" :key="schild.id">
                  <i :class="schild.icon" ></i>
                  <span>{{schild.description}}</span>
                </el-menu-item>
            </el-submenu> 
          </el-menu>  
        </el-col>
        <el-col :span="19" v-if="attributeScreenActive>0">
          <div class="item-box p-10 card-shadow--small b-rad-4 scroll-screen">
            <el-row>
              <div class="meta-form scroll-screen">             
                    <el-row>
                      <el-col :lg="4">
                        <el-button type="success" icon="el-icon-plus" size="mini" @click="newField(attributeScreenActive)"></el-button>
                      </el-col>
                    </el-row>                
                  <div v-for="item in fieldsactive" :key="item.id">                   
                      <screenfield
                        v-bind:field="item"
                        v-on:deletefield="handleDeleteField(item)"
                      ></screenfield>
                  </div>
              </div>
            </el-row> 
          </div>         
        </el-col>
      </el-row>          
    </div>


    <div id="stepAcciones" v-if="active ==2">
      <el-row class="tac">
        <el-col :span="5">
          <h5>Acciones</h5>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            >
          
            <el-submenu v-for="item in menuScreens" :key="item.id" :index="`${item.id}`">
              <template slot="title">
                <i :class="item.icon" ></i>
                <span>{{item.description}}</span>
              </template>
              <el-submenu  v-for="second in subMenu(item.id)" :key="second.id" :index="`${second.id}`">
                <template slot="title">
                  <i :class="second.icon" ></i>
                  <span>{{second.description}}</span>
                </template>
                <el-submenu  v-for="third in subMenu(second.id)" :key="third.id" :index="`${third.id}`">
                  <template slot="title">
                    <i :class="third.icon" ></i>
                    <span>{{third.description}}</span>
                  </template>
                  <el-menu-item :index="`${fchild.id}`"  @click="handleClikMenu(fchild)" v-for="fchild in itemMenu(third.id)" :key="fchild.id">
                    <i :class="fchild.icon" ></i>
                    <span>{{fchild.description}}</span>
                  </el-menu-item>     
                </el-submenu>
                <el-menu-item :index="`${tchild.id}`"   @click="handleClikMenu(tchild)" v-for="tchild in itemMenu(second.id)" :key="tchild.id">
                  <i :class="tchild.icon" ></i>
                  <span>{{tchild.description}}</span>
                </el-menu-item>                
              </el-submenu>
                <el-menu-item :index="`${schild.id}`"   @click="handleClikMenu(schild)" v-for="schild in itemMenu(item.id)" :key="schild.id">
                  <i :class="schild.icon" ></i>
                  <span>{{schild.description}}</span>
                </el-menu-item>
            </el-submenu> 
          </el-menu>  
        </el-col>
        <el-col :span="19" v-if="attributeScreenActive>0">
          <div class="item-box p-10 card-shadow--small b-rad-4 scroll-screen">
            <el-row>
              <div class="meta-form scroll-screen">             
                    <el-row>
                      <el-col :lg="4">
                        <el-button type="success" icon="el-icon-plus" size="mini" @click="newAction(attributeScreenActive)"></el-button>
                      </el-col>
                    </el-row>                
                  <div v-for="item in actionsactive" :key="item.id">                   
                  <action
                    v-bind:action="item"
                    v-on:deleteaction="handleDeleteAction(item)"
                  ></action>
                  </div>
              </div>
            </el-row> 
          </div>         
        </el-col>
      </el-row>          
    </div>    

    <div id="stepRoles" v-if="active ==3">
      <el-row class="mt-20">
        <el-col>
          <div class="item-box p-30 card-shadow--small b-rad-4">
            <el-row>
              <el-col :lg="20">
                <div class="meta-form">
                  <h3 class="m-0">Roles</h3>
                </div>
              </el-col>
              <el-col :lg="4">
                <el-button type="primary" plain @click="newRole()">Nuevo Rol</el-button>
              </el-col>
            </el-row>
            <el-row>
              <el-col :lg="24">
                <div class="meta-form scroll-screen">
                  <div v-for="(item,index) in rolesfilter" :key="index">
                    <role
                      v-bind:role="item"
                      v-on:deleterole="handleDeleteRole(item)"
                    ></role>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>

    <div id="stepRolesAcciones" v-if="active ==4">
      <div class="item-box p-30 card-shadow--small b-rad-4 scroll-screen">
            <h3 class="m-0">Acciones del Rol</h3>
            <!-- select del Rol -->
            <el-select v-model="rolselected" placeholder="Roles" v-on:change="handleChangeRol">
              <el-option
                v-for="item in roles"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
              
            </el-select>

            <!-- Aca muestro el arbol de pantallas -->
            <el-row>
              <el-col :lg="12">
                <div class="meta-form scroll-screen">
                  <div v-for="(item,index) in menuScreensRole" :key="index">
                    <screenact
                      v-bind:line="item"
                      v-on:viewActions="handleViewAction(item.systemScreenId)"
                      v-on:changeSwitch="handleChangeScreen(item)"
                    ></screenact>
                    <div v-for="(child,index) in childScreensRole(item.systemScreenId)" :key="index">
                      <screenact
                        :line="child"
                        v-on:viewActions="handleViewAction(child.systemScreenId)"
                        v-on:changeSwitch="handleChangeScreen(child)"
                        class="margin-screenChild"
                      ></screenact>
                      <div v-for="(lastchild,index) in childScreensRole(child.systemScreenId)" :key="index">
                        <screenact
                        :line="lastchild"
                        v-on:viewActions="handleViewAction(lastchild.systemScreenId)"
                        v-on:changeSwitch="handleChangeScreen(lastchild)"
                          class="margin-screenChildLast"
                        ></screenact>
                        <div v-for="(last,index) in childScreensRole(lastchild.systemScreenId)" :key="index">
                          <screenact
                            :line="last"
                            v-on:viewActions="handleViewAction(last.systemScreenId)"
                            v-on:changeSwitch="handleChangeScreen(last)"
                            class="margin-screenLast"
                          ></screenact>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-col>
              <el-col :lg="12">
                <div class="meta-form scroll-screen">
                  <div v-for="(item,index) in menuActionsRole" :key="index">
                    <el-row style="padding:2px">
                      <el-col :lg="14">
                        <span>{{item.actionDescription}}</span>  
                      </el-col>
                     <el-col :lg="6">
                        <el-switch class="mr-20 themed" 
                        v-model="item.enabled">
                        </el-switch>
                      </el-col>
                      
                    </el-row>
                  </div>
                </div>
                  
              </el-col>
            </el-row>                       
      </div>
    </div>      
    <div id="stepFinish" v-if="active ==5">
      <div>
        <img src="../../../../public/static/images/all/sucess.png" class="imagen">
      </div>
    </div>     
  </vue-scroll>
</template>
<script>
import axios from "axios";
import screen from "../../../components/Screen.vue";
import screenfield from "../../../components/ScreenField.vue";
import action from "../../../components/Actions.vue";
import role from "../../../components/Role.vue";
import screenact from "../../../components/ScreenRole.vue";
import { Loading } from 'element-ui';

export default {
  name: "configuration",
  components: {
    screen,
    screenfield,
    action, 
    role,screenact
  },

  data() {
    return {
      URL_GET_SCREEN: "api/SystemScreens",
      URL_GET_FIELDS: "api/SystemScreenFields",
      URL_GET_ACTIONS: "api/SystemActions",
      URL_GET_ROLES: "api/SystemRoles",
      URL_GET_ROLESACTIONS: "api/SystemRoleActions",
      URL_GET_ROLESSCREENS: "api/SystemRoleScreens",
      URL_CREATE_SCREEN: "api/SystemScreens/Create",
      URL_UPDATE_SCREEN: "api/SystemScreens/Update",
      URL_UPDATE_FIELD: "api/SystemScreenFields/Update",
      URL_UPDATE_ACTION: "api/SystemActions/Update",
      URL_UPDATE_ROLES: "api/SystemRoles/Update",
      URL_UPDATE_ROLESACTIONS: "api/SystemRoleActions/Update",
      URL_UPDATE_ROLESSCREENS: "api/SystemRoleScreens/Update",
      active: 0,
      isOk: false,
      selected: {},
      screens: [],
      fields: [],
      actions: [],
      roles: [],
      rolesactions: [],
      rolesscreens: [],
      loading: 0,
      attributeScreenActive:0,
      rolselected: '',
      screenselected: '',
    };
  },
  computed: {
    menuScreens: function() {
      return this.screens.filter(
        x => x.parentId == null && x.isRemoved == false
      );
    },
    menuScreensRole: function() {
      return this.rolesscreens.filter(
        x => x.systemRoleId ===this.rolselected && x.parentId==null
      );
    },    
    menuActionsRole: function() {
      return this.rolesactions.filter(
        x => x.systemRoleId ===this.rolselected && x.systemScreenId===this.screenselected
      );
    },     
    screensfields: function() {
      
      return this.screens.filter(x => x.path != null && x.isRemoved == false).sort(x=>x.name);
    },
    fieldsactive: function() {      
      return this.fields.filter(x => x.systemScreenId === this.attributeScreenActive && x.isRemoved == false);
    },
    actionsactive: function() {      
      return this.actions.filter(x => x.systemScreenId === this.attributeScreenActive && x.isRemoved == false);
    },
    screensactions: function() {
      
      return this.screens.filter(x => x.isRemoved == false);
    },    
    rolesfilter: function() {
        return this.roles.filter(x => x.isRemoved == false);
    }
  },
  created() {
    this.getScreen();
    
  },
  methods: {
    next() {      
      //Antes
      if (this.active == 0) this.updateScreens();
      if (this.active == 1) this.updateFields();
      if (this.active == 2) this.updateActions();
      if (this.active == 3) this.updateRoles();             
      if (this.active == 4) this.updateRoleScreen();             
    },
    avanzarStep() {
      this.screenselected='';
      this.rolselected='';
      this.attributeScreenActive=0;
      this.attributeScreenActive=0;
      this.active++;
           
      
      switch (this.active) {
        case 1:            
            this.getScreen();
            this.getFields();
          break;
        case 2:            
            this.getActions();
          break;
        case 3:
          this.getRoles();
          break;
        case 4:
           this.getRoles();
           this.getRolesActions();
           this.getRolesScreens();
          break;                              
    
        default:
          break;
      }
    },      
    
    childScreens: function(child) {
      if (child != null)
        return this.screens.filter(
          x => x.parentId == child && x.isRemoved == false
        );
      else return;
    },
    childScreensRole: function(child) {
      if (child != null)
        return this.rolesscreens.filter(
          x => x.parentId === child && x.systemRoleId===this.rolselected
        );
      else return;
    },
        
    subMenu: function(child) {
      if (child != null)
        return this.screens.filter(
          x => x.parentId == child && x.path ==null
        ).sort(x=>x.orden);
      else return;
    },   
    itemMenu: function(child) {
      if (child != null)
        return this.screens.filter(
          x => x.parentId == child && x.path !=null
        ).sort(x=>x.orden);
      else return;
    },      
    fieldScreens: function(windowId) {
      if (windowId != undefined )
        return this.fields.filter(
          x.isRemoved == false
        );
      else return;
    },
    actionsfilter: function(windowId) {
      if (windowId != undefined )
        return this.actions.filter(
          x => x.systemScreenId == windowId && x.isRemoved == false
        );
      else return;
    }, 
    actionsrolesfilter: function(windowId, rolId) {
      if (windowId != undefined )
        return this.rolesactions.filter(
          x => x.systemScreenId == windowId && x.systemRoleId==rolId
        );
      else return;
    },     
    getScreen() {
      let me = this;
      axios
        .get(this.URL_GET_SCREEN)
        .then(function(response) {
          me.screens = response.data;
        })
        .catch(function(error) {
          me.showError();
        });
    },
    getFields() {
      let me = this;
      axios
        .get(this.URL_GET_FIELDS)
        .then(function(response) {
          me.fields = response.data;
        })
        .catch(function(error) {
          me.showError();
        });
    },
    getActions() {
      let me = this;
      axios
        .get(this.URL_GET_ACTIONS)
        .then(function(response) {
          me.actions = response.data;
        })
        .catch(function(error) {
          me.showError();
        });
    },    
    getRoles() {
      let me = this;
      axios
        .get(this.URL_GET_ROLES)
        .then(function(response) {
          me.roles = response.data;
        })
        .catch(function(error) {
          me.showError();
        });
    },    
    getRolesActions() {
      let me = this;
      axios
        .get(this.URL_GET_ROLESACTIONS)
        .then(function(response) {          
           me.rolesactions = response.data;
        })
        .catch(function(error) {
          me.showError();
        });
    }, 
    getRolesScreens() {
      let me = this;
      axios
        .get(this.URL_GET_ROLESSCREENS)
        .then(function(response) {          
           me.rolesscreens = response.data;
        })
        .catch(function(error) {
          me.showError();
        });
    },     
    newMenuScreen() {
      let objeto = {
        id: null,
        description: null,
        enabled: false,
        isDefault: false,
        parentId: null,
        orden: null,
        entity: null,
        path: null,
        icon: null,
        isNew: true,
        isRemoved: false
      };
      this.screens.push(objeto);
    },
    newField(screen) {
      let objeto = {
        id: null,
        name: null,
        required: false,
        fieldName: null,
        orden: null,
        enabled: false,        
        visible: false,
        defaultValue: null,
        systemScreenId: screen,
        isNew: true,
        isRemoved: false
      };
      this.fields.push(objeto);
    },
    newAction(screen) {
      let objeto = {
        id: null,
        code: null,
        description: null,
        enabled: false,        
        systemScreenId: screen,
        isNew: true,
        isRemoved: false
      };
      this.actions.push(objeto);
    },    
    newRole() {
      let objeto = {
        id: null,
        name: null,
        description: null,
        enabled: false,        
        isNew: true,
        isRemoved: false
      };
      this.roles.push(objeto);
    },  
    handleClikMenu(item) {
        this.attributeScreenActive=item.id
    },  
    handleChild(child) {
      if (child == null) return;

      let objeto = {
        id: null,
        description: null,
        enabled: false,
        isDefault: false,
        parentId: child,
        orden: null,
        entity: null,
        path: null,
        icon: null,
        isNew: true,
        isRemoved: false
      };
      this.screens.push(objeto);
    },
    handleParent(item) {
      if (item == null || item.description == null) return;

      let me = this;
      let orden = item.orden;
      if (item.orden!=null)
        orden = parseInt(item.orden);

      axios
        .post(this.URL_CREATE_SCREEN, {
          Description: item.description,
          Enabled: item.enabled,
          IsDefault: item.isDefault,
          ParentId: item.parentId,
          Orden: orden,
          Entity: item.entity,
          Path: item.path,
          Icon: item.icon
        })
        .then(function(response) {
          item.id = response.data;
          me.showOk();
        })
        .catch(function(error) {
          me.showError();
        });
    },
    handleDelete(obj) {
      obj.isRemoved = true;
      if (obj.id!=null){      
      //Borro los hijos en caso de q los tenga      
        this.screens.filter(x => x.parentId == obj.id).forEach(element => {
        element.isRemoved=true;
      
      });
      }
    },
    handleDeleteField(obj) {
      obj.isRemoved = true;
    },
    handleDeleteAction(obj) {
      obj.isRemoved = true;
    },    
    handleDeleteRole(obj) {
      obj.isRemoved = true;
    },
    handleViewAction(screen){
      this.screenselected= screen;
    },      
    handleChangeRol(){
      this.screenselected= '';
    }, 
    handleChangeScreen(screen){
      if (screen.enabled==false){    
        //Desabilito todos los hijos
        this.childScreensRole(screen.systemScreenId).forEach(element => {
          element.enabled=false;
        });
      }
    }, 
    updateScreens() {
      let loadingInstance  = Loading.service({ fullscreen: true });
      let me = this;
      let objetos = [];
      me.screens
        .filter(x => x.description != null)
        .forEach(element => {
          let objeto = {
            Id: element.id,
            Description: element.description,
            Enabled: element.enabled,
            IsDefault: element.isDefault,
            ParentId: element.parentId,
            Orden: parseInt( element.orden),
            Entity: element.entity,
            Path: element.path,
            Icon: element.icon,
            IsNew: element.isNew,
            IsRemoved: element.isRemoved
          };

          objetos.push(objeto);
        });

      axios
        .put(this.URL_UPDATE_SCREEN, objetos)
        .then(function(response) {
          me.isOk = true;  
         loadingInstance.close();
         me.avanzarStep();
        })
        .catch(function(error) {
          me.isOk = false;         
          loadingInstance.close();
          me.showError();

        });
    },
    updateFields() {
      let loadingInstance  = Loading.service({ fullscreen: true });
      let me = this;
      let objetos = [];
      me.fields
        .filter(x => x.name != null)
        .forEach(element => {
          let objeto = {
            Id: element.id,
            Name: element.name,
            Required: element.required,
            FieldName: element.fieldName,
            Orden: parseInt( element.orden),
            Enabled: element.enabled,
            Visible: element.visible,
            DefaultValue: element.defaultValue,
            SystemScreenId: element.systemScreenId,
            IsNew: element.isNew,
            IsRemoved: element.isRemoved
          };

          objetos.push(objeto);
        });

      axios
        .put(this.URL_UPDATE_FIELD, objetos)
        .then(function(response) {
          me.isOk = true;
          //me.showOk();
          loadingInstance.close();
          me.avanzarStep();
        })
        .catch(function(error) {
          me.isOk = false;
          loadingInstance.close();
          me.showError();
        });
    },
    updateActions() {
      let loadingInstance  = Loading.service({ fullscreen: true });
      let me = this;
      let objetos = [];
      me.actions
        .filter(x => x.code != null)
        .forEach(element => {
          let objeto = {
            Id: element.id,
            Code: element.code,
            Description: element.description,
            Enabled: element.enabled,
            SystemScreenId: element.systemScreenId,
            IsNew: element.isNew,
            IsRemoved: element.isRemoved
          };

          objetos.push(objeto);
        });

      axios
        .put(this.URL_UPDATE_ACTION, objetos)
        .then(function(response) {
          me.isOk = true;
          //me.showOk();
          loadingInstance.close();
          me.avanzarStep();
        })
        .catch(function(error) {
          me.isOk = false;
          loadingInstance.close();
          me.showError();
        });
    },
    updateRoles() {
      let loadingInstance  = Loading.service({ fullscreen: true });
      let me = this;
      let objetos = [];
      me.roles
        .filter(x => x.name != null)
        .forEach(element => {
          let objeto = {
            Id: element.id,
            Name: element.name,
            Description: element.description,
            Enabled: element.enabled,
            IsNew: element.isNew,
            IsRemoved: element.isRemoved
          };

          objetos.push(objeto);
        });

      axios
        .put(this.URL_UPDATE_ROLES, objetos)
        .then(function(response) {
          me.isOk = true;
          //me.showOk();
          loadingInstance.close();
          me.avanzarStep();
        })
        .catch(function(error) {
          me.isOk = false;
          loadingInstance.close();
          me.showError();
        });
    },
    updateRoleScreen() {
      let loadingInstance  = Loading.service({ fullscreen: true });
      let me = this;
      let objetos = [];
      me.rolesscreens
        .forEach(element => {
          let objeto = {
            SystemRoleId: element.systemRoleId,
            SystemScreenId: element.systemScreenId,
            Enabled: element.enabled
          };

          objetos.push(objeto);
        });

      axios
        .put(this.URL_UPDATE_ROLESSCREENS, objetos)
        .then(function(response) {
          me.isOk = true;
          //me.showOk();
          loadingInstance.close();
          me.updateRoleAction();
        })
        .catch(function(error) {
          me.isOk = false;
          loadingInstance.close();
          me.showError();
        });
    },    
    
    updateRoleAction() {
      let loadingInstance  = Loading.service({ fullscreen: true });
      let me = this;
      let objetos = [];
      me.rolesactions
        .forEach(element => {
          let objeto = {
            SystemRoleId: element.systemRoleId,
            SystemActionId: element.systemActionId,
            Enabled: element.enabled
          };

          objetos.push(objeto);
        });

      axios
        .put(this.URL_UPDATE_ROLESACTIONS, objetos)
        .then(function(response) {
          me.isOk = true;
          //me.showOk();
          loadingInstance.close();
          me.avanzarStep();
        })
        .catch(function(error) {
          me.isOk = false;
          loadingInstance.close();
          me.showError();
        });
    },    
    

    showOk() {
      //Aqui debe guardar y mostrar el ide del error
      this.$message({
        showClose: true,
        type: "success",
        message: "Operación Exitosa"
      });
    },
    showError() {
      //Aqui debe guardar y mostrar el ide del error
      this.$message({
        showClose: true,
        type: "error",
        message: "Ha ocurrido un error"
      });
    }
  }
};
</script>

<style lang="scss">
@import "../../../assets/scss/_variables";

.page-ecommerce-new-product {
  .page-header {
    margin-bottom: 20px;
  }

  .item-box {
    background: white;

    .main-photo,
    .a-photo {
      position: relative;

      img {
        width: 100%;
      }

      .btn-close {
        position: absolute;
        right: 30px;
        top: 30px;
        background: rgba(0, 0, 0, 0.1);
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
      }
    }

    .main-photo {
      padding: 30px;
      box-sizing: border-box;
    }
    .other-photos {
      padding: 0 15px;
      padding-bottom: 15px;
      box-sizing: border-box;

      .a-photo {
        width: 33.3333333%;
        box-sizing: border-box;
        padding: 0 15px;
        display: inline-block;

        .btn-close {
          position: absolute;
          right: 15px;
          top: 0px;
        }

        .add-photo {
          width: 100%;
          height: 100%;
          box-sizing: border-box;
          padding-bottom: 100%;
          position: relative;

          .dashed-box {
            border: 4px dashed transparentize($text-color-accent, 0.5);
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
          }

          .mdi {
            position: absolute;
            top: 50%;
            left: 50%;
            font-size: 30px;
            transform: translateX(-50%) translateY(-50%);
            opacity: 0.7;
          }
        }
      }
    }

    .detail-box {
      padding: 30px;
      padding-left: 0;

      .title {
        background: transparent;
        font-size: 30px;
        border: none;
        outline: none;
        border-bottom: 2px solid transparentize($text-color, 0.8);
        font-family: inherit;
        width: 100%;
        margin-bottom: 20px;
        color: $text-color;
        font-weight: bold;
      }

      .number-input {
        margin-bottom: 10px;

        label {
          display: block;
          clear: both;
          opacity: 0.5;
          margin-bottom: 10px;
          font-size: 14px;
        }
      }

      .final-price {
        color: transparentize($text-color, 0.3);

        strong {
          color: $text-color-accent;
        }
      }

      .description-box {
        margin-top: 20px;
        margin-bottom: 10px;

        textarea {
          border: 1px solid transparentize($text-color-accent, 0.7);
          outline: none;
          width: 100%;
          resize: vertical;
          background: white;
          font-family: inherit;
          padding: 10px;
          box-sizing: border-box;
          color: $text-color;
          font-size: 16px;
          border-radius: 4px;
        }
      }

      .el-input-number {
        width: 90px;

        .el-input__inner {
          color: $text-color-accent;
          background-color: transparent;
          border-color: transparentize($text-color-accent, 0.7);
          font-family: inherit;
          font-weight: bold;
          padding-left: 5px;
          padding-right: 45px;
        }
      }

      .el-button {
        font-family: inherit;
        margin-left: 0;
      }

      .select-box {
        box-sizing: border-box;
      }

      .el-select {
        width: 100%;

        .el-input__inner {
          border-color: transparentize($text-color-accent, 0.7);
          color: $text-color-accent;
          font-family: inherit;
        }
      }

      .actions-box {
        text-align: right;
        margin-top: 20px;
      }

      .el-radio-group {
        .el-radio-button__inner {
          background-color: transparentize($text-color-accent, 0.9);
          border-color: transparentize($text-color-accent, 0.7);
          color: $text-color-accent;
        }
        .el-radio-button__orig-radio:checked + .el-radio-button__inner {
          background-color: $text-color-accent;
          color: white;
        }
      }
    }

    .meta-form {
      input {
        border: 1px solid transparentize($text-color-accent, 0.7);
        outline: none;
        border-radius: 4px;
        color: $text-color;
        padding: 8px 13px;
        background: white;
        width: 100%;
        margin-bottom: 7px;
        box-sizing: border-box;
        font-family: inherit;
        font-size: 14px;
      }
      /*
			button {
				cursor: pointer;
				border-bottom: 1px solid $text-color-accent;
				font-family: inherit;
				text-transform: uppercase;
				line-height: 0;
				padding: 16px 2px;
				color: $text-color-accent;
				
				i {
					position: relative;
					top: 3px;
				}
			}*/

      button {
        padding: 10px 10px;
      }
      .scroll-screen {
        overflow: scroll !important;
        max-height: 450px !important;
      }
    }
  }
}

.margin-screenChild {
  margin-left: 10px !important;
}

.margin-screenChildLast {
  margin-left: 30px !important;
}

.margin-screenLast {
  margin-left: 50px !important;
}

#stepScreen {
  max-height: 450px;
  overflow-y: scroll;
}

#stepAtributos {
  max-height: 450px;
  overflow-y: scroll;
}

#stepAcciones {
  max-height: 450px;
  overflow-y: scroll;
}

 #stepRolesAcciones {
  max-height: 450px;
  overflow-y: scroll;
}
.margin-accionesrol
{
      margin-left: 50px;
}

.checkBoxButton {
      width: 100px!important;
}
.imagen {
    width: 30%;
    display: block;
    margin: 0 auto;
    margin-top: 80px;
}

@media (max-width: 768px) {
  .page-ecommerce-new-product {
    .item-box {
      .detail-box {
        padding-left: 30px;
      }
    }
  }
}
</style>
