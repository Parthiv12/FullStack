import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Typography, Box } from '@mui/material';

const Intro = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 2000); // 2 seconds before fade out

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 1 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a237e 0%, #0d47a1 100%)',
        zIndex: 1000
      }}
    >
      <Box textAlign="center">
        <Typography
          variant="h1"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: 'white',
            fontSize: { xs: '2rem', sm: '3rem', md: '4rem' },
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
          }}
        >
          Movie Recommender
        </Typography>
      </Box>
    </motion.div>
  );
};

export default Intro; 