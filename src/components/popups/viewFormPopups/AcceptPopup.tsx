import { Dialog, DialogTitle, DialogContent, Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ActionButton from '../../actionButton/ActionButton';
import './Popup.css';

interface AcceptPopupProps {
    open: boolean;
    onClose: () => void;
    onAccept: () => void;
    employee_name: string;
    employee_number: number;
    totalAmount: number;
}

function AcceptPopup ({ open, onClose, onAccept, totalAmount, employee_name, employee_number }: AcceptPopupProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            className="popup-dialog"
        >

            <DialogTitle id="form-dialog-title" className="popup-title">
                {employee_name}
                <IconButton aria-label="close" className="close-button" onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>


            <DialogContent className="popup-content">
                
                <Box className="popup-field">
                    <Typography className="popup-label">Employee Number:</Typography>
                    <Typography className="popup-value employee-info">{employee_number}</Typography>
                </Box>
                
                <Box className="total-amount-section">
                    <Typography className="total-amount-label">Total Amount Claim Request</Typography>
                    <Typography className="total-amount-value">PKR {totalAmount}</Typography>
                </Box>
                
                <Box className="popup-actions-view-form">
                    <ActionButton
                        className="popup-button primary-button"
                        handleEvent={onAccept}
                        placeholder='Submit'
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default AcceptPopup;
