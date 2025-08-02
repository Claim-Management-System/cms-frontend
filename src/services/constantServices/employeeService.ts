import { getWorkLocation, getMaritalStatus, getEmployeeType } from '../../services/dataServices/employee';
import type { WorkLocation, MaritalStatus, EmployeeType } from '../../types';

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

interface CachedDependency {
    formattedWorkLocations: WorkLocation,
    formattedMaritalStatuses: MaritalStatus,
    formattedEmployeeTypes: EmployeeType
}

let cachedDependencies: CachedDependency | null = null;

export const fetchFormDependencies = async () => {
    if (cachedDependencies) {
        return cachedDependencies;
    }

    try {
        const [workLocations, maritalStatuses, employeeTypes] = await Promise.all([
            getWorkLocation(),
            getMaritalStatus(),
            getEmployeeType()
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

        const result = { formattedWorkLocations, formattedMaritalStatuses, formattedEmployeeTypes };
        cachedDependencies = result;
        return result;

    } catch (error: any) {
        throw error;
    }
};