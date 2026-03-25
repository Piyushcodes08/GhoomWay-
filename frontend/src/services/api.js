import axios from 'axios';
import axiosRetry from 'axios-retry';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const API = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Configure retry logic
axiosRetry(API, {
  retries: 3,
  retryDelay: (retryCount) => {
    console.log(`[API] Retry attempt #${retryCount}...`);
    return retryCount * 2000; // 2s, 4s, 6s
  },
  retryCondition: (error) => {
    // Retry on network errors or 5xx status codes
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || (error.response && error.response.status >= 500);
  },
});

// Request interceptor for logging & debugging
API.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method.toUpperCase()} ${config.url}`, config.data || '');
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
API.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.status} ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    let message = 'Something went wrong. Please try again later.';
    
    if (!error.response) {
      // Network error (server down, CORS, etc.)
      message = 'Server is unreachable. Please check your internet or try again later.';
    } else {
      const { status, data } = error.response;
      if (status === 401) message = 'Unauthorized. Please login again.';
      else if (status === 403) message = 'You do not have permission to perform this action.';
      else if (status === 404) message = 'Requested resource not found.';
      else if (status >= 500) message = 'Internal Server Error. Our team is working on it.';
      else if (data && data.error) message = data.error;
    }

    console.error(`[API Error] ${error.config?.url}:`, message, error.response?.data || error.message);
    
    // Attach user-friendly message to error object
    error.userMessage = message;
    return Promise.reject(error);
  }
);

export default API;
