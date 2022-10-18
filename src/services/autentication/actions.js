import $http from './../../interceptors';


export async function login({ commit, state}) {
    commit('setErrorAuth',false)
    await $http.post('/login', state.ingreso)
    .then((response) => {
        localStorage.setItem('token', response.data.data.token);
        localStorage.setItem('role', response.data.data.role_id);
        localStorage.setItem('loged', true);
        localStorage.setItem('user', response.data.data.user);
        let role = localStorage.getItem('role')
        let loged = localStorage.getItem('loged')
        let user = localStorage.getItem('user')
    
        commit('setSelectedAuth', {role, loged, user})
        commit('setErrorAuth',false)
      
    })
    .catch((error) => {
        commit('setErrorAuth',true)
        console.log(error.response.data.error)
        
        setTimeout(() => {
            commit('setErrorAuth',false)
        },5000)
    })
}

export async function logout({ commit, state}) {
 
    await $http.get('/logout')
    .then((response) => {
        //Se reinicia el estado selectedAuth
        commit('resetSelectedAuth')
      
    })
    .catch((error) => {
        console.log(error.response.data.error)
        
    })
}

