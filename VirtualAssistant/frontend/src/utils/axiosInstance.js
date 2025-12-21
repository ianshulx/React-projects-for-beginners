import axios from 'axios';

let baseFromEnv = import.meta.env.VITE_API_URL;

// Safety: never use localhost in production builds even if mistakenly provided
if (import.meta.env.MODE !== 'development' && baseFromEnv && /localhost|127\.0\.0\.1/i.test(baseFromEnv)) {
    baseFromEnv = undefined;
}

const apiBaseUrl = baseFromEnv ||
    (import.meta.env.MODE === 'development' ? 'http://localhost:8080/api' : '/api');

export const axiosInstance = axios.create({
    baseURL: apiBaseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    timeout: 10000,
});

// Request interceptor to add token from localStorage to Authorization header
axiosInstance.interceptors.request.use(
    (config) => {
        // Get token from localStorage (stored during login/signup)
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

