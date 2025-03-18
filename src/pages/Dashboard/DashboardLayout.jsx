// src/pages/Dashboard/DashboardLayout.jsx
import React from "react";
// Ajusta la ruta a tu archivo con el código de shadcn
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
} from "../../components/ui/sidebar";



function DashboardLayout() {
  return (
    // 1) Envolver todo con SidebarProvider
    <SidebarProvider>
      <div className="flex h-screen">
        {/* 2) Colocar el Sidebar de shadcn */}
        <Sidebar className="bg-white text-black"> 
          {/* 2.1) Encabezado del Sidebar (ejemplo: perfil) */}
          <SidebarHeader className="p-4">
            <div className="flex items-center space-x-2">
              <img
                alt="Perfil"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">Tu Nombre</p>
                <p className="text-sm text-gray-500">Rol o info</p>
              </div>
            </div>
          </SidebarHeader>

          {/* 2.2) Contenido del Sidebar (menú, enlaces, etc.) */}
          <SidebarContent className="p-2">
            <ul className="space-y-2">
              <li>
                <a
                  href="/dashboard"
                  className="block p-2 rounded hover:bg-gray-100"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/solicitudes"
                  className="block p-2 rounded hover:bg-gray-100"
                >
                  Solicitudes
                </a>
              </li>
              {/* Agrega más enlaces según necesites */}
            </ul>
          </SidebarContent>
        </Sidebar>

        {/* 3) Contenido principal (Header + MainContent) */}
        <div className="flex-1 flex flex-col">
        
        </div>
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout;
