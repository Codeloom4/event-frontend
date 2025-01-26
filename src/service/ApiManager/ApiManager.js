import axios from "axios";

// Base URL for your Spring Boot backend
const BASE_URL = "http://localhost:8080/api"; // Update with your backend URL

// Create Axios instance with default headers
const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor: Add authorization token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Get token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Add token to headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle global errors (e.g., 401 Unauthorized)
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized access (e.g., redirect to login page)
      localStorage.removeItem("token"); // Clear token
      window.location.href = "/login"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

// API service object
const ApiManager = {
  /**
   * Perform a GET request.
   * @param {string} path - API endpoint path.
   */
  get: (path) => axiosInstance.get(path),

  /**
   * Perform a POST request.
   * @param {string} path - API endpoint path.
   * @param {object} body - Request body.
   */
  post: (path, body) => axiosInstance.post(path, body),

  /**
   * Perform a PUT request.
   * @param {string} path - API endpoint path.
   * @param {object} body - Request body.
   */
  put: (path, body) => axiosInstance.put(path, body),

  /**
   * Perform a DELETE request.
   * @param {string} path - API endpoint path.
   */
  delete: (path) => axiosInstance.delete(path),

  /**
   * Set authentication token.
   * @param {string} token - Authentication token.
   */
  setToken: (token) => {
    localStorage.setItem("token", token); // Save token to local storage
  },

  /**
   * Clear authentication token.
   */
  clearToken: () => {
    localStorage.removeItem("token"); // Remove token from local storage
  },
};

export default ApiManager;
