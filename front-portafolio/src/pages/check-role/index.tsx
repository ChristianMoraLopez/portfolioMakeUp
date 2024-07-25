// src/pages/CheckRole.js

import React from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import useRole from '@/hooks/useRole';

const CheckRole = () => {
  const { role, loading, error } = useRole();

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-2xl">Cargando...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center h-screen text-2xl text-red-600">{error}</div>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex flex-1 flex-col items-center justify-center p-4 bg-gray-100">
        <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">Verificación de Rol</h1>
          <p className="text-2xl text-center text-gray-600">
            Role: <span className="text-indigo-600 font-semibold">{role}</span>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CheckRole;
