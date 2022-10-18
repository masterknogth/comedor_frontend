


import $http from './../../interceptors';

export async function importarFotosPersonal({ commit, state}, fotos) {
    
    let formData = new  FormData();
    let cont = 0;
    for(var i = 0; i < fotos.length; i += 1){ 
        cont++
        formData.append('fotos'+cont,fotos[i]);                     
    }
    formData.append('cantidadfotos', fotos.length);                      
  
    await $http.post('/impotarFotosPersonal',formData)
    .then((response) => {
        //Se reinicia el estado selectedAuth
        //commit('resetSelectedAuth')
      
    })
    .catch((error) => {
        console.log(error.response.data.error)
        
    })
}


export async function listarFotosPersonal({ commit, state}) {
    
  
    await $http.post('/listarFotosPersonal',state.filtroImagesP)
    .then((response) => {
        commit('setImagesPersonal', response.data.data)
      
    })
    .catch((error) => {
        console.log(error.response.data.error)
        commit('setImagesPersonal', [])
        
    })
}

export function setPagePaginationImagesP({ commit, dispatch }, page) {    
    commit('setPage', parseInt(page)) 
    dispatch('listarFotosPersonal') 
}

export function setPerPagePaginationImagesP({ commit, dispatch}, perPage) {
    commit('setPerPage', parseInt(perPage))  
    dispatch('listarFotosPersonal')  
}