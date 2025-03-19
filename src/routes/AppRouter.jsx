// src/routes/AppRouter.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import DashboardLayout from "../pages/Dashboard/DashboardLayout";
import MainContent from "../components/DashboardVista";
import ClienteFinal from "../pages/Solicitudes/ClienteFinal";
import Walmart from "../pages/Solicitudes/retailers/walmart";
import PrivateRoute from "./PrivateRoute";

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Rutas protegidas: Dashboard y subrutas */}
      <Route
        path="/dashboard/*"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >

        <Route index element={<MainContent />} />

        <Route path="solicitudes/clientes-finales" element={<ClienteFinal />} />

        <Route path="solicitudes/retailers/walmart" element={<Walmart />} />

      </Route>


      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default AppRouter;
