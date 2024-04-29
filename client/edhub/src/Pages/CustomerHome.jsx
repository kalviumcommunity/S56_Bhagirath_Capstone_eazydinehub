import React from 'react'
import Navbar from '../Components/Navbar'
import "../Stylesheets/common.css"
import {SoftDrinks} from '../Components/SoftDrinks'
import { Burgers } from '../Components/Burger'
function CustomerHome() {
  return (
    <div>
        <Navbar/>
        <SoftDrinks/>
        <Burgers/>
    </div>
  )
}

export default CustomerHome