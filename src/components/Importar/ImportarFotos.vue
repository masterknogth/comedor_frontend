<template>
    <div class="container">
         <div class="row" style="margin-top:100px">
            <div class="col-md-4">
                
               
            </div>
          
            <div class="col-md-4">
                <Form  :validation-schema="schema" v-slot="{ errors }">
                    <div class="text-danger">{{errors.fotos}}</div>
                    <div class="input-group mb-3">
                        <Field
                            
                            type="file"
                            class="form-control"
                            placeholder="Recipient's username"
                            aria-label="Recipient's username" 
                            aria-describedby="button-addon2"
                            
                            name='fotos'
                            rules="ext:jpg|required"
                            v-model="fotos"
                            id="fotos"
                            webkitdirectory directory
                            @change="addfile($event)"
                            
                        />
                       
                        <!--<button @click="importar"  class="btn btn-outline-primary" type="button" id="button-addon2">
                            Cargar
                            <span class="loader" v-if="loading"></span>
                        </button>-->
                    </div>
                
                
                    <div>
                        <b-form-group>
                            <b-form-checkbox v-model="selectedTipo.tipo" @change="tipo" :aria-describedby="ariaDescribedby" name="some-radios" value="p" unchecked-value="e"><span :class="[templates.text]">Personal</span></b-form-checkbox>
                            <b-form-checkbox v-model="selectedTipo.tipo" @change="tipo" :aria-describedby="ariaDescribedby" name="some-radios" value="e" unchecked-value="p"><span :class="[templates.text]">Estudiantes</span></b-form-checkbox>                         
                        </b-form-group>
                    </div>
                </Form>
              
            </div>   
                    
            <div class="col-md-4">
            </div> 

            <div v-if="selectedTipo.tipo =='p' ">
                <div class="row">  
                    <div class="col-md-6">
                    
                        <div class="input-group mt-4 col-md-8">
                            <input type="text" v-model="filtroImagesP.text" class="form-control form-control-sm" placeholder="Buscar">
                            <div class="input-group-append">
                                <button @click="buscar" class="btn btn-primary btn-sm" type="button">Buscar</button>
                                
                            </div>
                        </div>
                    </div>
                        
                    <b-row class="row justify-content-end col-md-6">                      
                        <b-col sm="auto">
                            <br/>
                            <b-pagination                      
                                class="overflow-auto"       
                                v-model="filtroImagesP.page"
                                :total-rows="imagesPersonal.total"
                                :per-page="filtroImagesP.perPage"
                                @click.native ="setPagePaginationImagesP(filtroImagesP.page)"
                            >
                        
                            </b-pagination>
                        </b-col>
                        <br/><br/><br/>
                        <b-col sm="auto" >  
                            <br/>                
                            <b-form-select style="height:35px" v-model="filtroImagesP.perPage" @input="setPerPagePaginationImagesP(filtroImagesP.perPage)" :options="sizes"></b-form-select>                    
                        </b-col>
                    </b-row>
                    
                </div>
                
                <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-3" v-for="imagesPersonal in imagesPersonal.data" :key="imagesPersonal.id">
                        <b-card
                            title=""
                            :img-src="url+imagesPersonal.path"
                            img-alt="Image"
                            img-top
                            tag="article"
                            style="max-width: 20em;"
                            class="mb-4"
                        >
                            <b-card-text>
                                Cedula: {{imagesPersonal.cedula}}
                            </b-card-text>
                            <b-card-text v-if="imagesPersonal.personal">
                                <p>Nombres: {{imagesPersonal.personal.nombres}}</p>
                                <p>Apellidos: {{imagesPersonal.personal.apellidos}}</p>
                            </b-card-text>
                          

                           
                        </b-card>
                    </div>
                </div>
                
            </div>  
            <div v-else> 
                <div class="row">  
                    <div class="col-md-6">
                    
                        <div class="input-group mt-4 col-md-8">
                            <input type="text" v-model="filtroImagesE.text" class="form-control form-control-sm" placeholder="Buscar">
                            <div class="input-group-append">
                                <button @click="buscar" class="btn btn-primary btn-sm" type="button">Buscar</button>
                                
                            </div>
                        </div>
                    </div>
                        
                    <b-row class="row justify-content-end col-md-6">                      
                        <b-col sm="auto">
                            <br/>
                            <b-pagination                      
                                class="overflow-auto"       
                                v-model="filtroImagesE.page"
                                :total-rows="imagesEstudiante.total"
                                :per-page="filtroImagesE.perPage"
                                @click.native ="setPagePaginationImagesE(filtroImagesE.page)"
                            >
                        
                            </b-pagination>
                        </b-col>
                        <br/><br/><br/>
                        <b-col sm="auto" >  
                            <br/>                
                            <b-form-select style="height:35px" v-model="filtroImagesE.perPage" @input="setPerPagePaginationImagesE(filtroImagesE.perPage)" :options="sizes"></b-form-select>                    
                        </b-col>
                    </b-row>
                    
                </div>  
                <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-3" v-for="imagesEstudiante in imagesEstudiante.data" :key="imagesEstudiante.id">
                        <b-card
                            title=""
                            :img-src="url+imagesEstudiante.path"
                            img-alt="Image"
                            img-top
                            tag="article"
                            style="max-width: 20em;"
                            class="mb-4"
                        >
                            <b-card-text>
                                Cedula: {{imagesEstudiante.cedula}}
                            </b-card-text>
                            <b-card-text v-if="imagesEstudiante.estudiante">
                                <p>Nombres: {{imagesEstudiante.estudiante.nombres}}</p>
                                <p>Apellidos: {{imagesEstudiante.estudiante.apellidos}}</p>
                            </b-card-text>
                          

                           
                        </b-card>
                    </div>
                </div>
            </div> 
                                
        </div>
    </div>    
</template>

<script>


    import { mapState, mapActions, mapMutations } from "vuex";

    import { Form, Field , configure, defineRule  } from 'vee-validate';

    
    import { localize, setLocale  } from '@vee-validate/i18n';
    import es from '@vee-validate/i18n/dist/locale/es.json'
    import { required, ext } from '@vee-validate/rules';

    configure({
        generateMessage: localize({
            es
        })
    })

    setLocale('es')

    defineRule('required', required)
    defineRule('ext', ext)
    export default {
        components: {
            Form,
            Field,
                 
        },

        data(){
            return{
                sizes:['10','30','50','100'],
                url: import.meta.env.VITE_BASE_URL
            }
        },
        
        async created() {
            
            // Si ya hay un usuario logeado, no puede entrar a la interfaz de login
        
            if(!this.selectedAuth.loged ){
                this.$router.replace('/login');    
            }
            // si el usuario no es administrador no puede entrar aqui
            if(this.selectedAuth.role != '1' ){
                this.$router.replace('/');    
            }
            
            if(this.selectedTipo.tipo == 'p'){
                await this.listarFotosPersonal();
            }else{
                await this.listarFotosEstudiante();
            }
            
        },
        computed:{
            ...mapState("auth", [
                "selectedAuth"    
            ]),
            ...mapState("importar", [
                "selectedTipo"
            ]),
            ...mapState("personalimages", [
                "imagesPersonal",
                "filtroImagesP"
            ]),
            ...mapState("estudianteimages", [
                "imagesEstudiante",
                "filtroImagesE"
            ]),
            ...mapState("configuration", [
                "templates"            
            ]),
            
        },
        methods:{
            ...mapMutations("personalimages",[
                "setFotosPersonal",
                "firtPageImagesP"
            ]),

            ...mapMutations("estudianteimages",[
                "firtPageImagesE"
            ]),
            ...mapActions("personalimages",[
                "importarFotosPersonal",
                "listarFotosPersonal",
                "setPagePaginationImagesP",
                "setPerPagePaginationImagesP"
            ]),

            ...mapActions("estudianteimages",[
                "importarFotosEstudiante",
                "listarFotosEstudiante",
                "setPagePaginationImagesE",
                "setPerPagePaginationImagesE"
            ]),

         

            async tipo(){
               
                if(this.selectedTipo.tipo == 'p'){
                    await this.listarFotosPersonal()
                }
                if(this.selectedTipo.tipo == 'e'){
                    await this.listarFotosEstudiante()
                }
            },
            async addfile(event) {
                let inp = document.getElementById("fotos");              
                for (let i = 0; i < inp.files.length; i++) {
                    let file = inp.files[i];
                    //console.log(file.name, file.webkitRelativePath, file.size);
                }
                

                if(this.selectedTipo.tipo == 'p'){
                    this.firtPageImagesP();
                    await this.importarFotosPersonal(inp.files);
                    await this.listarFotosPersonal();
                }else{
                    this.firtPageImagesE();
                    await this.importarFotosEstudiante(inp.files);
                    await this.listarFotosEstudiante();
                }
               
            },

            async buscar(){
                if(this.selectedTipo.tipo == 'p'){
                    this.firtPageImagesP();
                    await this.listarFotosPersonal();
                }else{

                    this.firtPageImagesE();
                    await this.listarFotosEstudiante();
                }
                
            }
        }
        
    }
</script>