import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../Stylesheets/Signup.css";

const CreateAccount = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Name: ${name}, Email: ${email}, Password: ${password}`);
  };
  return (
    <div className="create-account-container">
      <div className="login-title">
        <h1>EazyDine HUB</h1>
        <p>A taste you'll remember.</p>
      </div>
      <div className="create-account-form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Enter your name"
          />
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
          <button type="submit">Create Account</button>
          <p>Already have an account? <Link to="/cusLogin" style={{ textDecoration: 'none' }}>Log In</Link></p>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
