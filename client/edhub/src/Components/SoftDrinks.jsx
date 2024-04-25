import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Stylesheets/dish.css"
import "../Stylesheets/Modal.css"

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
  const [showModal, setShowModal] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('')
  const [updatedLink,setUpdatedLink] = useState('')
  const [isUpdating, setIsUpdating] = useState(false); // State to track update operation

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
    const confirmDelete = window.confirm('Are you sure you want to delete this soft drink?');
    console.log(confirmDelete)
    if (confirmDelete) {
      try {
        await axios.delete(`https://s56-bhagirath-capstone-eazydinehub.onrender.com/delete/${dishId}`);
        console.log('Soft drink deleted successfully');
        window.location.reload();
      } catch (error) {
        console.error('Error deleting soft drink:', error);
      }
    }
  };

  const handleEdit = (dish) => {
    setEditingDish(dish);
    setUpdatedName(dish.dishName);
    setUpdatedPrice(dish.dishPrice);
    setUpdatedLink(dish.dishLink)
    setShowModal(true); 
  };

  const handleUpdate = async () => {
    if (isUpdating) return; 

    setIsUpdating(true);

    try {
      const response = await axios.put(`https://s56-bhagirath-capstone-eazydinehub.onrender.com/updatedish/${editingDish._id}`, {
        dishName: updatedName,
        dishLink: updatedLink,
        dishPrice: updatedPrice,
      });
      console.log(updatedName)
      console.log(updatedPrice)
      console.log('Update response:', response.data);
      setEditingDish(null);
      setShowModal(false);
      window.location.reload(); 
    } catch (error) {
      console.error('Error updating dish:', error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingDish(null);
    setShowModal(false); 
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
            <button style={{backgroundColor:"green"}} onClick={() => handleEdit(dish)} disabled={isUpdating}>
              {isUpdating && editingDish === dish ? 'Updating...' : 'EDIT'}
            </button>
            <button style={{backgroundColor:"red"}} onClick={()=>handleClick(dish._id)}>DELETE</button>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCancelEdit}>&times;</span>
            <h2>Edit Soft Drink</h2>
            <input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
            <input
              type="text"
              value={updatedPrice}
              onChange={(e) => setUpdatedPrice(e.target.value)}
            />
            <input
              type="text"
              value={updatedLink}
              onChange={(e) => setUpdatedLink(e.target.value)}
            />
            <button onClick={handleUpdate}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}
