import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check for token and user data in sessionStorage on initial load
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    if (token && username) {
      setIsAuthenticated(true);
      setUser({ username });
    }
  }, []);

  // Login function (updates state and sessionStorage)
  const login = (token, username) => {
    // Save token and username in sessionStorage
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("username", username);

    // Update state
    setIsAuthenticated(true);
    setUser({ username });
  };

  // Logout function (clears state and sessionStorage)
  const logout = () => {
    // Clear token and user data from sessionStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");

    // Update state
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
