// src/components/ClienteFinalTable.jsx
import React from "react";

const clienteFinalColumns = [
  { field: 'full_name', header: 'Nombre Completo' },
  { field: 'phone_number', header: 'Celular' },
  { field: 'email', header: 'Email' },
  { field: 'city', header: 'Ciudad' },
  { field: 'status', header: 'Estatus' },
];

function ClienteFinalTable({ data, onShowDetails }) {
  return (
    <div className="tabla-contenedor">
      <table className="tabla-solicitudes">
        <thead>
          <tr>
            {clienteFinalColumns.map((col) => (
              <th key={col.field}>{col.header}</th>
            ))}
            <th>Información</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => {
            let statusText = "N/A";
            if (row.status === "pending") statusText = "Pendiente";
            if (row.status === "approved") statusText = "Aprobado";
            if (row.status === "rejected") statusText = "Rechazado";

            return (
              <tr key={idx}>
                <td>{row.full_name || "N/A"}</td>
                <td>{row.phone_number || "N/A"}</td>
                <td>{row.email || "N/A"}</td>
                <td>{row.city || "N/A"}</td>
                <td>{statusText}</td>
                <td>
                  <button
                    className="btn-detalles"
                    onClick={() => onShowDetails(row)}
                  >
                    Ver Detalles
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ClienteFinalTable;
