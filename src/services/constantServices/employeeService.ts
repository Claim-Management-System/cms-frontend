import { getWorkLocations, getMaritalStatuses, getEmployeeTypes } from '../../services/dataServices/employee';

interface LocationApi {
    city: string;
    country: string;
    id: number;
    office_address: string;
    primary_address: string;
}

interface MaritalStatusApi {
    id: number;
    status_name: string;
    medical_limit: number;
    monthly_limit: number;
    description: string;
}

interface EmployeeTypeApi {
    id: number;
    type: string;
}

export const fetchFormDependencies = async () => {
    try {
        const [workLocations, maritalStatuses, employeeTypes] = await Promise.all([
            getWorkLocations(),
            getMaritalStatuses(),
            getEmployeeTypes()
        ]);

        const formattedWorkLocations = workLocations.map((location: LocationApi) => ({
            id: location.id,
            address: `${location.office_address}, ${location.city}`
        }));

        const formattedMaritalStatuses = maritalStatuses.map((maritalStatus: MaritalStatusApi) => ({
            id: maritalStatus.id,
            status: maritalStatus.status_name
        }));

        const formattedEmployeeTypes = employeeTypes.map((empType: EmployeeTypeApi) => ({
            id: empType.id,
            type: empType.type
        }));

        return { formattedWorkLocations, formattedMaritalStatuses, formattedEmployeeTypes };

    } catch (error: any) {
        throw error;
    }
};