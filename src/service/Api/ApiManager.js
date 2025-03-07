import axios from "axios";

const BASE_URL = "http://localhost:9999"; // Replace with your backend base URL

const ApiManager = {
  // POST request (generic)
  apiPost: async (endpoint, data, headers = {}) => {
    try {
      const savedAuthData = sessionStorage.getItem("authContextData");
      const authContextData = savedAuthData ? JSON.parse(savedAuthData) : null;
      const token = authContextData?.token; // Extract token
      console.log("token issssssssssss");
      console.log(token);
      const response = await axios.post(`${BASE_URL}${endpoint}`, data, {
        headers: {
          ...headers,
          // "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      return response;
    } catch (error) {
      console.error("POST request failed:", error);
      throw error;
    }
  },

  // Special method for login
  apiPostLogin: async (endpoint, data) => {
    try {
      const response = await axios.post(`${BASE_URL}${endpoint}/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response;
    } catch (error) {
      console.error("Login request failed:", error);
      throw error;
    }
  },

  // // GET request
  // apiGet: async (endpoint, params = {}) => {
  //   try {
  //     // const token = sessionStorage.getItem("token");
  //         // Retrieve authContextData from sessionStorage
  //   const savedAuthData = sessionStorage.getItem("authContextData");
  //   const authContextData = savedAuthData ? JSON.parse(savedAuthData) : null;
  //   const token = authContextData?.token; // Extract token

  //   console.log("Token from authContextData:", token); // Debugging

  //     const response = await axios.get(`${BASE_URL}${endpoint}`, {
  //       headers: {
  //         Authorization: token ? `Bearer ${token}` : "",
  //       },
  //       params,

  //     });
  //     return response;
  //   } catch (error) {
  //     console.error("GET request failed:", error);
  //     throw error;
  //   }
  // },

  // GET request
  apiGet: async (endpoint, params = {}, config = {}) => {
    try {
      // Retrieve authContextData from sessionStorage
      const savedAuthData = sessionStorage.getItem("authContextData");
      const authContextData = savedAuthData ? JSON.parse(savedAuthData) : null;
      const token = authContextData?.token; // Extract token

      console.log("Token from authContextData:", token); // Debugging

      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        params, // Query parameters
        ...config, // Pass additional config (e.g., responseType: "blob")
      });
      return response;
    } catch (error) {
      console.error("GET request failed:", error);
      throw error;
    }
  },

  // New method for public API calls (no token required)
  apiGetPublic: async (endpoint, params = {}, config = {}) => {
    try {
      const response = await axios.get(`${BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json", // Optional: Add any required headers
        },
        params, // Query parameters
        ...config, // Pass additional config (e.g., responseType: "blob")
      });
      return response;
    } catch (error) {
      console.error("Public GET request failed:", error);
      throw error;
    }
  },

  // PUT request
  apiPut: async (endpoint, data) => {
    try {
      const savedAuthData = sessionStorage.getItem("authContextData");
      const authContextData = savedAuthData ? JSON.parse(savedAuthData) : null;
      const token = authContextData?.token; // Extract token
      const response = await axios.put(`${BASE_URL}${endpoint}`, data, {
        headers: {
          // "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      return response;
    } catch (error) {
      console.error("PUT request failed:", error);
      throw error;
    }
  },

  // DELETE request
  apiDelete: async (endpoint) => {
    try {
      const savedAuthData = sessionStorage.getItem("authContextData");
      const authContextData = savedAuthData ? JSON.parse(savedAuthData) : null;
      const token = authContextData?.token; // Extract token
      const response = await axios.delete(`${BASE_URL}${endpoint}`, {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
      });
      return response;
    } catch (error) {
      console.error("DELETE request failed:", error);
      throw error;
    }
  },
};

export default ApiManager;
