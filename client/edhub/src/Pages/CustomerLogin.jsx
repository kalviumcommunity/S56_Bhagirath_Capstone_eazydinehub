import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import "../Stylesheets/Login.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="login-container">
      <div className="login-title">
        <h1>EazyDine HUB</h1>
        <p>A taste you'll remember.</p>
      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter your email address"
          />
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
          <button type="submit">Log In</button>
          <p>OR</p>
          <Link to="/create-account" style={{ textDecoration: 'none' }}>
            <button style={{ background: "#008000" }}>Create New Account</button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
