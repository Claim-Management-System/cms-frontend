import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import UserTitle from '../../components/userTitle/UserTitle'
import ReceiptInfoForm from '../../components/receiptInfoForm/ReceiptInfoForm';
import ReceiptPreview from '../../components/receiptPreview/ReceiptPreview';
import Header from '../../components/Header.tsx';
import FormScanningPopup from '../../components/addRequestPopups/FormScanningPopup.tsx';
import FormSubmittedPopup from '../../components/addRequestPopups/FormSubmittedPopup.tsx';
import FormNotAcceptedPopup from '../../components/addRequestPopups/FormNotAcceptedPopup.tsx';
import { useError } from '../../context/errorContext.tsx';
import { useAuth } from '../../context/authContext.tsx';
import { postNewRequest } from '../../services/dataServices/claimsRequest.ts';
import type { FormType, MiscFormData } from '../../types';
import './AddReq.css';

function NewRequestMisc() {
    const formType: FormType = "MISCELLANEOUS EXPENSE FORM";
    const initialFormData: MiscFormData & { attachments: File[] } = {
        title: '',
        itemType: '',
        description: '',
        totalAmount: '',
        attachments: [],
    };

    const [formData, setFormData] = useState<(MiscFormData & { attachments: File[] })>(initialFormData);
    const [popupState, setPopupState] = useState<'scanning' | 'submitted' | 'not-accepted' | 'none'>('none');
    const [submitted, setSubmitted] = useState(false);
    const [resetPreview, setResetPreview] = useState(false);

    const navigate = useNavigate()
    const { setError } = useError();
    const { user } = useAuth();

    const checkIsFormValid = useCallback(() => {
        const requiredFields: (keyof MiscFormData)[] = ['title', 'itemType', 'description', 'totalAmount'];
        const isFormFilled = requiredFields.every(field => {
            const value = formData[field];
            return value && String(value).trim() !== '';
        });
        const hasAttachments = formData.attachments.length > 0;
        return isFormFilled && hasAttachments;
    }, [formData]);

    const handleFormDataChange = (field: keyof MiscFormData, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = (files: File[]) => {
        setFormData(prev => ({ ...prev, attachments: files }));
    };

    const submitForm = async () => {
        setPopupState('scanning');

        const myFormData = {
            user_id: user?.id,
            employee_number: user?.employeeId || 1004,
            claim_type_id: 1,
            title: formData.title,
            description: formData.description,
            relationship: 'Other',
            submitted_amount: formData.totalAmount,
            month: new Date().toLocaleString('default', { month: 'long' }),
            images: formData.attachments
        };

        try {
            const response = await postNewRequest(myFormData)
            if (response.status >= 200) {
                setPopupState('submitted');
            } else {
                setPopupState('not-accepted');
            }
            setResetPreview(false);
        } catch (error: any) {
            setError(error.message)
        } finally {
            setPopupState('none')
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setSubmitted(true);

        if (checkIsFormValid()) {
            submitForm();
        } else {
            setError('Please fill out all required fields and upload at least one attachment.');
        }

        setSubmitted(false);
    };

    const handleResubmit = () => {
        if (checkIsFormValid()) {
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
                <UserTitle
                    mainText={formType}
                    subText="Shane Hussain Naqvi - Director"
                />

                <main className="main-body">
                    <div className="form-section">
                        <ReceiptInfoForm
                            formType={formType}
                            formData={formData}
                            onFormDataChange={(field: string, value: string) => handleFormDataChange(field as keyof MiscFormData, value)}
                            submitted={submitted}
                        />
                    </div>
                    <div className="preview-section">
                        <ReceiptPreview onImageUpload={handleImageUpload} submitted={submitted} reset={resetPreview} />
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
                {
                    popupState === 'submitted' &&
                    <FormSubmittedPopup
                        onViewHistory={() => navigate('/claim-history/miscellaneous')}
                        onClose={handleClose}
                    />
                }
                {
                    popupState === 'not-accepted' &&
                    <FormNotAcceptedPopup
                        onReview={() => setPopupState('none')}
                        onResubmit={handleResubmit}
                    />
                }
            </form>
        </>
    );
};

export default NewRequestMisc;