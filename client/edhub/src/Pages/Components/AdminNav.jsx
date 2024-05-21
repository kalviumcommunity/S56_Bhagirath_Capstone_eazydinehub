import React from 'react'
import "../Stylesheets/Nav.css";
import edhlogo from "../assets/edhlogo.png";
import { Link } from "react-router-dom";
function AdminNav() {

      return (
        <div>
          <nav style={{ padding: "15px" }}>
            <div className="leftNav">
              <div className="logo">
                <Link style={{ textDecoration: "none", color: "black" }} to={"/adminlanding"}>
                  <img src={edhlogo} alt="EDH Logo" />
                </Link>
              </div>
              <div className='spl'><p>ADMIN'S AREA</p></div>
            </div>
            <div className="rightNav">
              <ul>
               <Link style={{ textDecoration: "none", color: "black" }} to={"/adddish"}>
                 <li><button>ADD DISH</button></li>
                </Link>
               <Link style={{ textDecoration: "none", color: "black" }} to={"/allusers"}>
                 <li><button>USERS</button></li>
                </Link>
               <Link style={{ textDecoration: "none", color: "black" }} to={"/addadmin"}>
                 <li><button>ADD ADMIN</button></li>
                </Link>
               <Link style={{ textDecoration: "none", color: "black" }} to={"/addchef"}>
                 <li><button>ADD CHEF</button></li>
                </Link>
              </ul>
            </div>
          </nav>
        </div>
      );
    }
export default AdminNav