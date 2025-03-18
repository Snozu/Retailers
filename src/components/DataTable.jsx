// src/components/WalmartTable.jsx
import React from "react";
import DataTable from "./DataTable"; // Ajusta la ruta si usas un DataTable genérico

const walmartColumns = [
  { field: 'full_name', header: 'Nombre' },
  { field: 'email', header: 'Email' },
  { field: 'phone_number', header: 'Teléfono' },
  { field: 'modelo', header: 'Modelo' },
  { field: 'retailer', header: 'Retailer' },
  { field: 'status', header: 'Estatus' },
];

function WalmartTable({ data }) {
  return (
    <DataTable columns={walmartColumns} data={data} />
  );
}

export default WalmartTable;
