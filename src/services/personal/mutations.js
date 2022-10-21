import {defaultPersonal, defaultError,defaultSuccess} from './states'

export function resetSelectedPersonal(state) {
    state.selectedPersonal = defaultPersonal()
}

export function setPersonal(state,data) {  
    state.personal = data   
}

//Cambia de pagina
export function setPage(state, page) {   
    state.filtro.page = page
}

//cambia cuantos items se vera por pagina
export function setPerPage(state, perPage) {
    state.filtro.page = 1
    state.filtro.perPage = perPage
}

export function firtPage(state) {   
    state.filtro.page = 1
}

export function setDefaultError(state){
    state.errorP = defaultError();
}

export function setErrorP(state, data) {   
    
    state.errorP.cedula = data.cedula?data.cedula:'';
    state.errorP.nombres = data.nombres?data.nombres:'';
    state.errorP.apellidos = data.apellidos?data.apellidos:'';
    state.errorP.tipo = data.tipo?data.tipo:'';
}
export function setSuccess(state, {data,show}) {   
    state.successP.text = data;
    state.successP.show = show;
}

export function setDefaultSuccess(state) {   
    state.successP = defaultSuccess();
}


export function setFotosPersonal(state, data) {   
    state.fotosP = data
}

export function setSelectedPersonal(state, data){
    
    let id = data.id
    delete data.id;
    delete data.created_at;
    delete data.updated_at;
    //delete data.departament;
    // claves = ["nombre", "color", "macho", "edad"] obtiene los nombre de cada indice del objeto
    let claves = Object.keys(data); 
    let estado = Object.keys(state.selectedPersonal);
   
    for(let i=0; i< claves.length; i++){
        let clave = claves[i];
        let claveEstado = estado[i];
        
        if(clave == claveEstado){        
            state.selectedPersonal[claveEstado] = data[clave];
        }
       
    }

    data.id = id;
    

}