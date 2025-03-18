// src/components/WalmartTable.jsx
import React from "react";

function WalmartTable({ data }) {
  return (
    <div className="overflow-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Nombre</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Teléfono</th>
            <th className="border p-2">Modelo</th>
            <th className="border p-2">Retailer</th>
            <th className="border p-2">Estatus</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              <td className="border p-2">{row.full_name}</td>
              <td className="border p-2">{row.email}</td>
              <td className="border p-2">{row.phone_number}</td>
              <td className="border p-2">{row.modelo}</td>
              <td className="border p-2">{row.retailer}</td>
              <td className="border p-2">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default WalmartTable;
