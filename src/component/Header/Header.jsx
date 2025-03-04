import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
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
    navigate("/");
  };

  const openModal = (event = null) => {
    setIsUpdate(!!event);
    setShowModal(true);
  };

  const getNavLinkClass = ({ isActive }) =>
    `text-xl font-semibold px-6 py-2 rounded-md transition-all duration-300 ${
      isActive
        ? "text-yellow-400 bg-gray-700 shadow-md"
        : "hover:text-yellow-400"
    } no-underline`;

  return (
    <header className="fixed top-0 left-0 z-50 w-full px-6 py-4 bg-gray-800 shadow-lg text-white">
      <div className="flex items-center justify-between w-full">
        <NavLink
          to={
            isAuthenticated &&
            (userRole === USER_ROLES.ADMIN || userRole === USER_ROLES.EMPLOYEE)
              ? "/dashboard"
              : "/"
          }
          className="flex items-center space-x-2 text-2xl font-bold no-underline"
        >
          <img src={Logo} alt="Eventify" className="h-12" />
          <span className="text-5xl font-extrabold text-yellow-400">
            Eventify
          </span>
        </NavLink>

        <nav>
          <ul className="flex space-x-14 m-0">
            <li>
              <NavLink
                to={
                  isAuthenticated &&
                  (userRole === USER_ROLES.ADMIN ||
                    userRole === USER_ROLES.EMPLOYEE)
                    ? "/dashboard"
                    : "/"
                }
                className={getNavLinkClass}
              >
                Home
              </NavLink>
            </li>
            <li
              className="relative"
              ref={servicesRef}
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              <NavLink
                to="#"
                className={`${
                  location.pathname.startsWith("/services/")
                    ? "text-yellow-400 bg-gray-700 shadow-md"
                    : "hover:text-yellow-400"
                } ${getNavLinkClass({
                  isActive: servicesOpen,
                })} cursor-pointer`}
              >
                Services <MdArrowDropDown className="inline-block ml-1" />
              </NavLink>
              {servicesOpen && (
                <ul className="absolute left-0 w-48 mt-2 bg-gray-700 rounded-md shadow-lg text-white">
                  {services.map((service, index) => (
                    <li key={index}>
                      <NavLink
                        to={`/services/${service.eventType}`}
                        className={`block px-4 py-2 no-underline ${
                          selectedService === service.eventType
                            ? "bg-gray-600"
                            : "hover:bg-gray-600"
                        }`}
                        onClick={() => setSelectedService(service.eventType)}
                      >
                        {service.description}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
            {isAuthenticated &&
              (userRole === USER_ROLES.ADMIN ||
                userRole === USER_ROLES.EMPLOYEE) && (
                <li>
                  <NavLink to="/package" className={getNavLinkClass}>
                    Package
                  </NavLink>
                </li>
              )}
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
