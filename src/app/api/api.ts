import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
api.interceptors.response.use(
  (response) => {
    return Promise.resolve(response);
  },
  (error) => {
    if (error.response.status === 401) {
      console.log('Unauthorized');
    } else if (error.response.status === 403) {
      console.log('Forbidden');
    }

    return Promise.reject(error);
  }
);

export default api;
