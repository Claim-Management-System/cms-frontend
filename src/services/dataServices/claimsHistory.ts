import apiClient from './axiosConfig';


type getClaimsHistoryProps = {
  claimType: 'miscellaneous' | 'medical';
  status: string;
  search: string;
  page: number;
}

const getClaimsHistory = async ({ claimType, status, search, page }: getClaimsHistoryProps) => {
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



type getEmployeeClaimsHistoryProps = {
  employeeId: string;
  claimType: 'miscellaneous' | 'medical';
  status: string;
  search: string;
  page: number
}

const getEmployeeClaimsHistory = async ({employeeId, claimType, status, search, page}: getEmployeeClaimsHistoryProps) => {
  try {
     const response = await apiClient.get('/api/claims/employee', {
      params: { employeeId, claimType, status, page, search },
    });
    return response.data;
  } catch (error: any) {
    throw error
  }
}


const getClaimsCount = async (module: 'medical' | 'miscellaneous', user_id: string) => {
  try {
    const response = await apiClient.get('/api/claims/count', { params: { module, user_id } })
    return response.data
  } catch (error) {
    throw error
  }
}



const getClaim = async (claimId: string) => {
  try {
    const response = await apiClient.get('/api/claims', {
      params: { id: claimId }
    })
    return response.data
  } catch (error: any) {
    throw error
  }
}


export { getClaimsHistory, getEmployeeClaimsHistory, getClaim, getClaimsCount }