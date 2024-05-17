import React from 'react'
import Navbar from '../Components/Navbar'
import "../Stylesheets/common.css"
import {SoftDrinks} from '../Components/SoftDrinks'
import { Burgers } from '../Components/Burger'
import { Pizzas } from '../Components/Pizza'
function CustomerHome() {
  return (
    <div>
        <Navbar/>
        <SoftDrinks/>
        <Burgers/>
        <Pizzas/>
    </div>
  )
}

export default CustomerHome