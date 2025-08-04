import { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext';
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';
import { USER_ROLES } from '../services/constantServices/constants';

interface SearchBoxProps {
  onSearchChange: (query: string) => void;
  placeholder?: string;
}

function SearchBox({ onSearchChange, placeholder = "Enter 4-Digit Employee ID" }: SearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const debounceDelay = 1000
  const { user } = useAuth();

  useEffect(() => {
    const timerId = setTimeout(() => {
      onSearchChange(searchTerm.trim());
    }, debounceDelay);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  return (
    <TextField
      label="Employee ID"
      placeholder={placeholder}
      size="small"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      disabled={user?.role === USER_ROLES.EMPLOYEE}
      sx={{
        width: '100%',
        '& .MuiInputLabel-root': {
          top: '-4px',
          fontFamily: "'LLCirc'",
          fontWeight: 100,
          color: '#4C4E54',
          '&.Mui-focused': {
            color: '#4C4E54',
          },
        },
        '& .MuiOutlinedInput-root': {
          height: '40px',
          borderRadius: '8px',
          fontFamily: "'LLCirc'",
          fontWeight: 100,
          '& fieldset': {
            border: '1px solid #77CBEB',
          },
          '&:hover fieldset': {
            borderColor: '#77CBEB',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#77CBEB',
            borderWidth: '1px',
          },
        },
        '& .MuiInputBase-input': {
          color: '#4C4E54',
          '&::placeholder': {
            fontFamily: "'LLCirc'",
            fontWeight: 100,
            color: '#8F9094',
            opacity: 1,
          },
        },
        '& .MuiOutlinedInput-input': {
          color: '#4C4E54',
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

export default SearchBox;