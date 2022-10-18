import { createApp } from 'vue'
import store from './store/store'
import App from './App.vue'
import router from "./router";
import 'vee-validate';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import BootstrapVue from 'bootstrap-vue-3';






const app = createApp(App);
app.use(store)
.use(router)
.use(BootstrapVue);

app.mount("#app");