import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login({ onLogin, switchToRegister }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      onLogin(res.data.token);
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  return (
    <div className="container">
      <h1>Login</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin} className="btn btn-primary me-2">Login</button>
      <p>Don't have an account? <button onClick={switchToRegister} className="btn btn-link">Register</button></p>
    </div>
  );
}

function Register({ onRegister, switchToLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.');
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError('Password must contain at least one uppercase letter.');
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError('Password must contain at least one lowercase letter.');
      return;
    }
    if (!/\d/.test(password)) {
      setError('Password must contain at least one digit.');
      return;
    }
    if (!/[^A-Za-z0-9]/.test(password)) {
      setError('Password must contain at least one special character.');
      return;
    }

    // Additional checks for strong password can be added here

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        password
      });
      onRegister();
    } catch (error) {
      setError(error.response.data.msg);
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    // Reset error message when password is changed
    setError('');
  };

  return (
    <div className="container">
      <h1>Register</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="mb-3">
        <label htmlFor="username" className="form-label">Username</label>
        <input
          type="text"
          className="form-control"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      <button onClick={handleRegister} className="btn btn-primary me-2">Register</button>
      <p>Already have an account? <button onClick={switchToLogin} className="btn btn-link">Login</button></p>
    </div>
  );
}


function App() {
  const [token, setToken] = useState('');
  const [showRegister, setShowRegister] = useState(false);

  const handleLogin = (token) => {
    setToken(token);
  };

  const handleRegister = () => {
    alert('User registered successfully');
    setShowRegister(false);
  };

  const switchToRegister = () => {
    setShowRegister(true);
  };

  const switchToLogin = () => {
    setShowRegister(false);
  };

  return (
    <div>
      {!token ? (
        showRegister ? (
          <Register onRegister={handleRegister} switchToLogin={switchToLogin} />
        ) : (
          <Login onLogin={handleLogin} switchToRegister={switchToRegister} />
        )
      ) : (
        <p>Welcome! You are logged in.</p>
      )}
    </div>
  );
}

export default App;
