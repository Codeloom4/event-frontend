import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/logo/mainLogo.svg";
import SignUpButton from "../Buttons/SignUpButton";
import { FaUserCircle } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import CommonModal from "../../component/Modal/CommonModal";
import SignUpForm from "../../pages/SignUp/SignUpForm";
import { USER_ROLES } from "../../utils/constants";

const Header = () => {
  const { authContextData, logout, services = [] } = useAuth();
  const navigate = useNavigate();
  const { isAuthenticated, username, userRole } = authContextData;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (servicesRef.current && !servicesRef.current.contains(event.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const openModal = (event = null) => {
    setIsUpdate(!!event);
    setShowModal(true);
  };

  const getNavLinkClass = ({ isActive }) =>
    `text-xl font-semibold px-4 py-2 rounded-md transition-all duration-300 ${
      isActive ? "text-yellow-400 bg-gray-700" : "hover:text-yellow-400"
    } no-underline`;

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full px-6 py-4 bg-gray-800 shadow-lg"
      text-white
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo Section */}
        <NavLink
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold no-underline"
        >
          <img src={Logo} alt="Eventify" className="h-12" />
          <span className="text-5xl font-extrabold text-yellow-400">
            Eventify
          </span>
        </NavLink>

        {/* Navigation Links: Centered in the middle. */}
        <div>
          <nav>
            <ul className="flex space-x-4 m-0">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-2xl ${
                      isActive || window.location.pathname === "/dashboard"
                        ? "text-yellow-400 hover:text-yellow-400  "
                        : "hover:text-gray-400 no-underline"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              {/* Services Dropdown */}
              <li className="relative group">
                <div className="flex items-center space-x-1 cursor-pointer">
                  <span className="text-2xl">Services</span>
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
                  {services.map((service, index) => (
                    <li key={index}>
                      <NavLink
                        to={`/services/${service.eventType}`}
                        className="block px-4 py-2 text-white rounded-md hover:bg-gray-600 no-underline"
                      >
                        {service.description}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
            <NavLink to="/about" className={getNavLinkClass}>
              About
            </NavLink>
            <NavLink to="/contact" className={getNavLinkClass}>
              Contact
            </NavLink>
            <NavLink to="/gallery" className={getNavLinkClass}>
              Gallery
            </NavLink>
          </nav>
        </div>

        {/* Auth Section */}
        <div className="flex space-x-4 items-center">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center px-4 py-2 text-white transition-all duration-300 bg-gray-700 rounded-full hover:bg-gray-600"
              >
                <FaUserCircle className="w-8 h-8 text-gray-300" />
                <span className="text-lg font-medium ml-2">{username}</span>
                <MdArrowDropDown className="w-6 h-6 ml-1" />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 w-40 mt-2 bg-gray-700 rounded-md shadow-lg">
                  {userRole === USER_ROLES.ADMIN && (
                    <button
                      onClick={openModal}
                      className="block w-full px-4 py-2 text-left text-white hover:bg-gray-600"
                    >
                      Create User
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-white hover:bg-gray-600"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-6">
              <NavLink
                to="/login"
                className="px-6 py-2 text-xl transition-all duration-300 rounded-lg hover:text-yellow-400 no-underline"
              >
                Login
              </NavLink>
              <SignUpButton />
            </div>
          )}
        </div>
      </div>

      {/* Add/Update User Modal */}
      <CommonModal
        showModal={showModal}
        size="lg"
        handleClose={() => setShowModal(false)}
        title={isUpdate ? "Update User" : "Add User"}
      >
        <SignUpForm />
      </CommonModal>
    </header>
  );
};

export default Header;
