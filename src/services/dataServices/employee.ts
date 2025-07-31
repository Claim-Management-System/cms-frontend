import apiClient from './axiosConfig';

export const getWorkLocation = async (id?: number) => {
  let url = '/api/work-locations';
  if (id) url += `?id:${id}`;

  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEmployeeType = async (id?: number) => {
  let url = '/api/employee-types';
  if (id) url += `?id:${id}`;

  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getMaritalStatus = async (id?: number) => {
  let url = '/api/marital-statuses';
  if (id) url += `?id:${id}`;

  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getEmployee = async (employeeNumber: number) => {
  try {
    const response = await apiClient.get('/api/employees', {
      params: { employeeNumber }
    })
    return response.data
  } catch (error: any) {
    throw error
  }
}