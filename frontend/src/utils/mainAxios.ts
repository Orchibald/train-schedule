import axios from 'axios';

const mainAxios = axios.create({
  baseURL: process.env.SERVER_URL || 'http://localhost:3030',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default mainAxios;
