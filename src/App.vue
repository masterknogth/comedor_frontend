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

  created() {
        
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
    

  },
};



</script>

