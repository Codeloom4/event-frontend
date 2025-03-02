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
    <header className="fixed top-0 left-0 z-50 w-full px-6 py-4 bg-gray-800 shadow-lg">
      <div className="flex">
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

        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-6">
            <NavLink to="/" className={getNavLinkClass}>
              Home
            </NavLink>
            <div className="relative" ref={servicesRef}>
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="text-xl font-semibold text-blue-600 px-4 py-2 rounded-md transition-all duration-300 hover:text-yellow-400 flex items-center space-x-1"
              >
                <span>Services</span>
                <MdArrowDropDown className="w-6 h-6" />
              </button>
              {servicesOpen && (
                <ul className="absolute left-0 p-2 mt-2 space-y-2 bg-gray-700 rounded-md shadow-lg min-w-[150px]">
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
                  {/* </ul> */}

                  <li>
                    <NavLink
                      to="/about"
                      className={({ isActive }) => getNavLinkClass(isActive)}
                    >
                      About
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/contact"
                      className={({ isActive }) => getNavLinkClass(isActive)}
                    >
                      Contact
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/gallery"
                      className={({ isActive }) => getNavLinkClass(isActive)}
                    >
                      Gallery
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/grouping-management"
                      className={({ isActive }) => getNavLinkClass(isActive)}
                    >
                      Participant Grouping
                    </NavLink>
                  </li>
                </ul>
              )}
            </div>
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
