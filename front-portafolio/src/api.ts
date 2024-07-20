import axios from 'axios';

// Configuración base de Axios
const api = axios.create({
  baseURL: 'http://localhost:8000/api', // URL base de tu API Laravel
  withCredentials: true, // Permitir el envío de cookies y tokens CSRF
});

// Interceptor para manejar el token CSRF
api.interceptors.request.use(async (config) => {
  await axios.get('http://localhost:8000/sanctum/csrf-cookie'); // Obtener el token CSRF
  return config;
});

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Manejar errores de respuesta (por ejemplo, errores de autenticación)
    if (error.response.status === 401) {
      // Redirigir a la página de inicio de sesión, limpiar token, etc.
      // Ejemplo: router.push('/login');
    }
    return Promise.reject(error);
  }
);

export default api;
