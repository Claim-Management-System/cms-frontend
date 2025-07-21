import apiClient from './axiosConfig';

export const getClaimsHistory = async (claimType: string, status: string, search: string, page: number) => {
  try {
    const params: any = { claimType, page, search };

    if (status !== 'total') {
      params.status = status;
    }

    const response = await apiClient.get('/api/claims', { params });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};


export const getUserClaimsHistory = async (employeeId: string, status: string, search: string, page: number) => {
  try {
     const response = await apiClient.get('/api/claims/employee', {
      params: { employeeId, status, page, search },
    });
    return response;
  } catch (error) {
    throw error
  }
}


export const getClaim = async (claimId: string) => {
  try {
    const response = await apiClient.get('/api/claims', {
      params: { id: claimId }
    })

    return response
  } catch (error) {
    throw error
  }
}