

export function setFotosPersonal(state, data) {   
    state.fotosP = data
}

export function setImagesPersonal(state,data) {  
    state.imagesPersonal = data   
}

//Cambia de pagina
export function setPage(state, page) {   
    state.filtroImagesP.page = page
}

//cambia cuantos items se vera por pagina
export function setPerPage(state, perPage) {
    state.filtroImagesP.page = 1
    state.filtroImagesP.perPage = perPage
}

export function firtPageImagesP(state) {   
    state.filtroImagesP.page = 1
}
