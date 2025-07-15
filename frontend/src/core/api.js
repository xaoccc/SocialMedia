import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

// Create an Axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to log in and get tokens
export const loginUser = async (email, password) => {
  const response = await apiClient.post('/auth/login/', { email, password });
  return response.data; 
};

export default apiClient;