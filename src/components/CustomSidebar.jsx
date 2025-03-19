// src/components/CustomSidebar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  ChartColumnBig,
  Users,
  ShoppingBag,
  Truck,
  Box,
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
          {
            label: "Elektra",
            icon: Box,
            href: "/dashboard/solicitudes/retailers/elektra",
          },
        ],
      },
    ],
  },
];

function CustomSidebar() {
  // Estado para manejar la expansión de submenús
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (label) => {
    setExpanded((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  // Función recursiva para renderizar el menú
  const renderMenuItems = (items, depth = 0) => {
    return (
      <ul className={depth === 0 ? "space-y-2" : "pl-4 space-y-1"}>
        {items.map((item) => {
          const Icon = item.icon;
          const hasChildren = item.children && item.children.length > 0;
          return (
            <li key={item.label}>
              <div className="flex items-center justify-between">
                <Link
                  to={item.href || "#"}
                  className="flex items-center space-x-2 p-2 rounded hover:bg-gray-800 transition-colors text-white"
                  onClick={(e) => {
                    if (hasChildren) {
                      e.preventDefault();
                      toggleExpand(item.label);
                    }
                  }}
                >
                  {Icon && <Icon className="w-5 h-5" />}
                  <span className="text-sm">{item.label}</span>
                </Link>
                {hasChildren && (
                  <button
                    onClick={() => toggleExpand(item.label)}
                    className="p-1 text-gray-300 hover:text-gray-200"
                  >
                    {expanded[item.label] ? "-" : "+"}
                  </button>
                )}
              </div>
              {hasChildren && expanded[item.label] && renderMenuItems(item.children, depth + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

  // Recupera el nombre de usuario guardado en localStorage
  const username = localStorage.getItem("username") || "Nombre del Usuario";

  return (
    <aside className="w-64 bg-[#09090b] border-r p-4">
      {/* Sección de Perfil */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={profileImage}
          alt="Perfil"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className="font-semibold text-white">{username}</p>
          <p className="text-sm text-gray-400">Rol o información</p>
        </div>
      </div>

      {/* Menú de Navegación */}
      <nav>{renderMenuItems(menuItems)}</nav>
    </aside>
  );
}

export default CustomSidebar;
