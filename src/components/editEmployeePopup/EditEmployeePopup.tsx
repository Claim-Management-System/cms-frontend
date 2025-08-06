import React from 'react';
import { Dialog, DialogActions, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import ActionButton from '../actionButton/ActionButton';
import './EditEmployeePopup.css';

interface PopupProps {
    open: boolean;
    onClose: () => void;
}

const EditEmployeePopup: React.FC<PopupProps> = ({ open, onClose }) => {
    const navigate = useNavigate();

    const handleNavigate = (path: string) => {
        navigate(path);
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" maxWidth="sm" fullWidth>
            <DialogTitle id="form-dialog-title" className="popup-title">
                Information Updated Successfully
                <IconButton aria-label="close" className="close-button" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>

            <DialogActions className="popup-actions">
                <ActionButton 
                    handleEvent={() => handleNavigate('/admin-dashboard')} 
                    className="popup-button primary-button"
                    placeholder='Go to Dashboard' 
                />
                <ActionButton 
                    handleEvent={() => handleNavigate('/employee-list')} 
                    className="popup-button primary-button"
                    placeholder='View Employees'
                />
            </DialogActions>
        </Dialog>
    );
};

export default EditEmployeePopup;
