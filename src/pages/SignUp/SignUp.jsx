import React from "react";
import Logo from "../../assets/logo/mainLogo.svg";
import { NavLink } from "react-router-dom";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <>
      <header className="fixed top-0 left-0 z-50 w-full p-4 text-white bg-gray-800">
        <div className="container flex items-center justify-between mx-auto">
          <NavLink
            to="/home"
            className="flex items-center space-x-2 text-2xl font-bold color"
          >
            <img src={Logo} alt="Eventify" className="h-10" />
            <span className="flex items-center h-10 text-4xl font-extrabold text-yellow-400">
              Eventify
            </span>
          </NavLink>
        </div>
      </header>

      <div className="flex items-stretch min-h-screen pt-12 bg-gray-100">
        <div className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-[45%] flex flex-col justify-center bg-gray-800">
          <h4 className="px-4 mb-8 text-3xl font-bold text-center text-white">
            Discover tailored events. Sign up for personalized recommendations
            today!
          </h4>
        </div>

        <div className="ml-[45%] w-[55%] bg-white shadow-lg flex flex-col justify-center items-center px-8 my-2 h-screen">
          <SignUpForm />
        </div>
      </div>
    </>
  );
};

export default SignUp;
