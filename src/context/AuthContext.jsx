import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Check for token and user data in sessionStorage on initial load
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userData = sessionStorage.getItem("user");

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  // Login function
  const login = async (username, password) => {
    try {
      const response = await fetch("http://localhost:9999/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const { accessToken } = data;

      // Save token and user data in sessionStorage
      sessionStorage.setItem("token", accessToken);
      sessionStorage.setItem("user", JSON.stringify({ username }));

      // Update state
      setIsAuthenticated(true);
      setUser({ username });

      return true; // Indicate successful login
    } catch (error) {
      console.error("Login error:", error);
      return false; // Indicate failed login
    }
  };

  // Logout function
  const logout = () => {
    // Clear token and user data from sessionStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");

    //Clear token and user data from localStorage
    localStorage.removeItem("token");

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
