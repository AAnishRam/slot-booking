import axios from 'axios';

const api = axios.create({
  baseURL: 'https://2j4s5b5z-8000.inc1.devtunnels.ms',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
