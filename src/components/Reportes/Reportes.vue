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
                        <button @click="limpiar" class="btn btn-outline-primary btn-sm" type="button">limpiar</button>
                        <button @click="listarReportes" class="btn btn-outline-primary btn-sm" type="button">Buscar</button>
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
        <b-table-simple responsive striped hover >
            <b-thead>
                <tr>     
                    <b-th >#</b-th>
                    <b-th >Cedula</b-th>
                    <b-th >Nombres</b-th>               
                    <b-th >Apellidos</b-th>
                    <b-th >Departamento</b-th>  
                    <b-th >Tipo</b-th>
                    <b-th >Fecha</b-th>
                    <b-th >Hora</b-th>                       
                </tr>
            </b-thead>
            <b-tbody>
                <b-tr v-for="(reporte, index ) in reportes.data" :key="reporte.id">    
                    <b-td>{{index+1}}</b-td>   
                    <b-td>{{reporte.cedula}}</b-td>              
                    <b-td>{{reporte.nombres}}</b-td>  
                    <b-td>{{reporte.apellidos}}</b-td>  
                    <b-td>{{reporte.departament?reporte.departament.name:''}}</b-td>
                    <b-td>{{reporte.tipo}}</b-td> 
                    <b-td>{{reporte.fecha}}</b-td> 
                    <b-td>{{reporte.hora}}</b-td>  
                </b-tr>    
            </b-tbody>
            
        </b-table-simple> 
             
        <p v-if="!reportes.data" class="text-center">No hay información para mostrar</p>
               
    
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
            await this.countReport()
            await this.listarReportes()
           
    } ,  
    
    computed: {
       
        ...mapState("auth", [
            "selectedAuth"    
        ]),
        ...mapState("reportes", [
            "reportes",
            "filtro"   
        ])
           
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