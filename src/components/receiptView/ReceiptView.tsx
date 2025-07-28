import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import type { Claim } from '../../types';
import './ReceiptView.css';

interface ReceiptViewProps {
    formData: Claim | null;
}

interface InfoFieldProps {
    label: string;
    value: string;
    multiline?: boolean;
    rows?: number;
}

function ReceiptView({ formData }: ReceiptViewProps) {
    const localDateTime = new Date(formData?.updated_at!).toLocaleString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
    });

    const InfoField = ({ label, value, multiline = false, rows }: InfoFieldProps) => (
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

    return (
        <div>
            <div className="receipt-details-header">
                <div className="datetime-container">
                    <div className="datetime-box">{localDateTime}</div>
                </div>
                <span className={`status-chip ${formData?.status.toLowerCase()}`}>
                    {formData?.status}
                </span>
            </div>

            <div className="receipt-form-container">
                <InfoField label="Title" value={formData?.title!} />
                {formData?.relationship &&
                    <InfoField label="Relationship" value={formData.relationship} />
                }
                <InfoField label="Item/Purpose" value={formData?.claim_type!} />
                <InfoField label="Description" value={formData?.description!} multiline rows={4} />
                <InfoField label="Total Amount claimed" value={String(formData?.submitted_amount)} />
            </div>
        </div>
    );
};

export default ReceiptView; 