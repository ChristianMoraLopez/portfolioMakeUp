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
});

// Interceptor de solicitudes para agregar el token CSRF a los encabezados
instance.interceptors.request.use(async (config) => {
  const token = document.cookie.split('; ').find(row => row.startsWith('XSRF-TOKEN='));
  if (token) {
    const csrfToken = token.split('=')[1];
    console.log('CSRF Token:', csrfToken);  // Depuración
    config.headers['X-XSRF-TOKEN'] = csrfToken; // Agregar el token CSRF a los encabezados
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Interceptor de respuestas para manejar errores y refrescar el token CSRF si es necesario
instance.interceptors.response.use(
  response => response, // Devolver la respuesta directamente si no hay errores
  async error => {
    if (error.response && error.response.status === 419) { // Verificar si el error es un 419 (CSRF token mismatch)
      try {
        await instance.get('/sanctum/csrf-cookie'); // Intentar refrescar el token CSRF
        return instance(error.config); // Reintentar la solicitud original
      } catch (csrfError) {
        return Promise.reject(csrfError); // Devolver el error si no se puede refrescar el token
      }
    }
    return Promise.reject(error); // Devolver otros errores
  }
);

export default instance;
