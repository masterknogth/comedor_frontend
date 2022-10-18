import $http from './../../interceptors';

export async function importarData({ commit, state}) {
   
    let datos = {tipo: state.selectedTipo.tipo, datos: state.importarDatos}
    await $http.post('/import',datos)
    .then((response) => {
        //Se reinicia el estado selectedAuth
        //commit('resetSelectedAuth')
      
    })
    .catch((error) => {
        console.log(error.response.data.error)
        
    })
}

