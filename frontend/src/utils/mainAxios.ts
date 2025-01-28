import { useAuthStore } from '@/stores/authStore'; // Імпорт Zustand store
import axios from 'axios';

const mainAxios = axios.create({
  baseURL: process.env.SERVER_URL || 'http://localhost:3030',
  headers: {
    'Content-Type': 'application/json',
  },
});

mainAxios.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken; 
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default mainAxios;
