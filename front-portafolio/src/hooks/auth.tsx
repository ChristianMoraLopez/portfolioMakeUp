import useSWR from 'swr';
import axios from '@/lib/axios';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';


interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string | null;
  role?: string;
}

type PasswordData = {
  current_password: string;
  password: string;
  password_confirmation: string;
};

interface ErrorData {
  [key: string]: string[];
}

interface UseAuthOptions {
  middleware?: 'guest' | 'auth';
  redirectIfAuthenticated?: string;
}

function isAxiosError(error: any): error is AxiosError {
  return error.isAxiosError === true;
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: UseAuthOptions = {}) => {
  const router = useRouter();

  // Fetch the authenticated user
  const { data: user, error, mutate } = useSWR<User>('/api/user', async () => {
    try {
      const response = await axios.get('/api/user');
      return response.data;
    } catch (err) {
      if (isAxiosError(err) && err.response?.status !== 409) {
        throw err;
      }
      router.push('/verify-email');
      return null; // Returning null to align with SWR behavior
    }
  });

  // Function to get CSRF token
  const csrf = async () => {
    try {
      await axios.get('/sanctum/csrf-cookie');
      console.log("CSRF token successfully set.");
    } catch (err) {
      console.error('Error setting CSRF token:', err);
      throw err; // Ensure the error is thrown to handle it in calling functions
    }
  };

  // Register function
  const register = async (props: { setErrors: (errors: ErrorData) => void; [key: string]: any }) => {
    const { setErrors, ...rest } = props;
    await csrf();
    setErrors({});
    try {
      await axios.post('/register', rest);
      await mutate(); // Refresh user data
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 422) {
        const errorData = (err.response.data as ErrorData) || {};
        setErrors(errorData);
        return { errors: errorData };
      }
      throw err;
    }
  };

  // Login function
  const login = async (props: { setErrors: (errors: ErrorData) => void; setStatus: (status: string | null) => void; [key: string]: any }) => {
    const { setErrors, setStatus, ...rest } = props;
    await csrf();
    setErrors({});
    setStatus(null);
    try {
      const response = await axios.post('/login', rest);
      await mutate(); // Refresh user data

      // Obtener datos del usuario del response o realizar una solicitud para obtener los detalles del usuario
      const userData = response.data; // Asegúrate de que `userData` tenga el rol del usuario

      // Redirigir según el rol del usuario
      if (userData.role === 'admin') {
        router.push('/dashboard');
      } else {
        router.push('/services');
      }
      
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 422) {
        const errorData = (err.response.data as ErrorData) || {};
        setErrors(errorData);
      } else {
        throw err;
      }
    }
  };

  // Forgot password function
  const forgotPassword = async (props: { setErrors: (errors: ErrorData) => void; setStatus: (status: string | null) => void; email: string }) => {
    const { setErrors, setStatus, email } = props;
    await csrf();
    setErrors({});
    setStatus(null);
    try {
      const response = await axios.post('/forgot-password', { email });
      setStatus(response.data.status);
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 422) {
        const errorData = (err.response.data as ErrorData) || {};
        setErrors(errorData);
      } else {
        throw err;
      }
    }
  };

  // Reset password function
  const resetPassword = async (props: { setErrors: (errors: ErrorData) => void; setStatus: (status: string | null) => void; [key: string]: any }) => {
    const { setErrors, setStatus, ...rest } = props;
    await csrf();
    setErrors({});
    setStatus(null);
    const token = router.query.token as string | undefined;
    if (!token) {
      setErrors({ token: ['Token is required'] });
      return;
    }
    try {
      const response = await axios.post('/reset-password', { token, ...rest });
      const status = response.data.status;
      if (status) {
        router.push('/login?reset=' + btoa(status));
      }
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 422) {
        const errorData = (err.response.data as ErrorData) || {};
        setErrors(errorData);
      } else {
        throw err;
      }
    }
  };

  // Resend email verification function
  const resendEmailVerification = async ({ setStatus }: { setStatus: (status: string | null) => void }) => {
    try {
      const response = await axios.post('/email/verification-notification');
      setStatus(response.data.status);
    } catch (err) {
      console.error('Error resending email verification:', err);
    }
  };

  // Update user profile function
  const update = async (userData: Partial<User>) => {
    await csrf();
    try {
      const response = await axios.patch('/profile', userData, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      router.push('/'); // Prefer router.push over window.location.pathname
      await mutate(response.data, false);
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  // Logout function
  const logout = async () => {
    if (!error) {
      await axios.post('/logout');
      await mutate(undefined, false);
    }
    router.push('/'); // Prefer router.push over window.location.pathname
  };

  // Update password function
  const updatePassword = async (passwordData: PasswordData) => {
    await csrf();
    try {
      const response = await axios.patch('/password', passwordData, {
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      return response.data;
    } catch (err) {
      throw err;
    }
  };

  // Delete account function
  const deleteAccount = async (password: string) => {
    await csrf();
    try {
      await axios.delete('/delete-account', {
        data: { password },
        headers: {
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
      });
      await mutate(undefined, false);
    } catch (err) {
      throw err;
    }
  };

  // Check user role function
  const checkRole = async (): Promise<string | null> => {
    try {
      const response = await axios.get('/check-role');
      return response.data.role;
    } catch (err: unknown) {
      if (isAxiosError(err)) {
        if (err.response?.status === 401) {
          // Si el usuario no está autenticado, solo devuelve null o una cadena vacía
          return null; 
        } else {
          console.error('An unexpected error occurred:', err);
        }
      } else {
        console.error('An unexpected error occurred:', err);
      }
      return null; // Retorna null en caso de error inesperado
    }
  };

  const userId = user?.id;

  useEffect(() => {
    if (middleware === 'guest' && redirectIfAuthenticated && user) {
      router.push(redirectIfAuthenticated);
    }
    if (router.pathname === '/verify-email' && user?.email_verified_at) {
      if (redirectIfAuthenticated) {
        router.push(redirectIfAuthenticated);
      }
    }
    if (middleware === 'auth' && error) {
      logout();
    }
  }, [user, error, router, middleware, redirectIfAuthenticated]);

  return {
    user,
    userId,
    csrf,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    update,
    logout,
    deleteAccount,
    updatePassword,
    checkRole,
  };
};
