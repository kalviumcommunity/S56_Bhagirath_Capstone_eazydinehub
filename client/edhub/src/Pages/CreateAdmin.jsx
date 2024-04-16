import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Stylesheets/Signup.css";
import axios from "axios";

const CreateAdmin = () => {
  const [adminName, setAdminName] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    axios.post('https://s56-bhagirath-capstone-eazydinehub.onrender.com/createadmin', {
      adminName,
      adminEmail,
      adminPassword
    })
    .then(response => {
      const data = response.data;
      if (response.status === 201) {
        toast.success('Admin Created successfully',{
            autoClose:2000,
            onClose: () => {
              localStorage.setItem('token', response.data.token);
              navigate("/adminlanding");
            }
          });
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
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            required
            placeholder="Enter Admin Name"
          />
          <input
            type="email"
            id="email"
            name="email"
            value={adminEmail}
            onChange={(e) => setAdminEmail(e.target.value)}
            required
            placeholder="Enter Admin Email Address"
          />
          <input
            type="password"
            id="password"
            name="password"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            required
            placeholder="Enter Admin Password"
          />
          <button type="submit">Create Account</button>
        </form>
      </div>
      <ToastContainer position='top-center'/> 
    </div>
  );
};

export default CreateAdmin;
