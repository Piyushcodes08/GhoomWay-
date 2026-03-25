import axios from 'axios';
import axiosRetry from 'axios-retry';

// 1. PRODUCTION SAFETY CHECK
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  // In development, this helps catch missing env vars immediately
  // In production, this prevents the app from silently failing or hitting localhost
  const errorMsg = "CRITICAL: VITE_API_URL is not defined. API calls will fail.";
  console.error(errorMsg);
  if (import.meta.env.MODE === 'production') {
    // Optionally throw error to crash early or handle via Error Boundary
    // throw new Error(errorMsg); 
  }
}

// 2. CENTRALIZED AXIOS INSTANCE
const API = axios.create({
  baseURL: API_URL,
  timeout: 30000, // 30s - Vital for Render.com free tier cold starts
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// 3. ROBUST RETRY LOGIC (axios-retry)
axiosRetry(API, {
  retries: 3,
  retryDelay: (retryCount, error) => {
    const delay = retryCount * 2000; // 2s, 4s, 6s
    console.warn(`[API] Retry attempt #${retryCount} after ${delay}ms. Reason: ${error.message}`);
    return delay;
  },
  // Retry on network errors or 5xx status codes (idempotent requests)
  retryCondition: (error) => {
    const isNetworkError = axiosRetry.isNetworkOrIdempotentRequestError(error);
    const isServerError = error.response && error.response.status >= 500;
    return isNetworkError || isServerError;
  },
  shouldResetTimeout: true, // Reset timeout on each retry
});

// 4. REQUEST INTERCEPTOR (Auth & Logging)
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Log outgoing requests only in non-production
    if (import.meta.env.MODE !== 'production') {
      console.log(`🚀 [API Request] ${config.method.toUpperCase()} ${config.url}`);
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 5. RESPONSE INTERCEPTOR (Global Error Handling)
API.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = 'An unexpected error occurred. Please try again.';
    let isColdStart = false;

    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      message = 'Request timed out. The server might be warming up (Render Cold Start). Please try again in a few seconds.';
      isColdStart = true;
    } else if (!error.response) {
      // Network error (Server down, DNS, CORS)
      message = 'Network error: Unable to reach the server. Please check your connection.';
    } else {
      const { status, data } = error.response;
      
      // Map specific status codes to user-friendly messages
      switch (status) {
        case 401:
          // If it's a login attempt, show a specific error
          if (error.config.url.includes('/admin/login')) {
            message = 'Invalid email or password. Please try again.';
          } else {
            message = 'Session expired. Please log in again.';
            localStorage.removeItem('adminToken'); // Auto-clean on 401
          }
          break;
        case 403:
          message = 'Access Denied: You do not have permission for this action.';
          break;
        case 404:
          message = 'Resource not found.';
          break;
        case 429:
          message = 'Too many requests. Please slow down.';
          break;
        default:
          if (status >= 500) {
            message = 'Server Error: We are experiencing some issues. Please try again later.';
          } else if (data && data.error) {
            message = data.error; // Backend-provided error
          }
      }
    }

    // Comprehensive logging
    console.error(`❌ [API Error] ${error.config?.method?.toUpperCase()} ${error.config?.url}:`, {
      message,
      status: error.response?.status,
      originalError: error.message
    });

    // Attach metadata for the UI to consume
    error.userMessage = message;
    error.isColdStart = isColdStart;

    return Promise.reject(error);
  }
);

export default API;

