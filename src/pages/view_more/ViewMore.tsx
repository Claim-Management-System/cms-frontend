import React, { useState } from 'react';
import ReceiptView from '../../components/receiptView/ReceiptView';
import ReceiptPreview from '../../components/receiptPreview/ReceiptPreview';
import Buttons from '../../components/buttons/Buttons';
import AcceptPopup from '../../components/popups/AcceptPopup';
import DeclinePopup from '../../components/popups/DeclinePopup';
import EditPopup from '../../components/popups/EditPopup';
import { type FormType, type MiscFormData, type OpdFormData } from '../../types';
import UserTitle from '../../components/userTitle/UserTitle';
import './ViewMore.css';

interface ViewMoreProps {
    formType: FormType;
    formData: MiscFormData | OpdFormData;
    date: string;
    time: string;
    status: string;
    images: string[];
    userRole?: string;
    employeeName?: string;
    employeeId?: string;
    employeeEmail?: string;
    totalAmount?: number;
    onAccept?: () => void;
    onDecline?: (reason: string) => void;
    onEdit?: (newAmount: number, reason: string) => void;
}

const ViewMore: React.FC<ViewMoreProps> = ({
    formType,
    formData,
    date,
    time,
    status,
    images,
    userRole,
    employeeName = '',
    employeeEmail = '',
    employeeId = '',
    totalAmount = 0,
    onAccept,
    onDecline,
    onEdit
}) => {
    const [acceptPopupOpen, setAcceptPopupOpen] = useState(false);
    const [declinePopupOpen, setDeclinePopupOpen] = useState(false);
    const [editPopupOpen, setEditPopupOpen] = useState(false);

    const handleAcceptClick = () => {
        setAcceptPopupOpen(true);
    };

    const handleDeclineClick = () => {
        setDeclinePopupOpen(true);
    };

    const handleEditClick = () => {
        setEditPopupOpen(true);
    };

    const handleAcceptPopupClose = () => {
        setAcceptPopupOpen(false);
    };

    const handleDeclinePopupClose = () => {
        setDeclinePopupOpen(false);
    };

    const handleEditPopupClose = () => {
        setEditPopupOpen(false);
    };

    const handleAccept = () => {
        console.log('Form Data:', formData);
        console.log('Accept Approved');
        onAccept?.();
        setAcceptPopupOpen(false);
    };

    const handleReasonSelect = (reason: string) => {
        onDecline?.(reason);
        setDeclinePopupOpen(false);
    };

    const handleEdit = (newAmount: number, reason: string) => {
        onEdit?.(newAmount, reason);
        setEditPopupOpen(false);
    };

    return (
        <div className="view-more-container">
            <div className="view-more-header">
                {employeeName && (
                    <UserTitle 
                        mainText={employeeName} 
                        subText={employeeEmail}
                    />
                )}
                {userRole === 'admin' && (
                    <Buttons
                        onDeclineClick={handleDeclineClick}
                        onAcceptClick={handleAcceptClick}
                        onEditClick={handleEditClick}
                    />
                )}
            </div>
            <div className="left-panel">
                <ReceiptView
                    formType={formType}
                    formData={formData}
                    date={date}
                    time={time}
                    status={status}
                />
            </div>
            <div className="right-panel">
                <ReceiptPreview mode="view" images={images} />
            </div>
            
            <AcceptPopup
                open={acceptPopupOpen}
                onClose={handleAcceptPopupClose}
                employeeName={employeeName}
                employeeId={employeeId}
                totalAmount={totalAmount}
                onAccept={handleAccept}
            />
            
            <DeclinePopup
                open={declinePopupOpen}
                onClose={handleDeclinePopupClose}
                employeeName={employeeName}
                employeeId={employeeId}
                totalAmount={totalAmount}
                onReasonSelect={handleReasonSelect}
            />

            <EditPopup
                open={editPopupOpen}
                onClose={handleEditPopupClose}
                employeeName={employeeName}
                employeeId={employeeId}
                totalAmount={totalAmount}
                onEdit={handleEdit}
                formData={formData}
            />
        </div>
    );
};

export default ViewMore; 