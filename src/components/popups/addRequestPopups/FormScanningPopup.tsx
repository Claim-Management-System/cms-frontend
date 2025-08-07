import React from 'react';
import './Popups.css'; // Your original CSS file is used
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';

// The 'open' prop is required for the Dialog component to manage its visibility
interface FormScanningPopupProps {
    open: boolean;
}

const FormScanningPopup: React.FC<FormScanningPopupProps> = ({ open }) => {
    return (
        // The Dialog replaces the 'popup-overlay' div
        // The 'popup-content-add-request' class is passed to the Dialog's paper element
        <Dialog open={open} PaperProps={{ className: 'popup-content-add-request' }}>

            <DialogTitle className="popup-icon">
                <HourglassEmptyOutlinedIcon style={{ color: '#33B1E0' }} />
            </DialogTitle>

            <DialogContent>
                <div className="popup-main-text" style={{ color: '#4C4E54' }}>
                    Form Scanning
                </div>
                <div className="popup-secondary-text" style={{ color: '#626469' }}>
                    Please wait while the form is being scanned for documents duplication.
                </div>
            </DialogContent>

        </Dialog>
    );
};

export default FormScanningPopup;