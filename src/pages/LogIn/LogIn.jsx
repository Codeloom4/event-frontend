import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthenticationService from "../../service/AuthenticationService";
import Logo from "../../assets/logo/mainLogo.svg";
import CommonTextField from "../../component/Form/CommonTextField";
import CommonButton from "../../component/Form/CommonButton";
import { displayApiMessage } from "../../context/ToastContext";
import { USER_ROLES } from "../../utils/constants";
import CommonModal from "../../component/Modal/CommonModal";
import ResetPassword from "./ResetPassword";

const LogIn = () => {
  const [userLogIn, setUserLogIn] = useState({});
  const [resetPasswordUsername, setResetPasswordUsername] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { authContextData, login } = useAuth(); // ✅ Get authContextData from AuthContext

  const formOnChange = (e) => {
    const { name, value, type } = e.target;
    setUserLogIn((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const openModal = () => {
    console.log("Opening Reset Password Modal...");
    setShowModal(true);
  };

  const closeModal = () => {
    console.log("Closing Modal...");
    setShowModal(false);
  };

  const onClickAdd = async () => {
    try {
      const response = await AuthenticationService.login(
        userLogIn.username,
        userLogIn.password
      );

      if (response.status === 200 && response.data?.accessToken) {
        const { accessToken, userRole, accessMsg, accessCode } = response.data;
        const authData = {
          isAuthenticated: true,
          token: accessToken,
          userRole,
          accessCode,
          username: userLogIn.username,
        };

        console.log("Login Response:", response.data);
        console.log("Access Code:", accessCode);

        if (accessCode === "0") {
          console.log("Navigating to Home");
          displayApiMessage(accessMsg);
          console.log("User Role:", userRole);
          if (
            userRole == USER_ROLES.ADMIN ||
            userRole == USER_ROLES.EMPLOYEE
          ) {
            navigate("/dashboard");
          } else {
            navigate("/home");
          }
        } else if (accessCode === "1") {
          if (userRole === "CLIENT") {
            console.log("Navigating to Home");
            displayApiMessage(userLogIn.username + ' Log in successful! Redirecting to home...');
            login(authData);
            navigate("/");
          } else {
            console.log("Opening modal for Reset Password...");
            setResetPasswordUsername(userLogIn.username);
            setShowModal(true); // ✅ Ensure modal state updates before login
            displayApiMessage(accessMsg, "warning");

            // ✅ Update token in AuthContext without calling login(authData)
            const updatedAuthData = {
              ...authContextData, // Keep existing authContextData
              token: authData.token, // Set the new token
            };

            login(updatedAuthData); // ✅ Update context without overriding accessCode
          }
        } else if (accessCode === "2") {
          console.log("Displaying message for accessCode 2");
          displayApiMessage(
            "Your account requires attention. Please contact support."
          );
        }
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Error in login:", err);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 z-50 w-full p-4 text-white bg-gray-800">
        <div className="container flex items-center justify-between mx-auto">
          <NavLink
            to="/home"
            className="flex items-center space-x-2 text-2xl font-bold"
          >
            <img src={Logo} alt="Eventify" className="h-10" />
            <span className="text-4xl font-extrabold text-yellow-400">
              Eventify
            </span>
          </NavLink>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-stretch h-screen bg-gray-100">
        {/* Left Section */}
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-[45%] flex flex-col justify-center bg-gray-800 p-4">
          <h4 className="mb-8 text-3xl font-bold text-center text-white">
            Discover tailored events. Sign in for personalized recommendations
            today!
          </h4>
        </div>

        {/* Right Section */}
        <div className="ml-[45%] w-[55%] bg-white shadow-lg flex flex-col justify-center items-center px-8 h-screen">
          <form className="w-full max-w-md min-w-sm">
            <div className="flex flex-col gap-4 mb-4">
              <CommonTextField
                id="username"
                name="username"
                label="Username"
                value={userLogIn.username || ""}
                onChange={formOnChange}
              />

              <CommonTextField
                id="password"
                name="password"
                label="Password"
                type="password"
                value={userLogIn.password || ""}
                onChange={formOnChange}
              />
            </div>

            {error && (
              <p className="mb-4 text-sm text-center text-red-500">{error}</p>
            )}

            <div className="w-full">
              <CommonButton
                type="button"
                label="Login"
                onClick={onClickAdd}
                className="w-full"
              />
            </div>

            <p className="mt-4 text-sm text-gray-600">
              Don’t have an account?{" "}
              <NavLink
                to="/signup"
                className="text-blue-500 hover:text-blue-700"
              >
                Sign Up
              </NavLink>
            </p>
          </form>
        </div>
      </div>

      {/* Modal for Reset Password */}
      <CommonModal
        showModal={showModal}
        handleClose={closeModal}
        title="Reset Password"
      >
        <ResetPassword username={resetPasswordUsername} />
      </CommonModal>
    </>
  );
};

export default LogIn;
