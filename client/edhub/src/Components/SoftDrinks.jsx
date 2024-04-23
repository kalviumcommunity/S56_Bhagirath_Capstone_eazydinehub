import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Stylesheets/dish.css"
export function SoftDrinks() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    async function fetchDishes() {
      try {
        const response = await axios.get('https://s56-bhagirath-capstone-eazydinehub.onrender.com/dishes/softdrinks');
        console.log(response.data)
        setDishes(response.data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    }

    fetchDishes();
  }, []);

  const addToCart = (dish) => {
    console.log('Added to cart:', dish);
  };

  return (
    <div>
      <h2 style={{textAlign:"center",marginTop:"15px"}}>Soft Drinks</h2>
      <div className="dish-list">
        {dishes.map((dish, index) => (
          <div className="dish-card" key={index}>
            <div
              className="dish-image"
              style={{ backgroundImage: `url(${dish.dishLink})` }}
            ></div>
            <div className="dish-details">
              <h3>{dish.dishName}</h3>
              <h3>Rs. {dish.dishPrice}</h3>
            </div>
              <button onClick={() => addToCart(dish)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}


export function EditSoftDrinks() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    async function fetchDishes() {
      try {
        const response = await axios.get('https://s56-bhagirath-capstone-eazydinehub.onrender.com/dishes/softdrinks');
        console.log(response.data)
        setDishes(response.data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    }

    fetchDishes();
  }, []);
  const handleClick = async (dishId) => {
    try {
      await axios.delete(`https://s56-bhagirath-capstone-eazydinehub.onrender.com/delete/${dishId}`);
      console.log('Soft drink deleted successfully');
      window.location.reload()
    } catch (error) {
      console.error('Error deleting soft drink:', error);
    }
  };

  return (
    <div>
      <h2 style={{textAlign:"center",marginTop:"15px"}}>Soft Drinks</h2>
      <div className="dish-list">
        {dishes.map((dish, index) => (
          <div className="dish-card" key={index}>
            <div
              className="dish-image"
              style={{ backgroundImage: `url(${dish.dishLink})` }}
            ></div>
            <div className="dish-details">
              <h3>{dish.dishName}</h3>
              <h3>Rs. {dish.dishPrice}</h3>
            </div>
            <button style={{backgroundColor:"green"}}>EDIT</button>
            <button style={{backgroundColor:"red"}} onClick={()=>handleClick(dish._id)}>DELETE</button>
          </div>
        ))}
      </div>
    </div>
  );
}

