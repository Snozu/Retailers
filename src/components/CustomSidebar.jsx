// src/components/CustomSidebar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ChartColumnBig,
  Users,
  ShoppingBag,
  Truck,
  Box,
  LogOut,
} from "lucide-react";
import profileImage from "../assets/TVS-LOGO-RGB-300DPI.jpg";

const menuItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    label: "Solicitudes",
    icon: ChartColumnBig,
    children: [
      {
        label: "Clientes Finales",
        icon: Users,
        href: "/dashboard/solicitudes/clientes-finales",
      },
      {
        label: "Retailers",
        icon: ShoppingBag,
        children: [
          {
            label: "Walmart",
            icon: Truck,
            href: "/dashboard/solicitudes/retailers/walmart",
          },
        
        ],
      },
    ],
  },
];

function CustomSidebar() {
  // Estado para manejar la expansión de submenús
  const [expanded, setExpanded] = useState({});
  const navigate = useNavigate();

  const toggleExpand = (label) => {
    setExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Función para cerrar sesión
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  // Función recursiva para renderizar el menú
  const renderMenuItems = (items, depth = 0) => {
    return (
      <ul className={depth === 0 ? "space-y-2" : "pl-4 space-y-1 mt-1"}>
        {items.map((item) => {
          const Icon = item.icon;
          const hasChildren = item.children && item.children.length > 0;
          return (
            <li key={item.label}>
              <div className="flex items-center justify-between">
                <Link
                  to={item.href || "#"}
                  className={`flex items-center space-x-3 p-2 rounded-md ${hasChildren ? 'text-gray-200' : 'text-gray-300'} ${depth === 0 ? 'font-medium' : 'font-normal'}`}
                  onClick={(e) => {
                    if (hasChildren) {
                      e.preventDefault();
                      toggleExpand(item.label);
                    }
                  }}
                >
                  {Icon && <Icon className={`${depth === 0 ? 'w-5 h-5' : 'w-4 h-4'}`} />}
                  <span className={`${depth === 0 ? 'text-sm' : 'text-xs'}`}>{item.label}</span>
                </Link>
                {hasChildren && (
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className="p-1 text-gray-400 rounded-full"
                  >
                    <span className="text-xs">{expanded[item.label] ? "−" : "+"}</span>
                  </button>
                )}
              </div>
              {hasChildren && expanded[item.label] && (
                <div className="mt-1 border-l border-gray-700 ml-3">
                  {renderMenuItems(item.children, depth + 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  // Recupera el nombre de usuario guardado en localStorage
  const username = localStorage.getItem("username") || "Nombre del Usuario";

  return (
    <aside className="w-64 bg-[#09090b] border-r p-4 flex flex-col h-full overflow-y-auto">
      {/* Sección de Perfil */}
      <div className="flex flex-col mb-6">
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={profileImage}
            alt="Perfil"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="font-semibold text-white text-lg">{username}</p>
            <p className="text-sm text-gray-400">Administrador</p>
          </div>
        </div>
      </div>

      {/* Menú de Navegación */}
      <div className="pt-4 flex-grow">
        <h3 className="text-xs uppercase text-gray-400 font-semibold mb-3 tracking-wider">Menú Principal</h3>
        <nav className="space-y-1">{renderMenuItems(menuItems)}</nav>
      </div>
      
      {/* Botón de cerrar sesión al final */}
      <div className="mt-auto pt-4 border-t border-gray-700">
        <button 
          onClick={handleLogout}
          className="flex items-center justify-center space-x-2 p-2 w-full rounded-md bg-transparent text-white font-medium text-sm"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}

export default CustomSidebar;
