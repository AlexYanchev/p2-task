import axiosInstance from '../../axios';
import { LoginUserData, RegisterUserData } from 'backend/src/types/app/users';

const API_URL = '/users';

const register = async (userData: RegisterUserData) => {
  const response = await axiosInstance.post(API_URL, userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const login = async (userData: LoginUserData) => {
  const response = await axiosInstance.post(API_URL + '/login', userData);
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }
  return response.data;
};

const logout = async () => localStorage.removeItem('user');

const authService = { register, login, logout };

export default authService;
