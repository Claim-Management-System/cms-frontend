import apiClient from './axiosConfig';

type getClaimsRequestProps = {
  claimType: 'miscellaneous' | 'medical';
  search: string;
  page: number;
}

export const getClaimsRequest = async ({ claimType, search, page }: getClaimsRequestProps) => {
  try {
    const response = await apiClient.get('/api/claims', {
      params: { claimType, page, search, status: 'pending' },
    });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};


type postNewRequestProps = {
  user_id: string,
  employee_number: number,
  claim_type_id: number,
  title: string,
  description: string,
  purpose_of_visit?: string,
  relationship: string,
  submitted_amount: number,
  month: string,
  images: File[]
}

export const postNewRequest = async (formData: postNewRequestProps) => {
  try {
    const data = new FormData();
     Object.keys(formData).forEach(key => {
      const typedKey = key as keyof postNewRequestProps;
      
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

    console.log('Claim submitted successfully:', response);
    return response.data;
  } catch (error: any) {
    throw error;
  }
}