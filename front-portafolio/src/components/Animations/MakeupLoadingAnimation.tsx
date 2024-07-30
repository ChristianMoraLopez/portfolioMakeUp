import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star } from 'lucide-react';

const MakeupLoadingAnimation: React.FC = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-pink-100 to-purple-200">
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }}
      transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
      className="relative w-40 h-40"
    >
      {/* Star */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Star className="w-20 h-20 text-yellow-400" />
      </motion.div>
      
      {/* Heart */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Heart className="w-24 h-24 text-red-500" />
      </motion.div>
    </motion.div>
  </div>
);

export default MakeupLoadingAnimation;
