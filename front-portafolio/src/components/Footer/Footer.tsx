import React from 'react';
import { motion } from 'framer-motion';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[url('/images/acuarela.jpg')] bg-cover bg-center shadow-lg text-dark-blue">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="col-span-2 lg:col-span-3"
          >
            <h3 className="text-xl font-bold mb-4 border-b-2 border-dark-blue pb-2">Enlaces</h3>
            <nav className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['Acerca de nosotros', 'Contacto', 'Servicios', 'Productos'].map((item, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  className="block hover:text-white transition duration-300 transform hover:translate-x-1"
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-bold mb-4 border-b-2 border-dark-blue pb-2">Redes Sociales</h3>
            <div className="flex space-x-4">
              {[
                { name: 'Twitter', path: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" },
                { name: 'YouTube', path: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" },
                { name: 'Facebook', path: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" }
              ].map((social, index) => (
                <motion.a 
                  key={index}
                  href="#" 
                  className="text-dark-blue hover:text-white transition duration-300"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current">
                    <path d={social.path}></path>
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="border-t border-dark-blue mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center"
        >
          <p className="text-sm">&copy; 2024 - Todos los derechos reservados por</p>
          <p className="text-2xl font-['Ms_Madi'] mt-2 sm:mt-0">Valentina Gómez</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;