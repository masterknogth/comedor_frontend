import $http from './../../interceptors';

export async function listarPersonal({ commit, state}) {
    
  
    await $http.post('/listarPersonal',state.filtro)
    .then((response) => {
        commit('setPersonal', response.data.data)
      
    })
    .catch((error) => {
        console.log(error.response.data.error)
        commit('setPersonal', [])
        
    })
}

export function setPagePagination({ commit, dispatch }, page) {    
    commit('setPage', parseInt(page)) 
    dispatch('listarPersonal') 
}

export function setPerPagePagination({ commit, dispatch}, perPage) {
    commit('setPerPage', parseInt(perPage))  
    dispatch('listarPersonal')  
}

export async function guardarPersonal({ commit, state}) {
    
  
    await $http.post('/storePersonal',state.selectedPersonal)
    .then((response) => {
        commit('resetSelectedPersonal')
    })
    .catch((error) => {
        
        
        commit('setError',error.response.data.error.cedula[0])
       
        setTimeout(() => {
            commit('setError',"")
        },5000)
    })
}

export async function actualizarPersonal({ commit, state}, id) {
    

    await $http.put(`/updatePersonal/${id}`,state.selectedPersonal)
    .then((response) => {
        commit('setSuccess',response.data.data)
        setTimeout(() => {
            commit('setSuccess',"")
        },5000)
    })
    .catch((error) => {
        
        commit('setError',error.response.data.error.cedula[0])
        setTimeout(() => {
            commit('setError',"")
        },5000)
       
    })
}


export async function eliminarPersonal({ commit, state}, id) {
    
    await $http.delete(`/deletePersonal/${id}`)
    .then((response) => {
       
    })
    .catch((error) => {
        
        
    })
}

