import { Dialog, DialogContent, Button, Typography, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
            PaperProps={{
                sx: {
                    width: '350px',
                    height: '250px',
                    maxWidth: 'none',
                    position: 'relative'
                }
            }}
        >
            <IconButton
                className="close-button"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: '#797A7F'
                }}
            >
                <CloseIcon />
            </IconButton>
            
            <DialogContent className="popup-content">
                <Typography className="employee-name">{employee_name}</Typography>
                
                <Box className="popup-field">
                    <Typography className="popup-label">Employee Number:</Typography>
                    <Typography className="popup-value employee-info">{employee_number}</Typography>
                </Box>
                
                <Box className="total-amount-section">
                    <Typography className="total-amount-label">Total Amount Claim Request</Typography>
                    <Typography className="total-amount-value">PKR {totalAmount}</Typography>
                </Box>
                
                <Box className="popup-actions">
                    <Button
                        className="submit-button-accept"
                        onClick={onAccept}
                    >
                        Submit
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default AcceptPopup; 