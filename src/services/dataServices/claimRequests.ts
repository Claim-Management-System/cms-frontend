import apiClient from './axiosConfig';

export const getClaims = async (status: string, search: string, page: number, limit = 12) => {
  try {
    const response = await apiClient.get('/api/claims', {
      params: { status, page, limit, search },
      withCredentials: true
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};