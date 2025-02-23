import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const SubHeader = () => {
  const { authContextData } = useAuth();
  const { isAuthenticated, userRole } = authContextData;

  return (
    <div className="fixed top-20 left-0 z-40 w-full h-14 p-3 bg-gray-700 text-white ">
      <div className="container mx-auto">
        <nav>
          <ul className="flex justify-center space-x-6">
            {isAuthenticated && (userRole === "ADMIN" || userRole === "EMPLOYEE") && (
              <li className="flex items-center">
                <NavLink
                  to="/create-event"
                  className={({ isActive }) =>
                    `text-lg ${
                      isActive ? "text-yellow-400" : "hover:text-gray-400 no-underline"
                    }`
                  }
                >
                  Event Categories
                </NavLink>
              </li>
            )}

            {isAuthenticated && (
              <li className="flex items-center">
                <NavLink
                  to="/inventory"
                  className={({ isActive }) =>
                    `text-lg ${
                      isActive ? "text-yellow-400" : "hover:text-gray-400 no-underline"
                    }`
                  }
                >
                  Package Management
                </NavLink>
              </li>
            )}

            {isAuthenticated && (
              <li className="flex items-center">
                <NavLink
                  to="/inventory"
                  className={({ isActive }) =>
                    `text-lg ${
                      isActive ? "text-yellow-400" : "hover:text-gray-400 no-underline"
                    }`
                  }
                >
                  Inventory Control
                </NavLink>
              </li>
            )}

            {isAuthenticated && (userRole === "ADMIN" || userRole === "EMPLOYEE") && (
              <li className="flex items-center">
                <NavLink
                  to="/transport-management"
                  className={({ isActive }) =>
                    `text-lg ${
                      isActive ? "text-yellow-400" : "hover:text-gray-400 no-underline"
                    }`
                  }
                >
                  Delivery Charges
                </NavLink>
              </li>
            )}

            {isAuthenticated && (
              <li className="flex items-center">
                <NavLink
                  to="/inventory"
                  className={({ isActive }) =>
                    `text-lg ${
                      isActive ? "text-yellow-400" : "hover:text-gray-400 no-underline"
                    }`
                  }
                >
                  Customers
                </NavLink>
              </li>
            )}

            {isAuthenticated && (
              <li className="flex items-center no-underline ">
                <NavLink 
                  to="/inventory"
                  className={({ isActive }) =>
                    `text-lg ${
                      isActive ? "text-yellow-400" : "hover:text-gray-400 no-underline"
                    }`
                  }
                >
                  Order Management
                </NavLink>
              </li>
            )}

            {(userRole === "ADMIN" || userRole === "EMPLOYEE") && (
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
                <ul className="absolute hidden p-2 space-y-2 text-white bg-gray-600 rounded-md group-hover:block z-60 top-9">
                  <li>
                    <NavLink
                      to="/system-user-status"
                      className="block px-4 py-2 hover:bg-gray-500 no-underline"
                    >
                      System User Status
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/inventory-stock-report"
                      className="block px-4 py-2 hover:bg-gray-500 no-underline"
                    >
                      Inventory Stock Report
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/low-stock-report"
                      className="block px-4 py-2 hover:bg-gray-500 no-underline"
                    >
                      Low Stock Report
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/sales-revenue-report"
                      className="block px-4 py-2 hover:bg-gray-500 no-underline"
                    >
                      Sales Revenue Report
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}

            
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SubHeader;