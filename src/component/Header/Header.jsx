import React from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Add useNavigate
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate("/"); // Navigate to the root after logout
  };

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold">
          Eventify
        </NavLink>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 underline hover:text-yellow-400"
                    : "hover:text-gray-400"
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/events"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-400 underline hover:text-yellow-400"
                    : "hover:text-gray-400"
                }
              >
                Events
              </NavLink>
            </li>
            {isAuthenticated && (
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-400 underline hover:text-yellow-400"
                      : "hover:text-gray-400"
                  }
                >
                  Profile
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout} // Use handleLogout instead of logout directly
              className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <NavLink
                to="/login"
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
