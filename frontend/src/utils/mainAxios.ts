import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';

const mainAxios = axios.create({
  baseURL: process.env.SERVER_URL || 'https://train-backend-production-a712.up.railway.app',
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
