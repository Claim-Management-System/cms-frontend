import apiClient from "./axiosConfig";


export const createEmployee = async (body: any) => {
    try {
        await apiClient.post('api/employees', body)
    } catch (error: any) {
        throw error
    }
}

export const createUser = async (body: any) => {
    try {
        await apiClient.post('api/users', body)
    } catch (error: any) {
        throw error
    }
}

export const getWorkLocation = async (id?: number) => {
    try {
        const response = await apiClient.get('/api/work-locations', {
            params: { id }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getEmployeeType = async (id?: number) => {
    try {
        const response = await apiClient.get('/api/employee-types', {
            params: { id }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getMaritalStatus = async (id?: number) => {
    try {
        const response = await apiClient.get( '/api/marital-statuses', {
            params: { id }
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getEmployee = async (employeeNumber: number) => {
  try {
    const response = await apiClient.get('/api/employees', {
      params: { employeeNumber }
    })
    return response.data
  } catch (error: any) {
    throw error
  }
}

export const getAllEmployees = async (page: number, search: string) => {
  try {
    const response = await apiClient.get('/api/employees', {
      params: { page, employeeNumber: Number(search) },
    })
    return response.data
  } catch (error: any) {
    throw error
  }
}

export const getDashboardDetails = async (employeeNumber: number) => {
  try {
    const response = await apiClient.get('/api/dashboard', {
        params: { employeeNumber }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};