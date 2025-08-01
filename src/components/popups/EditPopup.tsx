import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, Button, Typography, Box, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import './Popup.css';

interface EditPopupProps {
    open: boolean;
    onClose: () => void;
    onEdit: (newAmount: number, reason: string) => void;
    formData: any;
    employee_name: string;
    employee_number: number;
    totalAmount: number;
}

function EditPopup({ open, onClose, onEdit, formData, employee_name, employee_number, totalAmount }: EditPopupProps) {
    const [amount, setAmount] = useState(String(totalAmount));
    const [reason, setReason] = useState('');

    useEffect(() => {
        setAmount(String(totalAmount));
    }, [totalAmount]);

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^[0-9]*\.?[0-9]*$/.test(value)) {
            setAmount(value);
        }
    };

    const handleSubmit = () => {
        const numericAmount = Number(amount);
        if (isNaN(numericAmount)) return;

        const updatedFormData = {
            ...formData,
            totalAmount: numericAmount,
        };
        console.log('Updated Form Data:', updatedFormData);
        console.log('Reason for change:', reason);
        onEdit(numericAmount, reason);
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
                <Typography className="employee-name">{employee_name}</Typography>
                
                <Box className="popup-field">
                    <Typography className="popup-label">Employee ID:</Typography>
                    <Typography className="popup-value employee-info">{employee_number}</Typography>
                </Box>

                <TextField
                    label="Amount"
                    type="text"
                    value={amount}
                    onChange={handleAmountChange}
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
                        className="submit-button-edit"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default EditPopup; 