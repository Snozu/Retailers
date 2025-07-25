// src/components/ClienteFinalTable.jsx
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";

const ClienteFinalTable = ({ data, onShowDetails }) => {


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
    <div className="bg-white border-gray-200 overflow-x-auto">
      <div className="min-w-full inline-block align-middle">
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="border-gray-200 text-xs sm:text-sm text-gray-600 bg-gray-50">
                <th className="py-3 px-2 sm:px-4 font-semibold">Nombre Completo</th>
                <th className="py-3 px-2 sm:px-4 font-semibold hidden sm:table-cell">Celular</th>
                <th className="py-3 px-2 sm:px-4 font-semibold hidden md:table-cell">Email</th>
                <th className="py-3 px-2 sm:px-4 font-semibold hidden md:table-cell">Ciudad</th>
                <th className="py-3 px-2 sm:px-4 font-semibold">Estatus</th>
                <th className="py-3 px-2 sm:px-4 font-semibold text-center">Info</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm text-gray-700 divide-y divide-gray-200">
              {data.length > 0 ? (
                data.map((request, index) => (
                  <tr
                    key={`${request.user_id}-${index}`}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-2 sm:px-4 truncate max-w-[120px] sm:max-w-none">{request.full_name || "N/A"}</td>
                    <td className="py-3 px-2 sm:px-4 hidden sm:table-cell">{request.phone_number || "N/A"}</td>
                    <td className="py-3 px-2 sm:px-4 hidden md:table-cell truncate max-w-[150px] lg:max-w-none">{request.email || "N/A"}</td>
                    <td className="py-3 px-2 sm:px-4 hidden md:table-cell">{request.city || "N/A"}</td>
                    <td className="py-3 px-2 sm:px-4">{renderStatus(request.status)}</td>
                    <td className="py-3 px-2 sm:px-4 text-center">
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
                  <td colSpan="6" className="text-center p-4 text-gray-500">
                    No hay solicitudes disponibles.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClienteFinalTable;