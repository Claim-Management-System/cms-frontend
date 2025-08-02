import type { EmployeeInterface, WorkLocation, MaritalStatus, EmployeeType, FieldConfig } from '../types';


export const generateRandomPassword = (length = 12): string => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
    let password = '';
    for (let i = 0, n = charset.length; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * n));
    }
    return password;
};


export const calculateAge = (dateString: string): number | undefined => {
    if (!dateString) return undefined;

    const birthDate = new Date(dateString);

    if (isNaN(birthDate.getTime())) return undefined;

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    return age;
};


export const generateFieldConfigs = (
    workLocation: WorkLocation[],
    maritalStatus: MaritalStatus[],
    employeeType: EmployeeType[]
): FieldConfig[] => {
    return [
        // Text fields
        { name: 'firstName', label: 'First Name', type: 'text', required: true },
        { name: 'lastName', label: 'Last Name', type: 'text', required: true },
        { name: 'email', label: 'Email', type: 'email', required: true },
        { name: 'jobTitle', label: 'Job Title', type: 'text', required: true },
        { name: 'position', label: 'Position', type: 'text', required: true },
        { name: 'department', label: 'Department', type: 'text', required: false },
        { name: 'phoneNumber', label: 'Phone Number', type: 'text', required: true },
        { name: 'team', label: 'Team', type: 'text', required: true },
        { name: 'bankAccountNumber', label: 'Bank Account Number', type: 'text', required: true },
        { name: 'employeeId', label: 'Employee ID', type: 'text', required: true },

        // Date fields
        { name: 'dob', label: 'Date of Birth', type: 'date', required: true },
        { name: 'joiningDate', label: 'Joining Date', type: 'date', required: true },

        // Special fields
        { name: 'age', label: 'Age', type: 'number', disabled: true, specialHandling: 'age' },
        { name: 'password', label: 'Password', type: 'password', required: true, specialHandling: 'password' },

        // Select fields
        {
            name: 'workLocation', label: 'Work Location', type: 'select', required: true,
            options: workLocation.map(location => ({ value: String(location.id), label: location.address }))
        },
        {
            name: 'maritalStatus', label: 'Marital Status', type: 'select', required: true,
            options: maritalStatus.map(status => ({ value: String(status.id), label: status.status }))
        },
        {
            name: 'status', label: 'Status', type: 'select', required: true,
            options: [
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
                { value: 'deactivated', label: 'Deactivated' },
            ]
        },
        {
            name: 'employeeType', label: 'Employee Type', type: 'select', required: true,
            options: employeeType.map(empType => ({ value: String(empType.id), label: empType.type }))
        },
        {
            name: 'role', label: 'Role', type: 'select', required: true,
            options: [
                { value: 'employee', label: 'Employee' },
                { value: 'admin', label: 'Admin' },
            ]
        },
    ];
};


export const REQUIRED_FIELDS: (keyof EmployeeInterface)[] = [
    'firstName',
    'lastName',
    'email',
    'age',
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
    'phoneNumber',
    'status'
];


export const getInitialFormData = (): EmployeeInterface => ({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    joiningDate: '',
    role: '',
    employeeType: '',
    team: '',
    bankAccountNumber: '',
    employeeId: '',
    maritalStatus: '',
    workLocation: '',
    age: undefined,
    jobTitle: '',
    position: '',
    phoneNumber: '',
    password: '',
    status: ''
});


export const isFormValid = (formData: EmployeeInterface, mode: 'create' | 'edit'): boolean => {
    const isFormInvalid = REQUIRED_FIELDS.some(field => {
        const value = formData[field as keyof typeof formData];
        return !value || value === '';
    });

    const passwordExists = mode === 'create' && !formData.password;
    return !isFormInvalid && !passwordExists;
};


export const transformToEmployeeDetails = (formData: EmployeeInterface) => ({
    first_name: formData.firstName,
    last_name: formData.lastName,
    work_email: formData.email,
    primary_number: formData.phoneNumber,
    date_of_birth: formData.dob,
    age: formData.age,
    bank_account_number: formData.bankAccountNumber,
    employee_number: Number(formData.employeeId),
    employee_type_id: Number(formData.employeeType),
    onboarding_date: formData.joiningDate,
    job_title: formData.jobTitle,
    position: formData.position,
    team: formData.team,
    marital_status_id: Number(formData.maritalStatus),
    work_location_id: Number(formData.workLocation),
    department: formData.department,
});


export const transformToUserCredentials = (formData: EmployeeInterface) => ({
    email: formData.email,
    employee_id: Number(formData.employeeId),
    role: formData.role,
    status: formData.status,
    ...(formData.password && { password: formData.password })
});


export const transformIntoFormField = (employeeData: any, userData: any) => ({
    firstName: employeeData.first_name,
    lastName: employeeData.last_name,
    email: employeeData.work_email,
    phoneNumber: employeeData.primary_number,
    dob: employeeData.date_of_birth,
    age: employeeData.age,
    bankAccountNumber: employeeData.bank_account_number,
    employeeId: employeeData.employee_number,
    employeeType: employeeData.employee_type_id,
    joiningDate: employeeData.onboarding_date,
    jobTitle: employeeData.job_title,
    position: employeeData.position,
    team: employeeData.team,
    maritalStatus: employeeData.marital_status_id,
    workLocation: employeeData.work_location_id,
    department: employeeData.department,
    status: userData.status,
    role: userData.role,
    userId: userData.id
})