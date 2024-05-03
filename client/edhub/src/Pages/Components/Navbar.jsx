import React from 'react';
import "../Stylesheets/Nav.css";
import edhlogo from "../assets/edhlogo.png";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
function Navbar() {
  const navLinks = [
    { to: "/spldishes", text: "SPECIAL DISHES" },
    { to: "/myorders", text: "MY ORDERS" },
    { to: "/mycart", text: "CART" },
    { to: "/myprofile", text: "PROFILE" }
  ];
  const {user,loginWithRedirect,isAuthenticated,logout} = useAuth0()
  return (
    <div>
      <nav style={{ padding: "15px" }}>
        <div className="leftNav">
          <div className="logo">
            <Link style={{ textDecoration: "none", color: "black" }} to={"/landingpage"}>
              <img src={edhlogo} alt="EDH Logo" />
            </Link>
          </div>
          {navLinks.slice(0, 1).map((link, index) => (
            <div key={index} className="spl">
              <Link style={{ textDecoration: "none", color: "black" }} to={link.to}>
                <p>{link.text}</p>
              </Link>
            </div>
          ))}
        </div>
        <div className="rightNav">
          <ul>
            {navLinks.slice(1).map((link, index) => (
              <li key={index}><Link style={{ textDecoration: "none", color: "black" }} to={link.to}>{link.text}</Link></li>
            ))}
          <li>
            {isAuthenticated ? <p onClick={e => logout()}>LOGOUT</p> : <p onClick={e => loginWithRedirect()}>LOGIN</p>}</li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
