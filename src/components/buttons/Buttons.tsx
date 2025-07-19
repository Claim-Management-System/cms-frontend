import React from 'react';
import { Button } from '@mui/material';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DoneIcon from '@mui/icons-material/Done';
import './Buttons.css';

interface ButtonsProps {
    onDeclineClick: () => void;
    onAcceptClick: () => void;
}

const Buttons: React.FC<ButtonsProps> = ({ onDeclineClick, onAcceptClick }) => {
    return (
        <div className="admin-buttons-container">
            <Button
                className="decline-button"
                onClick={onDeclineClick}
                endIcon={<DoNotDisturbIcon />}
            >
                Decline
            </Button>
            <Button
                className="accept-button"
                onClick={onAcceptClick}
                endIcon={<DoneIcon />}
            >
                Accept
            </Button>
        </div>
    );
};

export default Buttons; 