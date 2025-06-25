import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginForm = () => {
    
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/auth/login', { username, password });
    if (res.data.success) {
      localStorage.setItem("isLoggedIn", true);
      navigate("/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl text-center font-bold mb-4">Admin</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input type="text" placeholder="Username" className="w-full h-10 p-6 border border-gray-300 focus:outline-purple-600 rounded-md" onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" className="w-full h-10 p-6 border border-gray-300 focus:outline-purple-600 rounded-md" onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-gradient-to-r from-[#A55EEA] to-[#648DFD] text-white px-6 py-2 rounded-lg cursor-pointer">Login</button>
      </form>
    </div>
  );
}


export default LoginForm;