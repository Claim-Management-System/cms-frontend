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
import { updateClaimStatus } from '../../services/dataServices/claimsHistory';
import { getClaimDetails } from '../../utils/ClaimDetailsUtils';
import { USER_ROLES, STATUS } from '../../services/constantServices/constants';
import {Done as DoneIcon, Edit as EditIcon, DoNotDisturb as DoNotDisturbIcon} from '@mui/icons-material';
import { Button } from '@mui/material';
import type { Claim, Employee } from '../../types';
import './ClaimDetails.css';


function ClaimDetails() {
    const [formData, setFormData] = useState<Claim | null>(null);
    const [images, setImages] = useState<string[]>([]);
    const [employeeDetails, setEmployeeDetails] = useState<Employee | undefined>(undefined);
    const [acceptPopupOpen, setAcceptPopupOpen] = useState(false);
    const [declinePopupOpen, setDeclinePopupOpen] = useState(false);
    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const { claimId } = useParams();
    const { user } = useAuth();
    const { setError } = useError();

    const employee_name = employeeDetails?.first_name + " " + employeeDetails?.last_name;

    const handleUpdate = async (body: object, successAction: () => void) => {
        try {
            await updateClaimStatus(claimId!, body);
            await fetchClaimAndEmployee(claimId!);
            successAction();
        } catch (error) {
            setError('Failed to update the claim.');
        }
    };

    const handleAccept = () => {
        const body = {
            status: STATUS.APPROVED,
            approved_amount: formData?.submitted_amount
        };
        handleUpdate(body, () => setAcceptPopupOpen(false));
    };

    const handleDecline = (reason: string) => {
        const body = {
            status: STATUS.REJECTED,
            reason_for_rejection: reason
        };
        handleUpdate(body, () => setDeclinePopupOpen(false));
    };

    const handleEdit = (newAmount: number, reason: string) => {
        const body = {
            status: STATUS.APPROVED,
            submitted_amount: formData?.submitted_amount,
            approved_amount: newAmount,
            reason_for_edit: reason
        };
        handleUpdate(body, () => setEditPopupOpen(false));
    };

    const fetchClaimAndEmployee = async (claimId: string) => {
        setIsLoading(true)

        try {
            const claimDetails = await getClaimDetails(claimId)

            setFormData(claimDetails.claimData)
            setImages(claimDetails.claimImages)
            setEmployeeDetails(claimDetails.employeeData)
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

    return !isLoading ? (
        <>
            <Header pageName='View Claim Details' />
            <div className="view-more-container">
                <div className="view-more-header">
                    <UserTitle
                        mainText={employee_name}
                    // subText={employeeDetails?.work_email!}
                    />
                    {user?.role === USER_ROLES.ADMIN && formData?.status === STATUS.PENDING && (
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

export default ClaimDetails;