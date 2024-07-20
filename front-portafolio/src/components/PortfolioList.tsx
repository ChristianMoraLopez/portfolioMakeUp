import React from 'react';
import PortfolioItem from './PortfolioItem';
import { motion } from 'framer-motion';

const PortfolioList: React.FC = () => {
  const items = [
    {
      id: 1,
      title: 'Maquillaje de Novia',
      imageUrl: '/images/bridal-makeup.jpg',
      description: 'Crea looks deslumbrantes para el día más especial.',
      width: 300,
      height: 500,
    },
    {
      id: 2,
      title: 'Maquillaje Editorial',
      imageUrl: '/images/editorial-makeup.jpg',
      description: 'Domina técnicas creativas para sesiones de fotos impactantes.',
      width: 400,
      height: 800,
    },
    // Agrega más elementos según sea necesario
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <PortfolioItem item={item} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default PortfolioList;