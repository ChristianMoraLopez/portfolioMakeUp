import axios from 'axios';
import Cookies from 'js-cookie';

// Crear una instancia de axios con la configuración inicial
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true, // Permitir el envío de cookies
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  },
  timeout: 10000, // Tiempo de espera en milisegundos (10 segundos)
});

// Interceptor de solicitudes para agregar el token CSRF a los encabezados
instance.interceptors.request.use(async (config) => {
  console.log('Interceptor de solicitud activado');
  
  // Obtener el token CSRF de las cookies
  const csrfToken = Cookies.get('XSRF-TOKEN');
  if (csrfToken) {
    console.log('Token CSRF encontrado:', csrfToken);
    
    // Agregar el token CSRF a los encabezados de la solicitud
    config.headers['X-XSRF-TOKEN'] = csrfToken;
  } else {
    console.warn('Token CSRF no encontrado en las cookies. Intentando obtener un nuevo token CSRF.');
    try {
      await instance.get('/sanctum/csrf-cookie'); // Intentar refrescar el token CSRF
      const newCsrfToken = Cookies.get('XSRF-TOKEN');
      if (newCsrfToken) {
        console.log('Nuevo token CSRF obtenido:', newCsrfToken);
        config.headers['X-XSRF-TOKEN'] = newCsrfToken;
      } else {
        console.error('No se pudo obtener un nuevo token CSRF.');
      }
    } catch (error) {
      console.error('Error al intentar obtener un nuevo token CSRF:', error);
    }
  }
  
  // Imprimir los encabezados de la solicitud para depuración
  console.log('Encabezados de solicitud:', config.headers);
  
  return config;
}, (error) => {
  console.error('Error en el interceptor de solicitud:', error);
  return Promise.reject(error);
});

// Interceptor de respuestas para manejar errores y refrescar el token CSRF si es necesario
instance.interceptors.response.use(
  response => {
    console.log('Respuesta recibida:', response);
    return response; // Devolver la respuesta directamente si no hay errores
  }, 
  async error => {
    console.error('Error en la respuesta:', error);
    
    if (error.response && error.response.status === 419) { // Verificar si el error es un 419 (CSRF token mismatch)
      console.log('Error 419 detectado. Intentando refrescar el token CSRF...');
      
      try {
        await instance.get('/sanctum/csrf-cookie'); // Intentar refrescar el token CSRF
        console.log('Token CSRF refrescado. Reintentando la solicitud original...');
        
        // Imprimir detalles de la solicitud original que se reintenta
        console.log('Detalles de la solicitud original:', error.config);
        
        return instance(error.config); // Reintentar la solicitud original
      } catch (csrfError) {
        console.error('Error al refrescar el token CSRF:', csrfError);
        return Promise.reject(csrfError); // Devolver el error si no se puede refrescar el token
      }
    }
    
    return Promise.reject(error); // Devolver otros errores
  }
);

export default instance;
