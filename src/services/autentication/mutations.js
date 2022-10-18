import {defaultAuth} from './states'



// asigna los valores por defecto del estado selectedAuth
export function resetSelectedAuth(state) {
    state.selectedAuth = defaultAuth()
}


export function setSelectedAuth(state, {role, loged, user}) {
    state.selectedAuth.role = role // asigna rol de usuario
    state.selectedAuth.loged = loged // si esta logeado muestra true
    state.selectedAuth.user = user
}

export function setSuccess(state,data) {
    state.success = data
}

export function resetErrors(state,data) {
    state.errors = data
}

export function setErrorAuth(state,data) {
    state.errorAuth = data
}

export function setDetectLogout(state,data){
    state.detectLogout = data
}