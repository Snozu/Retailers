// src/components/ClienteFinalTable.jsx
import React from "react";
import { Button } from "@/components/ui/button"; // Ajusta la ruta según tu setup
import { PlusIcon } from "lucide-react";

const ClienteFinalTable = ({ data, onShowDetails }) => {
  // Función para renderizar el estatus con un circulito de color y texto
  const renderStatus = (status) => {
    let bgColor = "";
    let text = "";
    switch (status) {
      case "pending":
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
        text = "Desconocido";
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
        {/* Encabezados */}
        <thead>
          <tr className="border-gray-200 text-sm text-gray-600 bg-gray-50">
            <th className="py-3 px-4 font-semibold">Nombre Completo</th>
            <th className="py-3 px-4 font-semibold">Celular</th>
            <th className="py-3 px-4 font-semibold">Email</th>
            <th className="py-3 px-4 font-semibold">Ciudad</th>
            <th className="py-3 px-4 font-semibold">Estatus</th>
            <th className="py-3 px-4 font-semibold text-center">Información</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {data.length > 0 ? (
            data.map((request) => (
              <tr
                key={request.user_id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-3 px-4">{request.full_name || "N/A"}</td>
                <td className="py-3 px-4">{request.phone_number || "N/A"}</td>
                <td className="py-3 px-4">{request.email || "N/A"}</td>
                <td className="py-3 px-4">{request.city || "N/A"}</td>
                <td className="py-3 px-4">{renderStatus(request.status)}</td>
                <td className="py-3 px-4 text-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onShowDetails(request)}
                    className="transition-transform hover:scale-110"
                  >
                    <PlusIcon className="w-4 h-4" />
                    <span className="sr-only">Ver Detalles</span>
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center py-4 text-gray-500">
                No hay solicitudes disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClienteFinalTable;
