import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { ArrowRight, Star } from 'lucide-react';
import useServices, { Service } from '@/hooks/useservices';

const RandomServiceShowcase: React.FC = () => {
  const { services } = useServices();
  const [randomService, setRandomService] = useState<Service | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (services && services.length > 0) {
      const randomIndex = Math.floor(Math.random() * services.length);
      setRandomService(services[randomIndex]);
    }
  }, [services]);

  const handleViewServices = () => {
    router.push('/services');
  };

  if (!randomService) {
    return (
      <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl p-8 max-w-md mx-auto animate-pulse">
        <div className="h-64 bg-white bg-opacity-30 rounded-2xl mb-6"></div>
        <div className="h-8 bg-white bg-opacity-30 rounded-full mb-4"></div>
        <div className="h-4 bg-white bg-opacity-30 rounded-full mb-2"></div>
        <div className="h-4 bg-white bg-opacity-30 rounded-full mb-2"></div>
        <div className="h-4 bg-white bg-opacity-30 rounded-full w-2/3"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl shadow-2xl overflow-hidden max-w-md mx-auto transition-all duration-300 hover:shadow-3xl transform hover:-translate-y-1">
      <div className="relative h-64 w-full overflow-hidden">
        <Image 
          src={randomService.image_url || '/placeholder-image.jpg'} 
          alt={randomService.name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{randomService.name}</h3>
          <div className="flex items-center mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} className="text-yellow-400 fill-current" />
            ))}
            <span className="ml-2 text-white font-semibold">5.0</span>
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-white text-opacity-90 mb-6 line-clamp-3">{randomService.description}</p>
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-white text-opacity-80 text-sm">Precio desde</p>
            <p className="text-white font-bold text-2xl">${randomService.price}</p>
          </div>
          <div className="bg-white bg-opacity-20 px-3 py-1 rounded-full">
            <p className="text-white font-semibold">Servicio destacado</p>
          </div>
        </div>
        <button
          onClick={handleViewServices}
          className="w-full bg-white text-purple-600 px-6 py-3 rounded-full transition-all duration-300 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 font-bold text-lg flex items-center justify-center group"
        >
          Explorar todos los servicios
          <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={20} />
        </button>
      </div>
    </div>
  );
};

export default RandomServiceShowcase;
