import React from 'react';
import { Button } from '@mui/material';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import './Buttons.css';

interface ButtonsProps {
    onDeclineClick: () => void;
    onAcceptClick: () => void;
    onEditClick: () => void;
}

const Buttons: React.FC<ButtonsProps> = ({ onDeclineClick, onAcceptClick, onEditClick }) => {
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
                className="editing-button"
                onClick={onEditClick}
                endIcon={<EditIcon />}
            >
                Edit and Accept
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