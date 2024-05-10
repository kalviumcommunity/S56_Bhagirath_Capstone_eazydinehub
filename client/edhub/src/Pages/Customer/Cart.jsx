import React from 'react';
import Navbar from '../Components/Navbar';
import { useUser } from "@clerk/clerk-react";

function Cart({cart}) {
  const { isSignedIn } = useUser();
  if (isSignedIn) {
    return (
      <div>
        <Navbar />
        <h1>Your Cart</h1>
        {cart.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Dish Name</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td>{item.dishName}</td>
                  <td>{item.dishPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        <h1>Please sign in to view your cart</h1>
      </div>
    );
  }
}

export default Cart;