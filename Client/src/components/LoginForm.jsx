import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {

  const [isResetMode, setIsResetMode] = useState(false);

  // Login form states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Reset password form states
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      if (res.data.success) {
        localStorage.setItem("isLoggedIn", true);
        navigate("/dashboard");
      } else {
        alert("Login failed");
      }
    } catch (error) {
      alert("Error during login. Try again.");
    }
  };

  // Handle password reset
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

    try {
      // Simulating a backend password reset logic with basic validation
      const res = await axios.post("http://localhost:5000/api/auth/reset", {
        oldPassword,
        newPassword,
      });

      if (res.data.success) {
        alert("Password reset successful! Please login again.");
        setIsResetMode(false);
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        alert(res.data.message || "Failed to reset password.");
      }
    } catch (error) {
      alert("Error during password reset. Check console.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl text-center font-bold mb-4">
        {isResetMode ? "Reset Password" : "Login"}
      </h2>

      {isResetMode ? (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <input
            type="password"
            placeholder="Old Password"
            className="w-full h-10 p-6 border border-gray-300 focus:outline-purple-600 rounded-md"
            onChange={e => setOldPassword(e.target.value)}
            value={oldPassword}
            required
          />
          <input
            type="password"
            placeholder="New Password"
            className="w-full h-10 p-6 border border-gray-300 focus:outline-purple-600 rounded-md"
            onChange={e => setNewPassword(e.target.value)}
            value={newPassword}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            className="w-full h-10 p-6 border border-gray-300 focus:outline-purple-600 rounded-md"
            onChange={e => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />
          <button className="w-full bg-gradient-to-r from-[#A55EEA] to-[#648DFD] text-white px-6 py-2 rounded-lg cursor-pointer">
            Reset Password
          </button>
          <p className="text-center text-sm text-blue-600 cursor-pointer" onClick={() => setIsResetMode(false)}>
            Back to login
          </p>
        </form>
      ) : (
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full h-10 p-6 border border-gray-300 focus:outline-purple-600 rounded-md"
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full h-10 p-6 border border-gray-300 focus:outline-purple-600 rounded-md"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button className="w-full bg-gradient-to-r from-[#A55EEA] to-[#648DFD] text-white px-6 py-2 rounded-lg cursor-pointer">
            Login
          </button>
          <p className="text-center text-sm text-blue-600 cursor-pointer" onClick={() => setIsResetMode(true)}>
            Forgot Password?
          </p>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
