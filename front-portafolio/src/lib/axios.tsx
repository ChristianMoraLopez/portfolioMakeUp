import axios from 'axios';
import Cookies from 'js-cookie';

// Crear una instancia de axios con la configuración inicial
const instance = axios.create({
  
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json', // Asegurarse de que el tipo de contenido sea JSON
  },
  withCredentials: true, // Permitir el envío de cookies
});

// Agregar un interceptor para incluir cookies en las solicitudes
instance.interceptors.request.use(
  config => {
    const token = Cookies.get('token'); // Obtener el token de las cookies, si es necesario
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Agregar el token al encabezado de autorización
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default instance;
