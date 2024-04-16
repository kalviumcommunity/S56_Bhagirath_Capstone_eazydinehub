import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Visitor from "./Pages/Visitor"
import CustomerLogin from './Pages/CustomerLogin';
import CreateAccount from './Pages/CreateAccount';
import CustomerHome from './Pages/CustomerHome';
import SpecialDishes from './Pages/SpecialDishes';
import Cart from './Pages/Cart';
import CustomerProfile from './Pages/CustomerProfile';
import YourOrders from './Pages/YourOrders';
import ProtectedRoute from './Auth/ProtectedRoute';
import AdminLanding from './Pages/AdminLanding';
import AdminLogin from './Pages/AdminLogin';
import { useSelector } from 'react-redux';

function App() {
  const {isAuthenticated} = useSelector((state) => state.root)
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
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated}/>}>
        <Route path="/myorders" element={<YourOrders />} />
        <Route path="/mycart" element={<Cart /> }/>
        <Route path="/myprofile" element={<CustomerProfile/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
