import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Button, Typography, Box, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import './Popup.css';

interface EditPopupProps {
    open: boolean;
    onClose: () => void;
    employeeName: string;
    employeeId: string;
    totalAmount: number;
    onEdit: (newAmount: number, reason: string) => void;
}

const EditPopup: React.FC<EditPopupProps> = ({
    open,
    onClose,
    employeeName,
    employeeId,
    totalAmount,
    onEdit
}) => {
    const [amount, setAmount] = useState(totalAmount);
    const [reason, setReason] = useState('');

    useEffect(() => {
        setAmount(totalAmount);
    }, [totalAmount]);

    const handleSubmit = () => {
        onEdit(amount, reason);
        onClose();
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
                <Typography className="employee-name">{employeeName}</Typography>
                
                <Box className="popup-field">
                    <Typography className="popup-label">Employee ID:</Typography>
                    <Typography className="popup-value employee-info">{employeeId}</Typography>
                </Box>

                <TextField
                    label="Amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    fullWidth
                    className="popup-input"
                />

                <TextField
                    label="Reason for change"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    fullWidth
                    multiline
                    rows={2}
                    className="popup-input"
                />
                
                <Box className="popup-actions">
                    <Button
                        className="edit-button"
                        onClick={handleSubmit}
                        endIcon={<EditIcon />}
                    >
                        Submit
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default EditPopup; 