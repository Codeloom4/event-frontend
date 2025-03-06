import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Logo from "../../assets/logo/mainLogo.svg";
import { FaUserCircle } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import CommonModal from "../../component/Modal/CommonModal";
import SignUpForm from "../../pages/SignUp/SignUpForm";
import { USER_ROLES } from "../../utils/constants";

const Header = () => {
  const { authContextData, logout, services = [] } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, username, userRole } = authContextData;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
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
    navigate("/home");
  };

  const openModal = (event = null) => {
    setIsUpdate(!!event);
    setShowModal(true);
  };

  const getNavLinkClass = ({ isActive }) =>
    `text-xl font-semibold px-4 py-2 rounded-md transition-all duration-300 items-center ${
      isActive ? "text-white bg-[#0e4d5e]" : "text-gray-300 hover:text-white"
    } no-underline`;

  return (
    <header
      className="fixed top-0 left-0 z-50 w-full px-4 py-3 text-white shadow-lg"
      style={{ background: "linear-gradient(135deg, #001B2B, #003E4F)" }}
    >
      <div className="flex items-center justify-between w-full">
        <NavLink
          to="/home"
          className="flex items-center space-x-2 text-2xl font-bold no-underline hover:scale-105 transition-transform duration-300"
        >
          <img src={Logo} alt="Eventify" className="h-12" />
          <span className="text-5xl font-extrabold text-white">Eventify</span>
        </NavLink>

        {/* Navigation Links */}
        <div>
          <nav>
            <ul className="flex items-center m-0 space-x-4">
              {userRole === USER_ROLES.ADMIN ||
              userRole === USER_ROLES.EMPLOYEE ? (
                <li>
                  <NavLink to="/dashboard" className={getNavLinkClass}>
                    Dashboard
                  </NavLink>
                </li>
              ) : (
                <li>
                  <NavLink to="/home" className={getNavLinkClass}>
                    Home
                  </NavLink>
                </li>
              )}
              <li className="relative group">
                <div className="flex items-center justify-center px-4 py-2 text-xl font-semibold text-gray-300 transition-all duration-300 rounded-md cursor-pointer hover:text-white">
                  <span>Services</span>
                  <MdArrowDropDown className="w-6 h-6 ml-1" />
                </div>
                <ul
                  className="absolute hidden p-2 space-y-2 text-center text-white transform -translate-x-1/2 bg-gradient-to-r from-[#105657] to-[#121a1f] border border-gray-700 rounded-md shadow-lg left-1/2 group-hover:block w-max"
                  style={{ background: "linear-gradient(135deg, #001B2B, #003E4F)" }}
                >
                  {services.map((service, index) => (
                    <li key={index}>
                      <NavLink
                        to={`/services/${service.eventType}`}
                        className={getNavLinkClass}
                        style={{ fontSize: "1rem" }}
                      >
                        {service.description}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                <NavLink to="/about" className={getNavLinkClass}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className={getNavLinkClass}>
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink to="/gallery" className={getNavLinkClass}>
                  Gallery
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>

        {/* Auth Section */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center px-4 py-2 text-gray-300 transition-all duration-300 bg-[#0e4d5e] rounded-full hover:bg-gray-700"
              >
                <FaUserCircle className="w-8 h-8" />
                <span className="ml-2 text-lg font-medium">{username}</span>
                <MdArrowDropDown className="w-6 h-6 ml-1" />
              </button>
              {dropdownOpen && (
                <div
                  className="absolute right-0 w-40 mt-2 bg-gradient-to-r from-[#105657] to-[#121a1f] border border-gray-700 rounded-md shadow-lg"
                  style={{ background: "linear-gradient(135deg, #001B2B, #003E4F)" }}
                >
                  {userRole === USER_ROLES.ADMIN && (
                    <button
                      onClick={openModal}
                      className="block w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700"
                    >
                      Create User
                    </button>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full px-4 py-2 text-left text-gray-300 hover:text-white hover:bg-gray-700"
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
                className="px-6 py-2 text-xl text-gray-300 no-underline transition-all duration-300 hover:text-white"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="px-6 py-2 text-xl text-white bg-[#0e4d5e] rounded-lg hover:bg-[#105657] transition-colors duration-300"
              >
                Sign Up
              </NavLink>
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