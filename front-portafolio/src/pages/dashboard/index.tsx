import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar/Navbar';
import Footer from '@/components/Footer/Footer';
import AddServiceForm from '@components/Dashboard/AddServiceForm';
import ServiceList from '@components/Services/ServiceList';
import ServiceItem from '@components/Services/ServiceItem';
import 'tailwindcss/tailwind.css';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

const Dashboard: React.FC = () => {
  const [role, setRole] = useState<string>('');
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRoleAndServices = async () => {
      try {
        const roleResponse = await axios.get('http://localhost:8000/check-role', {
          withCredentials: true,
        });
        setRole(roleResponse.data.role);

        if (roleResponse.data.role === 'admin') {
          const servicesResponse = await axios.get('http://localhost:8000/services', {
            withCredentials: true,
          });
          setServices(servicesResponse.data);
        }
      } catch (error) {
        console.error('Error fetching role or services:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoleAndServices();
  }, []);

  const handleAddService = (service: Service) => {
    setServices([...services, service]);
  };

  const handleDeleteService = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8000/services/${id}`, {
        withCredentials: true,
      });
      setServices(services.filter((service) => service.id !== id));
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Cargando...</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      
      <Navbar />
      
      <div className="container mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
        {role === 'admin' && (
          <>
            <AddServiceForm onAdd={handleAddService} />
            <ServiceList services={services} onDelete={handleDeleteService} />
          </>
        )}
        {role === 'user' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Servicios Disponibles</h2>
            {services.map((service) => (
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