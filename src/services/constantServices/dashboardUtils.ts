import { getDashboard } from "../dataServices/employee";

const cachedResult: { [key: number]: any } = {};

export const fetchDashboard = async (employeeNumber: number) => {
    if (cachedResult[employeeNumber]) {
        return cachedResult[employeeNumber];
    }

    try {
        const data = await getDashboard(employeeNumber);
        cachedResult[employeeNumber] = data;
        return data;
    } catch (error) {
        throw error;
    }
};