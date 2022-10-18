import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import Login from "./components/Login.vue";
import Dashboard from "./components/Dashboard.vue";
import Importar from "./components/Importar/Importar.vue";
import ImportarFotos from "./components/Importar/ImportarFotos.vue";
import Reportes from "./components/Reportes/Reportes.vue";
import Graficas from "./components/Reportes/Graficas.vue";
//import PageNotFound from "./components/PageNotFound.vue"



const routes = [
    {
        path: "/login",
        name: "login",
        component: Login
    },
    {
        path: "/",
        name: "dashboard",
        component: Dashboard
    },
    {
        path: "/importar",
        name: "importar",
        component: Importar
    },
    {
        path: "/reportes",
        name: "reportes",
        component: Reportes
    },
    {
        path: "/graficas",
        name: "graficas",
        component: Graficas
    },
    {
        path: "/importar-fotos",
        name: "importar-fotos",
        component: ImportarFotos
        
    }
    /*{   path: "/:catchAll(.*)",
        name:"PageNotFound",
        component: PageNotFound
    }*/
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    base: import.meta.env.VITE_BASE_URL
})
export default router;