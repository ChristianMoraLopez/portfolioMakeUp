import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Phone, Mail, CreditCard, Image, Megaphone } from 'lucide-react';
import Navbar from '@components/Navbar/Navbar';
import Footer from '@components/Footer/Footer';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import LoadingAnimation from '@/components/Animations/LoadingAnimation';

const InfoPage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 300,
    damping: 30
  };

  const sectionVariants = {
    closed: { height: 0, opacity: 0 },
    open: { height: 'auto', opacity: 1 }
  };

  const features = [
    { title: 'Pagos Seguros', icon: CreditCard, description: 'Realiza pagos de forma segura y conveniente directamente desde nuestra plataforma.' },
    { title: 'Portafolio Interactivo', icon: Image, description: 'Explora nuestro portafolio detallado para ver ejemplos de nuestro trabajo y estilos.' },
    { title: 'Promociones Exclusivas', icon: Megaphone, description: 'Mantente al día con nuestras últimas promociones y ofertas especiales.' }
  ];

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
          <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-12 pt-24">
            <motion.h1 
              className="text-5xl font-extrabold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8, type: 'spring' }}
            >
              Bienvenido a Nuestro Estudio de Belleza
            </motion.h1>

            <Alert variant="default" className="mb-8 border-pink-400 bg-pink-50">
              <AlertTitle className="text-pink-800 font-semibold">Importante:</AlertTitle>
              <AlertDescription className="text-pink-700">
                Actualmente, las citas deben ser agendadas por teléfono o correo electrónico. Nuestra plataforma en línea es para pagos, portafolio y promociones.
              </AlertDescription>
            </Alert>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-center text-purple-800">Nuestros Servicios en Línea</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    whileHover={{ scale: 1.05 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <feature.icon className="w-12 h-12 mb-4 text-pink-600" />
                    <h3 className="text-xl font-semibold mb-2 text-purple-700">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-center text-purple-800">Cómo Agendar una Cita</h2>
              <motion.div
                className="bg-white p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-lg text-gray-700 mb-4">Para agendar una cita, por favor contáctanos directamente:</p>
                <div className="flex justify-center space-x-4">
                  <Link href="https://wa.me/573023474626?text=Hola%20me%20gustaría%20preguntar%20por%20tus%20servicios%20de%20maquillaje">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition duration-300"
                    >
                      <Phone className="mr-2" /> Escribenos
                    </motion.button>
                  </Link>
                  <Link href="mailto:Ngomezz2003@outlook.com">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold rounded-full text-lg shadow-lg hover:shadow-xl transition duration-300"
                    >
                      <Mail className="mr-2" /> Email
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </section>

            <section className="mb-12">
              <h2 className="text-3xl font-bold mb-6 text-center text-purple-800">Preguntas Frecuentes</h2>
              {['¿Cómo puedo pagar?', '¿Puedo ver ejemplos de su trabajo?', '¿Ofrecen descuentos?'].map((question, index) => (
                <motion.div
                  key={index}
                  className="mb-4 bg-white rounded-lg shadow"
                  initial={false}
                  animate={activeSection === index ? 'open' : 'closed'}
                >
                  <motion.button
                    className="w-full px-6 py-4 flex justify-between items-center text-left text-lg font-semibold text-purple-700"
                    onClick={() => setActiveSection(activeSection === index ? null : index)}
                  >
                    {question}
                    <ChevronDown className={`transform transition-transform duration-200 ${activeSection === index ? 'rotate-180' : ''}`} />
                  </motion.button>
                  <motion.div
                    variants={sectionVariants}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-4 overflow-hidden"
                  >
                    <p className="text-gray-600">
                      {index === 0 && "Puede realizar pagos seguros directamente a través de nuestra plataforma en línea."}
                      {index === 1 && "Sí, nuestro portafolio interactivo está disponible en la sección 'Galería' de nuestro sitio web."}
                      {index === 2 && "Ofrecemos promociones exclusivas regularmente. Revise nuestra sección de 'Ofertas' para las últimas novedades."}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </section>
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default InfoPage;