import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import AddServiceForm from '@components/Dashboard/AddServiceForm';
import ServiceList from '@components/Services/ServiceList';
import ServiceItem from '@components/Services/ServiceItem';
import { useAuth } from '@/hooks/auth';
import useServices from '@/hooks/useservices';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader, AlertCircle, Plus, List, User, ChevronDown } from 'lucide-react';
import 'tailwindcss/tailwind.css';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

const CustomAlert: React.FC<{ message: string }> = ({ message }) => (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <div className="flex items-center">
      <AlertCircle className="h-5 w-5 mr-2" />
      <span className="block sm:inline">{message}</span>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const { user, checkRole } = useAuth();
  const { services, error, addService, deleteService } = useServices();
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [showUserInfo, setShowUserInfo] = useState<boolean>(false);

  useEffect(() => {
    const fetchRoleAndServices = async () => {
      try {
        const userRole = await checkRole();
        setRole(userRole);
      } catch (error) {
        console.error('Error fetching role:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoleAndServices();
  }, [checkRole]);

  const handleAddService = async (newService: Omit<Service, 'id'>) => {
    try {
      await addService(newService);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  const handleDeleteService = async (id: number) => {
    try {
      await deleteService(id);
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <Loader className="animate-spin text-white" size={48} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-red-100">
        <CustomAlert message="Error al cargar los servicios. Por favor, intente de nuevo más tarde." />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-50 to-pink-100 min-h-screen">
      <Navbar />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto pt-32 py-10 px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4 text-center">
            Dashboard
          </h1>
          <motion.div
            className="flex justify-center mb-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => setShowUserInfo(!showUserInfo)}
              className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300"
            >
              <User size={20} className="mr-2" />
              Información del Usuario
              <ChevronDown size={20} className={`ml-2 transform transition-transform duration-300 ${showUserInfo ? 'rotate-180' : ''}`} />
            </button>
          </motion.div>
          <AnimatePresence>
            {showUserInfo && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gray-100 rounded-lg p-4 mb-6"
              >
                <p className="text-gray-700"><strong>Nombre:</strong> {user?.name}</p>
                <p className="text-gray-700"><strong>Email:</strong> {user?.email}</p>
                <p className="text-gray-700"><strong>Rol:</strong> {role}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {role === 'admin' && (
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Administración de Servicios</h2>
              <motion.button
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showAddForm ? <List size={20} className="mr-2" /> : <Plus size={20} className="mr-2" />}
                {showAddForm ? 'Ver Lista' : 'Agregar Servicio'}
              </motion.button>
            </div>
            
            <AnimatePresence mode="wait">
              {showAddForm ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <AddServiceForm onAdd={handleAddService} />
                </motion.div>
              ) : (
                <motion.div
                  key="list"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ServiceList services={services || []} onDelete={handleDeleteService} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
        
        {role === 'user' && (
          <motion.div 
            className="bg-white rounded-xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6">Servicios Disponibles</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services && services.map((service) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  className="transform transition duration-300 hover:shadow-xl"
                >
                  <ServiceItem service={service} onDelete={() => {}} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;