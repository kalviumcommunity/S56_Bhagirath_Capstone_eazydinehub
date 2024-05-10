import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Visitor from "./Pages/Visitor"
import CustomerLogin from './Pages/Customer/CustomerLogin';
import CreateAccount from './Pages/Customer/CreateAccount';
import CustomerHome from './Pages/Customer/CustomerHome';
import SpecialDishes from './Pages/Customer/SpecialDishes';
import Cart from './Pages/Customer/Cart';
import CustomerProfile from './Pages/Customer/CustomerProfile';
import YourOrders from './Pages/Customer/YourOrders';
import AdminLanding from './Pages/Admin/AdminLanding';
import AdminLogin from './Pages/Admin/AdminLogin';
import CreateAdmin from './Pages/Admin/CreateAdmin';
import Users from './Pages/Admin/Users';
import AddDishes from './Pages/Admin/AddDishes';
import CreateChef from './Pages/Admin/Createchef';
import ChefLogin from './Pages/Chef/ChefLogin';
import ChefHome from './Pages/Chef/ChefHome';
import { useAuth0 } from '@auth0/auth0-react';
function App() {
  const {user,isAuthenticated} = useAuth0()
  if(isAuthenticated){
    console.log(user)
  }
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Visitor />} />
        <Route path='/cusLogin' element={<CustomerLogin />} />
        <Route path="/adLogin" element={<AdminLogin/>}/>
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/landingpage" element={<CustomerHome />} />
        <Route path="/spldishes" element={<SpecialDishes />} /> 
        <Route path="/adminlanding" element={<AdminLanding />} /> 
        <Route path="/addadmin" element={<CreateAdmin/>}/>
        <Route path="/allusers" element={<Users/>}/>
        <Route path='/adddish' element={<AddDishes/>}/>
        <Route path='/addchef' element={<CreateChef/>}/>
        <Route path='/cheflogin' element={<ChefLogin/>}/>
        <Route path='/chefhome' element={<ChefHome/>}/>
        <Route path="/myorders" element={<YourOrders />} />
        <Route path="/mycart" element={<Cart/> }/>
        <Route path="/myprofile" element={<CustomerProfile/>} />
      </Routes>
    </Router>
  );
}

export default App;
