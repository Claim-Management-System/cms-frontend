import { useNavigate } from 'react-router-dom';
import { Box, Button, Modal, Typography, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import './AddEmployeePopup.css';

interface AddEmployeePopupProps {
    open: boolean;
    onClose: () => void;
    employeeData: {
        employeeId: string;
        name: string;
        email: string;
        password?: string;
    };
}

const AddEmployeePopup = ({ open, onClose, employeeData }: AddEmployeePopupProps) => {
    const navigate = useNavigate();

    const displayContent = [
        { label: "Employee ID", value: employeeData.employeeId },
        { label: "Employee Name", value: employeeData.name },
        { label: "Email", value: employeeData.email },
        { label: "Password", value: employeeData.password },
    ]

    return (
        <Modal open={open} onClose={onClose}>
            <Box className="add-employee-popup">
                <IconButton
                    aria-label="close"
                    onClick={() => navigate('/admin-dashboard')}
                    className="close-button"
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h5" component="h2" className="popup-title">
                    Employee Created Successfully
                </Typography>
                <Box className="employee-details">
                    {displayContent.map(item => (
                        <Typography className="employee-details-text">
                            <span className="employee-details-label">{`${item.label} : `}</span>{item.value}
                        </Typography>
                    ))}
                </Box>
                <Button
                    variant="contained"
                    onClick={onClose}
                    className="add-another-employee-btn"
                >
                    Add Another Employee
                </Button>
            </Box>
        </Modal>
    );
};

export default AddEmployeePopup; 