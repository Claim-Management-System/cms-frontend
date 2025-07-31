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
  employeeNumber: number;
  claimType: 'miscellaneous' | 'medical';
  status: string;
  search: string;
  page: number
}

const getEmployeeClaimsHistory = async ({employeeNumber, claimType, status, search, page}: getEmployeeClaimsHistoryProps) => {
  try {
     const response = await apiClient.get('/api/claims/employee', {
      params: { employeeNumber, claimType, status, page, search },
    });
    return response.data;
  } catch (error: any) {
    throw error
  }
}


const getClaimsCount = async (module: 'medical' | 'miscellaneous', employee_number: number) => {
  try {
    const response = await apiClient.get('/api/claims/count', { params: { module, employee_number } })
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


const updateClaimStatus = async (claimId: string, body: object) => {
  try {
    await apiClient.put('/api/claims', body, {
      params: { id: claimId }
    })
  } catch (error: any) {
    throw error;
  }
}


export { getClaimsHistory, getEmployeeClaimsHistory, getClaim, updateClaimStatus, getClaimsCount }