import axios from 'axios';
import Cookies from 'js-cookie';

// Crear una instancia de axios con la configuración inicial
const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});


// Configurar un interceptor para incluir tokens en las solicitudes
instance.interceptors.request.use(
  config => {
    // Incluir el token CSRF en la solicitud
    const csrfToken = Cookies.get('XSRF-TOKEN');
    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }

    // Incluir el token de autenticación si está disponible
    const token = Cookies.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
