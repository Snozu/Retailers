// src/components/CustomSidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
// Si ya tienes una función para concatenar clases, puedes usarla, o alternativamente "clsx"
// import { cn } from "@/lib/utils";

function CustomSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-4">
      
      {/* Sección de Perfil */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          alt="Perfil"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold">Nombre del Usuario</p>
          <p className="text-sm text-gray-500">Rol o Información</p>
        </div>
      </div>
      
      {/* Menú de Navegación */}
      <nav>
        <ul className="space-y-2">
          <li>
            <Link
              to="/dashboard"
              className="block p-2 rounded hover:bg-gray-100 transition-colors"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/solicitudes"
              className="block p-2 rounded hover:bg-gray-100 transition-colors"
            >
              Solicitudes
            </Link>
          </li>
          {/* Agrega más ítems si lo necesitas */}
        </ul>
      </nav>
    </aside>
  );
}

export default CustomSidebar;
