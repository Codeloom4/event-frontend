import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import Logo from "../../assets/logo/mainLogo.svg";
import SignUpButton from "../Buttons/SignUpButton";
import { FaUserCircle } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import CommonModal from "../../component/Modal/CommonModal";
import SignUpForm from "../../pages/SignUp/SignUpForm";
import { FaTicketAlt, FaWifi } from "react-icons/fa";
import { RESPONSE_CODES, USER_ROLES } from "../../utils/constants";
import EventsService from "../../service/EventsService";

const Header = () => {
  const { authContextData, logout, services, userRole } = useAuth(); // Access services from AuthContext
  const navigate = useNavigate();

  const { isAuthenticated, username } = authContextData; // Destructure from authContextData
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

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

  // Handle click on a service dropdown item
  const handleServiceClick = (eventType) => {
    // You can add further functionality here, e.g., routing or filtering
    console.log("Selected Event Type:", eventType);
    // Example: navigate(`/services/${eventType}`);
  };

  // Open modal for adding or updating an event
  const openModal = (event = null) => {
    setSelectedEvent(event);
    setIsUpdate(!!event);
    setShowModal(true);
  };

  return (
    <header className="fixed top-0 left-0 z-50 w-full p-4 text-white bg-gray-800">
      <div className="flex items-center justify-between w-full">
        {/* Logo Section */}
        <NavLink
          to="/"
          className="flex items-center space-x-2 text-2xl font-bold color"
        >
          <img src={Logo} alt="Eventify" className="h-10" />
          <span className="flex items-center h-10 text-4xl font-extrabold text-yellow-400 no-underline">
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
                    `text-2xl ${
                      isActive
                        ? "text-yellow-400 hover:text-yellow-400  "
                        : "hover:text-gray-400 no-underline"
                    }`
                  }
                >
                  Home
                </NavLink>
              </li>
              {/* Other navigation links */}
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `text-2xl ${
                      isActive
                        ? "text-yellow-400 hover:text-yellow-400  "
                        : "hover:text-gray-400 no-underline"
                    }`
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `text-2xl ${
                      isActive
                        ? "text-yellow-400 hover:text-yellow-400  "
                        : "hover:text-gray-400 no-underline"
                    }`
                  }
                >
                  Contact
                </NavLink>
              </li>

              {isAuthenticated ? (
                <>
                  <li>
                    <NavLink
                      to="/inventory-management"
                      className={({ isActive }) =>
                        isActive
                          ? "text-yellow-400 text-2xl underline hover:text-yellow-400 text-2xl"
                          : "hover:text-gray-400 text-2xl"
                      }
                    >
                      Inventory
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/item-management"
                      className={({ isActive }) =>
                        isActive
                          ? "text-yellow-400 text-2xl underline hover:text-yellow-400 text-2xl"
                          : "hover:text-gray-400 text-2xl"
                      }
                    >
                      Item
                    </NavLink>
                  </li>
                </>
              ) : null}
              {/* {isAuthenticated && (
              )} */}

              {/* Add Reports Dropdown for ADMIN and EMPLOYEE */}
              {(userRole === USER_ROLES.ADMIN ||
                userRole === USER_ROLES.EMPLOYEE) && (
                <li className="relative group">
                  <div className="flex items-center space-x-1 cursor-pointer">
                    <span className="text-2xl">Reports</span>
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
                  <ul className="absolute hidden p-2 space-y-2 text-white bg-gray-700 rounded-md group-hover:block">
                    <li>
                      <NavLink
                        to="/system-user-status"
                        className="block px-4 py-2 hover:bg-gray-600"
                      >
                        System User Status
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/inventory-stock-report"
                        className="block px-4 py-2 hover:bg-gray-600"
                      >
                        Inventory Stock Report
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/low-stock-report"
                        className="block px-4 py-2 hover:bg-gray-600"
                      >
                        Low Stock Report
                      </NavLink>
                    </li>

                    <li>
                      <NavLink
                        to="/sales-revenue-report"
                        className="block px-4 py-2 hover:bg-gray-600"
                      >
                        Sales Revenue Report
                      </NavLink>
                    </li>
                  </ul>
                </li>
              )}
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
                <ul className="absolute hidden p-2 space-y-2 text-white bg-gray-700 rounded-md group-hover:block">
                  {services.map((service, index) => (
                    <li key={index}>
                      <NavLink to={`/services/${service.eventType}`}>
                        <button
                          onClick={() => handleServiceClick(service.eventType)}
                          className="block w-full px-4 py-2 text-left hover:bg-gray-600"
                        >
                          {service.description}
                        </button>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </nav>
        </div>

        {/* Authentication Buttons: Aligned to the right */}
        <div className="flex space-x-4">
          {isAuthenticated ? (
            <div className="relative">
              {/* Profile Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center px-4 py-2 space-x-2 text-white transition-all duration-300 bg-gray-700 rounded-full hover:bg-gray-600"
              >
                <FaUserCircle className="w-8 h-8 text-gray-300" />
                <span className="text-lg font-medium">{username}</span>
                <MdArrowDropDown className="w-6 h-6" />
              </button>

              {/* Dropdown Menu */}
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

      {/* Add/Update Event Modal */}
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
