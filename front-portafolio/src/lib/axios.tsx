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
  const csrfToken = Cookies.get('XSRF-TOKEN');
  if (csrfToken) {
    config.headers['X-CSRF-TOKEN'] = csrfToken;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Add a response interceptor to handle CSRF token refreshing
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