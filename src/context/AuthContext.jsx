import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authContextData, setAuthContextData] = useState({
    isAuthenticated: false,
    token: null,
    userRole: null,
    accessCode: null,
    username: null, // You can add more fields as required
  });

  // Check for token and user data in sessionStorage on initial load
  useEffect(() => {
    const savedAuthData = sessionStorage.getItem("authContextData");

    if (savedAuthData) {
      const parsedData = JSON.parse(savedAuthData);
      setAuthContextData(parsedData);
    }
  }, []);

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
    <AuthContext.Provider value={{ authContextData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
