import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import AddServiceForm from '@components/Dashboard/AddServiceForm';
import ServiceList from '@components/Services/ServiceList';
import ServiceItem from '@components/Services/ServiceItem';
import { useAuth } from '@/hooks/auth';
import useServices from '@/hooks/useservices';
import 'tailwindcss/tailwind.css';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

const Dashboard: React.FC = () => {
  const { user, checkRole } = useAuth();
  const { services, error, addService, deleteService } = useServices();
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string | null>(null);

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
      // No need to update state manually, useServices hook will handle it
    } catch (error) {
      console.error('Error adding service:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleDeleteService = async (id: number) => {
    try {
      await deleteService(id);
      // No need to update state manually, useServices hook will handle it
    } catch (error) {
      console.error('Error deleting service:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Cargando...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error al cargar los servicios</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        {role === 'admin' && (
          <>
            <AddServiceForm onAdd={handleAddService} />
            <ServiceList services={services || []} onDelete={handleDeleteService} />
          </>
        )}
        {role === 'user' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Servicios Disponibles</h2>
            {services && services.map((service) => (
              <ServiceItem key={service.id} service={service} onDelete={() => {}} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;