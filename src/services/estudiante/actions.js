import $http from './../../interceptors';

export async function listarEstudiantes({ commit, state}) {
    
  
    await $http.post('/listarEstudiantes',state.filtroEstudiante)
    .then((response) => {
        commit('setEstudiantes', response.data.data)
      
    })
    .catch((error) => {
        console.log(error.response.data.error)
        commit('setEstudiantes', [])
    })
}

export function setPagePaginationEstudiante({ commit, dispatch }, page) {    
    commit('setPage', parseInt(page)) 
    dispatch('listarEstudiantes') 
}

export function setPerPagePaginationEstudiante({ commit, dispatch}, perPage) {
    commit('setPerPage', parseInt(perPage))  
    dispatch('listarEstudiantes')  
}

export async function guardarEstudiante({ commit, state}) {
    
    commit('setDefaultError')
    commit('setDefaultSuccess')
    await $http.post('/storeEstudiante',state.selectedEstudiante)
    .then((response) => {
       
        commit('resetSelectedEstudiante')
        commit('setSuccess',{data:response.data.data, show:true})
        setTimeout(() => {
            commit('setDefaultSuccess')
        },3000)
    })
    .catch((error) => {
        
        commit('setError',error.response.data.error)
        /*setTimeout(() => {
            commit('setDefaultError')
        },3000)*/
        
    })
}

export async function actualizarEstudiante({ commit, state}, id) {
    commit('setDefaultError')
    commit('setDefaultSuccess')
    
    await $http.post(`/updateEstudiante/${id}`,state.selectedEstudiante)
    .then((response) => {
        commit('setSuccess',{data:response.data.data, show:true})
        setTimeout(() => {
            commit('setDefaultSuccess')
        },3000)
    })
    .catch((error) => {
        commit('setError',error.response.data.error)
        /*setTimeout(() => {
            commit('setDefaultError')
        },3000)*/
       
    })
}

export async function eliminarEstudiante({ commit, state}, id) {
    
    await $http.delete(`/deleteEstudiante/${id}`)
    .then((response) => {
       
    })
    .catch((error) => {
        
        
    })
}