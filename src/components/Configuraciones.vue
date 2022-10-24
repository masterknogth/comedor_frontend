<template>

    <div class="container" style="margin-top:250px">
        <div class="row">
            <div class="col-xs-12 col-sm-6 col-md-3">
                <b-card
                    title=""
                    :img-src="url+normal"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20em;"
                    class="mb-4"
                >
                <br/><br/>
                    <b-card-text class="text-center">
                        Normal
                    </b-card-text>
                    <br/>
                    <div class="row justify-content-center">
                        <b-button @click="cambiarTemplate('normal')" class="col-md-4 ">Elegir</b-button>
                    </div>
                          
                </b-card>
            </div>    
            <div class="col-xs-12 col-sm-6 col-md-3">
               

                <b-card
                    title=""
                    :img-src="url+sanValentin"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20em;"
                    class="mb-4"
                >
                    <b-card-text class="text-center">
                        Dia de los enamorados
                    </b-card-text>
                    <br/>
                    <div class="row justify-content-center">
                        <b-button @click="cambiarTemplate('enamorados')" class="col-md-4 btn-danger">Elegir</b-button>
                    </div>
                          
                </b-card>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3">
                <b-card
                    title=""
                    :img-src="url+halloween"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20em;"
                    class="mb-4"
                >
                    <b-card-text class="text-center">
                        halloween
                    </b-card-text>
                    <br/>
                    <div class="row justify-content-center">
                        <b-button  @click="cambiarTemplate('halloween')" class="col-md-4 btn-dark">Elegir</b-button>
                    </div>
                          
                </b-card>
            </div>
            <div class="col-xs-12 col-sm-6 col-md-3">
                <b-card
                    title=""
                    :img-src="url+navidad"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20em;"
                    class="mb-4"
                >
                    <b-card-text class="text-center">
                        Navidad
                    </b-card-text>
                    <br/>
                    <div class="row justify-content-center">
                        <b-button variant="primary" @click="cambiarTemplate('navidad')" class="col-md-4">Elegir</b-button>
                    </div>
                          
                </b-card>
            </div>
        </div>
    </div>
    
</template>
<script>
    import { mapState, mapActions, mapMutations } from "vuex";

    export default {

        data(){
            return{
                url: import.meta.env.VITE_BASE_URL,
                normal:'images/normal.jpg',
                sanValentin:'images/san-valentin/s1.jpg',
                halloween:'images/hallo/h15.jpg',    
                navidad:'images/navidad/n7.jpg'
            }
        },

        async created(){
            // Si ya hay un usuario logeado, no puede entrar a la interfaz de login
            if(!this.selectedAuth.loged ){
                this.$router.replace('/login');    
            }
            // si el usuario no es administrador no puede entrar aqui
            if(this.selectedAuth.role != '1' ){
                this.$router.replace('/');    
            }  
        },
        computed: {           
            ...mapState("auth", [
                "selectedAuth"    
            ]),
            /*...mapState("configuration", [
                "fechaGrafica",
                "filtro",
                "grafica"   
            ]),*/
            
        }, 

        methods:{
            ...mapActions("configuration", [
                "cambiarTemplate"
            ]),
           /* async cambiarTemplate(){
                await this.cambiarTemplate()
            }*/
        }
    }
</script>