import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../Stylesheets/table.css";

const FetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State variable for error

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://s56-bhagirath-capstone-eazydinehub.onrender.com/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Failed to fetch users. Please try again later.'); // Set error message
        setLoading(false); // Set loading to false
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? ( 
          <p className="error">{error}</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default FetchUsers;
