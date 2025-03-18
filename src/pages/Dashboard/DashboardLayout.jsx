// src/pages/Dashboard/DashboardLayout.jsx
import React from "react";
import CustomSidebar from "../../components/CustomSidebar"; // Tu sidebar personalizado
import DashboardDataView from "../../components/DashboardDataView"; // Vista de datos

function DashboardLayout() {
  return (
    <div className="flex h-screen">
      <CustomSidebar />
      <div className="flex-1">
        {/* Puedes incluir un Header si lo necesitas */}
        <DashboardDataView />
      </div>
    </div>
  );
}

export default DashboardLayout;
