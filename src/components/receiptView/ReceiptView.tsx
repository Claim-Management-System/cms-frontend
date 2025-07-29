import { FormControl, InputLabel, OutlinedInput } from '@mui/material';
import type { Claim } from '../../types';
import './ReceiptView.css';
import { STATUS } from '../../services/constantServices/constants';

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

    const fieldsToRender = [
        {
            label: "Title",
            value: formData?.title || '',
            condition: true
        },
        {
            label: "Relationship",
            value: formData?.relationship || '',
            condition: !!formData?.relationship
        },
        {
            label: "Item/Purpose",
            value: formData?.claim_type || '',
            condition: true
        },
        {
            label: "Description",
            value: formData?.description || '',
            condition: true,
            props: { multiline: true, rows: 4 }
        },
        {
            label: "Submitted Amount",
            value: String(formData?.submitted_amount || 0),
            condition: true
        },
        {
            label: "Approved Amount",
            value: String(formData?.approved_amount || 0),
            condition: formData?.status === STATUS.APPROVED
        },
        {
            label: "Reason for Edit",
            value: formData?.reason_for_edit || '',
            condition: formData?.status === STATUS.APPROVED && !!formData?.reason_for_edit
        },
        {
            label: "Reason for Rejection",
            value: formData?.reason_for_rejection || '',
            condition: formData?.status === STATUS.REJECTED
        }
    ];

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
                {fieldsToRender
                    .filter(field => field.condition)
                    .map(field => (
                        <InfoField
                            key={field.label}
                            label={field.label}
                            value={field.value}
                            {...field.props}
                        />
                    ))}
            </div>
        </div>
    );
};

export default ReceiptView;