// src/routes/AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import ClienteFinal from "../pages/Solicitudes/ClienteFinal";
// Importa otras vistas si las necesitas

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route path="/dashboard" element={<DashboardLayout />}>
        <Route index element={<div className="p-6">Bienvenido al Dashboard</div>} />
        <Route path="clientes-finales" element={<ClienteFinal />} />
        {/* Agrega más subrutas si necesitas */}
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default AppRouter;
