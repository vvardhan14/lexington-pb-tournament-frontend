import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ login }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    login(username, password);
    if (username === 'admin') navigate('/admin');
    else navigate('/profile');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pastel-gray">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-pastel-darkGray mb-6 text-center">Lexington PB Tournament</h1>
        <div className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            className="w-full px-4 py-2 border border-pastel-gray rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-blue"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-2 border border-pastel-gray rounded-md focus:outline-none focus:ring-2 focus:ring-pastel-blue"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-pastel-blue text-white py-2 rounded-md hover:bg-pastel-purple transition duration-200"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;