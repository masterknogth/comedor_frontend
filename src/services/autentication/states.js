export const defaultAuth = () => {
    return {
        role:'',
        loged: false,
        user:''
    }
}

export default {
    selectedAuth:defaultAuth(),

    ingreso: {
        user: "",
        password: ""
    },
    errors:[],
    errorAuth:false,
    detectLogout:false
}
