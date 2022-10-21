import {defaultFiltro} from './states'



// asigna los valores por defecto del estado selectedAuth
export function resetFiltro(state) {
    state.filtro = defaultFiltro()
}


export function setReportes(state,data) {  
    state.reportes = data   
}
export function setGrafica(state,data) {  
    state.grafica = data   
}
export function setFecha(state,data) {  
    state.filtro.fecha = data   
}

//Cambia de pagina
export function setPage(state, page) {   
    state.filtro.page = page
}

//cambia cuantos items se vera por pagina
export function setPerPage(state, perPage) {
    state.filtro.page = 1
    state.filtro.perPage = perPage
}

export function firtPage(state) {   
    state.filtro.page = 1
}