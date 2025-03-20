import React from 'react';
import { motion } from 'framer-motion';

const BackgroundEffects = () => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
        zIndex: -1
      }}
      animate={{
        background: [
          'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)',
          'linear-gradient(45deg, #fbc2eb 0%, #a6c1ee 99%, #a6c1ee 100%)',
          'linear-gradient(45deg, #84fab0 0%, #8fd3f4 99%, #8fd3f4 100%)'
        ]
      }}
      transition={{ duration: 10, repeat: Infinity, repeatType: 'mirror' }}
    />
  );
};

export default BackgroundEffects;