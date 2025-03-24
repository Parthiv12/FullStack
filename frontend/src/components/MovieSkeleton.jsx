import React from 'react';
import { Card, CardContent, Skeleton, Box } from '@mui/material';

const MovieSkeleton = () => {
  return (
    <Card sx={{ 
      height: '100%',
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(10px)'
    }}>
      <Skeleton 
        variant="rectangular" 
        height={400}
        animation="wave"
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          transform: 'scale(1, 1)' // Fixes the wave animation
        }}
      />
      <CardContent>
        <Skeleton 
          variant="text" 
          sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            fontSize: '1.5rem',
            mb: 1
          }}
        />
        <Skeleton 
          variant="text" 
          sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            fontSize: '1rem'
          }}
          count={3}
        />
        <Box sx={{ mt: 2 }}>
          <Skeleton 
            variant="rectangular" 
            height={40}
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 1
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default MovieSkeleton; 