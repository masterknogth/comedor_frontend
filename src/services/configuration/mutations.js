import {defaultTemplate} from './states'

export function setTemplates(state, data) {  
    
    if(data == 'normal'){
        state.templates = defaultTemplate();
    }

    if(data == 'enamorados'){
        state.templates.text = 'text-danger';
        state.templates.bg = 'bg-light';
    }

    if(data == 'halloween'){
        state.templates.text = 'text-warning';
        state.templates.bg = 'bg-dark';
    }

    if(data == 'navidad'){
        state.templates.text = 'text-primary';
        state.templates.bg = 'bg-light';
    }
}
