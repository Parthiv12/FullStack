import React from 'react';
import MovieCard from './MovieCard';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const Watchlist = ({ watchlist }) => {
  return (
    <div>
      {watchlist.length > 0 ? (
        <Grid container spacing={3}>
          {watchlist.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <MovieCard movie={movie} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="body1">Your watchlist is empty.</Typography>
      )}
    </div>
  );
};

export default Watchlist;
