import React from 'react';
import "../Stylesheets/Nav.css";
import edhlogo from "../assets/edhlogo.png";
import { Link } from "react-router-dom";

function Navbar() {

  return (
    <div>
      <nav style={{ padding: "15px" }}>
        <div className="leftNav">
          <div className="logo">
              <img src={edhlogo} alt="EDH Logo" />
          </div>
            <div className="spl">
            <ul><li>
        <Link style={{ textDecoration: "none", color: "black" }} to={'/chefhome'}> <button>CHEF'S AREA</button></Link>
          </li></ul>
            </div>
        </div>
        <div className="rightNav">
        <ul><li>
        <Link style={{ textDecoration: "none", color: "black" }} to={'/completed'}> <button>COMPLETED ORDERS</button></Link>
          </li></ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
