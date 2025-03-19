// src/pages/Dashboard/DashboardLayout.jsx
import React from "react"
import { Outlet } from "react-router-dom"
import CustomSidebar from "../../components/CustomSidebar"

function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <CustomSidebar />
      <div className="flex-1">
        {/* En lugar de <MainContent />, pon <Outlet /> */}
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
