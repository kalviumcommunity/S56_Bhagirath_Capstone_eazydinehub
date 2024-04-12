import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import CustomerLogin from './Pages/CustomerLogin';
import CreateAccount from './Pages/CreateAccount';
import CustomerHome from './Pages/CustomerHome';
import SpecialDishes from './Pages/SpecialDishes';
import Cart from './Pages/Cart';
import CustomerProfile from './Pages/CustomerProfile';
import YourOrders from './Pages/YourOrders';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []); 


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={isLoggedIn ? <Navigate to='/landingpage' /> : <CustomerLogin />}
        />
        <Route path='/cusLogin' element={<CustomerLogin />} />
        <Route path='/create-account' element={<CreateAccount />} />
        <Route
          path='/landingpage'
          element={isLoggedIn ? <CustomerHome /> : <Navigate to='/' />}
        />
        <Route path='/spldishes' element={isLoggedIn ? <SpecialDishes /> : <Navigate to='/' />} />
        <Route path='/myorders' element={isLoggedIn ? <YourOrders /> : <Navigate to='/' />} />
        <Route path='/mycart' element={isLoggedIn ? <Cart /> : <Navigate to='/' />} />
        <Route
          path='/myprofile'
          element={isLoggedIn ? <CustomerProfile /> : <Navigate to='/' />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
