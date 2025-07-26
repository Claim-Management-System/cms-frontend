import React from 'react';
import {
    FormControl,
    InputLabel,
    OutlinedInput,
} from '@mui/material';
import './ReceiptView.css';
import { type FormType } from '../../types';
import type { MiscFormData, OpdFormData } from '../../types';

interface ReceiptViewProps {
    formType: FormType;
    formData: MiscFormData | OpdFormData;
    date: string;
    time: string;
    status: string;
}

const InfoField: React.FC<{ label: string; value: string; multiline?: boolean; rows?: number }> = ({ label, value, multiline = false, rows }) => (
    <FormControl fullWidth margin="normal" className="custom-form-control">
        <InputLabel shrink required>{label}</InputLabel>
        <OutlinedInput
            value={value}
            readOnly
            label={label}
            notched
            multiline={multiline}
            rows={rows}
        />
    </FormControl>
);


const ReceiptView: React.FC<ReceiptViewProps> = ({ formType, formData, date, time, status }) => {

    const renderMiscExpenseFields = () => {
        const data = formData as MiscFormData;
        return (
            <>
                <InfoField label="Title" value={data.title} />
                <InfoField label="Item/Purpose" value={data.itemType} />
                {data.itemType === 'Other' && (
                    <InfoField label="Specify Other" value={data.otherItemType ?? ''} />
                )}
                <InfoField label="Description" value={data.description} multiline rows={4} />
            </>
        );
    }

    const renderOutPatientClaimFields = () => {
        const data = formData as OpdFormData;
        return (
            <>
                <InfoField label="Title" value={data.title} />
                <InfoField label="Patient's Name" value={data.patientName} />
                <InfoField label="Relationship" value={data.relationship} />
                <InfoField label="Purpose of Visit" value={data.purposeOfVisit} />
                {data.purposeOfVisit === 'Other' && (
                    <InfoField label="Specify Other" value={data.otherPurposeOfVisit ?? ''} />
                )}
                <InfoField label="Specify the type of expense" value={data.expenseType} />
            </>
        )
    };

    return (
        <div>
            <div className="receipt-details-header">
                <div className="datetime-container">
                    <div className="datetime-box">{date}</div>
                    <div className="datetime-box">{time}</div>
                </div>
                <span className={`status-chip ${status.toLowerCase()}`}>
                    {status}
                </span>
            </div>

            <div className="receipt-form-container">
                {formType === "MISCELLANEOUS EXPENSE FORM" ? renderMiscExpenseFields() : renderOutPatientClaimFields()}
                <InfoField label="Total Amount claimed in numbers" value={formData.totalAmount} />
            </div>
        </div>
    );
};

export default ReceiptView; 