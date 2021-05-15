

<template>
  <vue-scroll class="page-ecommerce-new-company">
    <el-steps :active="active" finish-status="success">
      <el-step title="Perfil"></el-step>
      <el-step title="Pantallas"></el-step>
      <el-step title="Atributos"></el-step>
      <el-step title="Acciones"></el-step>
      <el-step title="Roles"></el-step>
      <el-step title="Roles y Acciones"></el-step>
    </el-steps>

    <el-button style="margin-top: 12px; margin-botton: 20px" @click="next" v-if="this.active <= 5">Siguiente</el-button>

    <div id="stepPerfil" v-if="active ==0">
      <profile-edit
        v-bind:form.sync="company"
        v-bind:enablechild="false"
        ref="form" 
      ></profile-edit>
    </div>


    <div id="stepScreen" v-if="active ==1">
      <el-row class="mt-20">
        <el-col>
          <div class="item-box p-30 card-shadow--small b-rad-4">
            <el-row>
              <el-col :lg="20">
                <div class="meta-form">
                  <h3 class="m-0">Pantallas</h3>
                </div>
              </el-col>
            </el-row>
            <el-row class="mt-30" :gutter="20">
              <el-col :xs="24" :sm="12" :md="6" :lg="4" :xl="4">
                <span>Nombre</span>
              </el-col>
              <el-col :xs="24" :sm="12" :md="4" :lg="2" :xl="2">
                <span>Activo</span>
              </el-col>
              <el-col :xs="24" :sm="12" :md="4" :lg="3" :xl="3">
                <span>Tabla</span>
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
                      v-bind:enablechild="false"
                    ></screen>
                    <div v-for="(child,index) in childScreens(item.id)" :key="index">
                      <screen
                        :line="child"
                        v-bind:enablechild="false"
                        class="margin-screenChild"
                      ></screen>
                      <div v-for="(lastchild,index) in childScreens(child.id)" :key="index">
                        <screen
                          :line="lastchild"
                          v-bind:enablechild="false"
                          class="margin-screenChildLast"
                        ></screen>
                        <div v-for="(last,index) in childScreens(lastchild.id)" :key="index">
                          <screen
                            :line="last"
                            v-bind:enablechild="false"
                            class="margin-screenLast"
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


    <div id="stepAtributos" v-if="active ==2">
      <el-row class="tac">
        <el-col :span="5">
          <h5>Atributos</h5>
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          
            <el-submenu v-for="item in menuScreensActive" :key="item.id" :index="`${item.id}`">
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
                  <div v-for="item in fieldsactive" :key="item.id">                   
                      <screenfield
                        v-bind:field="item"
                        v-bind:isinvisible="true"
                      ></screenfield>
                  </div>
              </div>
            </el-row> 
          </div>         
        </el-col>
      </el-row>          
    </div>


    <div id="stepAcciones" v-if="active ==3">
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
          
            <el-submenu v-for="item in menuScreensActive" :key="item.id" :index="`${item.id}`">
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
                  <div v-for="item in actionsactive" :key="item.id">                   
                  <action
                    v-bind:action="item"
                    v-bind:isinvisible="true"
                  ></action>
                  </div>
              </div>
            </el-row> 
          </div>         
        </el-col>
      </el-row>          
    </div>    

    <div id="stepRoles" v-if="active ==4">
      <el-row class="mt-20">
        <el-col>
          <div class="item-box p-30 card-shadow--small b-rad-4">
            <el-row>
              <el-col :lg="20">
                <div class="meta-form">
                  <h3 class="m-0">Roles</h3>
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :lg="24">
                <div class="meta-form scroll-screen">
                  <div v-for="(item,index) in roles" :key="index">
                    <role
                      v-bind:role="item"
                      v-bind:isinvisible="true"
                    ></role>
                  </div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>

    <div id="stepRolesAcciones" v-if="active ==5">
      <div class="item-box p-30 card-shadow--small b-rad-4 scroll-screen">
            <h3 class="m-0">Acciones del Rol</h3>
            <!-- select del Rol -->
            <el-select v-model="rolselected" placeholder="Roles" v-on:change="handleChangeRol">
              <el-option
                v-for="item in rolesfilter"
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
    <div id="stepFinish" v-if="active ==6">
      <div v-if="companyId==null">
        <h3>Empresa Generada</h3>
        <span>Email: {{company.email}}</span><br>
        <span>Password: {{company.password}}</span>        
      </div>
      <div v-if="companyId!=null">
        <h3>Empresa Actualizada</h3>
      </div>
    </div>     
  </vue-scroll>
</template>
<script>
import axios from "axios";
import ProfileEdit from '@/components/Profile/ProfileEdit'
import screen from "../../../components/Screen.vue";
import screenfield from "../../../components/ScreenField.vue";
import action from "../../../components/Actions.vue";
import role from "../../../components/Role.vue";
import screenact from "../../../components/ScreenRole.vue";
import { Loading } from 'element-ui';
import moment from 'moment';

export default {
  name: "Company",
  props: {
    companyId: Number
  },
  components: {
    screen,
    screenfield,
    action, 
    role,screenact,ProfileEdit
  },

  data() {
    return {
      URL_GET_COMPANY: "api/Companies",
      URL_GET_SCREEN: "api/SystemScreens",
      URL_GET_SCREEN_COMPANY: "api/ConfigScreens/GetConfigSystemScreenByCompany/",
      URL_GET_FIELDS: "api/SystemScreenFields",
      URL_GET_ACTIONS: "api/SystemActions",
      URL_GET_ROLES: "api/SystemRoles",
      URL_GET_ROLES_COMPANY: "api/SecurityRoles/GetByCompany/",
      URL_CREATE_COMPANY: "api/Companies/Create",
      URL_UPDATE_COMPANY: "api/Companies/Update",
      active: 0,
      isOk: false,
      selected: {},
      screens: [],
      fields: [],
      actions: [],
      roles: [],
      rolesactions: [],
      rolesscreens: [],
      rolesscreensCompany:[],
      rolesactionsCompany:[],
      loading: 0,
      attributeScreenActive:0,
      rolselected: '',
      screenselected: '',
      company: {
        id: '',
        name: '',
        contactName: '',
        contactLastName: '',
        initialDate: '',
        email: '',
        emails: '',
        phone: '',
        website: '',
        address: '',
        postal: '',
        city: '',
        state: '',
        country: '',
        schedule: '',
        avatar: '',
        comment: '',
        logo: null, 
        logoname:'',
        validacionOK: false,
        sectors: [],
        password:''
      },      
    };
  },
  computed: {
    menuScreens: function() {
      return this.screens.filter(
        x => x.parentId == null && x.isRemoved == false && x.isDefault==true
      );
    },
    menuScreensActive: function() {
      return this.screens.filter(
        x => x.parentId == null && x.isRemoved == false && x.isDefault==true && x.enabled
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
    actionsenabled: function() {      
      return this.actions.filter(x=> x.enabled );
    },    
    screensactive: function() {
      
      return this.screens.filter(x => x.isDefault && x.enabled);
    },    
    rolesfilter: function() {
        return this.roles.filter(x => x.isRemoved == false && x.enabled);
    }
  },
  created() {
    if (this.companyId!=null)
    {      
      this.getCompany(this.companyId);
      this.getScreenCompany(this.companyId);      
      this.getRolesCompany(this.companyId);     
    }
    else
    {
      this.getScreen();
      this.getActions();
      this.getFields();
      this.getRoles();
    }

  },
  methods: {
    next() {  
     // if (this.active == 2) this.updateFields();
     // if (this.active == 3) this.updateActions();
     // if (this.active == 4) this.updateRoles();             
     // if (this.active == 5) this.updateRoleScreen(); 
       switch (this.active) {
        case 0:
            this.validateCompany();
            break; 
        case 1:            
             this.avanzarStep();
          break;        
        case 2:            
             this.avanzarStep();
          break;    
        case 3:            
             this.avanzarStep();
          break;                                          
        case 4:                       
             this.getRolesActions();
             this.getRolesScreens();  
             this.avanzarStep();

          break;                
        case 5: 
            if (this.companyId!=null)
              this.updateCompany(this.companyId);
            else
              this.saveCompany();             
          break;                                                              
        default:
          break;
      }    

    },
    avanzarStep() {
      this.screenselected='';
      this.rolselected='';
      this.attributeScreenActive=0;
                 
      this.active++;
    },      
    validateCompany: function() {
      this.$refs.form.validate();  
     if( this.company.validacionOK)
        this.avanzarStep();
      
    },
    childScreens: function(child) {
      if (child != null)
        return this.screens.filter(
          x => x.parentId == child && x.isRemoved == false  && x.isDefault
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
    screenbyrol: function(rol) {
      if (rol != null)
        return this.rolesscreens.filter(
          x => x.systemRoleId===rol && x.enabled
        );
      else return;
    },    
    actionbyrol: function(rol) {
      if (rol != null)
        return this.rolesactions.filter(
          x => x.systemRoleId===rol && x.enabled
        );
      else return;
    },      
        
    subMenu: function(child) {
      if (child != null)
        return this.screens.filter(
          x => x.parentId == child && x.path ==null && x.isDefault==true && x.enabled
        ).sort(x=>x.orden);
      else return;
    },   
    itemMenu: function(child) {
      if (child != null)
        return this.screens.filter(
          x => x.parentId == child && x.path !=null && x.isDefault && x.enabled
        ).sort(x=>x.orden);
      else return;
    },      
    fieldScreens: function(windowId) {
      if (windowId != undefined )
        return this.fields.filter(
         x => x.systemScreenId == windowId &&  x.isRemoved == false
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
    getCompany(id){
      let me = this;
      axios
        .get(this.URL_GET_COMPANY + '/'+id)
        .then(function(response) {
          var fechaInicial =  null;
          if (response.data.initialDate!=null)
            fechaInicial = moment(response.data.initialDate,"DD/MM/YYYY").format('MM/DD/YYYY')
          me.company.name = response.data.name;
          me.company.contactName =response.data.contactName;
          me.company.contactLastName =response.data.contactLastName;
          
          //me.company.initialDate =response.data.initialDate;
          me.company.initialDate =fechaInicial;
          me.company.email =response.data.email;
          me.company.emails =response.data.emails;
          me.company.phone =response.data.phone;
          me.company.website =response.data.website;
          me.company.address =response.data.address;
          me.company.postal =response.data.postal;
          me.company.city =response.data.city;
          me.company.state =response.data.state;
          me.company.country =response.data.country;
          me.company.schedule =response.data.schedule;
          me.company.comment =response.data.comment;
          me.company.logo =response.data.logo;
          me.company.logoname= response.data.logoName;
          me.company.id =id;
          me.company.sectors= response.data.sectors
        })
        .catch(function(error) {
          me.showError();
        });
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
    getScreenCompany(id) {
      let me = this;
      let loadingInstance  = Loading.service({ fullscreen: true });
      axios
        .get(this.URL_GET_SCREEN_COMPANY+id)
        .then(function(response) {
        //  me.screens = response.data;
          response.data.forEach(screen => {            
             let objScreen = {
               id: screen.id,
               description: screen.description,
               enabled: screen.enabled,
               orden: screen.orden,
               icon: screen.icon,
               companyId: screen.companyId,
               systemScreenId: screen.systemScreenId,
               isDefault: screen.isDefault,
               path: screen.path,
               parentId: screen.parentId,
               isNew: screen.isNew,
               isRemoved: screen.isRemoved            
             }

             screen.configScreenFields.forEach(attribute => {
               me.fields.push(attribute);
             });
             screen.securityActions.forEach(action => {
               me.actions.push(action);
             });

             me.screens.push(objScreen);
          });
          loadingInstance.close();
        })
        .catch(function(error) {
          me.showError();
          loadingInstance.close();
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
    getRolesCompany(id) {
      let me = this;
      axios
        .get(this.URL_GET_ROLES_COMPANY+id)
        .then(function(response) {
          response.data.forEach(rol => {            
             let objRol = {
               id: rol.id,
               description: rol.description,
               name: rol.name,
               enabled: rol.enabled,
               isNew: rol.isNew,
               isRemoved: rol.isRemoved            
             }

             rol.securityRoleActions.forEach(action => {
               me.rolesactionsCompany.push(action);
             });
             rol.securityRoleScreens.forEach(screen => {
               me.rolesscreensCompany.push(screen);
             });

             me.roles.push(objRol);
          });          
          



        })
        .catch(function(error) {
          me.showError();
        });
    },      
    getRolesActions() {
      let me = this;
       me.rolesfilter.forEach(rol => {
       me.actionsenabled.forEach(action => {
        let objeto= {
          actionCode: action.code,
          actionDescription: action.description,
          systemActionId: action.id,
          systemRoleId: rol.id,
          systemScreenId: action.systemScreenId,
          enabled: true
        };
          me.rolesactions.push(objeto);
       });
     });
    }, 
    existsRoleScreen(role,screen){
        var exists = this.rolesscreensCompany.some (
            x => x.systemRoleId == role && x.systemScreenId==screen
        );
        return exists;
    },
    getRolesScreens() {
      let me = this;
      me.rolesfilter.forEach(rol => {
       me.screensactive.forEach(screen => {
        let objeto= {
          enabled: this.existsRoleScreen(rol.id,screen.id),          
          systemScreenId: screen.id,
          systemRoleId: rol.id,
          parentId: screen.parentId,
          screenName: screen.description
        };
          me.rolesscreens.push(objeto);
       });
     });
 
    }, 

    updateCompany(id){      
      let loadingInstance  = Loading.service({ fullscreen: true });
      let me = this;
      let fechaInicial = null;
      if (me.company.initialDate!=null)
         fechaInicial = moment(me.company.initialDate,"MM/DD/YYYY").format('DD/MM/YYYY')
      let objeto = {
       Id: id,
       Name: me.company.name,
       ContactName: me.company.contactName,
       ContactLastName: me.company.contactLastName,
       InitialDate: fechaInicial,
       Email: me.company.email,
       Emails: me.company.emails,
       Phone: me.company.phone,
       Website: me.company.website,
       Address: me.company.address,
       Postal: me.company.postal,
       City: me.company.city,
       State: me.company.state,
       Country: me.company.country,
       Schedule: me.company.schedule,
       Logo: me.company.logo,
       LogoName: me.company.logoname,
       Comment: me.company.comment,
       ConfigScreens: [],
       SecurityRoles:[],
       CompanySectors: []
      }
      //Recorro los sectores
      me.company.sectors.forEach(sector=> {
        let objSector= {
          SectorId: sector
        }
        objeto.CompanySectors.push(objSector);
      });

      //Recorro las pantallas

      me.screensactive.forEach(screen => {
        let orden =0;
         if (screen.orden!=null){
                orden=parseInt(screen.orden);
          }        
         let objScreen= {
           Description: screen.description,
           Enabled: screen.enabled,
           Orden: orden,
           Icon: screen.icon,
           SystemScreenId: screen.id,
           ConfigScreenFields: [],
           SecurityActions: [],
         };    

            //Recorro los atributos de la pantalla
            me.fieldScreens(screen.id).forEach(field => {
              let orden =0;
              if (field.orden!=null){
                orden=parseInt(field.orden);
              }
              let objField= {
                  ConfigScreenId: screen.id,
                  Name: field.name,
                  Required: field.required,
                  Visible: field.visible,
                  DefaultValue: field.defaultValue,
                  Enabled: field.enabled,
                  FieldName: field.fieldName,
                  Orden: orden,
                  SystemScreenFieldId: field.id
                }                
                objScreen.ConfigScreenFields.push(objField);
            });
            //Recorro las acciones de la pantalla
            me.actionsfilter(screen.id).forEach(action => {
              let objAction= {
                ConfigScreenId: screen.id,
                Description: action.description,
                Enabled: action.enabled,
                SystemActionId: action.id
                }
                objScreen.SecurityActions.push(objAction);
            });       
         objeto.ConfigScreens.push(objScreen);
      });

      me.rolesfilter.forEach(role => {
        let objRol = {
          Name: role.name,
          Description: role.description,          
          Enabled: role.enabled,
          SystemRoleId: role.id,
          SecurityRoleActions: [],
          SecurityRoleScreens: []
        };

        me.screenbyrol(role.id).forEach(screenrol => {
          let objRoleScreen = {
            SystemRoleId: role.id,
            SystemScreenId: screenrol.systemScreenId
          };
           objRol.SecurityRoleScreens.push(objRoleScreen);
        });
       

        me.actionbyrol(role.id).forEach(actionrol => {          
          let objRoleAction = {
            SystemRoleId: role.id,
            SystemActionId: actionrol.systemActionId,
            SystemScreenId: actionrol.systemScreenId
          };
          objRol.SecurityRoleActions.push(objRoleAction); 
        });   
            
      objeto.SecurityRoles.push(objRol);  
      });

      axios.post(this.URL_UPDATE_COMPANY, objeto)
        .then(function(response) {
          me.isOk = true;
          loadingInstance.close();
          me.avanzarStep();
          me.company.password= response.data;
        })
        .catch(function(error) {
          me.isOk = false;
          loadingInstance.close();
          me.showError();
        });      
    },
    saveCompany() {
      let loadingInstance  = Loading.service({ fullscreen: true });
      let me = this;
      let fechaInicial = null;
      if (me.company.initialDate!=null)
         fechaInicial = moment(me.company.initialDate,"MM/DD/YYYY").format('DD/MM/YYYY')

      let objeto = {
       Name: me.company.name,
       ContactName: me.company.contactName,
       ContactLastName: me.company.contactLastName,
       InitialDate: fechaInicial,
       Email: me.company.email,
       Emails: me.company.emails,
       Phone: me.company.phone,
       Website: me.company.website,
       Address: me.company.address,
       Postal: me.company.postal,
       City: me.company.city,
       State: me.company.state,
       Country: me.company.country,
       Schedule: me.company.schedule,
       Logo: me.company.logo,
       LogoName: me.company.logoname,
       Comment: me.company.comment,
       ConfigScreens: [],
       SecurityRoles:[],
       CompanySectors: []
      }
      //Recorro los sectores
      me.company.sectors.forEach(sector=> {
        let objSector= {
          SectorId: sector
        }
        objeto.CompanySectors.push(objSector);
      });

      //Recorro las pantallas
      me.screensactive.forEach(screen => {
         let objScreen= {
           Description: screen.description,
           Enabled: screen.enabled,
           Orden: screen.orden,
           Icon: screen.icon,
           SystemScreenId: screen.id,
           ConfigScreenFields: [],
           SecurityActions: [],
         };    

            //Recorro los atributos de la pantalla
            me.fieldScreens(screen.id).forEach(field => {
              debugger
              let objField= {
                ConfigScreenId: screen.id,
                Name: field.name,
                Required: field.required,
                Visible: field.visible,
                DefaultValue: field.defaultValue,
                Enabled: field.enabled,
                FieldName: field.fieldName,
                Orden: parseInt(field.orden),
                SystemScreenFieldId: field.id
                }                
                objScreen.ConfigScreenFields.push(objField);
            });
            //Recorro las acciones de la pantalla
            me.actionsfilter(screen.id).forEach(action => {
              let objAction= {
                ConfigScreenId: screen.id,
                Description: action.description,
                Enabled: action.enabled,
                SystemActionId: action.id
                }
                objScreen.SecurityActions.push(objAction);
            });       
         objeto.ConfigScreens.push(objScreen);
      });

      me.rolesfilter.forEach(role => {
        let objRol = {
          Name: role.name,
          Description: role.description,          
          Enabled: role.enabled,
          SystemRoleId: role.id,
          SecurityRoleActions: [],
          SecurityRoleScreens: []
        };

        me.screenbyrol(role.id).forEach(screenrol => {
          let objRoleScreen = {
            SystemRoleId: role.id,
            SystemScreenId: screenrol.systemScreenId
          };
           objRol.SecurityRoleScreens.push(objRoleScreen);
        });
       

        me.actionbyrol(role.id).forEach(actionrol => {          
          let objRoleAction = {
            SystemRoleId: role.id,
            SystemActionId: actionrol.systemActionId,
            SystemScreenId: actionrol.systemScreenId
          };
          objRol.SecurityRoleActions.push(objRoleAction); 
        });   
            
      objeto.SecurityRoles.push(objRol);  
      });

      

      axios.post(this.URL_CREATE_COMPANY, objeto)
        .then(function(response) {
          me.isOk = true;
          loadingInstance.close();
          me.avanzarStep();
          me.company.password= response.data;
        })
        .catch(function(error) {
          me.isOk = false;
          loadingInstance.close();
          me.showError();
        });
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

      axios
        .post(this.URL_CREATE_SCREEN, {
          Description: item.description,
          Enabled: item.enabled,
          IsDefault: item.isDefault,
          ParentId: item.parentId,
          Orden: item.orden,
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

.page-ecommerce-new-company {
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

#stepPerfil {
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
  .page-ecommerce-new-company {
    .item-box {
      .detail-box {
        padding-left: 30px;
      }
    }
  }
}
</style>
