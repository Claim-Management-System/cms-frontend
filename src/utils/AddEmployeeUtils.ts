import type { EmployeeInterface } from '../types';


export const generateRandomPassword = (length = 12): string => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0, n = charset.length; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
};


export const calculateAge = (birthDate: Date): number => {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
};


export const calculateAgeFromString = (dateString: string): number | undefined => {
    if (!dateString) return undefined;
    
    try {
        const birthDate = new Date(dateString);
        if (isNaN(birthDate.getTime())) return undefined;
        return calculateAge(birthDate);
    } catch {
        return undefined;
    }
};


export const REQUIRED_FIELDS: (keyof EmployeeInterface)[] = [
    'firstName', 
    'lastName', 
    'email', 
    'dob', 
    'joiningDate', 
    'role',
    'employeeType', 
    'team', 
    'bankAccountNumber',
    'employeeId',
    'maritalStatus', 
    'workLocation', 
    'jobTitle', 
    'position', 
    'phoneNumber'
];


export const DEFAULT_EMPLOYEE_DATA: EmployeeInterface = {
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


export const getInitialFormData = (): EmployeeInterface => ({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    joiningDate: '',
    role: '', // Empty instead of 'employee'
    employeeType: '', // Empty instead of 'permanent'
    team: '',
    bankAccountNumber: '',
    employeeId: '',
    maritalStatus: '', // Empty instead of 'single'
    workLocation: '', // Empty instead of default location
    age: undefined,
    jobTitle: '',
    position: '',
    phoneNumber: '',
    password: '',
});


/**
 * Validates if all required fields are filled
 * @param formData - Current form data
 * @param mode - Form mode ('create' or 'edit')
 * @returns Boolean indicating if form is valid
 */
export const isFormValid = (
    formData: Omit<EmployeeInterface, 'age'> & { age?: number },
    mode: 'create' | 'edit'
): boolean => {
    const isFormInvalid = REQUIRED_FIELDS.some(field => {
        const value = formData[field as keyof typeof formData];
        return !value || value === '';
    });
    const isPasswordInvalid = mode === 'create' && !formData.password;
    return !isFormInvalid && !isPasswordInvalid;
};


/**
 * Transforms form data to API format for employee details
 * @param formData - Current form data
 * @returns Transformed data for API
 */
export const transformToEmployeeDetails = (formData: Omit<EmployeeInterface, 'age'> & { age?: number }) => ({
    bank_account_number: formData.bankAccountNumber,
    date_of_birth: formData.dob,
    age: formData.age,
    employee_number: formData.employeeId,
    employee_type_id: formData.employeeType === 'permanent' ? 1 : formData.employeeType === 'contractual' ? 2 : 0,
    first_name: formData.firstName,
    job_title: formData.jobTitle,
    last_name: formData.lastName,
    marital_status_id: formData.maritalStatus === 'single' ? 1 : formData.maritalStatus === 'married' ? 2 : formData.maritalStatus === 'family' ? 3 : 0,
    onboarding_date: formData.joiningDate,
    position: formData.position,
    primary_number: formData.phoneNumber,
    team: formData.team,
    work_email: formData.email,
    work_location_id: 0, // This should be mapped from workLocation
});

/**
 * Transforms form data to API format for user credentials
 * @param formData - Current form data
 * @returns Transformed data for API
 */
export const transformToUserCredentials = ( formData: EmployeeInterface ) => {
    const credentials: {
        email: string;
        employee_id: string;
        role: 'admin' | 'employee';
        password?: string;
    } = {
        email: formData.email,
        employee_id: formData.employeeId,
        role: (formData.role as 'admin' | 'employee') || 'employee', // Default to employee if empty
    };

    if (formData.password) {
        credentials.password = formData.password;
    }

    return credentials;
};