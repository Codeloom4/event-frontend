import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { MdArrowDropDown } from "react-icons/md";

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
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsReportsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const getNavLinkClass = ({ isActive }) =>
    `text-sm font-semibold px-3 py-1 rounded-md transition-all duration-300 items-center ${
      isActive ? "text-white bg-[#1a6b6c]" : "text-gray-300 hover:text-white"
    } no-underline`;

  return (
    <div
      className="fixed left-0 z-40 w-full p-1 text-white border-b border-gray-600 shadow-lg"
      style={{
        background: "linear-gradient(135deg, #001B2B, #003E4F)",
        top: "5rem", // Adjusted to match Header height
      }} 
    >
      <div className="container mx-auto">
        <nav>
          <ul className="flex justify-center m-0 space-x-4">
            {isAuthenticated &&
              (userRole === "ADMIN" || userRole === "EMPLOYEE") && (
                <>
                  <li className="flex items-center">
                    <NavLink to="/event-management" className={getNavLinkClass}>
                      Event Management
                    </NavLink>
                  </li>
                  <li className="flex items-center">
                    <NavLink
                      to="/inventory-management"
                      className={getNavLinkClass}
                    >
                      Inventory Management
                    </NavLink>
                  </li>
                  <li className="flex items-center">
                    <NavLink to="/item-management" className={getNavLinkClass}>
                      Item Management
                    </NavLink>
                  </li>
                  <li className="flex items-center">
                    <NavLink
                      to="/transport-management"
                      className={getNavLinkClass}
                    >
                      Delivery Charges
                    </NavLink>
                  </li>
                  <li className="flex items-center">
                    <NavLink to="/order-management" className={getNavLinkClass}>
                      Order Management
                    </NavLink>
                  </li>
                  <li className="relative group" ref={dropdownRef}>
                    <div className="flex items-center justify-center px-3 py-1 font-semibold text-gray-300 transition-all duration-300 rounded-md cursor-pointer text-sm hover:text-white">
                      <span>Reports</span>
                      <MdArrowDropDown className="w-5 h-5 ml-1" />
                    </div>
                    <ul
                      className="absolute hidden p-2 space-y-2 text-center text-white transform -translate-x-1/2 bg-gradient-to-r from-[#105657] to-[#121a1f] border border-gray-700 rounded-md shadow-lg left-1/2 group-hover:block w-max"
                      style={{
                        background: "linear-gradient(135deg, #001B2B, #003E4F)",
                      }}
                    >
                      <li>
                        <NavLink
                          to="/system-user-status"
                          className={getNavLinkClass}
                          style={{ fontSize: "0.8rem" }}
                        >
                          System User Status
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/inventory-stock-report"
                          className={getNavLinkClass}
                          style={{ fontSize: "0.8rem" }}
                        >
                          Inventory Stock Report
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/low-stock-report"
                          className={getNavLinkClass}
                          style={{ fontSize: "0.8rem" }}
                        >
                          Low Stock Report
                        </NavLink>
                      </li>
                      <li>
                        <NavLink
                          to="/sales-revenue-report"
                          className={getNavLinkClass}
                          style={{ fontSize: "0.8rem" }}
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