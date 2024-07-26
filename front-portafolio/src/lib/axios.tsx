import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  },
});

instance.interceptors.request.use(config => {
  const token = Cookies.get('XSRF-TOKEN');
  if (token) {
    config.headers['X-XSRF-TOKEN'] = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 419) {
      // CSRF token mismatch, try to refresh the token
      await instance.get('/sanctum/csrf-cookie');
      // Retry the original request
      return instance(error.config);
    }
    return Promise.reject(error);
  }
);

export default instance;
