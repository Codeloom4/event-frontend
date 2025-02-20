import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [userrole, setUserrole] = useState(null);

  // Check for token and user data in sessionStorage on initial load
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userrole = sessionStorage.getItem("userrole");
    const username = sessionStorage.getItem("username");

    if (token && username && userrole) {
      setIsAuthenticated(true);
      setUser({ username });
      setUserrole({ userrole });
    }
  }, []);

  // Login function (updates state and sessionStorage)
  const login = (token, username, userrole) => {
    // Save token and username in sessionStorage
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("username", username);
    sessionStorage.setItem("userrole", userrole);

    // Update state
    setIsAuthenticated(true);
    setUser({ username });
    setUserrole({ userrole });
  };

  // Logout function (clears state and sessionStorage)
  const logout = () => {
    // Clear token and user data from sessionStorage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("userrole");

    // Update state
    setIsAuthenticated(false);
    setUser(null);
    setUserrole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, userrole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
