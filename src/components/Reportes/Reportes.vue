<template>
    <div class="container">
        <div class="row" style="margin-top:100px">  
            <div class="col-md-6">
                
                <div class="input-group mt-4 col-md-10">
    
                    <input type="text" @change="detectInput"  v-model="filtro.text"  class="form-control form-control-sm" placeholder="Buscar">
                    
                    <input type="date" @change="detectDate" v-model="filtro.fecha" class="form-control form-control-sm" placeholder="Buscar">
                    <select @change="detectTipo" v-model="filtro.tipo" class="form-control form-control-sm" placeholder="Buscar">
                        <option value="E">Estudiantes</option>
                        <option value="D">Docentes</option>
                        <option value="A">Administrativos</option>
                        <option value="O">Obreros</option>
                        <option value="">Todos</option>
                    </select>
                    <div class="input-group-append">
                        <!--<button  class="btn btn-outline-primary" ></button>-->
                        <button @click="limpiar" class="btn btn-primary btn-sm" type="button">limpiar</button>
                        <button @click="listarReportes" class="btn btn-secondary btn-sm" type="button">Buscar</button>
                    </div>
                </div>
            </div>
            
            
            <b-row class="row justify-content-end col-md-6">                      
                <b-col sm="auto">
                    <br/>
                    <b-pagination                      
                        class="overflow-auto"       
                        v-model="filtro.page"
                        :total-rows="reportes.total"
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
        <br/>
        <b-table-simple responsive striped hover :class="[templates.bg]">
            <b-thead>
                <tr>     
                    <b-th :class="[templates.text]">#</b-th>
                    <b-th :class="[templates.text]">Cedula</b-th>
                    <b-th :class="[templates.text]">Nombres</b-th>               
                    <b-th :class="[templates.text]">Apellidos</b-th>
                    <b-th :class="[templates.text]">Departamento</b-th>  
                    <b-th :class="[templates.text]">Tipo</b-th>
                    <b-th :class="[templates.text]">Usuario</b-th>
                    <b-th :class="[templates.text]">Fecha</b-th>
                    <b-th :class="[templates.text]">Hora</b-th>                       
                </tr>
            </b-thead>
            <b-tbody>
                <b-tr v-for="(reporte, index ) in reportes.data" :key="reporte.id">    
                    <b-td :class="[templates.text]">{{index+1}}</b-td>   
                    <b-td :class="[templates.text]">{{reporte.cedula}}</b-td>              
                    <b-td :class="[templates.text]">{{reporte.nombres}}</b-td>  
                    <b-td :class="[templates.text]">{{reporte.apellidos}}</b-td>  
                    <b-td :class="[templates.text]">{{reporte.departament?reporte.departament.name:''}}</b-td>
                    <b-td :class="[templates.text]">{{reporte.tipo}}</b-td> 
                    <b-td :class="[templates.text]">{{reporte.user?reporte.user.user:''}}</b-td> 
                    <b-td :class="[templates.text]">{{reporte.fecha}}</b-td> 
                    <b-td :class="[templates.text]">{{reporte.hora}}</b-td>  
                </b-tr>    
            </b-tbody>
            
        </b-table-simple> 
             
        <p v-if="!reportes.data" class="text-center" :class="[templates.text]">No hay información para mostrar</p>
               
    
    </div>
</template>

<script>

import { mapState, mapActions, mapMutations } from "vuex";
export default {
    data() {
        return{         
           sizes:['10','30','50','100', '500', '1000'],
          
           
        }
    },
    async created() {
            
            // Si ya hay un usuario logeado, no puede entrar a la interfaz de login
            this.resetFiltro()
            if(!this.selectedAuth.loged ){
                this.$router.replace('/login');    
            }
            // si el usuario no es administrador no puede entrar aqui
            if(this.selectedAuth.role != '1' ){
                this.$router.replace('/');    
            }
            //await this.countReport()
            await this.listarReportes()
           
    } ,  
    
    computed: {
       
        ...mapState("auth", [
            "selectedAuth"    
        ]),
        ...mapState("reportes", [
            "reportes",
            "filtro"   
        ]),
        ...mapState("configuration", [
            "templates"
        ]),
           
    },
    methods:{
        fullName(value) {
            return value.algo
        },
        ...mapMutations("reportes", [
            "resetFiltro"
        ]),
        ...mapActions("reportes", [
            "listarReportes",
            "countReport",
            "setPagePagination",
            "setPerPagePagination"
        ]),

        detectInput(){
            if(this.filtro.text != ""){
                this.filtro.fecha = ""
                this.filtro.tipo = ""
            }
        },
        detectDate(){
            if(this.filtro.fecha != ""){
                this.filtro.text = ""
            }
        },
        detectTipo(){
            if(this.filtro.tipo != ""){
                this.filtro.text = ""
            }
        },
        async limpiar(){
            this.resetFiltro()
            await this.listarReportes()

        }
    }
}
</script>