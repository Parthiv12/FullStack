import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useTheme,
  useMediaQuery
} from '@mui/material';

const Navbar = ({ onLoginClick, onSignupClick }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar 
      position="static" 
      sx={{ 
        width: '100%',
        backgroundColor: '#1976d2'
      }}
    >
      <Toolbar sx={{ 
        justifyContent: 'space-between', 
        width: '100%',
        px: { xs: 2, sm: 3, md: 4 }
      }}>
        <Typography 
          variant="h6" 
          sx={{
            flexGrow: { xs: 1, sm: 0 },
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
            textAlign: { xs: 'center', sm: 'left' }
          }}
        >
          Movie Recommender
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button 
            color="inherit" 
            onClick={onLoginClick}
            sx={{ 
              fontSize: { xs: '0.8rem', sm: '1rem' },
              whiteSpace: 'nowrap'
            }}
          >
            Login
          </Button>
          <Button 
            variant="outlined" 
            onClick={onSignupClick}
            sx={{ 
              color: 'white', 
              borderColor: 'white',
              fontSize: { xs: '0.8rem', sm: '1rem' },
              whiteSpace: 'nowrap'
            }}
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
