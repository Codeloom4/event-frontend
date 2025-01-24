import React from "react";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return (
      <p className="text-center mt-10">Please log in to view your profile.</p>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-6">Profile</h2>
        <p>Welcome to your profile!</p>
        <button
          onClick={logout}
          className="mt-4 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
