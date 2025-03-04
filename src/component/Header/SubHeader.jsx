import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SubHeader = () => {
  const { authContextData } = useAuth();
  const { isAuthenticated, userRole } = authContextData;

  return (
    <div className="fixed left-0 z-40 w-full p-2 text-white bg-gray-700 top-20">
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
                        `text-lg ${
                          isActive
                            ? "text-yellow-400"
                            : "hover:text-gray-400 no-underline"
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
                        `text-lg ${
                          isActive
                            ? "text-yellow-400"
                            : "hover:text-gray-400 no-underline"
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
                        `text-lg ${
                          isActive
                            ? "text-yellow-400"
                            : "hover:text-gray-400 no-underline"
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
                        `text-lg ${
                          isActive
                            ? "text-yellow-400"
                            : "hover:text-gray-400 no-underline"
                        }`
                      }
                    >
                      Delivery Charges
                    </NavLink>
                  </li>
                  <li className="flex items-center no-underline ">
                    <NavLink
                      to="/order-management"
                      className={({ isActive }) =>
                        `text-lg ${
                          isActive
                            ? "text-yellow-400"
                            : "hover:text-gray-400 no-underline"
                        }`
                      }
                    >
                      Order Management
                    </NavLink>
                  </li>
                  <li className="relative group">
                    <div className="flex items-center space-x-1 cursor-pointer">
                      <span className="text-lg">Reports</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </div>
                    <ul className="absolute hidden p-2 space-y-2 text-white align-middle bg-gray-700 rounded-md group-hover:block w-max">
                      <li>
                        <NavLink
                          to="/system-user-status"
                          className="block px-4 py-2 text-center no-underline hover:bg-gray-500"
                        >
                          System User Status
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/inventory-stock-report"
                          className="block px-4 py-2 text-center no-underline hover:bg-gray-500"
                        >
                          Inventory Stock Report
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/low-stock-report"
                          className="block px-4 py-2 text-center no-underline hover:bg-gray-500"
                        >
                          Low Stock Report
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/sales-revenue-report"
                          className="block px-4 py-2 text-center no-underline hover:bg-gray-500"
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
