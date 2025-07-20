import axios from 'axios';

const apiClient = axios.create({
  // Uncomment below line in production
  // baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export default apiClient;