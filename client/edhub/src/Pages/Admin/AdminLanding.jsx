import React from 'react'
import AdminNav from '../Components/AdminNav'
import { EditSoftDrinks } from '../Components/SoftDrinks'
import { EditBurgers } from '../Components/Burger'
import { EditPizzas } from '../Components/Pizza'
function AdminLanding() {
  return (
    <div>
        <AdminNav/>
        <EditSoftDrinks/>
        <EditBurgers/>
        <EditPizzas/>
    </div>
  )
}

export default AdminLanding