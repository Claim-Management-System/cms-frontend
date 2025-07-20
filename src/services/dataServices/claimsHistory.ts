import apiClient from './axiosConfig';

export const getClaimsHistory = async (status: string, search: string, page: number) => {
  try {
    const response = await apiClient.get('/api/claims', {
      params: { status, page, search },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};