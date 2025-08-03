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


export const updateClaimStatus = async (claimId: string, body: object) => {
  try {
    await apiClient.put('/api/claims', body, {
      params: { id: claimId }
    })
  } catch (error: any) {
    throw error;
  }
}


export const getClaimImages = async (claimId: number) => {
  try {
    const response = await apiClient.get('/api/claimImages', {
      params: { claim_id: claimId }
    })
    return response.data;
  } catch (error) {
    throw error
  }
}

export const downloadClaimImages = async (claimId: string) => {
  try {
    const response = await apiClient.get('/api/download', {
      params: { module_name: 'claim', ref_number: claimId},
      responseType: 'blob',
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));
    
    const link = document.createElement('a');
    link.href = url;
    
    const contentDisposition = response.headers['content-disposition'];
    let filename = 'claims.csv';
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch.length > 1) {
        filename = filenameMatch[1];
      }
    }
    link.setAttribute('download', filename);
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(url);

  } catch (error) {
    throw new Error('Could not download the file.');
  }
};


export { getClaimsHistory, getEmployeeClaimsHistory, getClaim, getClaimsCount }