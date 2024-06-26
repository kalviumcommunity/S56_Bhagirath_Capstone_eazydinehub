import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ClerkProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = "pk_test_cm9idXN0LWtpdHRlbi05Mi5jbGVyay5hY2NvdW50cy5kZXYk"

if (!PUBLISHABLE_KEY) {
  console.error("Missing Publishable Key. Please provide a valid Clerk Publishable Key.");
}


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <App />
      <ToastContainer position='top-center' style={{width:"300px"}}/>
    </ClerkProvider>
  </React.StrictMode>,)