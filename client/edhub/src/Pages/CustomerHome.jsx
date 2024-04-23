import React from 'react'
import Navbar from '../Components/Navbar'
import "../Stylesheets/common.css"
import {SoftDrinks} from '../Components/SoftDrinks'
function CustomerHome() {
  return (
    <div>
        <Navbar/>
        <SoftDrinks/>
    </div>
  )
}

export default CustomerHome