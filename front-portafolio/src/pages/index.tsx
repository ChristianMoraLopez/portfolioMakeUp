import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Courses from '../components/Courses';
import PortfolioList from '../components/PortfolioList';
import api from '../api';
import { Sparkles, Paintbrush, Camera } from 'lucide-react';
import LoadingAnimation from '@components/Animations/LoadingAnimation'; // Importa el nuevo componente

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    api.get('/user')
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
          className="flex flex-col min-h-screen bg-gradient-to-br from-pink-50 to-purple-100"
        >
          <Navbar />
          <main className="flex-1 w-full mx-auto px-4 py-12 overflow-hidden pt-32"> {/* Aquí se agrega el padding-top */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-16"
            >
              <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-4">
                Arte en Cada Pincelada
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Descubre el poder transformador del maquillaje profesional y libera tu belleza interior.
              </p>
            </motion.section>

            <Courses />

            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-20"
            >
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-purple-600 mb-8 text-center">
                Explora Nuestros Servicios
              </h2>
              <PortfolioList />
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-20 bg-white rounded-3xl shadow-xl p-10"
            >
              <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">¿Por qué elegirnos?</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { icon: Paintbrush, title: "Expertise Profesional", description: "Años de experiencia en la industria del maquillaje" },
                  { icon: Camera, title: "Resultados Fotogénicos", description: "Looks perfectos para cualquier sesión fotográfica" },
                  { icon: Sparkles, title: "Productos Premium", description: "Usamos solo los mejores productos del mercado" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center text-center p-6 bg-gradient-to-br from-pink-100 to-purple-100 rounded-2xl shadow-md"
                  >
                    <item.icon className="w-12 h-12 text-pink-600 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HomePage;
