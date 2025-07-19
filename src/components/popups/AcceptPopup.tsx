import React from 'react';
import { Dialog, DialogContent, Button, Typography, Box, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';
import './Popup.css';

interface AcceptPopupProps {
    open: boolean;
    onClose: () => void;
    employeeName: string;
    employeeId: string;
    totalAmount: number;
    onForwardToFinance: () => void;
}

const AcceptPopup: React.FC<AcceptPopupProps> = ({
    open,
    onClose,
    employeeName,
    employeeId,
    totalAmount,
    onForwardToFinance
}) => {
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
                <Typography className="employee-name">{employeeName}</Typography>
                
                <Box className="popup-field">
                    <Typography className="popup-label">Employee ID:</Typography>
                    <Typography className="popup-value employee-info">{employeeId}</Typography>
                </Box>
                
                <Box className="popup-field">
                    <Typography className="popup-label">Status:</Typography>
                    <Typography className="popup-value status-accepted">Accepted</Typography>
                </Box>
                
                <Box className="total-amount-section">
                    <Typography className="total-amount-label">Total Amount Claim Request</Typography>
                    <Typography className="total-amount-value">${totalAmount.toFixed(2)}</Typography>
                </Box>
                
                <Box className="popup-actions">
                    <Button
                        className="forward-button"
                        onClick={onForwardToFinance}
                        endIcon={<ArrowForwardIcon />}
                    >
                        Forward to Finance
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default AcceptPopup; 