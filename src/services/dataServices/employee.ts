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

export const getUser = async (email: string) => {
  try {
    const response = await apiClient.get('/api/users', {
      params: { email }
    })
    return response.data;
  } catch (error) {
    throw error
  }
}

export const updateUser = async (body: any, userId: string) => {
  try {
    const response = await apiClient.put('/api/employees', body, {
      params: { id: userId }
    })
    console.log(response)
  } catch (error) {
    throw error
  }
}

export const updateEmployee = async (body: any, employeeNumber: number) => {
  try {
    const response = await apiClient.put('/api/employees', body, {
      params: { employeeNumber }
    })
    console.log(response)
  } catch (error) {
    throw error
  }
}

export const updatePassword = async (email: string, previous_password: string, new_password: string) => {
  try {
    const response = await apiClient.put('/user/change-password', {
      params: { email, previous_password, new_password }
    })
    console.log(response)
  } catch (error) {
    throw error
  }
}