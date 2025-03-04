import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SubHeader = () => {
  const { authContextData } = useAuth();
  const { isAuthenticated, userRole } = authContextData;
  const [isReportsDropdownOpen, setIsReportsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleReportsDropdown = () => {
    setIsReportsDropdownOpen(!isReportsDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsReportsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="fixed left-0 z-40 w-full p-3 text-white bg-gray-700 top-20">
      <div className="container mx-auto">
        <nav>
          <ul className="flex justify-center m-0 space-x-6">
            {isAuthenticated &&
              (userRole === "ADMIN" || userRole === "EMPLOYEE") && (
                <>
                  <li className="flex items-center">
                    <NavLink
                      to="/event-management"
                      className={({ isActive }) =>
                        `text-lg no-underline ${
                          isActive
                            ? "text-yellow-400 font-semibold"
                            : "hover:text-gray-300 transition-colors duration-300"
                        }`
                      }
                    >
                      Event Management
                    </NavLink>
                  </li>
                  <li className="flex items-center">
                    <NavLink
                      to="/inventory-management"
                      className={({ isActive }) =>
                        `text-lg no-underline ${
                          isActive
                            ? "text-yellow-400 font-semibold"
                            : "hover:text-gray-300 transition-colors duration-300"
                        }`
                      }
                    >
                      Inventory Management
                    </NavLink>
                  </li>
                  <li className="flex items-center">
                    <NavLink
                      to="/item-management"
                      className={({ isActive }) =>
                        `text-lg no-underline ${
                          isActive
                            ? "text-yellow-400 font-semibold"
                            : "hover:text-gray-300 transition-colors duration-300"
                        }`
                      }
                    >
                      Item Management
                    </NavLink>
                  </li>
                  <li className="flex items-center">
                    <NavLink
                      to="/transport-management"
                      className={({ isActive }) =>
                        `text-lg no-underline ${
                          isActive
                            ? "text-yellow-400 font-semibold"
                            : "hover:text-gray-300 transition-colors duration-300"
                        }`
                      }
                    >
                      Delivery Charges
                    </NavLink>
                  </li>
                  <li className="flex items-center">
                    <NavLink
                      to="/order-management"
                      className={({ isActive }) =>
                        `text-lg no-underline ${
                          isActive
                            ? "text-yellow-400 font-semibold"
                            : "hover:text-gray-300 transition-colors duration-300"
                        }`
                      }
                    >
                      Order Management
                    </NavLink>
                  </li>
                  <li className="relative group" ref={dropdownRef}>
                    <button
                      onClick={toggleReportsDropdown}
                      className="flex items-center space-x-1 text-lg focus:outline-none"
                    >
                      <span className="text-blue-600 hover:text-gray-300 transition-colors duration-300">
                        Reports
                      </span>
                      <svg
                        className={`w-4 h-4 transition-transform duration-300 ${
                          isReportsDropdownOpen ? "transform rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    <ul
                      className={`absolute left-0 mt-2 p-2 space-y-2 text-white bg-gray-800 rounded-md shadow-lg transition-opacity duration-300 ${
                        isReportsDropdownOpen
                          ? "opacity-100 block"
                          : "opacity-0 hidden pointer-events-none"
                      }`}
                    >
                      <li>
                        <NavLink
                          to="/system-user-status"
                          className="block px-4 py-2 no-underline hover:bg-gray-700 rounded-md transition-colors duration-300"
                        >
                          System User Status
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/inventory-stock-report"
                          className="block px-4 py-2 no-underline hover:bg-gray-700 rounded-md transition-colors duration-300"
                        >
                          Inventory Stock Report
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/low-stock-report"
                          className="block px-4 py-2 no-underline hover:bg-gray-700 rounded-md transition-colors duration-300"
                        >
                          Low Stock Report
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/sales-revenue-report"
                          className="block px-4 py-2 no-underline hover:bg-gray-700 rounded-md transition-colors duration-300"
                        >
                          Sales Revenue Report
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SubHeader;