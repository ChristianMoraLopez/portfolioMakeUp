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

instance.interceptors.request.use(async config => {
  const token = Cookies.get('XSRF-TOKEN');
  if (!token) {
    await instance.get('/sanctum/csrf-cookie');
  }
  config.headers['X-XSRF-TOKEN'] = Cookies.get('XSRF-TOKEN');
  return config;
}, error => {
  return Promise.reject(error);
});
instance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 419) {
      await instance.get('/sanctum/csrf-cookie');
      return instance(error.config);
    }
    return Promise.reject(error);
  }
);

export default instance;