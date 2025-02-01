import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import UserManagement from "../../service/UserManagement"; // Import UserManagement

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from AuthContext

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call UserManagement to perform the sign-up API call
      const response = await UserManagement.signUp({
        fullName,
        email,
        password,
        mobileNumber,
        address,
      });

      if (response.status === 201 && response.data?.accessToken) {
        const { accessToken } = response.data;

        // Update global state using the login function from AuthContext
        login(accessToken, email);

        // Redirect to home page after successful sign-up
        navigate("/");
      } else {
        setError("Sign-up failed. Please try again.");
      }
    } catch (err) {
      setError("Sign-up failed. Please try again.");
      console.error("Sign-up error:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-stretch bg-gray-100">
      {/* Left div with 45% width */}
      <div className="h-screen w-[45%] flex flex-col justify-center bg-gray-800">
        <h4 className="text-center text-3xl font-bold text-white mb-8 px-4">
          Discover tailored events. Sign up for personalized recommendations
          today!
        </h4>
      </div>

      {/* Right div with remaining space */}
      <div className="h-screen w-[55%] bg-white shadow-lg flex flex-col justify-center items-center px-8">
        <form className="w-full max-w-sm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="fullName"
            >
              Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Enter your e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="mobileNumber"
            >
              Mobile Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="mobileNumber"
              type="text"
              placeholder="Enter your mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          {error && (
            <p className="text-red-500 text-sm text-center mb-4">{error}</p>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Create Account
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:text-blue-700">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
