import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assest/logo/mainLogo.svg";
import SignUpButton from "../Buttons/SignUpButton";
import { FaTicketAlt, FaWifi } from "react-icons/fa";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate("/"); // Redirect to home page after logout
  };

  console.log("isAuthenticated", isAuthenticated);

  return (
    <header className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-50">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo Section */}
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
                      ? "text-yellow-400 text-2xl underline hover:text-yellow-400 text-2xl"
                      : "hover:text-gray-400 text-2xl"
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
                      ? "text-yellow-400 text-2xl underline hover:text-yellow-400 text-2xl"
                      : "hover:text-gray-400 text-2xl"
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
                      ? "text-yellow-400 text-2xl underline hover:text-yellow-400 text-2xl"
                      : "hover:text-gray-400 text-2xl"
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
                      ? "text-yellow-400 text-2xl underline hover:text-yellow-400 text-2xl"
                      : "hover:text-gray-400 text-2xl"
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Authentication Buttons: Aligned to the right */}
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <>
              <div>
                <nav>
                  <ul className="flex space-x-4">
                    <li>
                      <NavLink
                        to="/create-event"
                        className={({ isActive }) =>
                          `flex justify-center items-center ${
                            isActive
                              ? "text-yellow-400 text-2xl underline hover:text-yellow-400"
                              : "hover:text-gray-400 text-2xl"
                          }`
                        }
                      >
                        Create Event
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/tickets"
                        className={({ isActive }) =>
                          `flex flex-col items-center ${
                            isActive
                              ? "text-yellow-400 underline hover:text-yellow-400"
                              : "hover:text-gray-400"
                          }`
                        }
                      >
                        <FaTicketAlt className="text-lg mb-1" /> {/* Icon */}
                        <span className="text-md">Tickets</span> {/* Text */}
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/internets"
                        className={({ isActive }) =>
                          `flex flex-col items-center ${
                            isActive
                              ? "text-yellow-400 underline hover:text-yellow-400"
                              : "hover:text-gray-400"
                          }`
                        }
                      >
                        <FaWifi className="text-lg mb-1" /> {/* Icon */}
                        <span className="text-md">Internets</span> {/* Text */}
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
              <button
                onClick={handleLogout}
                className="h-10 w-10 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-full transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="text-2xl hover:text-white px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg"
              >
                Login
              </NavLink>
              <SignUpButton /> {/* Use the new SignUpButton component */}
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
