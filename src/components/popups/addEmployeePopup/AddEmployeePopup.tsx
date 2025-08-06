import { useNavigate } from 'react-router-dom';
import { Box, Modal, Typography, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import ActionButton from '../../actionButton/ActionButton';
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
                <Typography variant="h5" component="h2" className="popup-title-add-employee">
                    Employee Created Successfully
                </Typography>
                <Box className="employee-details">
                    {displayContent.map(item => (
                        <Typography className="employee-details-text" key={item.label}>
                            <span className="employee-details-label" >{`${item.label} : `}</span>{item.value}
                        </Typography>
                    ))}
                </Box>
                <ActionButton
                    variant="contained"
                    handleEvent={onClose}
                    className="popup-button primary-button"
                    placeholder='Add Another Employee'
                />
            </Box>
        </Modal>
    );
};

export default AddEmployeePopup;
