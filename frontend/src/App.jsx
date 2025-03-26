import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
} from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';
import Intro from './components/Intro';
import { motion } from 'framer-motion';
import { searchMovies } from './utils/api';
import ParticleBackground from './components/ParticleBackground';
import MovieSkeleton from './components/MovieSkeleton';
import AuthPage from './pages/AuthPage';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './context/AuthContext';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF4081',
    },
    secondary: {
      main: '#FF80AB',
    },
    background: {
      default: '#0a0a2a',
      paper: 'rgba(255, 255, 255, 0.1)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
        },
      },
    },
  },
});

const MainContent = () => {
  const { user, loading } = useAuth();
  const [showIntro, setShowIntro] = useState(true);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowIntro(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  const handleSearch = async (query) => {
    try {
      setIsLoading(true);
      const results = await searchMovies(query);
      setMovies(results);
    } catch (error) {
      console.error('Error searching movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (showIntro) {
    return <Intro onComplete={() => setShowIntro(false)} />;
  }

  if (!user && !showIntro) {
    return <Navigate to="/auth" />;
  }

  return (
    <Box sx={{ 
      width: '100vw',
      minHeight: '100vh',
      margin: 0,
      padding: 0,
      position: 'relative',
      overflow: 'hidden'
    }}>
      <ParticleBackground />
      <Box sx={{ 
        position: 'relative', 
        zIndex: 2,
        width: '100%',
        height: '100%'
      }}>
        <Navbar />
        <Container 
          maxWidth={false} 
          sx={{ 
            mt: 4,
            px: { xs: 2, sm: 3, md: 4 }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ mb: 4 }}>
              <SearchBar onSearch={handleSearch} />
            </Box>

            <Grid container spacing={3}>
              {isLoading ? (
                [...Array(8)].map((_, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                    <MovieSkeleton />
                  </Grid>
                ))
              ) : (
                movies.map((movie) => (
                  <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <MovieCard movie={movie} />
                    </motion.div>
                  </Grid>
                ))
              )}
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Box>
  );
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<MainContent />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;