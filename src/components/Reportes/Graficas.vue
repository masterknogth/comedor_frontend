<template>
    <div class="container">
        <div class="row" style="margin-top:100px">
            <div class="col-md-4"></div>
            <div class="col-md-4">
                <div class="input-group mt-4 col-md-10">
                    <input type="date"  v-model="filtro.fecha" class="form-control form-control-sm" >
                    
                    <div class="input-group-append">
                        <button @click="limpiar" class="btn btn-outline-primary btn-sm" type="button">limpiar</button>
                        <button @click="buscar" class="btn btn-outline-primary btn-sm" type="button">Buscar</button>
                    </div>
                </div>
            </div>
            <div class="col-md-4"></div>
        </div>
        <br/>
        <div class="row" >  
            <div class="col-md-3">
            </div>
            <div class="col-md-6">
                <!--<DoughnutChart :chartData="testData" />-->
                <BarChart :chartData="testData" />
            </div>          
            <div class="col-md-3">
            </div>
        </div>
        <br/>
        <div class="row" >
            <label class="text-center">Total de Usuarios: {{total}}</label>
        </div>
    </div>
</template>

<script>
    import { mapState, mapActions, mapMutations } from "vuex";
    
    import { DoughnutChart } from 'vue-chart-3';
    import { BarChart } from 'vue-chart-3';
    import { Chart, registerables } from "chart.js";
    Chart.register(...registerables);
    
    export default {
        components: {
            BarChart,
            DoughnutChart
        },
        data() {
            return {
                testData:{},
                total:''
            }
        },
        async created() {    
                 
                this.resetFiltro()
                // Si ya hay un usuario logeado, no puede entrar a la interfaz de login
                if(!this.selectedAuth.loged ){
                    this.$router.replace('/login');    
                }
                // si el usuario no es administrador no puede entrar aqui
                if(this.selectedAuth.role != '1' ){
                    this.$router.replace('/');    
                }  

                await this.countReport()
                this.graficar()
                
        }, 
        /*setup() {
            const testData = {
            labels: ['Estudiantes' , 'Administrativos', 'Obreros', 'Docentes', 'Total'],
            datasets: [
                {
                    data: [50, 40, 60, 70, 5],
                    //data: this.grafica,
                    backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
                    borderWidth: 1,
					pointBorderColor: '#249EBF',
                },
            ],
            };

            return { testData };
        },*/
        computed: {           
            ...mapState("auth", [
                "selectedAuth"    
            ]),
            ...mapState("reportes", [
                "fechaGrafica",
                "filtro",
                "grafica"   
            ]),
            
        }, 
        methods:{
            ...mapMutations("reportes", [
                "resetFiltro"
            ]),
            ...mapActions("reportes", [
                "countReport"
            ]),

            graficar(){
                this.testData = {
                    labels: ['Estudiantes' , 'Administrativos', 'Obreros', 'Docentes'],
                    datasets: [
                        {
                            //data: [50, 40, 60, 70, 5],
                            data: this.grafica,
                            backgroundColor: ['#77CEFF', '#0079AF', '#123E6B', '#97B0C4', '#A5C8ED'],
                            borderWidth: 1,
                            pointBorderColor: '#249EBF',
                        },
                    ],
                };
                let total = 0
                for(let i of this.grafica){
                    total+=i;
                } 
               
                this.total = total
            },

            async limpiar(){
                this.resetFiltro()
                await this.countReport()
                this.graficar()
            },

            async buscar(){
                await this.countReport()
                this.graficar()
            }
        }

    }
</script>