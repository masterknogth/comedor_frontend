<template>
    <div class="container">
        <div class="row" style="margin-top:100px">
            <div class="col-md-4">
                
               
            </div>
          
            <div class="col-md-4">
                <Form :validation-schema="schema" v-slot="{ errors }">
                    <div class="text-danger">{{errors.file}}</div>
                    <div class="input-group mb-3">
                        <Field
                            type="file"
                            class="form-control"
                            placeholder="Recipient's username"
                            aria-label="Recipient's username" 
                            aria-describedby="button-addon2"
                            @change="addfile($event)"
                            name='file'
                           rules="ext:xls,xlsx|required"
                        />
                       
                        <button :disabled="disabled" data-bs-toggle="modal" data-bs-target="#confirm" class="btn btn-outline-primary" type="button" id="button-addon2">
                            Cargar
                             <span class="loader" v-if="loading"></span>
                        </button>
                    </div>
                
                
                    <div>
                        <b-form-group>
                            <b-form-checkbox v-model="selectedTipo.tipo" @change="tipo" :aria-describedby="ariaDescribedby" name="some-radios" value="p" unchecked-value="e">Personal</b-form-checkbox>
                            <b-form-checkbox v-model="selectedTipo.tipo" @change="tipo" :aria-describedby="ariaDescribedby" name="some-radios" value="e" unchecked-value="p">Estudiantes</b-form-checkbox>                         
                        </b-form-group>
                    </div>
                </Form>
              
            </div>   
                    
            <div class="col-md-4">

            </div>      
                                
        </div>
        <div class="row">
            <div class="alert alert-danger text-center" v-if="error" >
                {{errorText}}
            </div>
            <div class="alert alert-success text-center" v-if="success" >
                {{successText}}
            </div>
            
        </div>
        <div v-if="selectedTipo.tipo =='p' ">
            <div class="row">  
                <div class="col-md-5">
                   
                    <div class="input-group mt-4 col-md-8">
                        <input type="text" v-model="filtro.text" class="form-control form-control-sm" placeholder="Buscar">
                        <div class="input-group-append">
                            <button @click="buscarPersonal" class="btn btn-outline-primary btn-sm" type="button">Buscar</button>
                            
                        </div>
                    </div>
                </div>
                <div class="col-md-2">    
                    <div class="row justify-content-center">                     
                        <button @click="setEdit(false,null, null)" data-bs-toggle="modal" data-bs-target="#add"  class="col-md-3 btn btn-success btn-sm mt-4">+</button> 
                    </div>                     
                </div>         
                <b-row class="row justify-content-end col-md-5">                      
                    <b-col sm="auto">
                        <br/>
                        <b-pagination                      
                            class="overflow-auto"       
                            v-model="filtro.page"
                            :total-rows="personal.total"
                            :per-page="filtro.perPage"
                            @click.native ="setPagePagination(filtro.page)"
                        >
                    
                        </b-pagination>
                    </b-col>
                    <br/><br/><br/>
                    <b-col sm="auto" >  
                        <br/>                
                        <b-form-select style="height:35px" v-model="filtro.perPage" @input="setPerPagePagination(filtro.perPage)" :options="sizes"></b-form-select>                    
                    </b-col>
                </b-row>
                
            </div>
            <b-table-simple responsive striped hover  >
                <b-thead>
                    <tr>     
                        <b-th >Numero</b-th>
                        <b-th >Cedula</b-th>
                        <b-th >Nombres</b-th>               
                        <b-th >Apellidos</b-th>
                        <b-th >Departamento</b-th>
                        <b-th >Acciones</b-th>                       
                    </tr>
                </b-thead>
                <b-tbody>
                    <b-tr v-for="personal in personal.data" :key="personal.id">     
                        <b-td>{{personal.numero}}</b-td>              
                        <b-td>{{personal.cedula}}</b-td>  
                        <b-td>{{personal.nombres}}</b-td>  
                        <b-td>{{personal.apellidos}}</b-td>  
                        <b-td>{{personal.departament?personal.departament.name:''}}</b-td>  
                        <b-td>
                            <b-button 
                                data-bs-toggle="modal"
                                size="sm" 
                                @click="setEdit(true, personal,personal.id)"
                                data-bs-target="#add" variant="primary"
                                class="mr-2"
                            >
                                <i class="fa-solid fa-pen-to-square"></i>
                            </b-button>
                            <b-button
                                data-bs-toggle="modal"
                                size="sm"    
                                data-bs-target="#delete"
                                variant="danger"
                                @click="setDelete(personal.id)"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </b-button>
                        </b-td>
                    </b-tr>    
                </b-tbody>
            </b-table-simple>
            <p v-if="!personal.data" class="text-center">No hay información para mostrar</p>
            
        </div>
        <div v-if="selectedTipo.tipo =='e' ">
            <div class="row">  
                <div class="col-md-5">
                   
                    <div class="input-group mt-4 col-md-8">
                        <input type="text" v-model="filtroEstudiante.text" class="form-control form-control-sm" placeholder="Buscar">
                        <div class="input-group-append">
                            <button @click="buscarEstudiante" class="btn btn-outline-primary btn-sm" type="button">Buscar</button>
                        </div>
                    </div>
                </div>
                <div class="col-md-2">    
                    <div class="row justify-content-center">                     
                        <button @click="setEdit(false, null,null)" data-bs-toggle="modal" data-bs-target="#add"  class="col-md-3 btn btn-success btn-sm mt-4">+</button> 
                    </div>                     
                </div>    
                
                <b-row class="row justify-content-end col-md-5">                      
                    <b-col sm="auto">
                        <br/>
                        <b-pagination                      
                            class="overflow-auto"       
                            v-model="filtroEstudiante.page"
                            :total-rows="estudiantes.total"
                            :per-page="filtroEstudiante.perPage"
                            @click.native ="setPagePaginationEstudiante(filtroEstudiante.page)"
                        >
                    
                        </b-pagination>
                    </b-col>
                    <br/><br/><br/>
                    <b-col sm="auto" >  
                        <br/>                
                        <b-form-select style="height:35px" v-model="filtroEstudiante.perPage" @input="setPerPagePaginationEstudiante(filtroEstudiante.perPage)" :options="sizes"></b-form-select>                    
                    </b-col>
                </b-row>
                
            </div>
            <b-table-simple responsive striped hover >
                <b-thead>
                    <tr>     
                        <b-th >Cedula</b-th>
                        <b-th >Nombres</b-th>               
                        <b-th >Apellidos</b-th>
                        <b-th >Departamento</b-th>  
                        <b-th >Acciones</b-th>                       
                    </tr>
                </b-thead>
                <b-tbody>
                    <b-tr v-for="estudiante in estudiantes.data" :key="estudiante.id">     
                                  
                        <b-td>{{estudiante.cedula}}</b-td>  
                        <b-td>{{estudiante.nombres}}</b-td>  
                        <b-td>{{estudiante.apellidos}}</b-td>  
                        <b-td>{{estudiante.departament?estudiante.departament.name:''}}</b-td>  
                        <b-td>
                            <b-button
                                @click="setEdit(true, estudiante, estudiante.id)"
                                data-bs-toggle="modal"
                                size="sm"
                                data-bs-target="#add"
                                variant="primary"
                                class="mr-2"
                            >
                                <i class="fa-solid fa-pen-to-square"></i>
                            </b-button>
                            <b-button
                                @click="setDelete(estudiante.id)"
                                data-bs-toggle="modal"
                                size="sm"    
                                data-bs-target="#delete"
                                variant="danger"
                            >
                                <i class="fa-solid fa-trash"></i>
                            </b-button>
                        </b-td>
                    </b-tr>    
                </b-tbody>
            </b-table-simple>
            <p v-if="!estudiantes.data" class="text-center">No hay información para mostrar</p>
        </div>
        <b-modal id="modal-1"  size="xs" ok-variant="danger" cancel-title="No" ok-title="Si" @ok="cargarDatos" > 
            <p class="text-center">
                Al cargar esta data reemplazara totalmente la data anterior
            </p> 
            <p class="text-center">
                ¿ Está seguro que desea eliminar este registro ?
            </p> 
        </b-modal>

 

        <!-- Modal -->
        <div class="modal fade" id="confirm" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                       
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <p class="text-center" >
                            Al importar este archivo vas a sobreescribir la data actual por la data contenida en el este excel
                        </p> 
                        <p class="text-center" >
                            ¿ Desea continuar ?
                        </p> 
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                        <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="cargarDatos">Si</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Modal delete-->
        <div class="modal fade" id="delete" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                       
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">                 
                        <p class="text-center" >
                            ¿ Desea eliminar este registro ?
                        </p> 
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="eliminar">Si</button>
                    </div>
                </div>
            </div>
        </div>
        <FormImportar :edit="edit" :id="id" />

    </div>
    
</template>
<script>

    import { mapState, mapActions, mapMutations } from "vuex";
    import * as XLSX from "xlsx";
    import { Form, Field , configure, defineRule  } from 'vee-validate';

    import FormImportar from './Form.vue';
    import { localize, setLocale  } from '@vee-validate/i18n';
    import es from '@vee-validate/i18n/dist/locale/es.json'
    import { email, required,ext } from '@vee-validate/rules';

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
            FormImportar     
        },

        data() {
            return{
                file: File,
                arrayBuffer: null,
                filelist: null,
                sizes:['10','30','50','100'],
                loading:false,
                disabled:false,
                errorText:'',
                error:false,
                success:false,
                successText:'', 
                edit:false,
                id:''
                
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
                await this.listarPersonal()
            }else{
                await this.listarEstudiantes()
            }
            
        },
        computed: {
            
            ...mapState("auth", [
                "selectedAuth"    
            ]),
            ...mapState("importar", [
                "importarDatos",
                "selectedTipo"
            ]),
            ...mapState("personal", [
                "personal",
                "filtro",
                "selectedPersonal"
            ]),
            ...mapState("estudiantes", [
                "estudiantes",
                "filtroEstudiante"
            ]),
        },
        methods:{
            ...mapMutations("importar", [
                "setImport",
                "setTipo"
            ]),
            
            ...mapMutations("personal", [
                "firtPage",
                "resetSelectedPersonal",
                "setSelectedPersonal"
            ]),
            ...mapMutations("estudiantes", [
                "firtPageEstudiante",
                "resetSelectedEstudiante",
                "setSelectedEstudiante"
            ]),
            
            
            ...mapActions("importar", [
                "importarData",
            ]),
            ...mapActions("personal", [
                "listarPersonal",
                "setPagePagination",
                "setPerPagePagination",
                "eliminarPersonal"
            ]),
            ...mapActions("estudiantes", [
                "listarEstudiantes",
                "setPagePaginationEstudiante",
                "setPerPagePaginationEstudiante",
                "eliminarEstudiante"
            ]),

            addfile(event) {
               
                this.file = event.target.files[0];
              
                let fileReader = new FileReader();
                fileReader.readAsArrayBuffer(this.file);
                fileReader.onload =  (e) => {
                    this.arrayBuffer = fileReader.result;
                    var data = new Uint8Array(this.arrayBuffer);
                    var arr = new Array();
                    for (var i = 0; i != data.length; ++i)
                    arr[i] = String.fromCharCode(data[i]);
                    var bstr = arr.join("");
                    var workbook = XLSX.read(bstr, { type: "binary" });
                    var first_sheet_name = workbook.SheetNames[0];
                    var worksheet = workbook.Sheets[first_sheet_name];
                    //console.log(XLSX.utils.sheet_to_json(worksheet, { raw: true }));
                    var arraylist = XLSX.utils.sheet_to_json(worksheet, { raw: true });
                    this.filelist = [];
                    //console.log(this.filelist);
                    // console.log(arraylist)
                    this.setImport(arraylist)
  
                };               
            },
            async cargarDatos(){
               
                
                if(this.importarDatos[0].tipo == 'E' && this.selectedTipo.tipo == 'p'){
                    this.error = true;
                    this.errorText = 'los datos de este excel no corresponden a la data de personal';
                    setTimeout(() => {
                        this.error = false;
                    },5000)
                    return 
                    
                }
                if(this.importarDatos[0].tipo != 'E' && this.selectedTipo.tipo == 'e'){
                    this.error = true;
                    this.errorText = 'los datos de este excel no corresponden a la data de estudiantes';
                    setTimeout(() => {
                        this.error = false;
                    },5000)
                    return
                }
                this.loading = true;
                this.disabled = true;
                await this.importarData()
                if(this.selectedTipo.tipo == 'p'){
                    await this.listarPersonal()
                }
                if(this.selectedTipo.tipo == 'e'){
                    await this.listarEstudiantes()
                }
                this.loading = false;
                this.disabled = false;
                this.success = true;
                this.successText = 'data cargada exitosamente';
                setTimeout(() => {
                    this.success = false;
                },5000)
            },

            async buscarPersonal(){
                this.firtPage();
                await this.listarPersonal();
               
            },
            async buscarEstudiante(){
                this.firtPageEstudiante();
                await this.listarEstudiantes();
               
            },
            async tipo(){
               
                if(this.selectedTipo.tipo == 'p'){
                    await this.listarPersonal()
                }
                if(this.selectedTipo.tipo == 'e'){
                    await this.listarEstudiantes()
                }
            },
            setEdit(edit, data, id){
                this.edit = edit;
                this.id = id;
               
                if(this.edit){
                    if(this.selectedTipo.tipo == 'p'){
                        this.resetSelectedPersonal();
                        this.setSelectedPersonal(data);
                        
                    }else{
                        this.resetSelectedEstudiante();
                        this.setSelectedEstudiante(data)
                    }

                }else{
                    this.resetSelectedEstudiante();
                    this.resetSelectedPersonal();
                }
            },
            setDelete(data){
                this.id = data;
            },
            async eliminar(){
                
                if(this.selectedTipo.tipo == 'p'){
                    await this.eliminarPersonal(this.id);
                    await this.listarPersonal();
                }else{
                    await this.eliminarEstudiante(this.id);
                    await this.listarEstudiantes();
                }
            }

        }
    }
</script>