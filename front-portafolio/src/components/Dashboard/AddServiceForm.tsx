import React, { useState } from 'react';
import useServices from '@/hooks/useservices';
import { useAuth } from '@/hooks/auth';
import { PlusCircle, Image, DollarSign, FileText } from 'lucide-react';

interface ServiceFormProps {
  onAdd: (service: Service) => void;
}

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

interface NewService extends Omit<Service, 'id'> {
  user_id: number;
}

const AddServiceForm: React.FC<ServiceFormProps> = ({ onAdd }) => {
  const { userId } = useAuth();
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    name: '',
    description: '',
    price: 0,
    image_url: 'https://via.placeholder.com/250',
  });

  const { addService } = useServices();

  const handleAddService = async () => {
    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    try {
      const service: NewService = { ...newService, user_id: userId };
      const addedService = await addService(service);
      onAdd(addedService);
      setNewService({
        name: '',
        description: '',
        price: 0,
        image_url: 'https://via.placeholder.com/250',
      });
    } catch (error) {
      console.error('Error adding service:', error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Agregar Nuevo Servicio</h2>
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre del Servicio"
            value={newService.name}
            onChange={(e) => setNewService({ ...newService, name: e.target.value })}
          />
          <FileText className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
        <div className="relative">
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
            placeholder="Descripción del Servicio"
            value={newService.description}
            onChange={(e) => setNewService({ ...newService, description: e.target.value })}
          ></textarea>
          <FileText className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
        <div className="relative">
          <input
            type="number"
            className="w-full p-3 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Precio"
            value={newService.price}
            onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
          />
          <DollarSign className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
        <div className="relative">
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="URL de la Imagen (opcional)"
            value={newService.image_url}
            onChange={(e) => setNewService({ ...newService, image_url: e.target.value })}
          />
          <Image className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>
      </div>
      <button 
        className="mt-6 w-full bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center justify-center"
        onClick={handleAddService}
      >
        <PlusCircle className="mr-2" size={20} />
        Agregar Servicio
      </button>
    </div>
  );
};

export default AddServiceForm;