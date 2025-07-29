import React, { useState, useEffect, useCallback } from 'react';
import EmployeeInfo from '../../components/employeeInfo/EmployeeInfo';
import type { EmployeeInterface } from '../../components/employeeInfo/EmployeeInfo';
import Header from '../../components/Header';
import DoneIcon from '@mui/icons-material/Done';
import BlockIcon from '@mui/icons-material/Block';
import './AddEmployee.css';
import type { SelectChangeEvent } from '@mui/material';
import { getLocations } from '../../services/dataServices/location';

const requiredFields: (keyof EmployeeInterface)[] = [
    'firstName', 'lastName', 'email', 'dob', 'joiningDate', 'role',
    'employeeType', 'team', 'bankAccountNumber',
    'employeeId', 'maritalStatus', 'workLocation', 'jobTitle', 'position', 'phoneNumber'
];

const dummyEmployeeData: EmployeeInterface = {
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  dob: '1990-01-01',
  joiningDate: '2020-01-15',
  role: 'employee',
  employeeType: 'permanent',
  team: 'Development',
  bankAccountNumber: '1234567890',
  employeeId: 'EMP123',
  maritalStatus: 'single',
  workLocation: 'New York',
  jobTitle: 'Software Engineer',
  position: 'Senior',
  phoneNumber: '123-456-7890',
};

type AddEmployeeProps = {
  mode?: 'create' | 'edit';
  employeeData?: EmployeeInterface;
};

const AddEmployee: React.FC<AddEmployeeProps> = ({ mode = 'edit', employeeData = dummyEmployeeData }) => {
  const [formData, setFormData] = useState<Omit<EmployeeInterface, 'age'> & { age?: number }>({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    joiningDate: '',
    role: 'employee',
    employeeType: 'permanent',
    team: '',
    bankAccountNumber: '',
    employeeId: '',
    maritalStatus: 'single',
    workLocation: '',
    age: undefined,
    jobTitle: '',
    position: '',
    phoneNumber: '',
  });

  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const locationData = await getLocations();
      setLocations(locationData);
    };
    fetchLocations();
  }, []);


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

    const employeeDetails = {
      bank_account_number: formData.bankAccountNumber,
      date_of_birth: formData.dob,
      employee_number: formData.employeeId,
      employee_type_id: formData.employeeType === 'permanent' ? 1 : 2,
      first_name: formData.firstName,
      job_title: formData.jobTitle,
      last_name: formData.lastName,
      marital_status_id: formData.maritalStatus === 'single' ? 1 : formData.maritalStatus === 'married' ? 2 : 3,
      onboarding_date: formData.joiningDate,
      position: formData.position,
      primary_number: formData.phoneNumber,
      team: formData.team,
      work_email: formData.email,
      work_location_id: 0,
    };

    const userCredentials: {
      email: string;
      employee_id: string;
      role: 'admin' | 'employee';
      password?: string;
    } = {
      email: formData.email,
      employee_id: formData.employeeId,
      role: formData.role,
    };

    if (mode === 'create') {
      userCredentials.password = password;
    }

    console.log('First Object:', employeeDetails);
    console.log('Second Object:', userCredentials);
    // API call will go here
  };

  return (
    <>
      <Header pageName={mode === 'edit' ? 'Edit Employee' : 'Add New Employee'} />
      <div className="add-employee-container">
        <form onSubmit={handleSubmit} noValidate>
          <EmployeeInfo
            mode={mode}
            formData={formData}
            password={password}
            onFormChange={handleChange}
            onSelectChange={handleSelectChange}
            submitted={submitted}
            locations={locations}
          />
          <div className="form-actions">
            {validationError && <p className="validation-error">{validationError}</p>}
            <div className="buttons-wrapper">
              <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
                <BlockIcon sx={{ fontSize: 16, marginLeft: '8px' }} />
              </button>
              <button type="submit" className="submit-btn">
                Submit
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
