import React from 'react';
import './Popups.css'; // Your original CSS file is used
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ActionButton from '../../actionButton/ActionButton';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

// The 'open' prop is necessary for the Dialog component to function
interface FormSubmittedPopupProps {
    open: boolean;
    onViewHistory: () => void;
    onClose: () => void;
}

const FormSubmittedPopup: React.FC<FormSubmittedPopupProps> = ({ open, onViewHistory, onClose }) => {
    return (
        // The Dialog component itself replaces the 'popup-overlay' div.
        // We pass your original class name to the Paper component inside the Dialog.
        <Dialog open={open} onClose={onClose} PaperProps={{ className: 'popup-content-add-request submitted' }}>

            {/* Using DialogTitle, DialogContent, and DialogActions to structure the content */}
            <DialogTitle className="popup-icon">
                <CheckCircleOutlinedIcon style={{ color: '#86B62C' }} />
            </DialogTitle>

            <DialogContent className="text">
                <div className="popup-main-text" style={{ color: '#4C4E54' }}>
                    Form Submitted
                </div>
                <div className="popup-secondary-text" style={{ color: '#626469' }}>
                    The request has been accepted. View request in Claim History.
                </div>
            </DialogContent>

            <DialogActions className="popup-actions">
                <ActionButton
                    className="popup-button primary-button"
                    handleEvent={onViewHistory}
                    type="button"
                    placeholder="View Claim History"
                />
                <ActionButton
                    className="popup-button secondary-popup-button"
                    handleEvent={onClose}
                    type="button"
                    placeholder="Close"
                />
            </DialogActions>

        </Dialog>
    );
};

export default FormSubmittedPopup;