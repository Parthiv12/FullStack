import React from 'react';
import './MovieCard.css';
import { Card } from '@mui/material';

const MovieCard = ({ movie, onAddToWatchlist }) => {
  return (
    <Card 
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: 'rgba(10, 10, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(0, 255, 255, 0.1)',
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 0 30px rgba(0, 255, 255, 0.2)',
          border: '1px solid rgba(0, 255, 255, 0.3)',
        }
      }}
    >
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.overview}</p>
      <button onClick={() => onAddToWatchlist(movie)}>Add to Watchlist</button>
    </Card>
  );
};

export default MovieCard;