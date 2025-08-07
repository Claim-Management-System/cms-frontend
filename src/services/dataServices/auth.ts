import apiClient from './axiosConfig';

export const apiLogin = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/auth/login', { email, password });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};


export const apiLogout = async (user_id: string) => {
  try {
    await apiClient.post('/api/auth/logout', { user_id });
  } catch (error: any) {
    throw error;
  }
}