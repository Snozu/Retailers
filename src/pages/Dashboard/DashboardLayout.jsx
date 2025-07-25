// src/pages/Dashboard/DashboardLayout.jsx
import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import CustomSidebar from "../../components/CustomSidebar"
import { Menu } from "lucide-react"

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen relative overflow-hidden">
      {/* Mobile menu button */}
      <button 
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-800 text-white"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Sidebar - hidden on mobile by default, shown when sidebarOpen is true */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out fixed md:relative z-40 h-full`}>
        <CustomSidebar />
      </div>

      {/* Overlay to close sidebar on mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
