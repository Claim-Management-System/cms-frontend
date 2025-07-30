import React, { useState, useEffect } from 'react';
import EmployeeInfo from '../../components/employeeInfo/EmployeeInfo';
import Header from '../../components/Header';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';
import './AddEmployee.css';
import type { SelectChangeEvent } from '@mui/material';
import {
    getInitialFormData,
    isFormValid,
    calculateAgeFromString,
    transformToEmployeeDetails,
    transformToUserCredentials,
} from '../../utils/AddEmployeeUtils';
import type { EmployeeInterface } from '../../types';


const AddEmployee: React.FC = () => {
    const [formData, setFormData] = useState<EmployeeInterface>(getInitialFormData());
    const [submitted, setSubmitted] = useState(false);
    const [validationError, setValidationError] = useState('');
   
    const [isLoading, setIsLoading] = useState(false);

    

    // Validate form when submitted state changes
    useEffect(() => {
        if (submitted) {
            if (!isFormValid(formData, 'create')) {
                setValidationError('Please fill out all required fields');
            } else {
                setValidationError('');
            }
        }
    }, [submitted, formData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        setFormData(prev => ({ ...prev, [name]: value }));
        
        if (name === 'dob' && value) {
            const age = calculateAgeFromString(value);
            setFormData(prev => ({ ...prev, age }));
        }
    };

    const handleSelectChange = (e: SelectChangeEvent<string>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value as any }));
    };

    const handleCancel = () => {
        setFormData(getInitialFormData());
        setSubmitted(false);
        setValidationError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        if (!isFormValid(formData, 'create')) {
            setValidationError('Please fill out all required fields');
            return;
        }

        setIsLoading(true);
        setValidationError('');

        try {
            // Transform data for API
            const employeeDetails = transformToEmployeeDetails(formData);
            const userCredentials = transformToUserCredentials(formData);

            console.log('Employee Details:', employeeDetails);
            console.log('User Credentials:', userCredentials);

            // TODO: Make API calls here
            // const employeeResponse = await createEmployee(employeeDetails);
            // const userResponse = await createUser(userCredentials);

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Success handling
            console.log('Employee created successfully');
            handleCancel(); // Reset form after successful submission
            
        } catch (error) {
            console.error('Failed to create employee:', error);
            setValidationError('Failed to create employee. Please try again.');
        } finally {
            setIsLoading(false);
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
                        {validationError && <p className="validation-error">{validationError}</p>}
                        <div className="buttons-wrapper">
                            <button 
                                type="button" 
                                className="cancel-btn" 
                                onClick={handleCancel}
                                disabled={isLoading}
                            >
                                Cancel
                                <BlockIcon sx={{ fontSize: 16, marginLeft: '8px' }} />
                            </button>
                            <button 
                                type="submit" 
                                className="submit-btn"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Creating...' : 'Submit'}
                                <DoneIcon sx={{ fontSize: 16, marginLeft: '8px' }} />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddEmployee;
