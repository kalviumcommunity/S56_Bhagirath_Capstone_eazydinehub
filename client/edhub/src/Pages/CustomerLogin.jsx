import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../Stylesheets/Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://your-api-domain/login', {
        email,
        password
      });
      const data = response.data;
      if (response.status === 200) {
        alert('Login successful');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
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
