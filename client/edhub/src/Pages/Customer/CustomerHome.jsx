import React from 'react'
import Navbar from '../Components/Navbar'
import {useState} from 'react'
import "../Stylesheets/common.css"
import {SoftDrinks} from '../Components/SoftDrinks'
import { Burgers } from '../Components/Burger'
import { Pizzas } from '../Components/Pizza'
function CustomerHome({ addToCart }) {
  return (
    <div>
        <Navbar/>
        <SoftDrinks addToCart={addToCart}/>
        <Burgers addToCart={addToCart}/>
        <Pizzas addToCart={addToCart}/>
    </div>
  )
}

export default CustomerHome