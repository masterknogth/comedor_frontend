import { createStore } from 'vuex'

import autentication from '../services/autentication';
import asistencia from '../services/asistencia';
import importar from '../services/importar';
import personal from '../services/personal';
import estudiantes from '../services/estudiante';
import reportes from '../services/reportes';
import personalimages from '../services/personalimages';
import estudianteimages from '../services/estudianteimages';




export default createStore({
    modules: {
      //loader:loader,
      auth:autentication,
      asistencia:asistencia,
      importar:importar,
      personal:personal,
      estudiantes:estudiantes,
      reportes:reportes,
      personalimages:personalimages,
      estudianteimages:estudianteimages
    }
})