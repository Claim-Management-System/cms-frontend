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
import { useError } from '../../context/errorContext';
import { createEmployee, createUser } from '../../services/dataServices/employee';
import type { EmployeeInterface } from '../../types';
import { type SelectChangeEvent, CircularProgress } from '@mui/material';
import { Block as BlockIcon, Done as DoneIcon } from '@mui/icons-material';
import './AddEmployee.css';


export default function AddEmployee() {
    const [formData, setFormData] = useState<EmployeeInterface>(getInitialFormData());
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        if (!isFormValid(formData, 'create')) {
            setError('Please fill out all required fields');
            return;
        }

        setIsLoading(true);

        try {
            const employeeDetails = transformToEmployeeDetails(formData);
            const userCredentials = transformToUserCredentials(formData);

            const employeeResponse = await createEmployee(employeeDetails);
            const userResponse = await createUser(userCredentials);

            console.log('Employee Details:', employeeResponse);
            console.log('User Credentials:', userResponse);

            handleCancel();
        } catch (error) {
            console.log(error)
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
        </>
    );
};