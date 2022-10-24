<template>
     <b-container>
        <div class="row" style="margin-top:250px" v-if="!send">
            <div class="col-md-4">
            </div>
            <div class="col-md-4">    
                <!--<b-card bg-variant="dar" :class="[templates.bg]">  -->
                    
                    <div class="col-lg-12">                  
                        <Form @submit="enviar" class="formulario">  
                            <br/>  
                            <div class="row">                           
                                <div class="col-lg-12">
                                    <div class="row">
                                        <div class="col-lg-12 d-flex">
                                            <Field type="text" id="aa" ref="aa" name="user" v-model="selectedCodigo.codigo" rules="required"  class="form-control form-control-sm"  />		
                                        </div>     
                                    </div>                        
                                </div>                                                             
                            </div>
                                                        
                            <br/>
                            <!--<div class="row">
                                <div >
                                    <b-button type="submit" variant="primary" size="md">
                                        Enviar                                   
                                    </b-button>                               
                                </div>                    
                            </div>  -->                  
                        </Form>
                    </div> 
                
               <!-- </b-card>-->
                
            </div>
            <div class="col-md-4">
            </div>   
        </div>
        <br/><br/><br/><br/><br/><br/><br/><br/>
        <div class="row" v-if="!send">
            <div class="col-md-4">
                <div class="col-md-12">
                    
                    <b-table-simple responsive striped hover :class="[templates.bg]">
                        <b-thead>
                            <tr>     
                                <b-th :class="[templates.text]">E</b-th>
                                <b-th :class="[templates.text]">O</b-th>               
                                <b-th :class="[templates.text]">A</b-th>
                                <b-th :class="[templates.text]">D</b-th> 
                                <b-th :class="[templates.text]">Total</b-th>                       
                            </tr>
                        </b-thead>
                        <b-tbody>
                            <b-tr >     
                                        
                                <b-td :class="[templates.text]">{{selectedContador.estudiante}}</b-td>  
                                <b-td :class="[templates.text]">{{selectedContador.obrero}}</b-td>  
                                <b-td :class="[templates.text]">{{selectedContador.administrativo}}</b-td>  
                                <b-td :class="[templates.text]">{{selectedContador.docente}}</b-td> 
                                <b-td :class="[templates.text]">{{selectedContador.total}}</b-td>  
                            </b-tr>    
                        </b-tbody>
                    </b-table-simple>
                </div>
            </div>
            <div class="col-md-4">
            </div>
            <div class="col-md-4">
            </div>
        </div>
        
        <div v-if="send">
            <Asistencia :data="selectedUser" />  
        </div> 
    </b-container>
</template>

<script>

   
    import { mapState, mapActions, mapMutations } from "vuex";
    import Swal from 'sweetalert2'
    import { Form, Field , configure, defineRule  } from 'vee-validate';

    import Asistencia from './Asistencia.vue';

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
            Field,
            Asistencia 
        },

        data() {
            return {
                emailErrors:[],
                loading:false,
                type: "password",
                
            }
        },

        async created() {
            
            // Si ya hay un usuario logeado, no puede entrar a la interfaz de login
        
            if(!this.selectedAuth.loged){
                this.$router.replace('/login');    
            }
            await this.count();
        },

        computed: {
            
            ...mapState("auth", [
                "selectedAuth"    
            ]),
            ...mapState("asistencia", [
                "selectedCodigo",
                "selectedUser",
                "send",
                "selectedContador",
                "error",
                "message" 
            ]),
            ...mapState("configuration", [
                "templates"    
            ]),
        },

        methods: {
            ...mapMutations("loader", [
                "load",
            ]),
            ...mapMutations("asistencia", [
                "setSend"
            ]),
            ...mapActions("asistencia", [
                "readCarnet",
                "count"
            ]),
     
            async enviar(){
                await this.readCarnet();
                this.setSend(true);
                
                if(this.error){
                    Swal.fire({
                        customClass: {
                            confirmButton: 'btn btn-primary',                       
                        },
                        title: this.message,
                        //text:   this.message,
                        icon: 'error',
                        focusConfirm: true,
                    
                    }).then((result) => {
                        if (result.isConfirmed) {
                            
                           this.setSend(false);
                           /*const elem = document.getElementById('aa');
                           console.log(elem.value)*/
                           this.$refs.aa.focus();
                        }                       
                    });
                }else{
                    setTimeout(() => {
                        this.setSend(false);
                       
                    },2000)
                }
                
                
            }
          
        },
    };
</script>