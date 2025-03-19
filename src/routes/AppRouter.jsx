// src/routes/AppRouter.jsx
import React from "react"
import { Routes, Route } from "react-router-dom"
import Login from "../pages/Login/Login"
import DashboardLayout from "../pages/Dashboard/DashboardLayout"
import MainContent from "../components/MainContent" // Ajusta la ruta
import ClienteFinal from "../pages/Solicitudes/ClienteFinal"
import Walmart from "../pages/Solicitudes/retailers/walmart"
// ... otros imports

function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* Ruta principal de /dashboard -> muestra <MainContent /> */}
        <Route index element={<MainContent />} />

        {/* Subruta: /dashboard/solicitudes/clientes-finales -> muestra <ClienteFinal /> */}
        <Route path="solicitudes/clientes-finales" element={<ClienteFinal />} />


        <Route path="solicitudes/retailers/walmart" element={<Walmart/>} />

        {/* Otras subrutas si quieres:
           <Route path="solicitudes/retailers/walmart" element={<Walmart />} />
           ...
        */}
      </Route>

      <Route path="*" element={<Login />} />
    </Routes>
  )
}

export default AppRouter
