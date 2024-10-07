import axiosInstance from '../../axios';
import { RegisterUserData } from 'backend/src/types/app/users';

const API_URL = '/users';

const register = async (userData: RegisterUserData) => {
  const response = await axiosInstance.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const authService = { register };

export default authService;
