import React from 'react';
import './Popups.css'; // Your original CSS file is used
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ActionButton from '../../actionButton/ActionButton';
import { Box, Dialog, DialogActions, DialogContent } from '@mui/material';

// The 'open' and 'onClose' props are necessary for the Dialog to function correctly
interface FormNotAcceptedPopupProps {
    open: boolean;
    onClose: () => void;
    onReview: () => void;
    onResubmit: () => void;
}

const FormNotAcceptedPopup: React.FC<FormNotAcceptedPopupProps> = ({ open, onClose, onReview, onResubmit }) => {
    return (
        <Dialog open={open} onClose={onClose}>

            <DialogContent className="text">
                <Box className="popup-icon">
                    <ErrorOutlineOutlinedIcon style={{ color: '#F6772C' }} />
                </Box>
                <Box className="popup-main-text" style={{ color: '#4C4E54' }}>
                    Form not accepted
                </Box>
                <Box className="popup-secondary-text" style={{ color: '#626469' }}>
                    There was an error in submitting your form.
                </Box>
            </DialogContent>

            <DialogActions className="popup-actions">
                <ActionButton
                    className="popup-button primary-button"
                    handleEvent={onReview}
                    type="button"
                    placeholder="Review Request"
                />
                <ActionButton
                    className="popup-button secondary-popup-button"
                    handleEvent={onResubmit}
                    type="button"
                    placeholder="Resubmit"
                />
            </DialogActions>

        </Dialog>
    );
};

export default FormNotAcceptedPopup;