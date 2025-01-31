import axios from "axios";
import { saveAs } from "file-saver";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "http://localhost:9999/api", // Set your backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to attach tokens and IP
axiosInstance.interceptors.request.use(async (config) => {
  const token = sessionStorage.getItem("token"); // Retrieve token from sessionStorage
  const ip = await getPublicIp();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
  }
  config.headers["x-real-ip"] = ip; // Attach IP to headers

  return config;
});

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response.data;
  },
  (error) => {
    // Handle errors
    if (error.response?.status === 401) {
      // Token expired, attempt to refresh
      refreshToken();
    }
    return Promise.reject(error);
  }
);

// Utility function to get public IP
const getPublicIp = async () => {
  try {
    const response = await axios.get("https://api.ipify.org?format=json");
    return response.data.ip;
  } catch (error) {
    console.error("Failed to fetch public IP:", error);
    return "127.0.0.1"; // Fallback IP
  }
};

// Utility function to refresh token
const refreshToken = async () => {
  const refreshToken = sessionStorage.getItem("refreshToken"); // Retrieve refresh token from sessionStorage
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BASE_URL}/auth/refresh-token`,
      {
        refreshToken,
      }
    );

    // Save the new token to sessionStorage
    sessionStorage.setItem("token", response.data.accessToken);
  } catch (error) {
    console.error("Failed to refresh token:", error);
    // Redirect to login or handle token refresh failure
    sessionStorage.removeItem("token"); // Clear token if refresh fails
    sessionStorage.removeItem("refreshToken");
    window.location.href = "/login"; // Redirect to login page
  }
};

// API Service Class
class ApiService {
  /**
   * GET request
   * @param {string} path - API endpoint
   * @param {object} params - Query parameters
   */
  async get(path, params = {}) {
    return axiosInstance.get(path, { params });
  }

  /**
   * POST request
   * @param {string} path - API endpoint
   * @param {object} body - Request body
   */
  async post(path, body) {
    return axiosInstance.post(path, body);
  }

  /**
   * PUT request
   * @param {string} path - API endpoint
   * @param {object} body - Request body
   */
  async put(path, body) {
    return axiosInstance.put(path, body);
  }

  /**
   * DELETE request
   * @param {string} path - API endpoint
   */
  async delete(path) {
    return axiosInstance.delete(path);
  }

  /**
   * POST request with FormData (for file uploads)
   * @param {string} path - API endpoint
   * @param {FormData} formData - FormData object
   */
  async postFormData(path, formData) {
    return axiosInstance.post(path, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  /**
   * Download a file
   * @param {string} path - API endpoint
   * @param {object} body - Request body
   * @param {string} fileName - Name of the file to save
   */
  async downloadFile(path, body, fileName) {
    const response = await axiosInstance.post(path, body, {
      responseType: "blob",
    });
    const blob = new Blob([response.data]);
    saveAs(blob, fileName);
  }
}

// Export a singleton instance of the ApiService
// eslint-disable-next-line import/no-anonymous-default-export
export default new ApiService();
