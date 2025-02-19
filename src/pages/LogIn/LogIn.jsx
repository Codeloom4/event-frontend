import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import AuthenticationService from "../../service/AuthenticationService"; // Import AuthenticationService
import Logo from "../../assest/logo/mainLogo.svg";

const LogIn = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call AuthenticationService to perform the login API call
      const response = await AuthenticationService.login(username, password);

      if (response.status === 200 && response.data?.accessToken) {
        const { accessToken, userRole } = response.data;

        // Update global state using the login function from AuthContext
        login(accessToken, username, userRole);

        // Redirect to home page after successful login
        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error("Login error:", err);
    }
  };

  return (
    <>
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 z-50 w-full p-4 text-white bg-gray-800">
        <div className="container flex items-center justify-between mx-auto">
          {/* Logo Section */}
          <NavLink
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold color"
          >
            <img src={Logo} alt="Eventify" className="h-10" />
            <span className="flex items-center h-10 text-4xl font-extrabold text-yellow-400">
              Eventify
            </span>
          </NavLink>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-stretch min-h-screen pt-16 bg-gray-100">
        {/* Fixed Left Div (45% width) */}
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-[45%] flex flex-col justify-center bg-gray-800">
          <h4 className="px-4 mb-8 text-3xl font-bold text-center text-white">
            Discover tailored events. Sign in for personalized recommendations
            today!
          </h4>
        </div>

        {/* Fixed Right Div (55% width) */}
        <div className="ml-[45%] w-[55%] bg-white shadow-lg flex flex-col justify-center items-center px-8">
          <form className="w-full max-w-sm" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <p className="mb-4 text-sm text-center text-red-500">{error}</p>
            )}
            <div className="flex items-center justify-between">
              <button
                className="border rounded w-full bg-[#2B293D] hover:bg-[#3A3752] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Log In
              </button>
            </div>
            <p className="mt-4 text-sm text-gray-600">
              Don’t have an account?{" "}
              <a href="/signup" className="text-blue-500 hover:text-blue-700">
                Sign Up
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
