// useservices.tsx
import useSWR from 'swr';
import axios from '@/lib/axios';
import { AxiosError } from 'axios';
import { useAuth } from './auth';

export interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

// Función para obtener los servicios (sin autenticación)
const fetchServices = async () => {
  const response = await axios.get('/services');
  return response.data;
};

// Función para verificar si el error es de Axios
function isAxiosError(error: any): error is AxiosError {
  return error.isAxiosError === true;
}

// Hook personalizado para los servicios
const useServices = () => {
  const { csrf } = useAuth(); // Se usa solo en funciones que requieren autenticación
  const { data: services, error, mutate } = useSWR<Service[]>('/services', fetchServices);

  // Función para agregar un nuevo servicio
  const addService = async (newService: Omit<Service, 'id'>) => {
    try {
      await csrf(); // Establecer el token CSRF
      console.log("csrf token", csrf);
      const response = await axios.post('/services', newService);
      console.log('Service added successfully:', response.data);
      mutate(); // Actualizar los datos en caché
      return response.data;
    } catch (error) {
      console.error('Full error object:', error);
      if (isAxiosError(error)) {
        console.error('Error adding service:', error.response?.data || error.message);
        throw error;
      } else {
        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred');
      }
    }
  };

  // Función para eliminar un servicio
  const deleteService = async (id: number) => {
    try {
      await csrf(); // Establecer el token CSRF
      await axios.delete(`/services/${id}`);
      mutate(); // Actualizar los datos en caché
    } catch (error) {
      if (isAxiosError(error)) {
        console.error('Error deleting service:', error.response?.data || error.message);
        throw error;
      } else {
        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred');
      }
    }
  };

  return {
    services,
    error,
    addService,
    deleteService,
  };
};

export default useServices;