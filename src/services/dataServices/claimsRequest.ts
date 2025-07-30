import apiClient from './axiosConfig';

type getClaimsRequestProps = {
  claimType: 'miscellaneous' | 'medical';
  search: string;
  page: number;
}

export const getClaimsRequest = async ({claimType, search, page}: getClaimsRequestProps) => {
  try {
    const response = await apiClient.get('/api/claims', {
      params: { claimType, page, search, status: 'pending' },
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};