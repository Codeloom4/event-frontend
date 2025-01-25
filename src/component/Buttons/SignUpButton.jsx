import React from "react";
import { NavLink } from "react-router-dom";

const SignUpButton = () => {
  return (
    <NavLink
      to="/signup"
      className="inline-block px-6 py-2 text-xl font-semibold text-white bg-yellow-400 rounded-lg transition-all duration-300 hover:bg-yellow-600 hover:shadow-lg"
    >
      Sign Up
    </NavLink>
  );
};

export default SignUpButton;
