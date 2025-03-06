import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthenticationService from "../../service/AuthenticationService";
import Logo from "../../assets/logo/mainLogo.svg";
import CommonTextField from "../../component/Form/CommonTextField";
import CommonButton from "../../component/Form/CommonButton";
import { displayApiMessage } from "../../context/ToastContext";
import { USER_ROLES } from "../../utils/constants";

const LogIn = () => {
  const [userLogIn, setUserLogIn] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const formOnChange = (e) => {
    const { name, value, type } = e.target;
    setUserLogIn((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const onClickAdd = async () => {
    try {
      // Call AuthenticationService to log in the user
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
          accessCode, // Keep as string if API sends it as a string
          username: userLogIn.username,
        };

        login(authData);

        // Debugging: Check the value of accessCode
        console.log("Access Code:", accessCode);

        // Navigate based on accessCode
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
          console.log("Navigating to Reset Password");
          // navigate("/reset-password");
          displayApiMessage(accessMsg);
        } else if (accessCode === "2") {
          console.log("Displaying message for accessCode 2");
          displayApiMessage(
            "Your account requires attention. Please contact support."
          );
        }
      } else {
        setError("Invalid username or password");
        return;
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Error in login:", err);
    }
  };

  return (
    <>
      {/* Fixed Header */}
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

            {/* Ensure button width matches input fields */}
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
    </>
  );
};

export default LogIn;
