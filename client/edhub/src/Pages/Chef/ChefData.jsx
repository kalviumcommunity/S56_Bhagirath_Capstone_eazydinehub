import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Puff } from 'react-loader-spinner';

const ChefData = () => {
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
      try {
        const response = await axios.get('https://s56-bhagirath-capstone-eazydinehub.onrender.com/order');
        setOrders(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleCompleteOrder = async (orderId) => {
    try {
      await axios.post('https://s56-bhagirath-capstone-eazydinehub.onrender.com/complete', { orderId });
      setOrders(orders.filter(order => order._id !== orderId));
    } catch (error) {
      console.error('Error completing order:', error);
      alert(`Error completing order: ${error.response ? error.response.data : error.message}`);
    }
  };

  const cellStyle = {
    width: '100%',
    border: '1px solid #ddd',
    padding: '10px',
    marginBottom: '10px',
    boxSizing: 'border-box',
  };

  return (
    <div>
      <h1 style={{display:"flex",justifyContent:"center",marginTop:"10px"}}>Orders</h1>
      {loading ? (
        <div style={loaderContainerStyle}>
          <Puff
            height={50}
            width={50}
            radius={0.5}
            color="#00BFFF"
            ariaLabel="puff-loading"
            visible={true}
          />
        </div>
      ) : error ? (
        <div>Error loading orders: {error.message}</div>
      ) : (
        <div className="orderDiv">
          {orders.length === 0 ? (
            <p>No orders found.</p>
          ) : (
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ ...cellStyle, backgroundColor: '#f2f2f2' }}>Email</th>
                  <th style={cellStyle}>Dish Name</th>
                  <th style={cellStyle}>Quantity</th>
                  <th style={cellStyle}>Total Price</th>
                  <th style={cellStyle}>Status</th>
                  <th style={cellStyle}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(order => (
                  <tr key={order._id}>
                    <td style={{ ...cellStyle }}>{order.email}</td>
                    <td style={{ ...cellStyle }}>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {order.cart.map((item, index) => (
                          <li key={index}>{item.dishName}</li>
                        ))}
                      </ul>
                    </td>
                    <td style={{ ...cellStyle }}>
                      <ul style={{ listStyle: 'none', padding: 0 }}>
                        {order.cart.map((item, index) => (
                          <li key={index}>{item.quantity}</li>
                        ))}
                      </ul>
                    </td>
                    <td style={{ ...cellStyle }}>Rs.{order.totalPrice}</td>
                    <td style={{ ...cellStyle }}>{order.orderStatus}</td>
                    <td style={{ ...cellStyle }}>
                      {order.orderStatus !== 'completed' && (
                        <button onClick={() => handleCompleteOrder(order._id)}>Complete Order</button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ChefData;
