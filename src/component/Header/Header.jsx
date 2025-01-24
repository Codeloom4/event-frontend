import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">
          Eventify
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="hover:text-gray-400">
                Home
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-gray-400">
                Events
              </Link>
            </li>
            {isAuthenticated && (
              <li>
                <Link to="/profile" className="hover:text-gray-400">
                  Profile
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <button
              onClick={logout}
              className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Logout
            </button>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
