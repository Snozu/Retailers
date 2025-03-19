// src/components/SummaryAlerts.jsx
import React from "react";
import {
  FileTextIcon,
  ClockIcon,
  CheckCircle2Icon,
  XCircleIcon,
} from "lucide-react";

/**
 * Muestra 4 tarjetas:
 * 1) Total solicitudes (fondo negro, icono, texto blanco)
 * 2) Pendientes (fondo blanco, borde gris, icono de reloj)
 * 3) Aprobadas (fondo blanco, borde verde, icono de check)
 * 4) Rechazadas (fondo blanco, borde rojo, icono de x)
 *
 * Ajusta los colores y estilos según tu mockup.
 */
function SummaryAlerts({ total, pending, approved, rejected }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {/* TOTAL (Fondo negro, texto e ícono en blanco) */}
      <div className="w-44 h-34 bg-black text-white rounded-xl flex flex-col items-center justify-center gap-1 p-2">
        <FileTextIcon className="w-5 h-5" />
        <span className="text-sm">Total solicitudes</span>
        <span className="text-2xl font-bold">{total}</span>
      </div>

      {/* PENDIENTES (Borde gris, icono de reloj, texto normal) */}
      <div className="w-44 h-30 bg-white border border-gray-300 rounded-xl flex flex-col items-center justify-center gap-1 p-2">
        <ClockIcon className="w-5 h-5 text-gray-700" />
        <span className="text-sm text-gray-700">Pendientes</span>
        <span className="text-2xl font-bold text-gray-800">{pending}</span>
      </div>

      {/* APROBADAS (Borde verde, icono de check) */}
      <div className="w-44 h-30 bg-white border border-green-400 rounded-xl flex flex-col items-center justify-center gap-1 p-2">
        <CheckCircle2Icon className="w-5 h-5 text-green-500" />
        <span className="text-sm text-gray-700">Aprobadas</span>
        <span className="text-2xl font-bold text-green-600">{approved}</span>
      </div>

      {/* RECHAZADAS (Borde rojo, icono de x) */}
      <div className="w-44 h-30 bg-white border border-red-400 rounded-xl flex flex-col items-center justify-center gap-1 p-2">
        <XCircleIcon className="w-5 h-5 text-red-500" />
        <span className="text-sm text-gray-700">Rechazadas</span>
        <span className="text-2xl font-bold text-red-600">{rejected}</span>
      </div>
    </div>
  );
}

export default SummaryAlerts;
