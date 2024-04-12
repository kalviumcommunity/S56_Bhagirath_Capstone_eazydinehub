import { useState } from 'react'
import Visitor from './Pages/Visitor'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import CustomerLogin from './Pages/CustomerLogin'
import CreateAccount from './Pages/CreateAccount'
import CustomerHome from './Pages/CustomerHome'
import SpecialDishes from './Pages/SpecialDishes'
import Cart from './Pages/Cart'
import CustomerProfile from './Pages/CustomerProfile'
import YourOrders from './Pages/YourOrders'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Visitor />} />
        <Route path='/cusLogin' element={<CustomerLogin />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/landingpage" element={<CustomerHome />} />
        <Route path="/spldishes" element={<SpecialDishes />} /> 
        <Route path="/myorders" element={<YourOrders />} />
        <Route path="/mycart" element={<Cart />} />
        <Route path="/myprofile" element={<CustomerProfile />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
