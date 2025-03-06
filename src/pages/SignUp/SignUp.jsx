import React from "react";
import Logo from "../../assets/logo/mainLogo.svg";
import { NavLink } from "react-router-dom";
import SignUpForm from "./SignUpForm";

const SignUp = () => {
  return (
    <>
      {/* Header */}
      <header
        className="fixed top-0 left-0 z-50 w-full p-4 text-white shadow-lg"
        style={{ background: "linear-gradient(135deg, #001B2B, #003E4F)"  }}
      >
        <div className="container flex items-center justify-between mx-auto">
          <NavLink
            to="/home"
            className="flex items-center space-x-2 text-2xl font-bold hover:scale-105 transition-transform duration-300"
          >
            <img src={Logo} alt="Eventify" className="h-10" />
            <span className="text-4xl font-extrabold text-white">Eventify</span>
          </NavLink>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex items-stretch min-h-screen pt-12 bg-gray-100">
        {/* Left Section */}
        <div
          className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-[45%] flex flex-col justify-center p-4"
          style={{ background: "linear-gradient(135deg, #001B2B, #003E4F)"  }}
        >
          <h4 className="px-4 mb-8 text-3xl font-bold text-center text-white">
            Discover tailored events. Sign up for personalized recommendations
            today!
          </h4>
        </div>

        {/* Right Section */}
        <div className="ml-[45%] w-[55%] bg-white shadow-lg flex flex-col justify-center items-center px-8 my-2 h-screen">
          <SignUpForm />
        </div>
      </div>
    </>
  );
};

export default SignUp;