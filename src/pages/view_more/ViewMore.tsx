import React from 'react';
import ReceiptView from '../../components/receiptView/ReceiptView';
import ReceiptPreview from '../../components/receiptPreview/ReceiptPreview';
import { type FormType, type MiscFormData, type OpdFormData } from '../../types';
import './ViewMore.css';

interface ViewMoreProps {
    formType: FormType;
    formData: MiscFormData | OpdFormData;
    date: string;
    time: string;
    status: string;
    images: string[];
}

const ViewMore: React.FC<ViewMoreProps> = ({
    formType,
    formData,
    date,
    time,
    status,
    images
}) => {
    return (
        <div className="view-more-container">
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
        </div>
    );
};

export default ViewMore; 