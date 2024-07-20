import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';

const Courses: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 py-20"
    >
      <section className="container mx-auto px-4">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition duration-300 flex flex-col md:flex-row"
        >
          <div className="md:w-1/2 relative overflow-hidden group">
            <Image
              src="/images/Vale.jpg"
              alt="Curso destacado"
              width={800}
              height={600}
              objectFit="cover"
              className="transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-500 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300"></div>
            <div className="absolute bottom-4 left-4 flex items-center space-x-2">
              <Star className="text-yellow-300 w-6 h-6" />
              <span className="text-white font-bold">4.9</span>
            </div>
          </div>
          <div className="md:w-1/2 p-10 flex flex-col justify-center bg-gradient-to-br from-white to-pink-50">
            <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-6 tracking-tight">Curso de Maquillaje Profesional</h2>
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">Descubre el arte del maquillaje con nuestro curso exclusivo. Domina técnicas avanzadas, aprende los secretos de los profesionales y transforma rostros con confianza y creatividad.</p>
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#" className="w-full sm:w-auto inline-flex items-center justify-center bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold py-3 px-8 rounded-full hover:from-pink-600 hover:to-purple-700 transition duration-300 transform hover:scale-105 shadow-lg group">
                <span>Explorar Curso</span>
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <span className="text-gray-600 font-medium">
                <span className="text-2xl font-bold text-pink-600">$200.000 cop</span> / 2 horas
              </span>
            </div>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Courses;