import axios from './api';

export const login = async (username, password) => {
  const response = await axios.post('/api/auth/login', { username, password });
  return response.data; 
};

export const register = async (username, password) => {
  const response = await axios.post('/api/auth/register', { username, password });
  return response.data; 
};
