<template>
    <div class="container" >
        <div class="row justify-content-center" > 
            <div class="col-md-4">
            </div>
            <div class="col-md-4 row justify-content-center">  
                
                <img :src="url"   class="img-thumbnai image">
            </div>
            <div class="col-md-4">
            </div>
        </div>
        <br/>
        <div class="row">
            <div class="col-md-12">
                <div class="table-responsive">
                    <table class="table table-striped " :class="[templates.bg]">
                        <thead>
                            <tr>     
                                <th :class="[templates.text]">Cedula</th>               
                                <th :class="[templates.text]">Nombres</th>
                                <th :class="[templates.text]">Apellidos</th>
                                <th :class="[templates.text]">Departamento</th>
                                <th :class="[templates.text]">Tipo</th>                         
                            </tr>
                        </thead>
                        <tbody>
                            <tr>     
                                <td :class="[templates.text]">{{data.cedula}}</td>              
                                <td :class="[templates.text]">{{data.nombres}}</td>
                                <td :class="[templates.text]">{{data.apellidos}}</td>
                                <td :class="[templates.text]">{{data.departament?data.departament.name:''}}</td>
                                <td :class="[templates.text]">{{data.tipo}}</td>
                            </tr>    
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <!--<div>
            <b-table striped responsive hover :items="items"></b-table>
        </div>-->
        <div class="row justify-content-center">
          
            <b-button type="button" class="col-md-2" @click="aceptar"  variant="primary">Aceptar</b-button>
           
        </div>
    </div>
</template>

<script>

    import { mapState, mapActions, mapMutations } from "vuex";
    
    export default {
        data() {
            return {
                url:'',
               
            }
        },
        async created(){
            if(this.data.tipo == 'E'){
                this.url = import.meta.env.VITE_BASE_URL+'storage/estudiante/'+this.data.cedula+'.jpg'
            }else{
                this.url = import.meta.env.VITE_BASE_URL+'storage/personal/'+this.data.cedula+'.jpg'
            }
            await this.count();
        },
        props:{
            data: Object,
        },
        computed: {
                
            ...mapState("auth", [
                "selectedAuth"    
            ]),
            ...mapState("asistencia", [
                "send",
                "selectedContador"
            ]),
            ...mapState("configuration", [
                "templates"
            ]),

           

        },
        methods:{
            ...mapMutations("asistencia", [
                "setSend",
            ]),
            ...mapActions("asistencia", [
                "count"
            ]),
            aceptar(){
                this.setSend(false);
            }
        }

    }
</script>
