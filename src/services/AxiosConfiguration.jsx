// api.js
import axios from 'axios';

// const SPRING_API = "https://api-leave-management-system.onrender.com";
const SPRING_API = "http://localhost:8080";

// Create an Axios instance
const api = axios.create({
  baseURL: `${SPRING_API}/api/v1`, // Update this with your backend URL
  withCredentials: true, // Allows sending cookies with requests
});

// Request interceptor to add access token to headers
api.interceptors.request.use(
  (config) => {

    // Check if we are on the login page
    if (config.url === '/' || config.url === '/login-user') {
      // Do not attach the token or trigger refresh logic for login requests
      return config;
    }

    const accessToken = localStorage.getItem('accessToken'); // Retrieve the access token from local storage
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; // Attach the access token to the headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle 401 errors and refresh the access token
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Avoid refreshing tokens on unauthenticated routes like login
    if (originalRequest.url === '/users/auth/authenticate') {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Attempt to refresh the access token
        const response = await axios.post(
          `${SPRING_API}/api/v1/users/auth/refresh-token`, // Endpoint to refresh the token
          {},
          { withCredentials: true } // Send the refresh token stored in HttpOnly cookie
        );
        const newAccessToken = response.data['access-token'];
        localStorage.setItem('accessToken', newAccessToken); // Store the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`; // Attach the new token to the original request
        return api(originalRequest); // Retry the original request with the new token
      } catch (refreshError) {
        // Handle refresh token errors (e.g., log out the user if the refresh fails)
        console.error('Refresh token error:', refreshError);
        // Optionally, redirect to login page
        localStorage.removeItem('accessToken');
        window.location.href = '/';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
