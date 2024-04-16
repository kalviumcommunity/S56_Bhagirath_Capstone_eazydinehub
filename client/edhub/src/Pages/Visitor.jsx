import React from 'react'
import edhlogo from "../assets/edhlogo.png"
import "../Stylesheets/Visitor.css"
import { Link } from 'react-router-dom'

function Visitor() {
  return (
    <div className='visitorDiv'>
        <div className="logoDiv">
            <img src={edhlogo}/>
        </div>
        <div className="wlcText">
            <h2>Hi there! Welcome to EazyDine HUB</h2>
        </div>
        <div className="visitorCards">
            <div className="card">
                <div className="visChef"></div>
                <div className="visDetails">
                    <h3>CHEF</h3>
                </div>
            </div>
            <div className="card">
                <div className="visCustomer"></div>
                <div className="visDetails">
                   <Link to={"/landingpage"} style={{color:"white",textDecoration:"none"}}><h3>CUSTOMER</h3></Link>
                </div>
            </div>
            <div className="card">
                <div className="visAdmin"></div>
                <div className="visDetails">
                <Link to={"/adLogin"} style={{color:"white",textDecoration:"none"}}><h3>ADMIN</h3></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Visitor