<template>
  
    <b-container style="margin-top:250px">
        <div class="row">
            <div class="col-md-4"></div>
            <div class="col-md-4">
        
               <!-- <b-card bg-variant="dar">  -->
                    
                    <div class="col-lg-12">
                        <div class="alert alert-danger" v-if="errorAuth">
                            Email o Password Equivocado
                        </div>
                        
                        <Form class="formulario" @submit="onSubmit" :validation-schema="schema" v-slot="{ errors }">    
                            <div class="row">
                                <div class="col-lg-12">                             
                                    <div class="row justify-content-left">
                                        <label class="col-2 text-nowrap" :class="[templates.text]">Usuario</label>
                                        
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="row">
                                        <div class="col-lg-12 d-flex">
                                            <Field type="text" name="user" rules="required" v-model="ingreso.user" class="form-control form-control-sm"  />		
                                        </div>     
                                    </div>                        
                                </div>                                                             
                            </div>
                            <div class="text-danger">{{errors.user}}</div>
                            <br/>
                            <div class="row">
                                <div class="col-lg-12">                             
                                    <div class="row justify-content-left">
                                        <label class="col-2 text-nowrap" :class="[templates.text]" >Contraseña</label>                               
                                    </div>
                                </div>
                                <b-input-group size="sm">
                                    <b-form-input :type="type" v-model="ingreso.password"></b-form-input>
                                    <b-input-group-append>
                                        <b-button variant="primary">
                                            <span @click="showPassword" v-if="type == 'text'">
                                                <i  
                                                    class="fa-regular fa-eye "
                                                >
                                                </i>
                                            </span>
                                            <span @click="showPassword"  v-else>
                                                <i
                                                    class="fa-solid fa-eye-slash "
                                                >
                                                </i>
                                            </span>
                                        </b-button>              
                                    </b-input-group-append>
                                </b-input-group>
                                                        
                            </div>
                            
                            <br/>
                            <div class="row">
                                <div>
                                    <b-button type="submit" variant="primary" size="md">
                                        Iniciar                                                
                                        <span class="loader" v-if="loading"></span>
                                    </b-button>                                      
                                </div>
                                
                            </div>
                        
                            
                        </Form>
                    </div> 
                <!--</b-card>-->
            </div>
            <div class="col-md-4"></div>
        </div>   
    </b-container>
</template>
<script>

    import { mapState, mapActions, mapMutations } from "vuex";

    import { Form, Field , configure, defineRule  } from 'vee-validate';


    import { localize, setLocale  } from '@vee-validate/i18n';
    import es from '@vee-validate/i18n/dist/locale/es.json'
    import { email, required } from '@vee-validate/rules';

    configure({
        generateMessage: localize({
            es
        })
    })

    setLocale('es')

    defineRule('email', email)
    defineRule('required', required)

    export default {
    name: "Login",
    components: {
        Form,
        Field     
    },

    data() {
        return {
            emailErrors:[],
            loading:false,
            type: "password"
        }
        },

    created() {
        //signifa que se acaba de presionar el boton de desloguear
        if(this.detectLogout){
            this.reloadPage();
        }
        
        // Si ya hay un usuario logeado, no puede entrar a la interfaz de login

        if(this.selectedAuth.loged){
            console.log(this.selectedAuth.loged)
            this.$router.replace('/');    
        }
    },

    computed: {
        ...mapState("loader", [
            "loader"
        ]),
        ...mapState("auth", [
            "ingreso",
            "selectedAuth",
            "success",
            "errors",
            "errorAuth",
            "detectLogout"
        ]),
        ...mapState("configuration", [
            "templates"       
        ])
    },

    methods: {
        ...mapMutations("loader", [
            "load",
        ]),
        
        ...mapMutations("auth", [
            "resetSelectedAuth",
            "resetErrors"
        ]),
        ...mapActions("auth", [
            "login",
        ]),

        reloadPage(){
            let bc = new BroadcastChannel('abc');
            bc.postMessage('heyreload'); 
        },

        async onSubmit(e) {
            //e.preventDefault();

            this.resetErrors([])
            

            this.loading = true
            await this.login()
            if(this.selectedAuth.loged){
                this.$router.replace('/');    
            }
            this.loading = false
        
        
        },

        showPassword() {
            
            if(this.type === "password"){
                this.type = "text"
            }else{
                this.type = "password"
            }
        }

        
        
        
    },
    };

</script>