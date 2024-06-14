import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Stylesheets/dish.css"
import "../Stylesheets/Modal.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { Puff } from 'react-loader-spinner';
export function Burgers({ addToCart }) {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchDishes() {
      try {
        const response = await axios.get('https://s56-bhagirath-capstone-eazydinehub.onrender.com/dishes/burgers');
        setDishes(response.data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchDishes();
  }, []);
  const loaderContainerStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  };
  if (loading) {
    return (
      <div className="loader-container" style={loaderContainerStyle}>
        <Puff
          height={50}
          width={50}
          radius={0.5}
          color="#00BFFF"
          ariaLabel="puff-loading"
          visible={true}
        />
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "15px" }}>Burgers</h2>
      <div className="dish-list">
        {dishes.map((dish, index) => (
          <div className="dish-card" key={index}>
            <div className="dish-image">
              <img src={dish.dishLink} alt={dish.dishName} />
            </div>
            <div className="dish-details">
              <div className="dishname">
                <p>{dish.dishName.toUpperCase()}</p>
              </div>
              <div className="price">
                <h2>Rs. {dish.dishPrice}</h2>
                <button style={{ backgroundColor: "red", marginTop: "0px", width: "50%" }} onClick={() => addToCart(dish)}>ADD</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export function EditBurgers() {
  const [dishes, setDishes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingDish, setEditingDish] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedLink, setUpdatedLink] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDishes() {
      try {
        const response = await axios.get('https://s56-bhagirath-capstone-eazydinehub.onrender.com/dishes/burgers');
        setDishes(response.data);
      } catch (error) {
        console.error('Error fetching dishes:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchDishes();
  }, []);

  const handleClick = async (dishId) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this Burger?');
    if (confirmDelete) {
      try {
        await axios.delete(`https://s56-bhagirath-capstone-eazydinehub.onrender.com/delete/${dishId}`);
        console.log('Dish deleted successfully');
        window.location.reload();
      } catch (error) {
        console.error('Error deleting dish:', error);
      }
    }
  };

  const handleEdit = (dish) => {
    setEditingDish(dish);
    setUpdatedName(dish.dishName);
    setUpdatedPrice(dish.dishPrice);
    setUpdatedLink(dish.dishLink);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      await axios.put(`https://s56-bhagirath-capstone-eazydinehub.onrender.com/updatedish/${editingDish._id}`, {
        dishName: updatedName,
        dishLink: updatedLink,
        dishPrice: updatedPrice,
      });
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
  const loaderContainerStyle = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  };
  if (loading) {
    return (
      <div className="loader-container" style={loaderContainerStyle}>
        <Puff
          height={100}
          width={100}
          radius={1}
          color="#00BFFF"
          ariaLabel="puff-loading"
          visible={true}
        />
      </div>
    );
  }
  return (
    <div>
      <h2 style={{ textAlign: "center", marginTop: "15px" }}>Edit Burgers</h2>
      <div className="dish-list">
        {dishes.map((dish, index) => (
          <div className="dish-card" key={index}>
            <div className="dish-image">
              <img src={dish.dishLink} alt={dish.dishName} />
            </div>
            <div className="dish-details">
              <div className="dishname">
                <p>{dish.dishName.toUpperCase()}</p>
              </div>
              <div className="price">
                <h2>Rs. {dish.dishPrice}</h2>
                <div className="buttons">
                  <button style={{ backgroundColor: "green", marginTop: "0px" }} onClick={() => handleEdit(dish)} disabled={isUpdating}>
                    {isUpdating && editingDish === dish ? 'Updating...' : <FontAwesomeIcon icon={faPen} />}
                  </button>
                  <button style={{ backgroundColor: "red", marginTop: "0px" }} onClick={() => handleClick(dish._id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCancelEdit}>&times;</span>
            <h2>Edit Burger</h2>
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
            <button onClick={handleUpdate} disabled={isUpdating}>
              {isUpdating ? (
                <Puff height={20} width={20} color="#00BFFF" ariaLabel="puff-loading" visible={true} />
              ) : (
                'Save'
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}