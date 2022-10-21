import {defaultAsistencia} from './states'



// asigna los valores por defecto del estado selectedCodigo
export function resetSelectedCodigo(state) {
    state.selectedCodigo = defaultAsistencia();
}

export function setSelectedUser(state, data) {
    state.selectedUser = data;
}

export function setSend(state, data) {
    state.send = data;
}

export function setError(state, data) {
    state.error = data;
}
export function setMessage(state, data) {
    state.message = data;
}

export function setSelectedContador(state, data) {
    
    // claves = ["nombre", "color", "macho", "edad"] obtiene los nombre de cada indice del objeto
    let claves = Object.keys(data); 
    let estado = Object.keys(state.selectedContador);
   
    for(let i=0; i< claves.length; i++){
        let clave = claves[i];
        let claveEstado = estado[i];

        if(clave == claveEstado){        
            state.selectedContador[claveEstado] = data[clave];
        }
       
    }
}
