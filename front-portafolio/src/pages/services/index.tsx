import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import ServiceItem from '@components/Services/ServiceItem';
import { useAuth } from '@/hooks/auth';
import useServices from '@/hooks/useservices';
import { motion } from 'framer-motion';
import Link from 'next/link';
import 'tailwindcss/tailwind.css';
import LoadingAnimation from '@components/Animations/LoadingAnimation';

const Services: React.FC = () => {
  const { user, checkRole } = useAuth();
  const { services, error, deleteService } = useServices();
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const role = await checkRole();
        setIsAdmin(role === 'admin');
      } catch (error) {
        console.error('Error fetching role:', error);
      }
    };
    fetchRole();
  }, [checkRole]);

  if (!services) {
    return <LoadingAnimation />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-300 to-red-500">
        <div className="text-2xl font-bold text-white">
          Error al cargar los servicios. Por favor, intente más tarde.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-green-200 to-yellow-200">
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto py-20 px-4 sm:px-6 lg:px-8"
      >
        <h1 className="text-5xl font-extrabold text-transparent pt-16 bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500 mb-12 text-center">
          Nuestros Servicios
        </h1>
        
        {isAdmin && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="relative p-1 rounded-3xl bg-gradient-to-r from-green-400 via-teal-400 to-blue-400">
              <div className="p-8 bg-white rounded-2xl shadow-md">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                  <span className="block text-lg font-medium text-gray-500 mb-3">Privilegios de Administrador Activados</span>
                  <span className="block text-2xl font-bold text-teal-600 mb-5">Gestión de Servicios Premium</span>
                </h2>
                <Link
                  href="/dashboard" 
                  className="block w-full text-center text-white font-semibold text-lg py-3 px-6 rounded-full bg-teal-500 hover:bg-teal-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                >
                  Acceder al Panel de Control
                </Link>
              </div>
            </div>
          </motion.div>
        )}
        
        {!user && (
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <div className="relative p-1 rounded-3xl bg-gradient-to-r from-purple-400 via-pink-400 to-red-400">
              <div className="p-8 bg-white rounded-2xl shadow-md">
                <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
                  <span className="block text-2xl font-bold text-purple-600 mb-5">¿Listo para explorar nuestros servicios?</span>
                </h2>
                <p className="text-lg text-gray-600 mb-6 text-center">
                  Para comprar nuestros servicios exclusivos, por favor regístrate o inicia sesión en tu cuenta.
                </p>
                <div className="flex justify-center space-x-4">
                  <Link
                    href="/register" 
                    className="text-center text-white font-semibold text-lg py-3 px-6 rounded-full bg-purple-500 hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                  >
                    Registrarse
                  </Link>
                  <Link
                    href="/login" 
                    className="text-center text-purple-600 font-semibold text-lg py-3 px-6 rounded-full bg-white border-2 border-purple-500 hover:bg-purple-100 transition duration-300 ease-in-out transform hover:scale-105 shadow-md"
                  >
                    Iniciar Sesión
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl overflow-hidden shadow-md"
        >
          <h2 className="text-3xl font-bold text-gray-800 p-8 bg-gradient-to-r from-green-300 to-blue-300">
            Servicios Exclusivos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <ServiceItem 
                  service={service} 
                  onDelete={deleteService}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default Services;