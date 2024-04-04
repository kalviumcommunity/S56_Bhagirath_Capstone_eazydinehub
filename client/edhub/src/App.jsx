import { useState } from 'react'
import './App.css'
import Visitor from './Pages/Visitor'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import CustomerLogin from './Pages/CustomerLogin'
import CreateAccount from './Pages/CreateAccount'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Visitor/>}/>
      <Route path='/cusLogin'element={<CustomerLogin/>}/>
      <Route path="/create-account" element={<CreateAccount/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
