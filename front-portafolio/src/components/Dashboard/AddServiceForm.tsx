// AddServiceForm.tsx
import React, { useState } from 'react';
import useServices from '@/hooks/useservices';
import { useAuth } from '@/hooks/auth';

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
  const { userId } = useAuth(); // Obtener userId del hook de autenticación
  const [newService, setNewService] = useState<Omit<Service, 'id'>>({
    name: '',
    description: '',
    price: 0,
    image_url: 'https://via.placeholder.com/250',
  });

  const { addService } = useServices();

  const handleAddService = async () => {
    console.log("userId", userId);
    
    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    try {
      const service: NewService = { ...newService, user_id: userId }; // Incluir user_id
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Agregar Nuevo Servicio</h2>
      <div className="mb-4">
        <input
          type="text"
          className="border p-2 w-full mb-2"
          placeholder="Nombre del Servicio"
          value={newService.name}
          onChange={(e) => setNewService({ ...newService, name: e.target.value })}
        />
        <textarea
          className="border p-2 w-full mb-2"
          placeholder="Descripción del Servicio"
          value={newService.description}
          onChange={(e) => setNewService({ ...newService, description: e.target.value })}
        ></textarea>
        <input
          type="number"
          className="border p-2 w-full mb-2"
          placeholder="Precio"
          value={newService.price}
          onChange={(e) => setNewService({ ...newService, price: Number(e.target.value) })}
        />
        <input
          type="text"
          className="border p-2 w-full"
          placeholder="URL de la Imagen (opcional)"
          value={newService.image_url}
          onChange={(e) => setNewService({ ...newService, image_url: e.target.value })}
        />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddService}>
        Agregar Servicio
      </button>
    </div>
  );
};

export default AddServiceForm;
