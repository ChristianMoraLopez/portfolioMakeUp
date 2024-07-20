import React, { useState, FormEvent, ChangeEvent } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import InputError from '@/components/InputError';
import Label from '@/components/Label';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';

const SignUpPage = () => {
  const { register } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/dashboard',
  });

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
  const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

  interface RegisterResponse {
    errors?: { [key: string]: string[] };
  }

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const response: RegisterResponse | undefined = await register({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
      setErrors,
    });

    if (response?.errors) {
      // Errors are already set by the register function
      // You can add additional error handling here if needed
    } else {
      // Registration successful, you can add a success message or redirect here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[url('/images/acuarela.jpg')] bg-cover bg-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-[#003B4A] mb-6">Register</h2>
        <form onSubmit={submitForm}>
          {/* Name */}
          <div className="mb-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              className="block mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setName(event.target.value)}
              required
              autoFocus
            />
            {/* Display errors for 'name' */}
            {errors['name'] && errors['name'].map((error, index) => (
              <InputError key={index} messages={[error]} className="mt-2" />
            ))}
          </div>

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
              autoComplete="new-password"
            />
            {/* Display errors for 'password' */}
            {errors['password'] && errors['password'].map((error, index) => (
              <InputError key={index} messages={[error]} className="mt-2" />
            ))}
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <Label htmlFor="passwordConfirmation">Confirm Password</Label>
            <Input
              id="passwordConfirmation"
              type="password"
              value={passwordConfirmation}
              className="block mt-1 w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              onChange={(event: ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(event.target.value)}
              required
            />
            {/* Display errors for 'password_confirmation' */}
            {errors['password_confirmation'] && errors['password_confirmation'].map((error, index) => (
              <InputError key={index} messages={[error]} className="mt-2" />
            ))}
          </div>

          {/* Already registered link */}
          <div className="flex items-center justify-between mt-6">
            <Link href="/login" passHref className="underline text-sm text-gray-600 hover:text-gray-900">
              
                Already registered?
              
            </Link>
            {/* Register button */}
            <Button type="submit" className="ml-4 bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600">
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
