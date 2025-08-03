import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
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
                <Button onClick={() => handleNavigate('/admin-dashboard')} className="dashboard-btn">
                    Go to Dashboard
                </Button>
                <Button onClick={() => handleNavigate('/employee-list')} className="view-employees-btn">
                    View Employees
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditEmployeePopup;
