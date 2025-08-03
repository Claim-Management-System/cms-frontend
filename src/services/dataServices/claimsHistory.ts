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
    // 1. Make the GET request, expecting a 'blob' response
    const response = await apiClient.get('/api/download', {
      params: { module_name: 'claim', ref_number: claimId},
      responseType: 'blob',
    });

    // 2. Create a temporary URL for the blob data
    const url = window.URL.createObjectURL(new Blob([response.data]));
    
    // 3. Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    
    // 4. Set the filename for the download
    // You can try to get the filename from the 'Content-Disposition' header
    // or set a default name.
    const contentDisposition = response.headers['content-disposition'];
    let filename = 'claims.csv'; // Default filename
    if (contentDisposition) {
      const filenameMatch = contentDisposition.match(/filename="(.+)"/);
      if (filenameMatch.length > 1) {
        filename = filenameMatch[1];
      }
    }
    link.setAttribute('download', filename);
    
    // 5. Append the link to the body, click it, and then remove it
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 6. Clean up the temporary URL
    window.URL.revokeObjectURL(url);

  } catch (error) {
    console.error('Download failed:', error);
    // You can use your error context to show a notification to the user
    throw new Error('Could not download the file.');
  }
};


export { getClaimsHistory, getEmployeeClaimsHistory, getClaim, getClaimsCount }