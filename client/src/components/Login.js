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
    <div>
      <h1>Lexington PB Tournament Login</h1>
      <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}

export default Login;