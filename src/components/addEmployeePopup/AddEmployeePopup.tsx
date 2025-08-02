import {
    Box,
    Button,
    Modal,
    Typography,
    IconButton,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import './AddEmployeePopup.css';

interface AddEmployeePopupProps {
    open: boolean;
    onClose: () => void;
    onNavigate: () => void;
    employeeData: {
        employeeId: string;
        name: string;
        email: string;
        password?: string;
    };
}

const AddEmployeePopup = ({ open, onClose, onNavigate, employeeData }: AddEmployeePopupProps) => {
    return (
        <Modal open={open} onClose={onClose}>
            <Box className="add-employee-popup">
                <IconButton
                    aria-label="close"
                    onClick={onNavigate}
                    className="close-button"
                >
                    <CloseIcon />
                </IconButton>
                <Typography variant="h5" component="h2" className="popup-title">
                    Employee Created Successfully
                </Typography>
                <Box className="employee-details">
                    <Typography className="employee-details-text"><span className="employee-details-label">Employee ID: </span>{employeeData.employeeId}</Typography>
                    <Typography className="employee-details-text"><span className="employee-details-label">Employee Name: </span>{employeeData.name}</Typography>
                    <Typography className="employee-details-text"><span className="employee-details-label">Email: </span>{employeeData.email}</Typography>
                    {employeeData.password && <Typography className="employee-details-text"><span className="employee-details-label">Password: </span>{employeeData.password}</Typography>}
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