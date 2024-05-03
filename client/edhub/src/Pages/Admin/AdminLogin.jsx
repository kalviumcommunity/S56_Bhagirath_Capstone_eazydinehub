import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Stylesheets/Login.css";

const AdminLogin = () => {
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://s56-bhagirath-capstone-eazydinehub.onrender.com/adminlogin', {
        adminEmail,
        adminPassword
      });

      if (response.status >= 200 && response.status < 300) {
        console.log('hii');
        toast.success('Login successful', {
          autoClose: 2000,
          onClose: () => {
            sessionStorage.setItem('token', response.data.token);
            const token = sessionStorage.getItem("token");
          }
        });
      }else if(token){
        console.log('hii1');
		navigate("/adminlanding");
	  } else {
        console.log('hii2');
        toast.error('Login failed');
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
      <div className="login-form" style={{height:"180px"}}>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            name="email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            required
            placeholder="Enter your email address"
          />
          <input
            type="password"
            id="password"
            name="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            required
            placeholder="Enter your password"
          />
          <button type="submit">Log In</button>
        </form>
      </div>
      <ToastContainer position='top-center' style={{width:"300px"}}/> 
    </div>
  );
};

export default AdminLogin;
