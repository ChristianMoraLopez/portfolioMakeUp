import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  config => {
    // Include CSRF token in the request
    const csrfToken = Cookies.get('XSRF-TOKEN');
    if (csrfToken) {
      config.headers['X-XSRF-TOKEN'] = csrfToken;
    }

    // Include authentication token if available
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

// Add a response interceptor to handle token refresh
instance.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh the token
        const refreshResponse = await instance.post('/api/refresh-token');
        const newToken = refreshResponse.data.token;
        Cookies.set('token', newToken);
        originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // If refresh fails, redirect to login or handle as needed
        console.error('Token refresh failed:', refreshError);
        // Redirect to login page or dispatch a logout action
      }
    }
    return Promise.reject(error);
  }
);

export default instance;