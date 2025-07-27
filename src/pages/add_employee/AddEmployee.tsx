import React, { useState, useEffect, useCallback } from 'react';
import EmployeeInfo from '../../components/employeeInfo/EmployeeInfo';
import type { EmployeeInterface } from '../../components/employeeInfo/EmployeeInfo';
import AddEmployeeButtons from '../../components/addEmployeeButtons/AddEmployeeButtons';
import './AddEmployee.css';
import type { SelectChangeEvent } from '@mui/material';

const requiredFields: (keyof EmployeeInterface)[] = [
    'firstName', 'lastName', 'email', 'dob', 'joiningDate', 'role',
    'roleExtension', 'employeeType', 'team', 'bankAccountNumber',
    'employeeId', 'maritalStatus'
];

type AddEmployeeProps = {
  mode: 'create' | 'edit';
  employeeData?: EmployeeInterface;
};

const AddEmployee: React.FC<AddEmployeeProps> = ({ mode, employeeData }) => {
  const [formData, setFormData] = useState<Omit<EmployeeInterface, 'age'> & { age?: number }>({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    joiningDate: '',
    role: 'user',
    roleExtension: 'normal',
    employeeType: 'permanent',
    team: '',
    bankAccountNumber: '',
    employeeId: '',
    maritalStatus: 'single',
    age: undefined,
  });

  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');


  const isFormValid = useCallback(() => {
    const isFormInvalid = requiredFields.some(field => !formData[field as keyof typeof formData]);
    const isPasswordInvalid = mode === 'create' && !password;
    return !isFormInvalid && !isPasswordInvalid;
  }, [formData, password, mode]);

  useEffect(() => {
    if (submitted) {
      if (!isFormValid()) {
        setValidationError('Please fill out all required fields');
      } else {
        setValidationError('');
      }
    }
  }, [submitted, isFormValid]);

  useEffect(() => {
    if (mode === 'edit' && employeeData) {
      setFormData({
        ...employeeData,
        age: employeeData.dob ? calculateAge(new Date(employeeData.dob)) : undefined,
      });
    }
  }, [mode, employeeData]);

  const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      if (name === 'dob' && value) {
        const age = calculateAge(new Date(value));
        setFormData(prev => ({ ...prev, age: age }));
      }
    }
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value as any }));
  };

  const handleCancel = () => {
    console.log('Cancel button clicked');
    // Logic to navigate away or reset the form
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    if (!isFormValid()) {
      setValidationError('Please fill out all required fields');
      return;
    }

    setValidationError('');
    const submissionData = mode === 'create' ? { ...formData, password } : formData;
    console.log(submissionData);
    // API call will go here
  };

  return (
    <div className="add-employee-container">
      <h1>{mode === 'edit' ? 'Edit Employee' : 'Add New Employee'}</h1>
      <form onSubmit={handleSubmit} noValidate>
        <EmployeeInfo
          mode={mode}
          formData={formData}
          password={password}
          onFormChange={handleChange}
          onSelectChange={handleSelectChange}
          submitted={submitted}
        />
        <div className="form-actions">
          {validationError && <p className="validation-error">{validationError}</p>}
          <div className="buttons-wrapper">
            <AddEmployeeButtons onCancel={handleCancel} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddEmployee;
