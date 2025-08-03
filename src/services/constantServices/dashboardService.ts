import { getDashboardDetails, getEmployee } from "../dataServices/employee";
import { formatDashboardData } from "../../utils/dashboardUtils";
import type { DashboardData } from "../../types";


const cachedResult: { [key: number]: DashboardData } = {};

export const fetchDashboardData = async (employeeNumber: number) => {
    if (cachedResult[employeeNumber]) {
        return cachedResult[employeeNumber];
    }

    try {
        const data = await getDashboardDetails(employeeNumber);
        const employeeInfo = await getEmployee(employeeNumber);

        const formatData = formatDashboardData(data);
        cachedResult[employeeNumber] = { 
            claimDetails: formatData, 
            totalLimit: Math.round(data.TotalMedicalLimit),
            employeeName: `${employeeInfo.first_name} ${employeeInfo.last_name}`, 
            employeeEmail: employeeInfo.work_email
        };

        return cachedResult[employeeNumber];
    } catch (error) {
        throw error;
    }
};