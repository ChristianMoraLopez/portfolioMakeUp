import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Phone, Mail, ArrowRight, MessageCircle, ShoppingCart, UserPlus, LogIn, CreditCard, Mail as MailIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import LoadingAnimation2 from '@/components/Animations/LoadingAnimation2';
import { FaWhatsapp } from 'react-icons/fa';

type Step = {
  icon: React.ElementType;
  text: string;
  color: string;
};

const ContactUs: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [activeStep, setActiveStep] = useState<number | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
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

  const steps: Step[] = [
    { icon: UserPlus, text: "Regístrese en nuestra plataforma", color: "text-green-500" },
    { icon: LogIn, text: "Inicie sesión con sus credenciales", color: "text-blue-500" },
    { icon: ShoppingCart, text: "Seleccione el servicio deseado", color: "text-purple-500" },
    { icon: CreditCard, text: "Realice el pago seguro con PayU", color: "text-red-500" },
    { icon: MailIcon, text: "Reciba la confirmación por correo", color: "text-yellow-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-100 to-blue-100">
      <AnimatePresence>
        {loading ? (
           <LoadingAnimation2 key="loading" />
        ) : (
          <motion.div
            key="content"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            className="container mx-auto px-4 py-16"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center mb-8"
            >
              <MessageCircle className="w-20 h-20 text-pink-500" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="bg-white shadow-2xl rounded-3xl overflow-hidden max-w-4xl mx-auto"
            >
              <div className="p-8">
                <h1 className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 mb-6">
                  Contáctanos
                </h1>
                <p className="text-2xl text-gray-600 text-center mb-12">
                  Estamos aquí para ayudarte en tu proceso de compra
                </p>

                <Alert className="mb-8 bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100">
                  <AlertTitle className="text-2xl font-semibold text-gray-800 mb-4">
                    Proceso de Compra
                  </AlertTitle>
                  <AlertDescription>
                    <div className="space-y-4">
                      {steps.map((step, index) => (
                        <motion.div
                          key={index}
                          className="flex items-center space-x-4 p-3 rounded-lg transition-colors duration-300"
                          onHoverStart={() => setActiveStep(index)}
                          onHoverEnd={() => setActiveStep(null)}
                          whileHover={{ scale: 1.05 }}
                        >
                          <div className={`p-2 rounded-full ${activeStep === index ? 'bg-gray-200' : ''}`}>
                            <step.icon className={`w-8 h-8 ${step.color}`} />
                          </div>
                          <span className={`text-lg ${activeStep === index ? 'font-semibold' : ''}`}>
                            {step.text}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </AlertDescription>
                </Alert>

                <p className="text-xl text-gray-700 mb-8 text-center">
                  Si necesita asistencia adicional, no dude en contactarnos:
                </p>

                <div className="flex flex-col items-center space-y-6 mb-12">
                  <motion.a
                    href="tel:+573023474626"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-3 text-xl text-blue-600 hover:text-blue-800"
                  >
                    <Phone className="w-6 h-6" />
                    <span>302 347 4626</span>
                  </motion.a>

                  <motion.a
                      href="mailto:Ngomezz2003@outlook.com"
                      className="flex items-center space-x-3 text-2xl text-blue-600 hover:text-pink-600 transition-colors duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Mail className="text-pink-600 w-8 h-8" />
                      <span>Ngomezz2003@outlook.com</span>
                    </motion.a>

                  <motion.a
                    href="https://wa.me/573023474626?text=Hola%20me%20gustaría%20preguntar%20por%20tus%20servicios%20de%20maquillaje"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-3 text-xl text-green-500 hover:text-green-700"
                  >
                    <FaWhatsapp className="w-6 h-6" />
                    <span>WhatsApp</span>
                  </motion.a>
                </div>

                <div className="text-center">
                  <Link href="/signup" passHref>
                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-block px-10 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full text-2xl shadow-lg hover:shadow-xl transition duration-300 flex items-center justify-center mx-auto"
                    >
                      Comenzar Ahora
                      <ArrowRight className="ml-2 h-6 w-6" />
                    </motion.a>
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ContactUs;