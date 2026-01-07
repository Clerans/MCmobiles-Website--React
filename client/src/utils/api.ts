import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    const apiKey = import.meta.env.VITE_API_KEY;

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    if (apiKey) {
        config.headers['x-api-key'] = apiKey;
    }

    return config;
});

export default api;
