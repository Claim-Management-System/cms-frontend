import { getEmployee, getWorkLocation, getEmployeeType, getMaritalStatus } from '../services/dataServices/employee';

const profileCache: any = {};

const getUserProfileDetails = async (employeeNumber: number) => {
    try {
        const employee = await getEmployee(employeeNumber);
        console.log(employee)

        const [
            workLocation,
            employeeType,
            // maritalStatus
        ] = await Promise.all([
            getWorkLocation(employee.work_location_id),
            getEmployeeType(employee.employee_type_id),
            // getMaritalStatus(employee.marital_status_id)
        ]);

        const fullProfile = {
            ...employee,
            office_address: `${workLocation.office_address}, ${workLocation.primary_address}`,
            city: workLocation.city,
            country: workLocation.country,
            employee_type: employeeType.type,
            // marital_status: maritalStatus.status_name,
            marital_status: 'single',
        };

        return fullProfile;
    } catch (error) {
        throw error;
    }
};

export const fetchProfile = async (employeeNumber: number) => {
    if (profileCache[employeeNumber]) {
        return profileCache[employeeNumber];
    }

    try {
        const user = await getUserProfileDetails(employeeNumber);

        const personalDetails = {
            title: 'Personal Details',
            details: [
                { label: 'First Name', value: user.first_name },
                { label: 'Last Name', value: user.last_name },
                { label: 'Date of Birth', value: user.date_of_birth },
                { label: 'Onboarding Date', value: user.onboarding_date },
                { label: 'Age', value: user.age },
                { label: 'Marital Status', value: user.marital_status }
            ]
        };

        const jobDetails = {
            title: 'Job Details',
            details: [
                { label: 'Employee ID', value: user.employee_number },
                { label: 'Employee Type', value: user.employee_type },
                { label: 'Team', value: user.team },
                { label: 'Department', value: user.department },
                { label: 'Job Title', value: user.job_title },
                { label: 'Position', value: user.position },
            ],
        };

        const contactDetails = {
            title: 'Address and Contact Details',
            details: [
                { label: 'Office Address', value: user.office_address },
                { label: 'City', value: user.city },
                { label: 'Country', value: user.country },
                { label: 'Email', value: user.work_email },
                { label: 'Phone Number', value: user.primary_number },
                { label: 'Account Number', value: user.bank_account_number },
            ],
        };

        profileCache[employeeNumber] = [personalDetails, jobDetails, contactDetails];
        return [personalDetails, jobDetails, contactDetails];
    } catch (error) {
        throw error
    }
};