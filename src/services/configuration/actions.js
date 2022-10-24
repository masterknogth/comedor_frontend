
import $http from './../../interceptors';

export async function cambiarTemplate({ commit},code) {
    
    let url = import.meta.env.VITE_BASE_URL;
  
    await $http.post('/cambiar-template/'+code)
    .then((response) => {
       
        if(code == 'normal'){ 
            document.body.style.backgroundImage = "url("+url+"images/navidad/n7.jp )";     
            commit('setTemplates', code);          
        }

        if(code == 'enamorados'){             
            document.body.style.backgroundImage = "url("+url+"images/san-valentin/s2.jpg )";
            commit('setTemplates', code);  
            
        }
        if(code == 'halloween'){              
            document.body.style.backgroundImage = "url("+url+"images/hallo/h15.jpg )";  
            commit('setTemplates', code);          
        }
        if(code == 'navidad'){ 
            document.body.style.backgroundImage = "url("+url+"images/navidad/n7.jpg )";     
            commit('setTemplates', code);          
        }
        
        
        
      
    })
    .catch((error) => {
        console.log(error.response.data.error)
        //commit('setEstudiantes', [])
    })
}

export async function obtenerTemplate({ commit}) {
    
    let url = import.meta.env.VITE_BASE_URL;
  
    await $http.get('/get-template')
    .then((response) => {
        
        if(response.data.data == 'enamorados'){             
            document.body.style.backgroundImage = "url("+url+"images/san-valentin/s2.jpg )";
            commit('setTemplates', response.data.data);  
            
        }
        if(response.data.data == 'halloween'){              
            document.body.style.backgroundImage = "url("+url+"images/hallo/h15.jpg )";  
            commit('setTemplates', response.data.data);          
        }
        if(response.data.data == 'navidad'){ 
            document.body.style.backgroundImage = "url("+url+"images/navidad/n7.jpg )";     
            commit('setTemplates', response.data.data);          
        }
        
        
      
    })
    .catch((error) => {
        console.log(error.response.data.error)
        //commit('setEstudiantes', [])
    })
}


