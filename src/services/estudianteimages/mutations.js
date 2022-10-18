



export function setImagesEstudiante(state,data) {  
    state.imagesEstudiante = data   
}

//Cambia de pagina
export function setPage(state, page) {   
    state.filtroImagesE.page = page
}

//cambia cuantos items se vera por pagina
export function setPerPage(state, perPage) {
    state.filtroImagesE.page = 1
    state.filtroImagesE.perPage = perPage
}

export function firtPageImagesE(state) {   
    state.filtroImagesE.page = 1
}
