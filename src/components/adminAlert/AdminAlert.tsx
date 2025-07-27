import React, { useState } from 'react';
import { Button, TextField, Paper, Typography } from '@mui/material';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import './AdminAlert.css';

const AdminAlert = () => {
  const [notification, setNotification] = useState('');

  const handleSendNotification = () => {
    // API call logic will go here
    console.log('Sending notification:', notification);
    setNotification('');
  };

  return (
    <Paper elevation={3} className="admin-alert-paper">
      <Typography variant="h5" component="h2" gutterBottom className="admin-alert-title">
        Announcements
      </Typography>
      <div className="admin-alert-input-container">
        <TextField
          placeholder="Type a notification message for the stream."
          variant="outlined"
          fullWidth
          value={notification}
          onChange={(e) => setNotification(e.target.value)}
          className='admin-alert-input'
        />
        <Button
          variant="contained"
          onClick={handleSendNotification}
          endIcon={<SendOutlinedIcon />}
          className="admin-alert-button"
        >
          Send
        </Button>
      </div>
    </Paper>
  );
};

export default AdminAlert; 