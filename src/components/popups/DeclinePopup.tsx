import { useState } from 'react';
import { Dialog, DialogContent, Typography, Box, FormControl, InputLabel, Select, MenuItem, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './Popup.css';

interface DeclinePopupProps {
    open: boolean;
    onClose: () => void;
    onReasonSelect: (reason: string) => void;
    employee_name: string;
    employee_number: number;
    totalAmount: number;
}

function DeclinePopup({ open, onClose, onReasonSelect, totalAmount, employee_name, employee_number }: DeclinePopupProps) {
    const [selectedReason, setSelectedReason] = useState('');

    const rejectionReasons = [
        'False Information',
        'Not enough information',
        'Attach complete Documents',
        'Not Applicable'
    ];

    const handleConfirm = () => {
        if (selectedReason) {
            console.log('Claim was declined');
            console.log('Reason:', selectedReason);
            onReasonSelect(selectedReason);
            onClose();
        } else {
            console.log('Please select a reason for declining the request.');
        }
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            className="popup-dialog"
            PaperProps={{
                sx: {
                    width: '350px',
                    height: 'auto',
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
                    <Typography className="popup-label">Employee ID:</Typography>
                    <Typography className="popup-value employee-info">{employee_number}</Typography>
                </Box>
                
                <Box className="popup-field">
                    <Typography className="popup-label">Status:</Typography>
                    <Typography className="popup-value status-denied">Denied</Typography>
                </Box>
                
                <Box className="total-amount-section">
                    <Typography className="total-amount-label">Total Amount Claim Request</Typography>
                    <Typography className="total-amount-value">${totalAmount}</Typography>
                </Box>
                
                <Box className="popup-field">
                    <FormControl fullWidth className="reason-dropdown">
                        <InputLabel>Reason why this request was rejected</InputLabel>
                        <Select
                            value={selectedReason}
                            onChange={(e) => setSelectedReason(e.target.value)}
                            label="Reason why this request was rejected"
                            className="reason-dropdown-select"
                        >
                            {rejectionReasons.map((reason) => (
                                <MenuItem key={reason} value={reason}>
                                    {reason}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box className="popup-actions">
                    <Button
                        className="confirm-button"
                        onClick={handleConfirm}
                    >
                        Confirm
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default DeclinePopup; 