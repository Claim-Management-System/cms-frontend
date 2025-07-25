import React, { useState, useCallback } from 'react';
import { Button } from '@mui/material';
import UserTitle from '../../components/userTitle/UserTitle'
import ReceiptInfoForm from '../../components/receiptInfoForm/ReceiptInfoForm';
import ReceiptPreview from '../../components/receiptPreview/ReceiptPreview';
import './AddReq.css';
import type { FormType, OpdFormData } from '../../types';
import FormScanningPopup from '../../components/addRequestPopups/FormScanningPopup.tsx';
import FormSubmittedPopup from '../../components/addRequestPopups/FormSubmittedPopup.tsx';
import FormNotAcceptedPopup from '../../components/addRequestPopups/FormNotAcceptedPopup.tsx';
import Header from '../../components/Header.tsx';
import { useNavigate } from 'react-router-dom';
import { useError } from '../../context/errorContext.tsx';

const NewRequestOpd: React.FC = () => {
    const formType: FormType = "OUT PATIENT CLAIM FORM";
    const initialFormData: OpdFormData & { attachments: File[] } = {
        title: '',
        patientName: '',
        relationship: '',
        purposeOfVisit: '',
        expenseType: '',
        totalAmount: 0,
        attachments: [],
    };
    const [formData, setFormData] = useState<OpdFormData & { attachments: File[] }>(initialFormData);
    const [submitted, setSubmitted] = useState(false);
    const [popupState, setPopupState] = useState<'scanning' | 'submitted' | 'not-accepted' | 'none'>('none');
    const [resetPreview, setResetPreview] = useState(false);

    const navigate = useNavigate();
    const { setError } = useError();

    const isFormValid = useCallback(() => {
        const requiredFields: (keyof OpdFormData)[] = ['title', 'patientName', 'relationship', 'purposeOfVisit', 'expenseType', 'totalAmount'];
        const isFormFilled = requiredFields.every(field => {
            const value = formData[field];
            return value && String(value).trim() !== '';
        });
        const hasAttachments = formData.attachments.length > 0;
        return isFormFilled && hasAttachments;
    }, [formData]);

   
    const handleFormDataChange = (field: keyof OpdFormData, value: string) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = (files: File[]) => {
        setFormData((prev: any) => ({ ...prev, attachments: files }));
    };

    const submitForm = () => {
        setPopupState('scanning');

        
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setSubmitted(true);

        if (isFormValid()) {
            submitForm();
        } else {
            setError('Please fill out all required fields and upload at least one attachment.');
        }

        setSubmitted(false);
    };

    const handleResubmit = () => {
        if (isFormValid()) {
            submitForm();
        } else {
            setError('Please fill out all required fields and upload at least one attachment.');
            setPopupState('none');
        }
    };


     const handleClose = () => {
        setPopupState('none');
        setFormData(initialFormData);
        setSubmitted(false);
        setResetPreview(true);
    };

    return (
        <>
            <Header pageName='New Request / Misc' />
            <form className="new-request-container" onSubmit={handleSubmit} noValidate>
                <UserTitle mainText={formType} />

                <main className="main-body">
                    <div className="form-section">
                        <ReceiptInfoForm
                            formType={formType}
                            formData={formData}
                            onFormDataChange={(field: string, value: string) => handleFormDataChange(field as keyof OpdFormData, value)}
                            submitted={submitted}
                        />
                    </div>
                    <div className="preview-section">
                        <ReceiptPreview onImageUpload={handleImageUpload} submitted={submitted} reset={resetPreview} mode="upload" />
                        <p className="footer-note">
                            <span className="asterisk">*</span> Please ensure to attach all original receipts while submitting this form.
                        </p>
                    </div>
                </main>

                <div className="form-actions-container">
                    <Button variant="contained" color="primary" className="submit-button" type="submit">
                        Submit Form
                    </Button>
                </div>

                {popupState === 'scanning' && <FormScanningPopup />}
                {popupState === 'submitted' && <FormSubmittedPopup onViewHistory={() => navigate('/claim-history/outpatient')} onClose={handleClose} />}
                {popupState === 'not-accepted' && <FormNotAcceptedPopup onReview={() => setPopupState('none')} onResubmit={handleResubmit} />}
            </form>
        </>
    );
};

export default NewRequestOpd; 