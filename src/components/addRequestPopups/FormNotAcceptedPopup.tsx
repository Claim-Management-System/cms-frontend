import React from 'react';
import './Popups.css';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import ActionButton from '../actionButton/ActionButton';

interface FormNotAcceptedPopupProps {
    onReview: () => void;
    onResubmit: () => void;
}

const FormNotAcceptedPopup: React.FC<FormNotAcceptedPopupProps> = ({ onReview, onResubmit }) => {
    return (
        <div className="popup-overlay">
            <div className="popup-content-add-request not-accepted">
                <div className="text">
                    <div className="popup-icon">
                        <ErrorOutlineOutlinedIcon style={{ color: '#F6772C' }} />
                    </div>
                    <div className="popup-main-text" style={{ color: '#4C4E54' }}>
                        Form not accepted
                    </div>
                    <div className="popup-secondary-text" style={{ color: '#626469' }}>
                        There was an error in submitting your form.
                    </div>
                </div>
                <div className="popup-actions">
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
                </div>
            </div>
        </div>
    );
};

export default FormNotAcceptedPopup;
