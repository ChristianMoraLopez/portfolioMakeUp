// components/LoadingAnimation.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Paintbrush } from 'lucide-react';

const LoadingAnimation: React.FC = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-300 to-purple-400">
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
        <Sparkles className="w-full h-full text-white" />
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Paintbrush className="w-20 h-20 text-pink-600" />
      </motion.div>
    </motion.div>
  </div>
);

export default LoadingAnimation;
