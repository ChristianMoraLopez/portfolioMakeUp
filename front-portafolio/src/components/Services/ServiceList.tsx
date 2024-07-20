import React from 'react';
import ServiceItem from '@components/Services/ServiceItem';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
}

interface ServiceListProps {
  services: Service[];
  onDelete: (id: number) => void;
}

const ServiceList: React.FC<ServiceListProps> = ({ services, onDelete }) => (
  <div className="mt-10">
    <h2 className="text-xl font-semibold mb-4">Servicios Existentes</h2>
    {services.map((service) => (
      <ServiceItem key={service.id} service={service} onDelete={onDelete} />
    ))}
  </div>
);

export default ServiceList;
