import React from 'react';
import { TextField, Button, Box } from '@mui/material';
import './UserSearch.css';

interface UserSearchProps {
  onSearch: () => void;
}

const UserSearch: React.FC<UserSearchProps> = ({ onSearch }) => {
  return (
    <Box className="user-search-container">
      <TextField
        label="Employee ID"
        variant="outlined"
        className="employee-id-field"
      />
      <Button
        variant="contained"
        color="primary"
        className="search-button"
        onClick={onSearch}
      >
        Search
      </Button>
    </Box>
  );
};

export default UserSearch; 