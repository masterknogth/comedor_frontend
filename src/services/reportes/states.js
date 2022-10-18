export const defaultFiltro = () => {
    return {
        text:"",
        fecha:"",
        tipo:"",
        perPage: 10,
        page: 1,
    }
}


export default {
    filtro:defaultFiltro(),
    reportes:[],
    fechaGrafica:'',
    grafica:[]
}