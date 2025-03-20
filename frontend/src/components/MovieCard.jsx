import React from 'react';
import './MovieCard.css';

const MovieCard = ({ movie, onAddToWatchlist }) => {
  return (
    <div className="movie-card">
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.overview}</p>
      <button onClick={() => onAddToWatchlist(movie)}>Add to Watchlist</button>
    </div>
  );
};

export default MovieCard;