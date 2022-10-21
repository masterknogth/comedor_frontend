export const defaultFiltro = () => {
    return {
        text:"",
        perPage: 10,
        page: 1,
    }
}

export const defaultEstudiante = () => {
    return {
        tipo:"E",
        cedula: "",
        apellidos: "",
        nombres: "",
        sexo: "",
        departamento: "",
        a_cursar: "",
        inactivo: "",
        fecha_rdoc: "",
        fecha_ret: "",
        mensaje: "",
        exonerado: ""

    }
}

export const defaultError = () => {
    return {
        cedula:[],
        nombres: [],
        apellidos: []

    }
    
}

export const defaultSuccess = () => {
    return {
        text:'',
        show:false
    }
}



export default {
    filtroEstudiante:defaultFiltro(),
    selectedEstudiante:defaultEstudiante(),
    estudiantes:[],
    //errorCedulaE:'',
    errorE:defaultError(),
    
    successE:defaultSuccess()
}