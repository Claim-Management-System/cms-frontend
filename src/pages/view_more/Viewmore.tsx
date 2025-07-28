import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useError } from '../../context/errorContext';
import ReceiptView from '../../components/receiptView/ReceiptView';
import ReceiptPreview from '../../components/receiptPreview/ReceiptPreview';
import Buttons from '../../components/buttons/Buttons';
import AcceptPopup from '../../components/popups/AcceptPopup';
import DeclinePopup from '../../components/popups/DeclinePopup';
import EditPopup from '../../components/popups/EditPopup';
import UserTitle from '../../components/userTitle/UserTitle';
import { getClaim } from '../../services/dataServices/claimsHistory';
import { getEmployee } from '../../services/dataServices/employee';
import './ViewMore.css';
import type { Claim, Employee } from '../../types';


const images = [
    "https://i.pinimg.com/564x/34/7b/40/347b40a091f421e63e060bd22e6e1b86.jpg",
    "https://docelf.com/images/templates/word_simple_receipt_template.png"

];

function ViewMore() {
    const [formData, setFormData] = useState<Claim | null>(null)
    const [employeeDetails, setEmployeeDetails] = useState<Employee | null>(null)
    const [acceptPopupOpen, setAcceptPopupOpen] = useState(false);
    const [declinePopupOpen, setDeclinePopupOpen] = useState(false);
    const [editPopupOpen, setEditPopupOpen] = useState(false);

    const { claimId } = useParams()
    const { user } = useAuth();
    const { setError } = useError();

    const employee_name = employeeDetails?.first_name + " " + employeeDetails?.last_name;

    const handleAccept = () => {
        console.log('Accept Approved');
        setAcceptPopupOpen(false);
    };

    const handleDecline = (reason: string) => {
        console.log('Request declined by admin. Reason:', reason);
        setDeclinePopupOpen(false);
    };

    const handleEdit = (newAmount: number, reason: string) => {
        const updatedData = {
            ...formData,
            totalAmount: newAmount.toString(),
        };
        console.log('Request edited by admin. Reason:', reason, 'New Data:', updatedData);
        setEditPopupOpen(false);
    };

    const fetchClaimAndEmployee = async (claimId: string) => {
        try {
            const data = await getClaim(claimId)
            setFormData(data.claims)

            const employee = await getEmployee(data.claims.employee_number)
            setEmployeeDetails(employee)
        } catch (error: any) {
            setError(error.message || 'Failed to fetch data!')
        }
    }

    useEffect(() => {
        if (claimId) {
            fetchClaimAndEmployee(claimId)
        }
    }, [claimId])

    // useEffect(() => {
    //     console.log(formData)
    // }, [formData])

    useEffect(() => {
        console.log(employeeDetails)
    }, [employeeDetails])

    return (
        <div className="view-more-container">
            <div className="view-more-header">
                <UserTitle
                    mainText={employee_name}
                    // subText={employeeDetails?.work_email!}
                />
                {user?.role === 'admin' && formData?.status === 'pending' && (
                    <Buttons
                        onAcceptClick={() => setAcceptPopupOpen(true)}
                        onDeclineClick={() => setDeclinePopupOpen(true)}
                        onEditClick={() => setEditPopupOpen(true)}
                    />
                )}
            </div>

            <div className="left-panel">
                <ReceiptView formData={formData} />
            </div>
            <div className="right-panel">
                <ReceiptPreview mode="view" images={images} />
            </div>
         
            <AcceptPopup
                open={acceptPopupOpen}
                onClose={() => setAcceptPopupOpen(false)}
                onAccept={handleAccept}
                totalAmount={formData?.submitted_amount!}
                employee_name={employee_name}
                employee_number={employeeDetails?.employee_number!}
            />
            
            <DeclinePopup
                open={declinePopupOpen}
                onClose={() => setDeclinePopupOpen(false)}
                onReasonSelect={handleDecline}
                totalAmount={formData?.submitted_amount!}
                employee_name={employee_name}
                employee_number={employeeDetails?.employee_number!}
            />

            <EditPopup
                open={editPopupOpen}
                onClose={() => setEditPopupOpen(false)}
                onEdit={handleEdit}
                totalAmount={formData?.submitted_amount!}
                formData={formData}
                employee_name={employee_name}
                employee_number={employeeDetails?.employee_number!}
            />
        </div>
    );
};

export default ViewMore; 