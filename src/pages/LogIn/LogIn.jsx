import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { sampleUsers } from "../../data/sampleUsers"; // Import sample user data

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth(); // Destructure `login` (not `LogIn`)
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Find the user in the sample data
    const user = sampleUsers.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      // Simulate successful login
      const token = "fake-token";
      const userData = { name: "Admin", email: user.email, role: "admin" }; // Add user data
      login(token, userData); // Use `login` (not `LogIn`)
      navigate("/"); // Redirect to home page
    } else {
      // Display error message for invalid credentials
      setError("Invalid email or password");
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
