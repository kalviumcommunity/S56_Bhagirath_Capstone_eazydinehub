import React from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';
import { useUser } from '@clerk/clerk-react';

function Cart({ cart, incrementQuantity, decrementQuantity }) {
  const { user, isSignedIn } = useUser();

  console.log('Cart Items:', cart);

  const totalPrice = cart.reduce((total, item) => {
    const price = parseFloat(item.dishPrice.replace('$', ''));
    return total + price * item.quantity;
  }, 0);

  const handleProceed = async () => {
    if (!isSignedIn) {
      alert('Please sign in to place an order.');
      return;
    }

    try {
      const response = await axios.post('https://s56-bhagirath-capstone-eazydinehub.onrender.com/order', {
        cart,
        totalPrice,
        email: user.primaryEmailAddress.emailAddress,
        name: user.fullName
      });

      if (response.status === 200) {
        alert('Order placed successfully!');
      } else {
        alert('Failed to place order.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  const buttonStyle = {
    width: '50px',
    height: '50px',
    fontSize: '20px',
    textAlign: 'center',
    marginLeft: '10px'
  };

  return (
    <div>
      <Navbar />
      <h1>Your Cart</h1>
      {cart.length > 0 ? (
        <div>
          <table>
            <thead>
              <tr>
                <th>Dish Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.dishName}</td>
                  <td>{item.dishPrice}</td>
                  <td>{item.quantity}</td>
                  <td>${(parseFloat(item.dishPrice.replace('$', '')) * item.quantity).toFixed(2)}</td>
                  <td>
                    <button style={buttonStyle} onClick={() => incrementQuantity(item.dishName)}>+</button>
                    <button style={buttonStyle} onClick={() => decrementQuantity(item.dishName)}>-</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h2>Total Price: ${totalPrice.toFixed(2)}</h2>
          <button onClick={handleProceed} disabled={!isSignedIn}>Proceed to Order</button>
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default Cart;
