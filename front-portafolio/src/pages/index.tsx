import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import RandomServiceShowcase from '@components/Services/ServiceRandom';
import PortfolioCarousel from '@components/Portafolio/Portafolio';
import axios from '@/lib/axios';
import { Sparkles, Paintbrush, Camera, Star, Heart, Zap } from 'lucide-react';
import LoadingAnimation from '@components/Animations/LoadingAnimation';

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    axios.get('/user')
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    return () => clearTimeout(timer);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, scale: 0.8 },
    in: { opacity: 1, scale: 1 },
    out: { opacity: 0, scale: 1.2 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.5
  };

  return (
    <AnimatePresence>
      {loading ? (
        <LoadingAnimation key="loading" />
      ) : (
        <motion.div
          key="page"
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 via-purple-100 to-blue-100"
        >
          <Navbar />
          <main className="flex-1 w-full mx-auto px-4 py-12 pt-24 overflow-hidden">
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-12 relative"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              >
                <Sparkles className="w-12 h-12 text-pink-500" />
              </motion.div>
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 mb-4">
                Servicios de Maquillaje Profesional
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto mb-6">
                Realza tu belleza con nuestros expertos en maquillaje. Servicios personalizados para cada ocasión.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition duration-300"
              >
                Reserva tu sesión de maquillaje
              </motion.button>
            </motion.section>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-24 w-full mx-auto"
            >
              <PortfolioCarousel />
            </motion.div>

            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-20 mb-24"
            >
              <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 mb-12 text-center">
                Nuestros Servicios de Maquillaje
              </h2>
              <RandomServiceShowcase />
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="mt-20 bg-white rounded-3xl shadow-2xl p-12 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500"></div>
              <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">¿Por qué elegir nuestros servicios de maquillaje?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  { icon: Paintbrush, title: "Expertise Profesional", description: "Años de experiencia en maquillaje profesional" },
                  { icon: Camera, title: "Looks Fotogénicos", description: "Maquillaje perfecto para cualquier sesión fotográfica" },
                  { icon: Star, title: "Productos Premium", description: "Usamos solo los mejores productos de maquillaje" },
                  { icon: Heart, title: "Atención Personalizada", description: "Maquillaje adaptado a tu estilo y necesidades" },
                  { icon: Zap, title: "Tendencias Actuales", description: "Siempre al día con las últimas tendencias en maquillaje" },
                  { icon: Sparkles, title: "Magia en Cada Detalle", description: "Resaltamos tu belleza natural con técnicas avanzadas" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
                    className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 rounded-2xl shadow-md transition-all duration-300"
                  >
                    <div className="bg-white p-4 rounded-full shadow-md mb-6">
                      <item.icon className="w-10 h-10 text-purple-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-24 text-center"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-6">¿Lista para lucir espectacular?</h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Déjanos realzar tu belleza con nuestro maquillaje profesional. Reserva tu cita hoy y experimenta la transformación.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full text-xl shadow-lg hover:shadow-xl transition duration-300"
              >
                Reserva Tu Sesión de Maquillaje
              </motion.button>
            </motion.section>
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HomePage;