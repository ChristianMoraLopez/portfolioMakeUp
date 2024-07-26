import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true, // Permite enviar cookies con las solicitudes
  headers: {
    'X-Requested-With': 'XMLHttpRequest', // Asegura que se envíen las solicitudes AJAX
    'Accept': 'application/json', // Acepta respuestas en formato JSON
  },
});

// Configura un interceptor para añadir el token CSRF a las cabeceras de cada solicitud
instance.interceptors.request.use(config => {
  const csrfToken = Cookies.get('XSRF-TOKEN'); // Asegúrate de que el token CSRF esté almacenado en las cookies
  if (csrfToken) {
    config.headers['X-CSRF-TOKEN'] = csrfToken; // Añade el token CSRF a las cabeceras
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default instance;
