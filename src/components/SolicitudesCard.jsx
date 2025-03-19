// src/components/SummaryAlerts.jsx
import React from "react";
import {
  FileTextIcon,
  ClockIcon,
  CheckCircle2Icon,
  XCircleIcon,
} from "lucide-react";

function SummaryAlerts({ total, pending, approved, rejected }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* TOTAL */}
      <div className="w-44 h-34 bg-black text-white rounded-xl flex flex-col items-center justify-center gap-1 p-2">
        <FileTextIcon className="w-5 h-5" />
        <span className="text-sm">Total solicitudes</span>
        <span className="text-2xl font-bold">{total}</span>
      </div>

      {/* PENDIENTES */}
      <div className="w-44 h-30 bg-white border border-gray-300 rounded-xl flex flex-col items-center justify-center gap-1 p-2">
        <ClockIcon className="w-5 h-5 text-gray-700" />
        <span className="text-sm text-gray-700">Pendientes</span>
        <span className="text-2xl font-bold text-gray-800">{pending}</span>
      </div>

      {/* APROBADAS */}
      <div className="w-44 h-30 bg-white border border-green-400 rounded-xl flex flex-col items-center justify-center gap-1 p-2">
        <CheckCircle2Icon className="w-5 h-5 text-green-500" />
        <span className="text-sm text-gray-700">Aprobadas</span>
        <span className="text-2xl font-bold text-green-600">{approved}</span>
      </div>

      {/* RECHAZADAS */}
      <div className="w-44 h-30 bg-white border border-red-400 rounded-xl flex flex-col items-center justify-center gap-1 p-2">
        <XCircleIcon className="w-5 h-5 text-red-500" />
        <span className="text-sm text-gray-700">Rechazadas</span>
        <span className="text-2xl font-bold text-red-600">{rejected}</span>
      </div>
    </div>
  );
}

export default SummaryAlerts;
