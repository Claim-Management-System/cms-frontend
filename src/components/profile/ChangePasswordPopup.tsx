import React, { useState } from 'react';
import { useError } from '../../context/errorContext';
import { useAuth } from '../../context/authContext';
import { updatePassword } from '../../services/dataServices/employee'
import {
  Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, IconButton, InputAdornment
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './ChangePasswordPopup.css';

interface ChangePasswordPopupProps {
  open: boolean;
  onClose: () => void;
}

const passwordFields = [
  { name: 'currentPassword', label: 'Current Password', id: 'current-password' },
  { name: 'newPassword', label: 'New Password', id: 'new-password' },
  { name: 'confirmPassword', label: 'Confirm New Password', id: 'confirm-password' },
];

const ChangePasswordPopup: React.FC<ChangePasswordPopupProps> = ({ open, onClose }) => {
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [show, setShow] = useState({ currentPassword: false, newPassword: false, confirmPassword: false });
  
  const { setError } = useError();
  const { user } = useAuth();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setPasswords(prev => ({ ...prev, [name]: value }));
  };

  const toggleShowPassword = (field: keyof typeof passwords) => {
    setShow(prev => ({ ...prev, [field]: !prev[field] }));
  };
  
  const handleSubmit = async () => {
    if (passwords.newPassword.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      setError("New passwords do not match.");
      return;
    }
    
    try {
      await updatePassword(user?.email!, passwords.currentPassword, passwords.newPassword)
      onClose();
    } catch (apiError: any) {
      setError(apiError.message || 'Failed to update password.');
    }
  };
  
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth className="change-password-dialog">
      <DialogTitle className='change-password-title'>
        Change Password
        <IconButton aria-label="close" onClick={onClose} sx={{ position: 'absolute', right: 25, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        {passwordFields.map(field => (
          <TextField
            key={field.id}
            autoFocus={field.name === 'currentPassword'}
            id={field.id}
            name={field.name}
            label={field.label}
            type={show[field.name as keyof typeof show] ? 'text' : 'password'}
            fullWidth
            variant="outlined"
            className="new-password-field"
            value={passwords[field.name as keyof typeof passwords]}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => toggleShowPassword(field.name as keyof typeof passwords)} edge="end">
                    {show[field.name as keyof typeof show] ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" className='submit-button-change-password'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordPopup;