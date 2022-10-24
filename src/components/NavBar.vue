<template>
   
    <nav v-if="selectedAuth.loged" class="navbar navbar-expand-lg " :class="[templates.bg]" style="position:fixed;width:100%;left:0px;top:0px;z-index:999">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">
                  <img class="image-nav" src="assets/images/unetrans.jpg" >
            </router-link>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    
                    
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" :class="[templates.text]" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Opciones
                        </a>
                        <ul class="dropdown-menu " :class="[templates.bg]">
                            <li>
                                <li>
                                    <a class="dropdown-item" :class="[templates.text]">
                                        Usuario: {{selectedAuth.user}}
                                    </a>
                                </li>
                                <hr class="dropdown-divider">
                            </li>
                            <li ><router-link to="/" class="dropdown-item" :class="[templates.text]">inicio</router-link></li>
                            <li v-if="selectedAuth.role == '1'"><router-link to="/reportes" class="dropdown-item" :class="[templates.text]">Reportes</router-link></li>
                            <li v-if="selectedAuth.role == '1'"><router-link to="/graficas" class="dropdown-item" :class="[templates.text]">Graficas</router-link></li>
                            <li v-if="selectedAuth.role == '1'">
                                <router-link to="/importar" class="dropdown-item" :class="[templates.text]">
                                Importar
                                </router-link>
                            </li>
                            <li v-if="selectedAuth.role == '1'">
                                <router-link to="/importar-fotos" class="dropdown-item" :class="[templates.text]">
                                Importar Fotos
                                </router-link>
                            </li>
                            <li v-if="selectedAuth.role == '1'">
                                <router-link to="/configuraciones" class="dropdown-item" :class="[templates.text]">
                                Configuraciones
                                </router-link>
                            </li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" :class="[templates.text]" @click="logOut">Cerrar Sesión</a></li>
                        </ul>
                    </li>
                
                </ul>
            
            </div>
        </div>
    </nav>
    
</template>

<script>

    import { mapState, mapActions, mapMutations } from "vuex";

  
    export default {
        name: "navbar",
        

        data() {
            return {
                emailErrors:[],
                loading:false,
                type: "password"
            }
        },

        created() {
          
        },

        computed: {
            ...mapState("loader", [
                "loader"
            ]),
            ...mapState("auth", [
                "selectedAuth",
                "success",
                "errors",
                "errorAuth",
                "detectLogout"
            ]),
            ...mapState("configuration", [
                "templates"    
            ]),
        },

        methods: {
            ...mapMutations("loader", [
                "load",
            ]),
            ...mapMutations("auth", [
                "resetSelectedAuth",
                "resetErrors",
                "setDetectLogout"
            ]),
            ...mapActions("auth", [
                "login",
            ]),

            logOut() {
                localStorage.removeItem("role");
                localStorage.removeItem("loged");
                localStorage.removeItem("user");
                localStorage.removeItem("token");
                localStorage.removeItem("inicio");
                this.resetSelectedAuth();
                this.setDetectLogout(true);
                this.$router.replace('/login');  
            },
  
            
        },
    };
</script>
