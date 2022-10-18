export const defaultAsistencia = () => {
    return {
        codigo:'' 
    }
}

export const defaultContador = () => {
    return {
        estudiante:0, 
        obrero:0,  
        administrativo:0,
        docente:0,
        total:0
    }
}

export default {
    selectedCodigo:defaultAsistencia(),
    selectedContador:defaultContador(),
    selectedUser:{
        departament:{}
    },
    send:false,
    error:false,
    message:'',
    
}