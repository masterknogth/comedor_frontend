const dominios = [
    {
      entorno: 'Desarrollo',
      dominio: 'http://localhost:5173',
      api    : 'http://localhost:8000/api'
    },
    {
      entorno: 'Desarrollo',
      dominio: 'http://127.0.0.1:5173',
      api    : 'http://127.0.0.1:8000/api'
      //api : 'http://iasc.dnsalias.net/backendfussion/api'
    },
    {
      entorno: 'Produccion',
      dominio: 'http://iasc.dnsalias.net',
      api    : 'http://iasc.dnsalias.net/backfussiongit/public/api'
    }
   
  ];
  
  
  /**
   * Obtener el dominio del API principal
   *
   * @returns {string|*}
   */
  export function obtenerDominio() {
    const dominio_actual = document.location.origin;
  
    const dominio = dominios.find(d => d.dominio === dominio_actual);
  
    if (dominio) {
      return dominio.api;
    }
  
    return '';
  }