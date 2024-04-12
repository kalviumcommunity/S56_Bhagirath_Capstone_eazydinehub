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
            <Link to={"/landingpage"}>
              <img src={edhlogo} alt="EDH Logo" />
            </Link>
          </div>
          <div className="spl">
            <Link to={"/spldishes"}>
              <p>SPECIAL DISHES</p>
            </Link>
          </div>
        </div>
        <div className="rightNav">
          <ul>
            <li><Link to={"/myorders"}>MY ORDERS</Link></li>
            <li><Link to={"/mycart"}>CART</Link></li>
            <li><Link to={"/myprofile"}>PROFILE</Link></li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
