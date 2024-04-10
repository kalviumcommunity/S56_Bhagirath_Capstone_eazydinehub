import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import "../Stylesheets/Login.css";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://s56-bhagirath-capstone-eazydinehub.onrender.com/login', {
        email,
        password
      });
  
      if (response.status === 200) {
        toast.success('Login successful');
        setTimeout(()=>{
          navigate('/landingpage'); 
        },2000)
      } 
    } catch (error) {
      toast.error(error.response.data.error);
    }
  
  }

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
      <ToastContainer position='top-center'/> 
    </div>
  );
};

export default Login;
