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
              CHEF'S AREA
            </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
