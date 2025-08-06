import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../context/authContext';
import { useError } from '../../context/errorContext';
import Header from '../../components/Header';
import ReceiptView from '../../components/receiptView/ReceiptView';
import ReceiptPreview from '../../components/receiptPreview/ReceiptPreview';
import AcceptPopup from '../../components/viewFormPopups/AcceptPopup';
import DeclinePopup from '../../components/viewFormPopups/DeclinePopup';
import EditPopup from '../../components/viewFormPopups/EditPopup';
import UserTitle from '../../components/userTitle/UserTitle';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import { downloadClaimImages, updateClaimStatus } from '../../services/dataServices/claimsHistory';
import { getClaimDetails } from '../../utils/ClaimDetailsUtils';
import { USER_ROLES, STATUS } from '../../services/constantServices/constants';
import { Done as DoneIcon, Edit as EditIcon, DoNotDisturb as DoNotDisturbIcon, Download as DownloadIcon } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import ActionButton from '../../components/actionButton/ActionButton';
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
    const [download, setDownload] = useState(false);

    const { claimId } = useParams();
    const { user } = useAuth();
    const { setError } = useError();

    const employee_name = employeeDetails?.first_name + " " + employeeDetails?.last_name;

    const handleUpdate = async (body: object, successAction: () => void) => {
        try {
            await updateClaimStatus(claimId!, body);
            await fetchClaimAndEmployee(claimId!, true);
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

    const fetchClaimAndEmployee = async (claimId: string, update = false) => {
        setIsLoading(true)

        try {
            const claimDetails = await getClaimDetails(claimId, update)

            setFormData(claimDetails.claimData)
            setImages(claimDetails.claimImages)
            setEmployeeDetails(claimDetails.employeeData)
        } catch (error) {
            setError('No data to show!')
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        if (claimId) {
            fetchClaimAndEmployee(claimId)
        }
    }, [claimId])

    const downloadClaim = async () => {
        setDownload(true);

        try {
            await downloadClaimImages(claimId!)
        } catch (error) {
            setError("Failed to download an image")
        } finally {
            setDownload(false);
        }
    }

    if(isLoading) {
        return <LoadingScreen />
    }

    if (!formData || !images) {
        return (
            <div>
                <Header pageName="View Claim Details" />
                <h2 style={{ textAlign: 'center', marginTop: '2rem' }}>No Claim Details data available.</h2>
            </div>
        );
    }

    return (
        <>
            <Header pageName='View Claim Details' />
            <div className="view-more-container">
                <div className="view-more-header">
                    <UserTitle
                        mainText={employee_name}
                        subText={employeeDetails?.work_email!}
                    />
                    {user?.role === USER_ROLES.ADMIN && formData?.status === STATUS.PENDING && (
                        <div className="admin-buttons-container">
                            <ActionButton
                                className="secondary-page-button page-button"
                                handleEvent={() => setDeclinePopupOpen(true)}
                                endIcon={<DoNotDisturbIcon />}
                                placeholder="Decline"
                            />
                            <ActionButton
                                className="primary-button page-button"
                                handleEvent={downloadClaim}
                                disabled={download}
                                endIcon={download ? null : <DownloadIcon />}
                                placeholder={download ? <CircularProgress size={24} color="inherit" /> : 'Download'}
                            />
                            <ActionButton
                                className="primary-button page-button"
                                handleEvent={() => setEditPopupOpen(true)}
                                endIcon={<EditIcon />}
                                placeholder="Edit and Accept"
                            />
                            <ActionButton
                                className="primary-button page-button"
                                handleEvent={() => setAcceptPopupOpen(true)}
                                endIcon={<DoneIcon />}
                                placeholder="Accept"
                            />
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
    )
};

export default ClaimDetails;
