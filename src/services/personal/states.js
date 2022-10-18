
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


export default {
    filtro:defaultFiltro(),
    selectedPersonal:defaultPersonal(),
    personal:[],
    errorCedula:'',
    successP:'',
    fotosP:''
}
