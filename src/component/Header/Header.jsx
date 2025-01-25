import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assest/logo/mainLogo.svg";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* logo section */}
        <NavLink
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold color"
        >
          <img src={Logo} alt="Eventify" className="h-10" />
          <span className="h-10 flex items-center text-yellow-400 text-4xl font-extrabold">
            Eventify
          </span>
        </NavLink>
        {/* Navigation Links: Centered in the middle. */}
        <div>
          <nav>
            <ul className="flex space-x-4">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-400 text-xl underline hover:text-yellow-400 text-xl font-extrabold"
                      : "hover:text-gray-400 text-xl font-extrabold"
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
                      ? "text-yellow-400 text-xl underline hover:text-yellow-400 text-xl font-extrabold"
                      : "hover:text-gray-400 text-xl font-extrabold"
                  }
                >
                  Events
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-400 text-xl underline hover:text-yellow-400 text-xl font-extrabold"
                      : "hover:text-gray-400 text-xl font-extrabold"
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "text-yellow-400 text-xl underline hover:text-yellow-400 text-xl font-extrabold"
                      : "hover:text-gray-400 text-xl font-extrabold"
                  }
                >
                  Contact
                </NavLink>
              </li>
              {isAuthenticated && (
                <li>
                  <NavLink
                    to="/create-event"
                    className={({ isActive }) =>
                      isActive
                        ? "text-yellow-400 text-xl underline hover:text-yellow-400 text-xl font-extrabold"
                        : "hover:text-gray-400 text-xl font-extrabold"
                    }
                  >
                    Create Event
                  </NavLink>
                </li>
              )}
            </ul>
          </nav>
        </div>
        {/* Authentication Buttons: Aligned to the right */}
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
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
