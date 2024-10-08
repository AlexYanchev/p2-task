import axiosInstance from '../../axios';
import { CreateTaskData } from 'backend/src/types/app/tasks';

const API_URL = '/tasks';

const createTask = async (taskData: CreateTaskData, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.post(API_URL, taskData, config);
  return response.data;
};

const getAllTasks = async (token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.get(API_URL, config);
  return response.data;
};

const deleteTask = async (idTask: string, token: string) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axiosInstance.delete(API_URL + `/${idTask}`, config);
  return response.data;
};

const taskService = { createTask, getAllTasks, deleteTask };

export default taskService;
