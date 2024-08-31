import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

const PortfolioCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items] = useState<PortfolioItem[]>([
    { id: 1, title: "Maquillaje de Novia", description: "Look radiante para tu día especial", imageUrl: "https://images.pexels.com/photos/28146003/pexels-photo-28146003.png" },
    { id: 2, title: "Maquillaje Editorial", description: "Conceptos creativos para sesiones de fotos", imageUrl: "https://images.pexels.com/photos/28146011/pexels-photo-28146011.png" },
    { id: 3, title: "Maquillaje de Fiesta", description: "Glamour para tus noches más especiales", imageUrl: "https://images.pexels.com/photos/28146057/pexels-photo-28146057.png" },
    { id: 4, title: "Maquillaje Natural", description: "Realza tu belleza de forma sutil", imageUrl: "https://images.pexels.com/photos/28145998/pexels-photo-28145998.png" },
  ]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      <div className="overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <div className="relative h-[800px] flex justify-center items-center">
              <div className="relative w-full h-full">
              <Image
                src={items[currentIndex].imageUrl}
                alt={items[currentIndex].title}
                layout="fill"
                objectFit="cover"
                quality={100}
                priority
              />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6 rounded-b-xl">
                  <h3 className="text-3xl font-semibold text-white">{items[currentIndex].title}</h3>
                  <p className="mt-2 text-xl text-gray-200">{items[currentIndex].description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-md transition-all duration-300 hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-label="Imagen anterior"
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80 p-3 rounded-full shadow-md transition-all duration-300 hover:bg-white hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        aria-label="Siguiente imagen"
      >
        <ChevronRight className="w-8 h-8" />
      </button>
    </div>
  );
};

export default PortfolioCarousel;