import $http from './../../interceptors';

export async function listarReportes({ commit, state}) {
    
  
    await $http.post('/listarReportes',state.filtro)
    .then((response) => {
        commit('setReportes', response.data.data)
      
    })
    .catch((error) => {
        console.log(error.response.data.error)
        commit('setReportes', [])
        
    })
}
export async function countReport({ commit, state}) {
    
  
    await $http.post('/countReport',state.filtro)
    .then((response) => {
        commit('setGrafica', response.data.data)
        commit('setFecha', response.data.fecha)
        
    })
    .catch((error) => {
        console.log(error.response.data.error)
        
    })
}

export function setPagePagination({ commit, dispatch }, page) {    
    commit('setPage', parseInt(page)) 
    dispatch('listarReportes') 
}

export function setPerPagePagination({ commit, dispatch}, perPage) {
    commit('setPerPage', parseInt(perPage))  
    dispatch('listarReportes')  
}