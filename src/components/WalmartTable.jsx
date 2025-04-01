// src/components/WalmartTable.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const WalmartTable = ({ data, onShowDetails }) => {
  // Función para renderizar el estatus usando conversation.status_code
  const renderStatus = (statusCode) => {
    let bgColor = "";
    let text = "";
    switch (statusCode) {
      case "pending":
      case "hold":
        bgColor = "bg-yellow-500";
        text = "Pendiente";
        break;
      case "approved":
        bgColor = "bg-green-500";
        text = "Aprobado";
        break;
      case "rejected":
        bgColor = "bg-red-500";
        text = "Rechazado";
        break;
      default:
        bgColor = "bg-gray-400";
        text = statusCode || "Desconocido";
    }

    return (
      <div className="flex items-center gap-2">
        <span className={`inline-block w-2.5 h-2.5 rounded-full ${bgColor}`} />
        <span className="text-sm text-gray-700">{text}</span>
      </div>
    );
  };

  return (
    <div className="bg-white border-gray-200 overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-gray-200 text-sm text-gray-600 bg-gray-50">
            <th className="p-4">Nombre Completo</th>
            <th className="p-4">Celular</th>
            <th className="p-4">Email</th>
            <th className="p-4">Ciudad</th>
            <th className="p-4">Estatus</th>
            <th className="p-4 text-center">Información</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {data && data.length > 0 ? (
            data.map((item, index) => {
              const { user, conversation } = item;
              return (
                <tr
                  key={`${user.vin}-${index}`}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="p-4">{user.full_name || "N/A"}</td>
                  <td className="p-4">{user.phone_number || "N/A"}</td>
                  <td className="p-4">{user.email || "N/A"}</td>
                  <td className="p-4">{user.city || "N/A"}</td>
                  <td className="p-4">{renderStatus(conversation.status_code)}</td>
                  <td className="p-4 text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onShowDetails(item)}
                      className="transition-transform hover:scale-110"
                    >
                      <PlusIcon className="w-4 h-4" />
                      <span className="sr-only">Ver Detalles</span>
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="6" className="text-center p-4 text-gray-500">
                No hay solicitudes disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default WalmartTable;
