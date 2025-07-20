import apiClient from './axiosConfig';

export const getClaimsRequest = async (search: string, page: number) => {
  try {
    const response = await apiClient.get('/api/claims', {
      params: { page, search },
    });
    return response;
  } catch (error: any) {
    throw error;
  }
};