<template>

    <div class="modal fade" id="add" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl">
          
            <Form @submit="enviar" :validation-schema="schema">
                <div class="modal-content">
                    
                    <div class="modal-header">           
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <br/>
                    <label class="text-center text-danger">{{errorCedula }} {{errorCedulaE}}</label>
                    <label class="text-center text-success">{{successP }} {{successE}} </label>
                    <div class="modal-body">
          
                        <div class="row">
                            <div class="col-md-4">
                                <b-form-group
                                    id="input-group-1"
                                    label="Cedula:"                                        
                                >
                                <div v-if="selectedTipo.tipo == 'p'">
                                    <Field
                                        class="form-control form-control-sm"                                                         
                                        type="text"
                                        name="cedula." 
                                        rules="required|numeric"
                                        v-model="selectedPersonal.cedula"
                                    />
                                </div> 
                                <div v-else>
                                    <Field   
                                        class="form-control form-control-sm"                                                         
                                        type="text"
                                        name="cedula" 
                                        rules="required|numeric"
                                        v-model="selectedEstudiante.cedula"
                                    />
                                </div>                                          
                                    <ErrorMessage class="text-danger text-size" name="cedula." />
                                    <ErrorMessage class="text-danger text-size"  name="cedula" />                                      
                                </b-form-group>
                            </div>

                            <div class="col-md-4">
                                <b-form-group label="Nombres" >
                                    <div v-if="selectedTipo.tipo == 'p'">
                                        <Field
                                        class="form-control form-control-sm"                                                         
                                            type="text"
                                            name="nombres." 
                                            rules="required"
                                            v-model="selectedPersonal.nombres"
                                        />
                                    </div> 
                                    <div v-else>
                                        <Field   
                                        class="form-control form-control-sm"                                                         
                                            type="text"
                                            name="nombres" 
                                            rules="required"
                                            v-model="selectedEstudiante.nombres"
                                        />
                                    </div>                                          
                                    <ErrorMessage class="text-danger text-size" name="nombres." />
                                    <ErrorMessage class="text-danger text-size" name="nombres" /> 
                                </b-form-group>
                            </div>
                                <div class="col-md-4">
                                <b-form-group  label="Apellidos:" >
                                    <div v-if="selectedTipo.tipo == 'p'">
                                        <Field
                                        class="form-control form-control-sm"                                                         
                                            type="text"
                                            name="apellidos." 
                                            rules="required"
                                            v-model="selectedPersonal.apellidos"
                                        />
                                    </div> 
                                    <div v-else>
                                        <Field   
                                        class="form-control form-control-sm"                                                         
                                            type="text"
                                            name="apellidos" 
                                            rules="required"
                                            v-model="selectedEstudiante.apellidos"
                                        />
                                    </div>                                          
                                    <ErrorMessage class="text-danger text-size" name="apellidos." />
                                    <ErrorMessage class="text-danger text-size" name="apellidos" />
                                </b-form-group>
                            </div>
                            
                        </div>
                        <div class="row">
                            <div class="col-md-4" v-if="selectedTipo.tipo == 'p'">
                                <b-form-group id="input-group-3" label="Tipo:" >
                                    <div >
                                        <Field
                                            as="select"
                                            class="form-control form-control-sm"                                                         
                                            type="text"
                                            name="tipo" 
                                            rules="required"
                                            v-model="selectedPersonal.tipo"
                                        >
                                        <option value="A">Administrativo</option>
                                        <option value="D">Docente</option>
                                        <option value="O">Obrero</option>
                                        </Field>
                                    </div>                                         
                                    <ErrorMessage class="text-danger text-size" name="tipo" />
                                </b-form-group>
                            </div>
                            <div class="col-md-4">
                                <b-form-group id="input-group-3" label="Departamento:" >
                                    <div v-if="selectedTipo.tipo == 'p'">
                                        <b-form-select size="sm" v-model="selectedPersonal.departamento" :options="options"></b-form-select>
                                    </div>
                                    <div v-else>
                                        <b-form-select size="sm" v-model="selectedEstudiante.departamento" :options="options"></b-form-select>
                                    </div>
                                </b-form-group>
                            </div>
                        </div>
                        
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                        <button type="submit" class="btn btn-primary" >Aceptar</button>
                    </div>
                </div>                    
            </Form>
            
        </div>
    </div>
    
</template>

<script>
    import { mapState, mapActions, mapMutations } from "vuex";
    import { Form, Field, ErrorMessage, configure, defineRule  } from 'vee-validate';
    import { localize,setLocale  } from '@vee-validate/i18n';
    import es from '@vee-validate/i18n/dist/locale/es.json'
    import { required,numeric } from '@vee-validate/rules';

   
    configure({
        generateMessage: localize({
            es
        })
       
    })

    setLocale('es')
    defineRule('required', required)
    defineRule('numeric', numeric)
  

    export default {
        components: {
            Form,
            Field,
            ErrorMessage
        },
        props:{
            edit:Boolean,
            id:String
            
        },
        created() {
            
        },
        data(){
            return{
                options: [
                    { value: '', text: '' },
                    { value: 10, text: 'ADMINISTRACION' },
                    { value: 11, text: 'CONSTRUCCIONES CIVILES' },
                    { value: 12, text: 'ELECTRICIDAD' },
                    { value: 13, text: 'INFORMATICA' },
                    { value: 15, text: 'MECANICA' },
                    { value: 16, text: 'TECNOLOGIA DE MATERIALES' },
                    { value: 18, text: 'PROCESOS QUIMICOS' },
                    { value: 19, text: 'QUIMICA' },
                    { value: 93, text: 'VIGILANCIA PRIVADA' },
                    { value: 94, text: 'TRANSPORTE ENRIQUE' },
                    { value: 95, text: 'FUNDATEC' },
                    { value: 96, text: 'INDUSERVI' },
                    { value: 97, text: 'CAPROFIUT' },
                    { value: 98, text: 'VISITANTES' },
                    { value: 99, text: 'GUARDERIA' }
                    
                ]
            }
        },
        computed: {
            
            ...mapState("importar", [
                "selectedTipo"
            ]),
            ...mapState("personal", [
                "selectedPersonal",
                "errorCedula",
                "successP"
            ]),
            
            ...mapState("estudiantes", [
                "selectedEstudiante",
                "errorCedulaE",
                "successE"       
            ]),
        },

        methods:{
            ...mapMutations("personal",[
                "resetSelectedPersonal"
            ]),
            ...mapMutations("estudiantes",[
                "resetSelectedEstudiante"
            ]),
            ...mapActions("personal",[
                "guardarPersonal",
                "actualizarPersonal",
                "listarPersonal"
            ]),
            ...mapActions("estudiantes",[
                "guardarEstudiante",
                "actualizarEstudiante",
                "listarEstudiantes"
            ]),

            
            
            async enviar(){
             
                if(this.selectedTipo.tipo == 'p'){
                    if(this.edit){
                       
                        await this.actualizarPersonal(this.id);
                        await this.listarPersonal();
                    }else{
                        await this.guardarPersonal();
                    }
                    
                }else{
                    if(this.edit){
                        await this.actualizarEstudiante(this.id);
                        await this.listarEstudiantes();
                    }else{
                        await this.guardarEstudiante();
                    }
                    
                }
            
            }
        }
    }
</script>>