import React from 'react';
import './Popups.css';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ActionButton from '../../actionButton/ActionButton';

interface FormSubmittedPopupProps {
    onViewHistory: () => void;
    onClose: () => void;
}

const FormSubmittedPopup: React.FC<FormSubmittedPopupProps> = ({ onViewHistory, onClose }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content-add-request submitted">
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
                </div>
            </div>
        </div>
    );
};

export default FormSubmittedPopup;
