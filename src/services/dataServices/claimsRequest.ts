import apiClient from './axiosConfig';
import type { newAddRequest, FormType } from '../../types';

type getClaimsRequestProps = {
  claimType: 'miscellaneous' | 'medical';
  page: number;
}

export const getClaimsRequest = async ({ claimType, page }: getClaimsRequestProps) => {
  try {
    const response = await apiClient.get('/api/claims', {
      params: { claimType, page, status: 'pending' },
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};


export const getEmployeeClaimsRequest = async (claimType: string, employeeNumber: string, page: number) => {
  try {
    const response = await apiClient.get('/api/claims/employee', {
      params: { employeeNumber, claimType, page, status: 'pending' },
    });
    return response.data;
  } catch (error) {
    throw new Error(`No pending claims for EmployeeId: ${employeeNumber} `);
  }
};


export const postNewRequest = async (formData: newAddRequest) => {
  try {
    const data = new FormData();
     Object.keys(formData).forEach(key => {
      const typedKey = key as keyof newAddRequest;
      if (typedKey !== 'images') {
        data.append(typedKey, String(formData[typedKey]));
      }
    });
    if (formData.images && formData.images.length > 0) {
      formData.images.forEach(file => {
        data.append('images', file);
      });
    }

    const response = await apiClient.post('/api/claims', data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response;
  } catch (error: any) {
    console.log(error)
    throw error;
  }
}



export const getClaimTypesFromApi = async (form: FormType) => {
  let params: { name?: string } = {};

  if (form === "MISCELLANEOUS EXPENSE FORM") {
    params.name = 'misc';
  } else {
    params.name = 'medical';
  }

  try {
    const response = await apiClient.get('/api/claim-types', { params });
    return response.data; 
  } catch (error) {
    throw error;
  }
};