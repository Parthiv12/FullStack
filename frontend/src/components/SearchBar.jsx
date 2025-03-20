import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && query.trim()) {
      onSearch(query);
    }
  };

  return (
    <TextField
      label="Search for a movie..."
      variant="outlined"
      fullWidth
      value={query}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      sx={{ 
        width: '100%',
        '& .MuiOutlinedInput-root': {
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        },
        '& .MuiInputLabel-root': {
          color: 'rgba(0, 0, 0, 0.7)',
        }
      }}
    />
  );
};

export default SearchBar;
