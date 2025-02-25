import React, { createContext, useContext, useState, useEffect } from "react";
import PublicService from "../service/PublicService"; // Import PublicService

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authContextData, setAuthContextData] = useState({
    isAuthenticated: false,
    token: null,
    userRole: null,
    accessCode: null,
    username: null,
  });

  const [services, setServices] = useState([]); // Add services state

  // Check for token and user data in sessionStorage on initial load
  useEffect(() => {
    const savedAuthData = sessionStorage.getItem("authContextData");

    if (savedAuthData) {
      const parsedData = JSON.parse(savedAuthData);
      setAuthContextData(parsedData);
    }

    // Fetch services data when the app initializes
    fetchServices();
  }, []);

  // Fetch services data using PublicService
  const fetchServices = async () => {
    try {
      const response = await PublicService.getServices();
      if (response.data.responseCode === "00") {
        setServices(response.data.content); // Store the services data
        console.log(response.data.content)
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    }
  };

  // Login function (updates state and sessionStorage)
  const login = (authData) => {
    // Save the full auth context data in sessionStorage
    sessionStorage.setItem("authContextData", JSON.stringify(authData));

    // Update state
    setAuthContextData(authData);
  };

  // Logout function (clears state and sessionStorage)
  const logout = () => {
    // Clear all auth context data from sessionStorage
    sessionStorage.removeItem("authContextData");

    // Update state
    setAuthContextData({
      isAuthenticated: false,
      token: null,
      userRole: null,
      accessCode: null,
      username: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authContextData,
        login,
        logout,
        services, // Add services to the context value
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);