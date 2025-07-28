import apiClient from './axiosConfig';


export const getEmployee = async (employeeNumber: string) => {
  try {
    const response = await apiClient.get('/api/employees', {
      params: { employeeNumber }
    })
    return response.data
  } catch (error: any) {
    throw error
  }
}