import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies from 'js-cookie';

const instance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
  },
});

let isRefreshing = false;
let refreshPromise: Promise<AxiosResponse> | null = null;

const refreshCSRFToken = async () => {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshPromise = instance.get('/sanctum/csrf-cookie').finally(() => {
      isRefreshing = false;
    });
  }
  return refreshPromise;
};

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    let token = Cookies.get('XSRF-TOKEN');
    if (!token) {
      await refreshCSRFToken();
      token = Cookies.get('XSRF-TOKEN');
    }
    config.headers['X-XSRF-TOKEN'] = token;
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

instance.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    if (error.response?.status === 419 && !originalRequest._retry) {
      originalRequest._retry = true;
      await refreshCSRFToken();
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;