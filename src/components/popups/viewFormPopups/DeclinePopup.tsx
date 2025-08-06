import { useState } from 'react';
import { Dialog, DialogContent, Typography, Box, FormControl, InputLabel, Select, MenuItem, IconButton } from '@mui/material';
import { useError } from '../../../context/errorContext';
import CloseIcon from '@mui/icons-material/Close';
import ActionButton from '../../actionButton/ActionButton';
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
    const { setError } = useError();

    const rejectionReasons = [
        'False Information',
        'Not enough information',
        'Attach complete Documents',
        'Not Applicable'
    ];

    const handleConfirm = () => {
        if (selectedReason) {
            onReasonSelect(selectedReason);
            onClose();
        } else {
            setError('Please select a reason for declining the request.');
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
            >
                <CloseIcon />
            </IconButton>
            
            <DialogContent className="popup-content">
                <Typography className="employee-name">{employee_name}</Typography>
                
                <Box className="popup-field">
                    <Typography className="popup-label">Employee ID:</Typography>
                    <Typography className="popup-value employee-info">{employee_number}</Typography>
                </Box>
                
                <Box className="total-amount-section">
                    <Typography className="total-amount-label">Total Amount Claim Request</Typography>
                    <Typography className="total-amount-value">PKR {totalAmount}</Typography>
                </Box>
                
                <Box>
                    <FormControl className="reason-dropdown">
                        <InputLabel>Reason why this request was rejected</InputLabel>
                        <Select
                            value={selectedReason}
                            onChange={(e) => setSelectedReason(e.target.value)}
                            label="Reason why this request was rejected"
                            className="reason-dropdown-select"
                            MenuProps={{ className: 'reason-dropdown-menu' }}
                        >
                            {rejectionReasons.map((reason) => (
                                <MenuItem key={reason} value={reason}>
                                    {reason}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
                <Box className="popup-actions-view-form">
                    <ActionButton
                        className="secondary-popup-button popup-button"
                        handleEvent={handleConfirm}
                        placeholder='Confirm'
                    />
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default DeclinePopup;
