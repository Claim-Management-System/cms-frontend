import React, { useState, useEffect } from 'react';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

interface SearchBoxProps {
  onSearchChange: (query: string) => void;
  placeholder?: string;
  debounceDelay?: number;
}

function SearchBox({ onSearchChange, placeholder = "Search...", debounceDelay = 500 }: SearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      onSearchChange(searchTerm.trim());
    }, debounceDelay);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm, debounceDelay]);

  return (
    <TextField
      placeholder={placeholder}
      size="small"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      sx={{
        width: 350,
        '& .MuiOutlinedInput-root': {
          '&.Mui-focused fieldset': {
            borderColor: '#1CA8DD',
          },
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search sx={{ color: 'text.secondary' }} />
          </InputAdornment>
        ),
      }}
    />
  );
}

export default React.memo(SearchBox);