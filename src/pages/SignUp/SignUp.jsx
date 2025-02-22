import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Logo from "../../assets/logo/mainLogo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import UserManagement from "../../service/UserManagement";
import RowRadioButtonsGroup from "../../component/InputFields/RowRadioButtonsGroup";

const SignUp = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNo, setMobileNumber] = useState("");
  const [position, setPosition] = useState("");
  const [roles, setRoles] = useState([]);
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRoleChange = (role) => {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await UserManagement.signUp({
        username,
        email,
        password,
        position,
        roles,
        mobileNo,
        address,
        enabled: "true",
      });

      if (response.status === 201 && response.data?.accessToken) {
        const { accessToken } = response.data;
        login(accessToken, email);
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
    <>
      <header className="bg-gray-800 text-white p-4 fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <NavLink
            to="/"
            className="flex items-center space-x-2 text-2xl font-bold color"
          >
            <img src={Logo} alt="Eventify" className="h-10" />
            <span className="h-10 flex items-center text-yellow-400 text-4xl font-extrabold">
              Eventify
            </span>
          </NavLink>
        </div>
      </header>

      <div className="min-h-screen flex items-stretch bg-gray-100 pt-12">
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-[45%] flex flex-col justify-center bg-gray-800">
          <h4 className="text-center text-3xl font-bold text-white mb-8 px-4">
            Discover tailored events. Sign up for personalized recommendations
            today!
          </h4>
        </div>

        <div className="ml-[45%] w-[55%] bg-white shadow-lg flex flex-col justify-center items-center px-8">
          <form className="w-full max-w-sm" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                User Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="Enter your user name"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
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
                htmlFor="position"
              >
                Position
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="position"
                type="text"
                placeholder="Enter your position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="role"
              >
                Role
              </label>
              <FormGroup>
                <RowRadioButtonsGroup
                  options={[
                    { value: "ADMIN", label: "Administration" },
                    { value: "EMPLOYEE", label: "Employee" },
                    { value: "CUSTOMER", label: "Customer" },
                  ]}
                  selectedValue={roles[0] || ""}
                  onChange={(role) => setRoles([role])}
                />
              </FormGroup>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="mobileNo"
              >
                Mobile Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="mobileNo"
                type="text"
                placeholder="Enter your mobile number"
                value={mobileNo}
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
                className="border rounded w-full bg-[#2B293D] hover:bg-[#3A3752] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
    </>
  );
};

export default SignUp;
