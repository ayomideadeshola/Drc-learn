import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '/api';

const http = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default http;
