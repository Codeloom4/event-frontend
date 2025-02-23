import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assest/logo/mainLogo.svg";
import SignUpButton from "../Buttons/SignUpButton";
import { FaTicketAlt, FaWifi } from "react-icons/fa";
import { RESPONSE_CODES, USER_ROLES } from "../../utils/constants";
import EventsService from "../../service/EventsService";

const Header = () => {
  const { isAuthenticated, userrole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate("/"); // Redirect to home page after logout
  };

  const [isOpen, setIsOpen] = useState(false);
  const [serviceList, setServiceList] = useState([]);

  const retrieveServices = async () => {
    const serviceResponse = await EventsService.getEventsList();
    // console.log(serviceResponse);
    // if (serviceResponse.data.responseCode === RESPONSE_CODES.SUCCESS) {
    setServiceList(serviceResponse.data);
    // } else {
    //   navigate("/");
    // }
  };

  useEffect(() => {
    retrieveServices();
  }, []);

  return (
    <header className="fixed top-0 left-0 z-50 w-full p-4 text-white bg-gray-800">
      <div className="container flex items-center justify-between mx-auto">
        {/* Logo Section */}
        <NavLink
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold color"
        >
          <img src={Logo} alt="Eventify" className="h-10" />
          <span className="flex items-center h-10 text-4xl font-extrabold text-yellow-400">
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
              <li className="relative">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-2xl hover:text-gray-400 focus:outline-none"
                >
                  Services ▼
                </button>
                {isOpen && (
                  <ul className="absolute left-0 w-48 mt-2 bg-white border border-gray-200 rounded-md shadow-lg">
                    {serviceList.map((service, index) => (
                      <li key={index}>
                        <NavLink
                          to={`/services/${service.id}`}
                          className={({ isActive }) =>
                            `block px-4 py-2 text-lg ${
                              isActive ? "text-yellow-400" : "text-gray-700"
                            } hover:bg-gray-100`
                          }
                          onClick={() => setIsOpen(false)}
                        >
                          {service.eventType}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
              {isAuthenticated &&
                [USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE].includes(
                  userrole.userrole
                ) && (
                  <li>
                    <NavLink
                      to="/event-management"
                      className={({ isActive }) =>
                        isActive
                          ? "text-yellow-400 text-2xl underline hover:text-yellow-400 text-2xl"
                          : "hover:text-gray-400 text-2xl"
                      }
                    >
                      Event Managemnt
                    </NavLink>
                  </li>
                )}
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
              {isAuthenticated &&
                [USER_ROLES.ADMIN, USER_ROLES.EMPLOYEE].includes(
                  userrole.userrole
                ) && (
                  <li>
                    <NavLink
                      to="/inventory-management"
                      className={({ isActive }) =>
                        isActive
                          ? "text-yellow-400 text-2xl underline hover:text-yellow-400 text-2xl"
                          : "hover:text-gray-400 text-2xl"
                      }
                    >
                      Inventory Management
                    </NavLink>
                  </li>
                )}
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
                        <FaTicketAlt className="mb-1 text-lg" /> {/* Icon */}
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
                        <FaWifi className="mb-1 text-lg" /> {/* Icon */}
                        <span className="text-md">Internets</span> {/* Text */}
                      </NavLink>
                    </li>
                  </ul>
                </nav>
              </div>
              <button
                onClick={handleLogout}
                className="w-10 h-10 px-4 py-2 text-white transition-all duration-300 bg-red-500 rounded-full hover:bg-red-700 hover:shadow-lg hover:scale-105"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className="px-6 py-2 text-2xl transition-all duration-300 rounded-lg hover:text-white hover:shadow-lg"
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
