import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../Header';
import ReceiptInfoForm from '../receiptInfoForm/ReceiptInfoForm';
import ReceiptPreview from '../receiptPreview/ReceiptPreview';
import FormScanningPopup from '../popups/addRequestPopups/FormScanningPopup';
import FormSubmittedPopup from '../popups/addRequestPopups/FormSubmittedPopup';
import FormNotAcceptedPopup from '../popups/addRequestPopups/FormNotAcceptedPopup';
import { useError } from '../../context/errorContext';
import { useAuth } from '../../context/authContext';
import { postNewRequest } from '../../services/dataServices/claimsRequest';
import type { FormType, FormData, newAddRequest } from '../../types';
import ActionButton from '../actionButton/ActionButton';
import './NewRequest.css';

interface NewRequestProps {
    formType: 'misc' | 'opd';
}

type GenericFormData = FormData & { attachments: File[] };

const pageConfig = {
    misc: {
        headerText: 'New Request / Misc Expense Form',
        formTitle: "MISCELLANEOUS EXPENSE FORM" as FormType,
        initialFormData: { title: '', itemTypeId: '', description: '', relationship: 'Self', totalAmount: 0, attachments: [] },
        requiredFields: ['title', 'itemTypeId', 'description', 'totalAmount'],
        successNavPath: '/claim-history/miscellaneous',
    },
    opd: {
        headerText: 'New Request / OPD Expense Form',
        formTitle: "OUT PATIENT EXPENSE FORM" as FormType,
        initialFormData: { title: '', itemTypeId: '', description: '', relationship: '', totalAmount: 0, attachments: [] },
        requiredFields: ['title', 'relationship', 'description', 'itemTypeId', 'totalAmount'],
        successNavPath: '/claim-history/outpatient',
    },
};

export default function NewRequest({ formType }: NewRequestProps) {
    const config = pageConfig[formType];

    const [formData, setFormData] = useState<GenericFormData>(config.initialFormData);
    const [popupState, setPopupState] = useState<'scanning' | 'submitted' | 'not-accepted' | 'none'>('none');
    const [submitted, setSubmitted] = useState(false);
    const [resetPreview, setResetPreview] = useState(false);

    const navigate = useNavigate();
    const { setError } = useError();
    const { user } = useAuth();

    const isFormValid = useCallback(() => {
        const isFormFilled = config.requiredFields.every(field => {
            const value = formData[field as keyof typeof formData];
            return value && String(value).trim() !== '';
        });
        const hasAttachments = formData.attachments.length > 0;
        return isFormFilled && hasAttachments;
    }, [formData, config.requiredFields]);

    const handleFormDataChange = (field: string, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleImageUpload = (files: File[]) => {
        setFormData(prev => ({ ...prev, attachments: files }));
    };

    const submitForm = async () => {
        setPopupState('scanning');

        const myFormData: newAddRequest = {
            user_id: user?.id!,
            employee_number: user?.employee_number!,
            claim_type_id: formData.itemTypeId,
            title: formData.title,
            description: formData.description,
            relationship: formData.relationship,
            submitted_amount: formData.totalAmount,
            month: new Date().toLocaleString('default', { month: 'long' }),
            images: formData.attachments
        };

        try {
            await postNewRequest(myFormData);
            setPopupState('submitted');
            setResetPreview(false);
        } catch (error: any) {
            setError(error.message);
            setPopupState('not-accepted');
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setSubmitted(true);
        if (isFormValid()) {
            submitForm();
        } else {
            setError('Please fill out all required fields and upload at least one attachment.');
            setSubmitted(false);
        }
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
        setFormData(config.initialFormData);
        setSubmitted(false);
        setResetPreview(true);
    };

    return (
        <>
            <Header pageName={config.headerText} />
            <form className="new-request-container" onSubmit={handleSubmit} noValidate>
                <main className="main-body">
                    <div className="form-section">
                        <ReceiptInfoForm
                            formType={config.formTitle}
                            formData={formData}
                            onFormDataChange={handleFormDataChange}
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

                <ActionButton
                    variant="contained"
                    color="primary"
                    className="page-button primary-button"
                    type="submit"
                    placeholder='Submit Form'
                    handleEvent={() => { }}
                />

                {
                    popupState === 'scanning' &&
                    <FormScanningPopup />
                }
                {
                    popupState === 'submitted' &&
                    <FormSubmittedPopup onViewHistory={() => navigate(config.successNavPath)} onClose={handleClose} />
                }
                {
                    popupState === 'not-accepted' &&
                    <FormNotAcceptedPopup onReview={() => setPopupState('none')} onResubmit={handleResubmit} />
                }
            </form>
        </>
    );
}
