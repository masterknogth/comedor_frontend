
export const defaultFiltro = () => {
    return {
        text:"",
        perPage: 10,
        page: 1,
    }
}

export const defaultPersonal = () => {
    return {
        cedula:"",
        numero: "",
        apellidos: "",
        nombres: "",
        exonerado: "",
        inactivo: "",
        departamento: "",
        tipo: "",
        mes: "",
        acumulado: "",
        ingreso: "",
        mensaje: "",
    }
}

export const defaultError = () => {
    return {
        cedula:[],
        nombres: [],
        apellidos: [],
        tipo: []
    }
    
}
export const defaultSuccess = () => {
    return {
        text:'',
        show:false
    }
}



export default {
    filtro:defaultFiltro(),
    selectedPersonal:defaultPersonal(),
    personal:[],
    errorP:defaultError(),
    successP:defaultSuccess(),
    fotosP:''
}
