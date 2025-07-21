import React, { useState } from 'react';
import ReceiptView from '../../components/receiptView/ReceiptView';
import ReceiptPreview from '../../components/receiptPreview/ReceiptPreview';
import Buttons from '../../components/buttons/Buttons';
import AcceptPopup from '../../components/popups/AcceptPopup';
import DeclinePopup from '../../components/popups/DeclinePopup';
import { type FormType, type MiscFormData, type OpdFormData } from '../../types';
import UserTitle from '../../components/userTitle/UserTitle';
import './ViewMore.css';

/**
 * Example usage with admin functionality:
 * 
 * <ViewMore
 *   formType="misc"
 *   formData={formData}
 *   date="2024-01-15"
 *   time="10:30 AM"
 *   status="pending"
 *   images={["image1.jpg", "image2.jpg"]}
 *   userRole="admin"
 *   employeeName="John Doe"
 *   employeeId="EMP001"
 *   totalAmount={1250.00}
 *   onAccept={() => console.log('Request accepted')}
 *   onDecline={(reason) => console.log('Request declined:', reason)}
 *   onForwardToFinance={() => console.log('Forwarded to finance')}
 * />
 */

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
    onForwardToFinance?: () => void;
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
    onForwardToFinance
}) => {
    const [acceptPopupOpen, setAcceptPopupOpen] = useState(false);
    const [declinePopupOpen, setDeclinePopupOpen] = useState(false);

    const handleAcceptClick = () => {
        setAcceptPopupOpen(true);
    };

    const handleDeclineClick = () => {
        setDeclinePopupOpen(true);
    };

    const handleAcceptPopupClose = () => {
        setAcceptPopupOpen(false);
    };

    const handleDeclinePopupClose = () => {
        setDeclinePopupOpen(false);
    };

    const handleForwardToFinance = () => {
        onForwardToFinance?.();
        setAcceptPopupOpen(false);
        onAccept?.();
    };

    const handleReasonSelect = (reason: string) => {
        onDecline?.(reason);
        setDeclinePopupOpen(false);
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
                onForwardToFinance={handleForwardToFinance}
            />
            
            <DeclinePopup
                open={declinePopupOpen}
                onClose={handleDeclinePopupClose}
                employeeName={employeeName}
                employeeId={employeeId}
                totalAmount={totalAmount}
                onReasonSelect={handleReasonSelect}
            />
        </div>
    );
};

export default ViewMore; 