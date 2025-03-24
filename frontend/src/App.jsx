import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
  Paper,
} from '@mui/material';
import MovieCard from './components/MovieCard';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';
import Intro from './components/Intro';
import { motion } from 'framer-motion';
import { searchMovies } from './utils/api';
import ParticleBackground from './components/ParticleBackground';
import MovieSkeleton from './components/MovieSkeleton';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TestPage from './pages/TestPage';

function App() {
  const [movies, setMovies] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [showIntro, setShowIntro] = useState(true);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data);
        setOpenLogin(false);
        // Handle successful login (e.g., store token, update UI)
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signupData),
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Signup successful:', data);
        setOpenSignup(false);
        // Handle successful signup (e.g., show success message, open login)
      } else {
        console.error('Signup failed:', data.message);
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const handleAddToWatchlist = (movie) => {
    if (!watchlist.find(item => item.id === movie.id)) {
      setWatchlist(prev => [...prev, movie]);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/testing" element={<TestPage />} />
        <Route path="/" element={
          <Box sx={{ 
            width: '100vw',
            minHeight: '100vh',
            margin: 0,
            padding: 0,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <ParticleBackground />
            
            {showIntro && <Intro onComplete={() => setShowIntro(false)} />}
            
            <Box sx={{ 
              position: 'relative', 
              zIndex: 2,
              width: '100%',
              height: '100%'
            }}>
              <Navbar 
                onLoginClick={() => setOpenLogin(true)}
                onSignupClick={() => setOpenSignup(true)}
              />

              <Container 
                maxWidth={false} 
                sx={{ 
                  pt: 4, 
                  pb: 8,
                  px: { xs: 2, sm: 3, md: 4 },
                  position: 'relative'
                }}
              >
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants}>
                    <Box sx={{ mb: 4 }}>
                      <SearchBar onSearch={handleSearch} />
                    </Box>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Typography 
                      variant="h2" 
                      sx={{ 
                        textAlign: 'center',
                        my: 4,
                        color: 'white',
                        textShadow: '0 0 10px rgba(0,255,255,0.5)',
                        fontWeight: 'bold'
                      }}
                    >
                      Discover Movies
                    </Typography>
                  </motion.div>

                  <Grid container spacing={3}>
                    {isLoading ? (
                      // Show skeletons while loading
                      [...Array(8)].map((_, index) => (
                        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                          <MovieSkeleton />
                        </Grid>
                      ))
                    ) : (
                      // Show actual movies
                      movies.map((movie) => (
                        <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                          <motion.div variants={itemVariants}>
                            <Paper elevation={8} sx={{ 
                              height: '100%',
                              transform: 'translateZ(0)',
                              transition: 'transform 0.2s, box-shadow 0.2s',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 16
                              }
                            }}>
                              <MovieCard
                                movie={movie}
                                onAddToWatchlist={handleAddToWatchlist}
                              />
                            </Paper>
                          </motion.div>
                        </Grid>
                      ))
                    )}
                  </Grid>

                  {watchlist.length > 0 && (
                    <motion.div variants={itemVariants}>
                      <Typography 
                        variant="h3" 
                        sx={{ 
                          textAlign: 'center',
                          my: 4,
                          color: 'white',
                          textShadow: '0 0 10px rgba(0,255,255,0.5)'
                        }}
                      >
                        Your Watchlist
                      </Typography>
                      <Grid container spacing={3}>
                        {watchlist.map((movie) => (
                          <Grid item key={movie.id} xs={12} sm={6} md={4} lg={3}>
                            <Paper elevation={8} sx={{ 
                              height: '100%',
                              transform: 'translateZ(0)',
                              transition: 'transform 0.2s, box-shadow 0.2s',
                              '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 16
                              }
                            }}>
                              <MovieCard movie={movie} />
                            </Paper>
                          </Grid>
                        ))}
                      </Grid>
                    </motion.div>
                  )}
                </motion.div>
              </Container>
            </Box>

            {/* Login Dialog */}
            <Dialog open={openLogin} onClose={() => setOpenLogin(false)} fullWidth maxWidth="xs">
              <DialogTitle>Login</DialogTitle>
              <DialogContent>
                <Box component="form" onSubmit={handleLogin} sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    type="email"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    type="password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Login
                  </Button>
                </Box>
              </DialogContent>
            </Dialog>

            {/* Signup Dialog */}
            <Dialog open={openSignup} onClose={() => setOpenSignup(false)} fullWidth maxWidth="xs">
              <DialogTitle>Sign Up</DialogTitle>
              <DialogContent>
                <Box component="form" onSubmit={handleSignup} sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Name"
                    value={signupData.name}
                    onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Email"
                    type="email"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                  />
                  <TextField
                    fullWidth
                    margin="normal"
                    label="Password"
                    type="password"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign Up
                  </Button>
                </Box>
              </DialogContent>
            </Dialog>
          </Box>
        } />
      </Routes>
    </Router>
  );
}

export default App;