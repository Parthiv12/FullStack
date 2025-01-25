import React from 'react';
import MovieCard from './MovieCard';
import './Watchlist.css';

function Watchlist({ watchlist }) {
  return (
    <div className="watchlist">
      {watchlist.length > 0 ? (
        watchlist.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      ) : (
        <p>Your watchlist is empty.</p>
      )}
    </div>
  );
}

export default Watchlist;
