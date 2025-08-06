import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeInfo from '../../components/employeeInfo/EmployeeInfo';
import Header from '../../components/Header';
import LoadingScreen from '../../components/loadingScreen/LoadingScreen';
import {
    getInitialFormData,
    isFormValid,
    calculateAge,
    transformToEmployeeDetails,
    transformToUserCredentials,
    transformIntoFormField,
} from '../../utils/AddEmployeeUtils';
import { useError } from '../../context/errorContext';
import { updateEmployee, updateUser, getEmployee, getUser } from '../../services/dataServices/employee';
import { EMPLOYEE_INFO_MODE } from '../../services/constantServices/constants';
import type { EmployeeInterface } from '../../types';
import { type SelectChangeEvent, CircularProgress } from '@mui/material';
import { Done as DoneIcon } from '@mui/icons-material';
import EditEmployeePopup from '../../components/editEmployeePopup/EditEmployeePopup';
import ActionButton from '../../components/actionButton/ActionButton';
import './EditEmployee.css';


function EditProfile() {
    const [formData, setFormData] = useState<EmployeeInterface>(getInitialFormData());
    const [submitted, setSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [pageLoading, setPageLoading] = useState(true);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const { setError } = useError();
    const { employeeId } = useParams();

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);

        if (!isFormValid(formData, EMPLOYEE_INFO_MODE.EDIT)) {
            setError('Please fill out all required fields');
            return;
        }

        setIsLoading(true);

        try {
            const employeeDetails = transformToEmployeeDetails(formData);
            const userCredentials = transformToUserCredentials(formData);

            await updateEmployee(employeeDetails, Number(formData.employeeId));
            await updateUser(userCredentials, formData.userId!);
            setIsPopupOpen(true);

        } catch (error) {
            setError('Failed to Update an employee. Please try again.');
        } finally {
            setIsLoading(false);
            setSubmitted(false);
        }
    };

    const fetchEmployeeProfileDetails = async (employeeId: number) => {
        setPageLoading(true);

        try {
            const employeeData = await getEmployee(employeeId)
            const userData = await getUser(employeeData.work_email);
            const formattedData = transformIntoFormField(employeeData, userData)
            setFormData(formattedData)
        } catch (error: any) {
            setError(error.message);
        } finally {
            setPageLoading(false);
        }
    }

    useEffect(() => {
        if (employeeId) {
            fetchEmployeeProfileDetails(Number(employeeId))
        } else {
            setError('Employee ID not exists!')
        }
    }, [employeeId])

    return !pageLoading ? (
        <div>
            <Header pageName="Edit Employee" />
            <div className="add-employee-container">
                <form onSubmit={handleSubmit} noValidate>
                    <EmployeeInfo
                        mode="edit"
                        formData={formData}
                        onFormChange={handleChange}
                        onSelectChange={handleSelectChange}
                        submitted={submitted}
                    />
                    <div className="form-actions">
                        <div className="buttons-wrapper">
                            <ActionButton
                                type="submit"
                                className="page-button primary-button"
                                disabled={isLoading}
                                handleEvent={() => {}}
                                placeholder={
                                    isLoading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        <>
                                            Submit
                                            <DoneIcon className='icon' />
                                        </>
                                    )
                                }
                            />
                        </div>
                    </div>
                </form>
            </div>
            <EditEmployeePopup open={isPopupOpen} onClose={() => setIsPopupOpen(false)} />
        </div>
    ) : (
        <LoadingScreen />
    )
}

export default EditProfile
