import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import AuthenticationService from "../../service/AuthenticationService";
import CommonTextField from "../../component/Form/CommonTextField";
import CommonButton from "../../component/Form/CommonButton";
import { displayApiMessage } from "../../context/ToastContext";

const ResetPassword = () => {
  const { authContextData } = useAuth();
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const formOnChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Password Strength Validation
    // if (name === "newPassword") {
    //   if (value.length < 8) {
    //     setError("Password must be at least 8 characters long.");
    //   } else if (!/[A-Z]/.test(value)) {
    //     setError("Password must contain at least one uppercase letter.");
    //   } else if (!/[a-z]/.test(value)) {
    //     setError("Password must contain at least one lowercase letter.");
    //   } else if (!/\d/.test(value)) {
    //     setError("Password must contain at least one number.");
    //   } else if (!/[\W_]/.test(value)) {
    //     setError("Password must contain at least one special character.");
    //   } else {
    //     setError(""); // Clear error if valid
    //   }
    // }

    // // Confirm Password Matching
    // if (name === "confirmNewPassword") {
    //   if (value !== passwordData.newPassword) {
    //     setError("Passwords do not match.");
    //   } else {
    //     setError(""); // Clear error if they match
    //   }
    // }
  };

  const handleResetPassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      const response = await AuthenticationService.resetPassword(
        passwordData.oldPassword,
        passwordData.newPassword
      );

      if (response.status === 200) {
        displayApiMessage("Password reset successful.");
        navigate("/home");
      } else {
        setError("Failed to reset password.");
      }
    } catch (err) {
      setError("Password reset failed. Please try again.");
      console.error("Error resetting password:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <form className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="mb-4 text-2xl font-bold text-center">Reset Password</h2>
        <div className="flex flex-col gap-4 mb-4">
          <CommonTextField
            id="username"
            name="username"
            label="Username"
            value={authContextData.username}
            disabled
          />
          <CommonTextField
            id="oldPassword"
            name="oldPassword"
            label="Old Password"
            type="password"
            value={passwordData.oldPassword}
            onChange={formOnChange}
          />
          <CommonTextField
            id="newPassword"
            name="newPassword"
            label="New Password"
            type="password"
            value={passwordData.newPassword}
            onChange={formOnChange}
          />
          <CommonTextField
            id="confirmNewPassword"
            name="confirmNewPassword"
            label="Confirm New Password"
            type="password"
            value={passwordData.confirmNewPassword}
            onChange={formOnChange}
          />
        </div>

        {error && (
          <p className="mb-4 text-sm text-center text-red-500">{error}</p>
        )}

        <div className="w-full">
          <CommonButton
            type="button"
            label="Reset Password"
            onClick={handleResetPassword}
            className="w-full"
          />
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;
