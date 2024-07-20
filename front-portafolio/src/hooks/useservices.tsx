import useSWR from 'swr';
import axios from '@/lib/axios';
import { AxiosError } from 'axios';

interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
    image_url: string;
}

const fetchServices = async () => {
    const response = await axios.get('/services');
    return response.data;
};

const useServices = () => {
    const { data: services, error, mutate } = useSWR<Service[]>('/services', fetchServices);

    const deleteService = async (id: number) => {
        try {
            await axios.delete(`/services/${id}`);
            mutate(); // Re-fetch the services list after deletion
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Error deleting service:', error.response?.data || error.message);
                // Manejo adicional del error, si es necesario
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    return {
        services,
        error,
        deleteService
    };
};

export default useServices;
