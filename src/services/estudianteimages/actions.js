import $http from './../../interceptors';

export async function importarFotosEstudiante({ commit, state}, fotos) {
    
    let formData = new  FormData();
    let cont = 0;
    for(var i = 0; i < fotos.length; i += 1){ 
        cont++
        formData.append('fotos'+cont,fotos[i]);                     
    }
    formData.append('cantidadfotos', fotos.length);                      
  
    await $http.post('/impotarFotosEstudiante',formData)
    .then((response) => {
      
      
    })
    .catch((error) => {
        console.log(error.response.data.error)
        
    })
}


export async function listarFotosEstudiante({ commit, state}) {
    
  
    await $http.post('/listarFotosEstudiante',state.filtroImagesE)
    .then((response) => {
        commit('setImagesEstudiante', response.data.data)
      
    })
    .catch((error) => {
        console.log(error.response.data.error)
        commit('setImagesEstudiante', [])
        
    })
}

export function setPagePaginationImagesE({ commit, dispatch }, page) {    
    commit('setPage', parseInt(page)) 
    dispatch('listarFotosEstudiante') 
}

export function setPerPagePaginationImagesE({ commit, dispatch}, perPage) {
    commit('setPerPage', parseInt(perPage))  
    dispatch('listarFotosEstudiante')  
}