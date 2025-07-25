import React, { useState, useEffect, useCallback } from 'react';
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
    const [error, setError] = useState('');
    const [popupState, setPopupState] = useState<'scanning' | 'submitted' | 'not-accepted' | 'none'>('none');
    const [resetPreview, setResetPreview] = useState(false);

    const isFormValid = useCallback(() => {
        const requiredFields: (keyof OpdFormData)[] = ['title', 'patientName', 'relationship', 'purposeOfVisit', 'expenseType', 'totalAmount'];
        const isFormFilled = requiredFields.every(field => {
            const value = formData[field];
            return value && String(value).trim() !== '';
        });
        const hasAttachments = formData.attachments.length > 0;
        return isFormFilled && hasAttachments;
    }, [formData]);

    useEffect(() => {
        if (submitted) {
            if (isFormValid()) {
                setError('');
            } else {
                setError('Please fill out all required fields and upload at least one attachment.');
            }
        }
    }, [formData, submitted, isFormValid]);


    const handleFormDataChange = (field: keyof OpdFormData, value: string) => {
        setFormData((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = (files: File[]) => {
        setFormData((prev: any) => ({ ...prev, attachments: files }));
    };

    const resetForm = () => {
        setFormData(initialFormData);
        setSubmitted(false);
        setError('');
        setResetPreview(true);
    };

    const submitForm = () => {
        console.log('Submitting Out-Patient Claim Form:', formData);
        setPopupState('scanning');

        // Simulate API call
        setTimeout(() => {
            // This is where the logic for which popup to show based on API response will be.
            // For now, we'll randomly choose one to simulate success/failure.
            const isSuccess = Math.random() > 0.5;
            if (isSuccess) {
                setPopupState('submitted');
            } else {
                setPopupState('not-accepted');
            }
            setResetPreview(false);
        }, 2000);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setSubmitted(true);

        if (isFormValid()) {
            submitForm();
        } else {
            setError('Please fill out all required fields and upload at least one attachment.');
        }
    };

    const handleReviewRequest = () => {
        setPopupState('none');
    };

    const handleResubmit = () => {
        if (isFormValid()) {
            submitForm();
        } else {
            setError('Please fill out all required fields and upload at least one attachment.');
            setPopupState('none');
        }
    };

    const handleViewHistory = () => {
        // This should navigate to the view claim history screen.
        // Since that screen is not made yet, this is a placeholder.
        console.log("Navigating to View Claim History page...");
    };

    const handleClose = () => {
        setPopupState('none');
        resetForm();
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
                    {error && <p className="error-message">{error}</p>}
                </div>
                {popupState === 'scanning' && <FormScanningPopup />}
                {popupState === 'submitted' && <FormSubmittedPopup onViewHistory={handleViewHistory} onClose={handleClose} />}
                {popupState === 'not-accepted' && <FormNotAcceptedPopup onReview={handleReviewRequest} onResubmit={handleResubmit} />}
            </form>
        </>
    );
};

export default NewRequestOpd; 