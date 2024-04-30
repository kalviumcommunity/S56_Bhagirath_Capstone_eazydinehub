import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Stylesheets/Signup.css";
import axios from "axios";

const CreateChef = () => {
  const [chefName, setchefName] = useState('');
  const [chefEmail, setchefEmail] = useState('');
  const [chefPassword, setchefPassword] = useState('');
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    axios.post('https://s56-bhagirath-capstone-eazydinehub.onrender.com/createchef', {
      chefName,
      chefEmail,
      chefPassword
    })
    .then(response => {
      const data = response.data;
      if (response.status === 201) {
        toast.success('Chef Created successfully',{
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
            value={chefName}
            onChange={(e) => setchefName(e.target.value)}
            required
            placeholder="Enter Chef Name"
          />
          <input
            type="email"
            id="email"
            name="email"
            value={chefEmail}
            onChange={(e) => setchefEmail(e.target.value)}
            required
            placeholder="Enter Chef Email Address"
          />
          <input
            type="password"
            id="password"
            name="password"
            value={chefPassword}
            onChange={(e) => setchefPassword(e.target.value)}
            required
            placeholder="Enter Chef Password"
          />
          <button type="submit">Create Account</button>
        </form>
      </div>
      <ToastContainer position='top-center'/> 
    </div>
  );
};

export default CreateChef;
