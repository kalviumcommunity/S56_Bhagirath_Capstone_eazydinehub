import { useState } from 'react'
import Visitor from './Pages/Visitor'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import CustomerLogin from './Pages/CustomerLogin'
import CreateAccount from './Pages/CreateAccount'
import LandingPage from './Pages/LandingPage'
function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Visitor/>}/>
      <Route path='/cusLogin'element={<CustomerLogin/>}/>
      <Route path="/create-account" element={<CreateAccount/>} />
      <Route path="/landingpage" element={<LandingPage/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
