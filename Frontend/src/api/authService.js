import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const loginUser = async (username, password) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    const users = response.data;

    // Check if the user exists
    const user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
      localStorage.setItem('token', 'mock-token-123');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error during login:', error);
    return false;
  }
};

export const logoutUser = () => {
  localStorage.removeItem('token');
};
