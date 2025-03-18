// src/routes/AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route 
        path="/dashboard/*" 
        element={
            <DashboardLayout />
        }
      />
      
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default AppRouter;
