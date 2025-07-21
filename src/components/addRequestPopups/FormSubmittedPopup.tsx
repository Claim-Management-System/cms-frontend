
import React from 'react';
import './Popups.css';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';

interface FormSubmittedPopupProps {
    onViewHistory: () => void;
    onClose: () => void;
}

const FormSubmittedPopup: React.FC<FormSubmittedPopupProps> = ({ onViewHistory, onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content submitted">
                <div className="text">
                    <div className="popup-icon">
                        <CheckCircleOutlinedIcon style={{ color: '#86B62C' }} />
                    </div>
                    <div className="popup-main-text" style={{ color: '#4C4E54' }}>
                        Form Submitted
                    </div>
                    <div className="popup-secondary-text" style={{ color: '#626469' }}>
                        The request has been accepted. View request in Claim History.
                    </div>
                </div>
                <div className="popup-actions">
                    <button
                        className="popup-button"
                        style={{ backgroundColor: '#1CA8DD', color: '#FFFFFF' }}
                        onClick={onViewHistory}
                    >
                        View Claim History
                    </button>
                    <button
                        className="popup-button"
                        style={{ backgroundColor: '#E9E9EA', color: '#4C4E54' }}
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FormSubmittedPopup; 