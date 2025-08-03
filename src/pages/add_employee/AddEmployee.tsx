import React, { useState } from 'react';
import EmployeeInfo from '../../components/employeeInfo/EmployeeInfo';
import Header from '../../components/Header';
import {
    getInitialFormData,
    isFormValid,
    calculateAge,
    transformToEmployeeDetails,
    transformToUserCredentials,
} from '../../utils/AddEmployeeUtils';
import AddEmployeePopup from '../../components/addEmployeePopup/AddEmployeePopup';
import { useError } from '../../context/errorContext';
import { createEmployee, createUser } from '../../services/dataServices/employee';
import { EMPLOYEE_INFO_MODE } from '../../services/constantServices/constants';
import type { EmployeeInterface } from '../../types';
import { type SelectChangeEvent, CircularProgress } from '@mui/material';
import { Block as BlockIcon, Done as DoneIcon } from '@mui/icons-material';
import './AddEmployee.css';

interface NewEmployeeData {
    employeeId: string;
    name: string;
    email: string;
    password?: string;
}

export default function AddEmployee() {
    const [formData, setFormData] = useState<EmployeeInterface>(getInitialFormData());
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newEmployeeData, setNewEmployeeData] = useState<NewEmployeeData | null>(null);
    const { setError } = useError();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'dob' && value) {
            const age = calculateAge(value);
            setFormData(prev => ({ ...prev, age }));
        }
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCancel = () => {
        setFormData(getInitialFormData());
        setSubmitted(false);
    };

    const handlePopupClose = () => {
        setIsPopupOpen(false);
        handleCancel();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        if (!isFormValid(formData, EMPLOYEE_INFO_MODE.CREATE)) {
            setError('Please fill out all required fields');
            return;
        }

        setIsLoading(true);

        try {
            const employeeDetails = transformToEmployeeDetails(formData);
            const userCredentials = transformToUserCredentials(formData);

            await createEmployee(employeeDetails);
            await createUser(userCredentials);

            setNewEmployeeData({
                employeeId: formData.employeeId,
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                password: userCredentials.password,
            });
            setIsPopupOpen(true);
        } catch (error) {
            setError('Failed to create employee. Please try again.');
        } finally {
            setIsLoading(false);
            setSubmitted(false);
        }
    };

    return (
        <>
            <Header pageName="Add New Employee" />
            <div className="add-employee-container">
                <form onSubmit={handleSubmit} noValidate>
                    <EmployeeInfo
                        mode="create"
                        formData={formData}
                        onFormChange={handleChange}
                        onSelectChange={handleSelectChange}
                        submitted={submitted}
                    />
                    <div className="form-actions">
                        <div className="buttons-wrapper">
                            <button
                                type="button"
                                className="cancel-btn"
                                onClick={handleCancel}
                                disabled={isLoading}
                            >
                                Cancel
                                <BlockIcon className='icon' />
                            </button>
                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    <>
                                        Submit
                                        <DoneIcon className='icon' />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            {newEmployeeData && (
                <AddEmployeePopup
                    open={isPopupOpen}
                    onClose={handlePopupClose}
                    employeeData={newEmployeeData}
                />
            )}
        </>
    );
};