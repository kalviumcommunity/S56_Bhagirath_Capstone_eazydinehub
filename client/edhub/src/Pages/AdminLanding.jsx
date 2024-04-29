import React from 'react'
import AdminNav from '../Components/AdminNav'
import { EditSoftDrinks } from '../Components/SoftDrinks'
import { EditBurgers } from '../Components/Burger'
function AdminLanding() {
  return (
    <div>
        <AdminNav/>
        <EditSoftDrinks/>
        <EditBurgers/>
    </div>
  )
}

export default AdminLanding