import {defaultEstudiante,defaultError,defaultSuccess} from './states'

export function resetSelectedEstudiante(state) {
    state.selectedEstudiante = defaultEstudiante()
}


export function setEstudiantes(state,data) {  
    state.estudiantes = data   
}

//Cambia de pagina
export function setPage(state, page) {   
    state.filtroEstudiante.page = page
}

//cambia cuantos items se vera por pagina
export function setPerPage(state, perPage) {
    state.filtroEstudiante.page = 1
    state.filtroEstudiante.perPage = perPage
}

export function firtPageEstudiante(state) {   
    state.filtroEstudiante.page = 1
}

export function setError(state, data) {   

    state.errorE.cedula = data.cedula?data.cedula:'';
    state.errorE.nombres = data.nombres?data.nombres:'';
    state.errorE.apellidos = data.apellidos?data.apellidos:'';

}
export function setDefaultError(state, data) {  
     
    state.errorE = defaultError();
}

export function setSuccess(state, {data,show}) {   
    state.successE.text = data;
    state.successE.show = show;
}

export function setDefaultSuccess(state) {   
    state.successE = defaultSuccess();
}

export function setSelectedEstudiante(state, data){
    
    let id = data.id
    delete data.id;
    delete data.created_at;
    delete data.updated_at;
    // claves = ["nombre", "color", "macho", "edad"] obtiene los nombre de cada indice del objeto
    let claves = Object.keys(data); 
    let estado = Object.keys(state.selectedEstudiante);
   
    for(let i=0; i< claves.length; i++){
        let clave = claves[i];
        let claveEstado = estado[i];
        
        if(clave == claveEstado){        
            state.selectedEstudiante[claveEstado] = data[clave];
        }
       
    }

    data.id = id;
    

}
