import React from 'react';
import Navbar from '../Components/Navbar.jsx';
import { useNavigate } from 'react-router-dom';
function CustomerProfile() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    navigate("/landingpage")
  };

  return (
    <div>
      <Navbar />
      <button onClick={handleLogout}>LOGOUT</button>
    </div>
  );
}

export default CustomerProfile;
