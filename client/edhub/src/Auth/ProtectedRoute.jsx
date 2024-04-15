import React from 'react';
import { Navigate,Outlet } from 'react-router-dom'; 

const ProtectedRoute = ({ isAuthenticated,children,adminRoute,isAdmin }) => {
  if(!isAuthenticated){
    return <Navigate to={"/cuslogin"}/>
  }
  if(adminRoute && !isAdmin){
    return <Navigate to={"/"}/>
  }
  return children?children:<Outlet/>;
};

export default ProtectedRoute;
