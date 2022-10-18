import $http from './../../interceptors';


export async function readCarnet({ commit, state}) {
    
    await $http.post('/readCarnet', state.selectedCodigo)
    .then((response) => {
        
        commit('setSelectedUser', response.data.data)  
        commit('setError', response.data.error) 
        commit('setMessage', response.data.message)   
    })
    .catch((error) => {
        /*commit('setErrorAuth',true)
        console.log(error.response.data.error)
        
        setTimeout(() => {
            commit('setErrorAuth',false)
        },5000)*/
    })
}
export async function count({ commit, state}) {
    
    await $http.get('/count')
    .then((response) => {
        commit('setSelectedContador', response.data.data)   
    })
    .catch((error) => {
        /*commit('setErrorAuth',true)
        console.log(error.response.data.error)
        
        setTimeout(() => {
            commit('setErrorAuth',false)
        },5000)*/
    })
}