import React from 'react';
import { motion } from 'framer-motion';
import { Palette, Scissors } from 'lucide-react';

const LoadingAnimation2: React.FC = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-red-200 to-orange-300">
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: [0, 1, 0.5, 1] }}
      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
      className="relative w-40 h-40"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0"
      >
        <Palette className="w-full h-full text-red-600" />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Scissors className="w-20 h-20 text-orange-500" />
      </motion.div>
    </motion.div>
  </div>
);

export default LoadingAnimation2;