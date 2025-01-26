import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthenticationService from "../../service/AuthenticationService"; // Import AuthenticationService

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the login method from AuthenticationService
      const response = await AuthenticationService.login({
        username: email, // Use email as the username
        password: password,
      });

      if (response.status === 200) {
        // Redirect to home page after successful login
        navigate("/");
      }
    } catch (error) {
      // Display error message for invalid credentials
      setError("Invalid email or password");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">LogIn</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-4 border border-gray-300 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
          >
            LogIn
          </button>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
