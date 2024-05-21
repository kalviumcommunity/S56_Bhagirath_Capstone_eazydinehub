import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Stylesheets/Signup.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
const AddDishes = () => {
  const navigate = useNavigate()
  const [dishName, setDishName] = useState('');
  const [dishCategory, setDishCategory] = useState('');
  const [dishLink, setDishLink] = useState('');
  const [dishPrice,setDishPrice] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    axios.post('https://s56-bhagirath-capstone-eazydinehub.onrender.com/create-dishes', {
      dishName,
      dishCategory,
      dishLink,
      dishPrice
    })
    .then(response => {
      const data = response.data;
      if (response.status === 201) {
        toast.success(data.message,{
          autoClose:2000,
          onClose: () => {
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
            value={dishName}
            onChange={(e) => setDishName(e.target.value)}
            required
            placeholder="Enter dish name"
          />
          <input
            type="text"
            id="dishCategory"
            name="category"
            value={dishCategory}
            onChange={(e) => setDishCategory(e.target.value)}
            required
            placeholder="Enter dish category"
          />
          <input
            type="text"
            id="dishLink"
            name="link"
            value={dishLink}
            onChange={(e) => setDishLink(e.target.value)}
            required
            placeholder="Enter image Link"
          />
          <input
            type="text"
            id="dishPrice"
            name="Price"
            value={dishPrice}
            onChange={(e) => setDishPrice(e.target.value)}
            required
            placeholder="Enter dish Price"
          />
          <button type="submit">Create Dish</button>
        </form>
      </div>
      <ToastContainer position='top-center'/> 
    </div>
  );
};

export default AddDishes;
