import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Auth0Provider } from '@auth0/auth0-react';
require('dotenv').config();

const landingpage = "https://eazydinehub.netlify.app/landingpage"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
<Auth0Provider
    domain={process.env.domain}
    clientId={process.env.clientid}
    authorizationParams={{
      redirect_uri: landingpage
    }}
  >
    <App />
    <ToastContainer position='top-center' style={{width:"300px"}}/>
  </Auth0Provider>,
</React.StrictMode>
)
