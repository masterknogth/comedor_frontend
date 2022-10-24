<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import NavBar from './components/NavBar.vue'
</script>

<template>  
  <div>
    
    <NavBar/>
   
    <router-view/>
    
  </div>
</template>


<script>

import { mapState, mapActions, mapMutations } from "vuex";


export default {
  name: "App",
 

  data() {
      return {
       
      }
    },

  async created() {
      
      
      //expira sesion despues de 6horas
      if(localStorage.getItem('inicio') != null){
        const milisegundos = new Date();
        let tiempoLogeado = milisegundos.getTime() - localStorage.getItem('inicio');
  
        if(tiempoLogeado > 21600000 ){
        //if(tiempoLogeado > 30000 ){  
            localStorage.removeItem("role");
            localStorage.removeItem("loged");
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            localStorage.removeItem("inicio");
        }  
      }
      
      //detecta si se cerro sesion para recargar todas las paginas
      let bc = new BroadcastChannel('abc'); 
      bc.onmessage = function (ev) { 
          // do anything you want in here
          // example reload page
          if (ev.data == 'heyreload') {
              location.reload();
          }
      }
    this.setSelectedAuth({
      role: localStorage.getItem('role'),
      loged:localStorage.getItem('loged'),
      user:localStorage.getItem('user'),
    })
    await this.obtenerTemplate();
    
  },

  computed: {
   
    ...mapState("auth", [
      "selectedAuth",
    ])  
  },

  methods: {
      ...mapMutations("auth", [
        "setSelectedAuth"
      ]),
      ...mapActions("configuration", [
        "obtenerTemplate"
      ]),
    

  },
};



</script>

