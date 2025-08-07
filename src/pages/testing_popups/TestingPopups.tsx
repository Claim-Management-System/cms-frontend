import { useState } from 'react';
import AddEmployeePopup from '../../components/popups/addEmployeePopup/AddEmployeePopup';
import FormNotAcceptedPopup from '../../components/popups/addRequestPopups/FormNotAcceptedPopup';
import FormScanningPopup from '../../components/popups/addRequestPopups/FormScanningPopup';
import FormSubmittedPopup from '../../components/popups/addRequestPopups/FormSubmittedPopup';
import ChangePasswordPopup from '../../components/popups/changePasswordPopup/ChangePasswordPopup';
import EditEmployeePopup from '../../components/popups/editEmployeePopup/EditEmployeePopup';
import AcceptPopup from '../../components/popups/viewFormPopups/AcceptPopup';
import DeclinePopup from '../../components/popups/viewFormPopups/DeclinePopup';
import EditPopup from '../../components/popups/viewFormPopups/EditPopup';
import './TestingPopups.css';

const TestingPopups = () => {
    const [open, setOpen] = useState(true);

    const handleClose = () => setOpen(false);

    const employeeData = {
        employeeId: '1234',
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123'
    };

    return (
        <div>
            <h1>Testing Popups</h1>
            
            {/* <AddEmployeePopup open={open} onClose={handleClose} employeeData={employeeData} /> */}
            
            {/* <FormNotAcceptedPopup open={open} onClose={handleClose} onReview={() => console.log('Review')} onResubmit={() => console.log('Resubmit')} /> */}
            
            {/* <FormScanningPopup open={open}/> */}
            
            {/* <FormSubmittedPopup open={open} onViewHistory={() => console.log('View History')} onClose={handleClose} /> */}

            {/* <ChangePasswordPopup open={open} onClose={handleClose} /> */}

            {/* <EditEmployeePopup open={open} onClose={handleClose} /> */}

            {/* <AcceptPopup
                open={open}
                onClose={handleClose}
                onAccept={() => console.log('Accepted')}
                employee_name="Jane Doe"
                employee_number={5678}
                totalAmount={1000}
            /> */}

            {/* <DeclinePopup
                open={open}
                onClose={handleClose}
                onReasonSelect={(reason) => console.log('Declined:', reason)}
                employee_name="Jane Doe"
                employee_number={5678}
                totalAmount={1000}
            /> */}

            <EditPopup
                open={open}
                onClose={handleClose}
                onEdit={(newAmount, reason) => console.log('Edited:', newAmount, reason)}
                formData={{}}
                employee_name="Jane Doe"
                employee_number={5678}
                totalAmount={1000}
            />
        </div>
    );
};

export default TestingPopups;
