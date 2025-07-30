
import React from 'react';
import './Popups.css';
import HourglassEmptyOutlinedIcon from '@mui/icons-material/HourglassEmptyOutlined';

const FormScanningPopup: React.FC = () => {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <div className="popup-icon">
                    <HourglassEmptyOutlinedIcon style={{ color: '#33B1E0' }} />
                </div>
                <div className="popup-main-text" style={{ color: '#4C4E54' }}>
                    Form Scanning
                </div>
                <div className="popup-secondary-text" style={{ color: '#626469' }}>
                    Please wait while the form is being scanned for documents duplication.
                </div>
            </div>
        </div>
    );
};

export default FormScanningPopup; 