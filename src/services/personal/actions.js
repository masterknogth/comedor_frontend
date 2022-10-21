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
    
    commit('setDefaultError')
    commit('setDefaultSuccess')
    await $http.post('/storePersonal',state.selectedPersonal)
    .then((response) => {
        commit('resetSelectedPersonal')
        commit('setSuccess',{data:response.data.data, show:true})
        setTimeout(() => {
            commit('setDefaultSuccess')
        },3000)
    })
    .catch((error) => {
        
        commit('setErrorP',error.response.data.error)
        /*setTimeout(() => {
            commit('setDefaultError')
        },3000)*/
       
    })
}

export async function actualizarPersonal({ commit, state}, id) {
    
    commit('setDefaultError')
    commit('setDefaultSuccess')
    await $http.post(`/updatePersonal/${id}`,state.selectedPersonal)
    .then((response) => {
        commit('setSuccess',{data:response.data.data, show:true})
        setTimeout(() => {
            commit('setDefaultSuccess')
        },3000)
    })
    .catch((error) => {
        
        commit('setErrorP',error.response.data.error)
        /*setTimeout(() => {
            commit('setDefaultError')
        },3000)*/
       
    })
}


export async function eliminarPersonal({ commit, state}, id) {
    
    await $http.delete(`/deletePersonal/${id}`)
    .then((response) => {
       
    })
    .catch((error) => {
        
        
    })
}

