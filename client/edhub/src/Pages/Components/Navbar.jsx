import React from 'react';
import "../Stylesheets/Nav.css";
import edhlogo from "../assets/edhlogo.png";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton} from "@clerk/clerk-react";
function Navbar() {
  const navLinks = [,
    { to: "/myorders", text: "MY ORDERS" },
    { to: "/mycart", text: "CART" },
  ];
  return (
    <div>
      <nav style={{ padding: "15px" }}>
        <div className="leftNav">
          <div className="logo">
            <Link style={{ textDecoration: "none", color: "black" }} to={"/landingpage"}>
              <img src={edhlogo} alt="EDH Logo" />
            </Link>
          </div>
        </div>
        <div className="rightNav">
          <ul>
            {navLinks.slice(1).map((link, index) => (
              <li key={index}><Link style={{ textDecoration: "none", color: "black" }} to={link.to}> <button> {link.text}</button></Link></li>
            ))}
          <li>
          <SignedOut>
        <SignInButton style={{textTransform:"uppercase"}} />
      </SignedOut>
      <SignedIn>
        <UserButton/>
      </SignedIn>
          </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
