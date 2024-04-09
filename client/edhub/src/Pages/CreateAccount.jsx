import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Stylesheets/Signup.css";
import axios from "axios"

const CreateAccount = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    axios.post('http://localhost:3200/signup', {
      name,
      email,
      password
    })
    .then(response => {
      const data = response.data;
      if (response.status === 201) {
        toast.success(data.message);
      } else {
        toast.error(data.error);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again.');
    });
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
      <ToastContainer position='top-center'/> 
    </div>
  );
};

export default CreateAccount;
