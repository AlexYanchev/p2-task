import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://p2tasks-4wuq9v0q.b4a.run/api',
});

export default axiosInstance;
