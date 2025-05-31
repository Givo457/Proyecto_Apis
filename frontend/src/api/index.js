// src/api/index.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('Error en la API:', error);
    return Promise.reject(error);
  }
);

export default api;