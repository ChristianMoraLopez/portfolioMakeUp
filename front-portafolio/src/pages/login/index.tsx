'use client'

import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import InputError from '@/components/InputError';
import Label from '@/components/Label';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/router';
import AuthSessionStatus from '@/app/(auth)/AuthSessionStatus';

const LoginPage: React.FC = () => {
    const router = useRouter();

    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/dashboard',
    });

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [shouldRemember, setShouldRemember] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const [status, setStatus] = useState<string | null>(null);

    useEffect(() => {
        const reset = router.query.reset as string;
        if (reset && Object.keys(errors).length === 0) {
            setStatus(atob(reset));
        } else {
            setStatus(null);
        }
    }, [router.query.reset, errors]);

    const submitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        login({
            email,
            password,
            remember: shouldRemember,
            setErrors,
            setStatus,
        });
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[url('/images/acuarela.jpg')] bg-cover bg-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h2 className="text-2xl font-bold text-center text-[#003B4A] mb-6">Login</h2>
                <AuthSessionStatus className="mb-4" status={status} />
                <form onSubmit={submitForm}>
                    {/* Email Address */}
                    <div className="mb-4">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={email}
                            className="block mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
                            required
                            autoFocus
                        />
                        {/* Display errors for 'email' */}
                        {errors['email'] && errors['email'].map((error, index) => (
                            <InputError key={index} messages={[error]} className="mt-2" />
                        ))}
                    </div>

                    {/* Password */}
                    <div className="mb-4">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            className="block mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                            required
                            autoComplete="current-password"
                        />
                        {/* Display errors for 'password' */}
                        {errors['password'] && errors['password'].map((error, index) => (
                            <InputError key={index} messages={[error]} className="mt-2" />
                        ))}
                    </div>

                    {/* Remember Me */}
                    <div className="block mt-4">
                        <label htmlFor="remember_me" className="inline-flex items-center">
                            <input
                                id="remember_me"
                                type="checkbox"
                                name="remember"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                onChange={event => setShouldRemember(event.target.checked)}
                            />
                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                        </label>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <Link href="/forgot-password" className="underline text-sm text-gray-600 hover:text-gray-900">
                            Forgot your password?
                        </Link>
                        <Link href="/signup" className="underline text-sm text-gray-600 hover:text-gray-900">
                            Register
                        </Link>
                        <Button type="submit" className="ml-4 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
