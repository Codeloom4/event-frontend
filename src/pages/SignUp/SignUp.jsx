import React, { useState } from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import Logo from "../../assets/logo/mainLogo.svg";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import UserManagementService from "../../service/UserManagementService";
import CommonTextField from "../../component/Form/CommonTextField";
import CommonRadioGroup from "../../component/Form/CommonRadioGroup";
import { Radio } from "@mui/material";
import CommonButton from "../../component/Form/CommonButton";
import { displayApiMessage } from "../../context/ToastContext";

const SignUp = () => {
  const [userSignUp, setUserSignUp] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const formOnChange = (e) => {
    const { name, value, type } = e.target;
    setUserSignUp((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const onClickAdd = async () => {
    try {
      const response = await UserManagementService.signUp({
        userSignUp,
        enabled: true,
      });

      if (response.status === 201 && response.data?.accessToken) {
        const { accessToken } = response.data;
        // login(accessToken, email);
        displayApiMessage("Sign-up successful. Please log in to continue.");
        navigate("/login");
      } else {
        setError("Sign-up failed. Please try again.");
      }
    } catch (err) {
      setError("Sign-up failed. Please try again.");
      console.error("Sign-up error:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await UserManagementService.signUp({
        // username,
        // email,
        // password,
        // position,
        // roles,
        // mobileNo,
        // address,
        // enabled: "true",
      });

      if (response.status === 201 && response.data?.accessToken) {
        const { accessToken } = response.data;
        // login(accessToken, email);
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

        <div className="ml-[45%] w-[55%] bg-white shadow-lg flex flex-col justify-center items-center px-8 my-2 h-screen">
          <form className="w-full max-md min-sm">
            <div className="mb-4 flex flex-col gap-4">
              <CommonTextField
                id="username"
                name="username"
                label="Username"
                value={userSignUp.username || ""}
                onChange={formOnChange}
              />

              <CommonTextField
                id="email"
                name="email"
                label="Email Address"
                type="email"
                value={userSignUp.email || ""}
                onChange={formOnChange}
              />

              <CommonTextField
                id="password"
                name="password"
                label="Password"
                type="password"
                value={userSignUp.password || ""}
                onChange={formOnChange}
              />

              <CommonTextField
                id="position"
                name="position"
                label="Position"
                value={userSignUp.position || ""}
                onChange={formOnChange}
              />

              <CommonRadioGroup name="role" label="Role" row>
                <FormControlLabel
                  value="ADMIN"
                  control={<Radio />}
                  label="Administration"
                  className="text-gray-500 text"
                />
                <FormControlLabel
                  value="EMPLOYEE"
                  control={<Radio />}
                  label="Employee"
                  className="text-gray-500 text"
                />
                <FormControlLabel
                  value="CUSTOMER"
                  control={<Radio />}
                  label="Customer"
                  className="text-gray-500 text"
                />
              </CommonRadioGroup>

              <CommonTextField
                id="mobileNo"
                name="mobileNo"
                label="Mobile Number"
                value={userSignUp.mobileNo || ""}
                onChange={formOnChange}
              />

              <CommonTextField
                id="address"
                name="address"
                label="Address"
                value={userSignUp.address || ""}
                onChange={formOnChange}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center mb-4">{error}</p>
            )}

            <div className="w-full">
              <CommonButton
                type="button"
                label="Sign Up"
                onClick={onClickAdd}
                className="w-full"
              />
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
