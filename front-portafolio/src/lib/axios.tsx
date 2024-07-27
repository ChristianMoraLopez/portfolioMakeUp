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

// Función para obtener la cookie CSRF
const getCSRFToken = async () => {
  const csrfToken = Cookies.get('XSRF-TOKEN');
  if (!csrfToken) {
    await instance.get('/sanctum/csrf-cookie');
  }
};

// Configurar un interceptor para incluir tokens en las solicitudes
instance.interceptors.request.use(
  async (config) => {
    // Asegurarse de que el token CSRF esté configurado antes de cada solicitud
    await getCSRFToken();

    // Incluir el token de autenticación si está disponible en la memoria/almacenamiento
    const token = localStorage.getItem('token'); // O como estés almacenando el token
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
