import React from 'react';
import Navbar from '../Components/Navbar.jsx';
import { useDispatch } from 'react-redux';
import {logout} from "../../actions.js"
import { useNavigate } from 'react-router-dom';
function CustomerProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const handleLogout = () => {
    dispatch(logout());
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
