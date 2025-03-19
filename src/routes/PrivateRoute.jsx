// src/routes/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {

    const token = localStorage.getItem("token");
  
  // Si no hay token, redirige a /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }


  return children;
};

export default PrivateRoute;
