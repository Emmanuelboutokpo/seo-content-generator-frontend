import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL || 'http://127.0.0.1:8000/api/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  transformResponse: [function (data) {
    // Parse manuellement si nécessaire
    try {
      return JSON.parse(data);
    } catch (error) {
      return data;
    }
  }]
});

export default api;