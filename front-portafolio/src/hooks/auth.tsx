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
    role ?: string;
    // Otros campos del usuario
}

function isAxiosError(error: any): error is AxiosError {
    return error.isAxiosError === true;
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
export const useAuth = ({ middleware, redirectIfAuthenticated }: UseAuthOptions = {}) => {
    const router = useRouter();

    const { data: user, error, mutate } = useSWR<User>('/api/user', () =>
        axios
            .get('/api/user')
            .then(res => res.data)
            .catch(error => {
                if (error.response?.status !== 409) throw error;

                router.push('/verify-email');
            }),
    );

    const csrf = () => axios.get('/sanctum/csrf-cookie');

    const register = async ({ setErrors, ...props }: { setErrors: (errors: ErrorData) => void; [key: string]: any }): Promise<{ errors?: ErrorData } | undefined> => {
        await csrf();
    
        setErrors({});
    
        try {
            await axios.post('/register', props);
            await mutate();
            return undefined;
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 422) {
                const errorData = error.response.data.errors as ErrorData;
                setErrors(errorData);
                return { errors: errorData };
            }
            throw error;
        }
    };

    const login = async ({ setErrors, setStatus, ...props }: { setErrors: (errors: ErrorData) => void; setStatus: (status: string | null) => void; [key: string]: any }) => {
        await csrf();

        setErrors({});
        setStatus(null);

        axios
            .post('/login', props)
            .then(() => mutate())
            .catch(error => {
                if (error.response?.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    const forgotPassword = async ({ setErrors, setStatus, email }: { setErrors: (errors: ErrorData) => void; setStatus: (status: string | null) => void; email: string; }) => {
        await csrf();

        setErrors({});
        setStatus(null);

        axios
            .post('/forgot-password', { email })
            .then(response => setStatus(response.data.status))
            .catch(error => {
                if (error.response?.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    const resetPassword = async ({ setErrors, setStatus, ...props }: { setErrors: (errors: ErrorData) => void; setStatus: (status: string | null) => void; [key: string]: any }) => {
        await csrf();

        setErrors({});
        setStatus(null);

        const token = router.query.token as string | undefined;

        if (!token) {
            setErrors({ token: ['Token is required'] });
            return;
        }

        axios
            .post('/reset-password', { token, ...props })
            .then(response => {
                const status = response.data.status;
                if (status) {
                    router.push('/login?reset=' + btoa(status));
                }
            })
            .catch(error => {
                if (error.response?.status !== 422) throw error;

                setErrors(error.response.data.errors);
            });
    };

    const resendEmailVerification = ({ setStatus }: { setStatus: (status: string | null) => void; }) => {
        axios
            .post('/email/verification-notification')
            .then(response => setStatus(response.data.status));
    };

    const update = async (userData: Partial<User>) => {
        await csrf();
        try {
            const response = await axios.patch('/profile', userData, {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            window.location.pathname = '/';
            mutate(response.data, false);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const logout = async () => {
        if (!error) {
            await axios.post('/logout').then(() => mutate(undefined, false));
        }

        window.location.pathname = '/';
    };

    const updatePassword = async (passwordData: PasswordData) => {
        await csrf();
        try {
            const response = await axios.patch('/password', passwordData, {
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const deleteAccount = async (password: string) => {
        await csrf();
        try {
            await axios.delete('/delete-account', {
                data: { password },
                headers: {
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest'
                }
            });
            await mutate(undefined, false);
        } catch (error) {
            throw error;
        }
    };

    const checkRole = async (): Promise<string | null> => {
        try {
            const response = await axios.get('/check-role');
            return response.data.role;
        } catch (error: unknown) {
            if (isAxiosError(error) && error.response?.status === 401) {
                // Handle unauthenticated user or redirect
                router.push('/login');
            } else {
                // Handle other types of errors
                console.error('An unexpected error occurred:', error);
            }
            return null;
        }
    };

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
    }, [user, error]);

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        update,
        logout,
        deleteAccount,
        updatePassword,
        checkRole, // Include checkRole function in the returned object
    };
};
