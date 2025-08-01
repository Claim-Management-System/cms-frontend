import apiClient from "./axiosConfig";


export const getDashboard = async (employeeNumber: number) => {
    try {
        const response = await apiClient.get('api/dashboard', {
            params: { employeeNumber }
        });
        return response.data
    } catch (error) {
        throw error
    }
}