import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '@clerk/clerk-react';
import { Puff } from 'react-loader-spinner';

const OrdersList = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const response = await axios.get(`https://s56-bhagirath-capstone-eazydinehub.onrender.com/orders/${user.primaryEmailAddress.emailAddress}`, {
            headers: {
              'Content-Type': 'application/json',
            }
          });
          setOrders(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching orders:', error);
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchOrders();
  }, [user]);

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

  if (error) {
    return <div>Error loading orders: {error.message}</div>;
  }

  return (
    <div>
      <h1 style={{display:"flex",justifyContent:"center",marginTop:"10px"}}>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No Active Orders</p>
      ) : (
        <div className="order-table">
          <table>
            <thead>
              <tr>
                <th>Order Email</th>
                <th>Dish Names</th>
                <th>Dish Quantity</th>
                <th>Total Price</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order._id}>
                  <td>{order.email}</td>
                  <td><ol style={{listStyle:"none"}}>
                    {order.cart.map((item, index) => (
                      <li key={index}>{item.dishName}</li>
                    ))}
                  </ol></td>
                  <td>
                  <ol style={{listStyle:"none"}}>
                    {order.cart.map((item, index) => (
                      <li key={index}>{item.quantity}</li>
                    ))}
                  </ol>
                  </td>
                  <td>{order.totalPrice}</td>
                  <td>{new Date(order.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersList;
