import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SoftDrinks() {
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    async function fetchDishes() {
      try {
        const response = await axios.get('https://s56-bhagirath-capstone-eazydinehub.onrender.com/dishes/softdrinks');
        setDishes(response.data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      }
    }

    fetchDishes();
  }, []);

  return (
    <div>
      <h2>Soft Drinks</h2>
      <div className="dish-list">
        {dishes.map((dish, index) => (
          <div className="dish-card" key={index}>
            <img src={dish.image} alt={dish.dishName} />
            <div className="dish-details">
              <h3>{dish.dishName}</h3>
              <p><strong>Price:</strong> {dish.dishPrice}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SoftDrinks;
