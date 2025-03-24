import React, { useState, useEffect, useCallback } from 'react';
import { 
  TextField, 
  InputAdornment, 
  Paper,
  IconButton 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import debounce from 'lodash/debounce'; // You'll need to install lodash: npm install lodash

const SearchBar = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  // Debounce the search to avoid too many API calls
  const debouncedSearch = useCallback(
    debounce((searchTerm) => {
      if (searchTerm.trim()) {
        onSearch(searchTerm);
      }
    }, 300),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  const handleClear = () => {
    setQuery('');
    onSearch('');
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 1,
        display: 'flex',
        alignItems: 'center',
        width: '80%',
        maxWidth: '600px',
        margin: '0 auto',
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(5px)',
        borderRadius: '50px',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 6
        }
      }}
    >
      <TextField
        fullWidth
        placeholder="Search for a movie..."
        value={query}
        onChange={handleChange}
        disabled={isLoading}
        variant="standard"
        InputProps={{
          disableUnderline: true,
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: 'text.secondary' }} />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClear}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
        sx={{
          mx: 2,
          '& input': {
            py: 1,
            fontSize: '1.1rem'
          }
        }}
      />
    </Paper>
  );
};

export default SearchBar;
