import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useError } from '../../context/errorContext';
import Header from '../../components/Header';
import ReceiptView from '../../components/receiptView/ReceiptView';
import ReceiptPreview from '../../components/receiptPreview/ReceiptPreview';
import AcceptPopup from '../../components/popups/AcceptPopup';
import DeclinePopup from '../../components/popups/DeclinePopup';
import EditPopup from '../../components/popups/EditPopup';
import UserTitle from '../../components/userTitle/UserTitle';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import { getClaim, updateClaimStatus } from '../../services/dataServices/claimsHistory';
import { getEmployee } from '../../services/dataServices/employee';
import { Button } from '@mui/material';
import type { Claim, Employee } from '../../types';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import DoneIcon from '@mui/icons-material/Done';
import EditIcon from '@mui/icons-material/Edit';
import './ViewMore.css';

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
    const [isLoading, setIsLoading] = useState(true);

    const { claimId } = useParams();
    const { user } = useAuth();
    const { setError } = useError();

    const employee_name = employeeDetails?.first_name + " " + employeeDetails?.last_name;

    const handleAccept = async () => {
        try {
            const body = {
                status: 'approved',
                approved_amount: formData?.submitted_amount
            };
            await updateClaimStatus(claimId!, body);
            setAcceptPopupOpen(false);
        } catch (error) {
            setError('Failed to approve the claim.');
        }
    };

    const handleDecline = async (reason: string) => {
        try {
            const body = {
                status: 'rejected',
                reason_for_rejection: reason
            };
            await updateClaimStatus(claimId!, body);
            setDeclinePopupOpen(false);
        } catch (error) {
            setError('Failed to decline the claim.');
        }
    };

    const handleEdit = async (newAmount: number, reason: string) => {
        try {
            const body = {
                status: 'approved',
                submitted_amount: formData?.submitted_amount,
                approved_amount: newAmount,
                reason_for_edit: reason
            };
            await updateClaimStatus(claimId!, body);
            setEditPopupOpen(false);
        } catch (error) {
            setError('Failed to edit the claim.');
        }
    };

    const fetchClaimAndEmployee = async (claimId: string) => {
        try {
            setIsLoading(true)
            const data = await getClaim(claimId)
            setFormData(data.claims)

            const employee = await getEmployee(data.claims.employee_number)
            setEmployeeDetails(employee)
        } catch (error: any) {
            setError(error.message || 'Failed to fetch data!')
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        if (claimId) {
            fetchClaimAndEmployee(claimId)
        }
    }, [claimId])

    useEffect(() => {
        console.log(formData)
    }, [formData])


    return !isLoading ? (
        <>
            <Header pageName='View Claim Details' />
            <div className="view-more-container">
                <div className="view-more-header">
                    <UserTitle
                        mainText={employee_name}
                        // subText={employeeDetails?.work_email!}
                    />
                    {user?.role === 'admin' && formData?.status === 'pending' && (
                        <div className="admin-buttons-container">
                            <Button
                                className="decline-button"
                                onClick={() => setDeclinePopupOpen(true)}
                                endIcon={<DoNotDisturbIcon />}
                            >
                                Decline
                            </Button>
                            <Button
                                className="editing-button"
                                onClick={() => setEditPopupOpen(true)}
                                endIcon={<EditIcon />}
                            >
                                Edit and Accept
                            </Button>
                            <Button
                                className="accept-button"
                                onClick={() => setAcceptPopupOpen(true)}
                                endIcon={<DoneIcon />}
                            >
                                Accept
                            </Button>
                        </div>
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
        </>
    ) : (
        <LoadingScreen />
    )
};

export default ViewMore;