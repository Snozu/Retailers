// src/components/DashboardDataView.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function DashboardDataView() {
  const [data, setData] = useState(null);      // Almacena la data de la API
  const [loading, setLoading] = useState(true);  // Para indicar que se está cargando
  const [error, setError] = useState(null);      // Para capturar errores

  useEffect(() => {
    // Obtenemos la URL de la API desde la variable de entorno
    const apiUrl = import.meta.env.VITE_API_URL;

    // Realiza la petición a la API usando la URL configurada
    axios.get(apiUrl)
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Cargando datos...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">Error al cargar datos: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Datos de Solicitudes</h2>

      {/* Sección de resumen de estatus */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Resumen de Estatus</h3>
        <ul className="list-disc list-inside">
          {data.status_summary.map(item => (
            <li key={item.status}>
              {item.status}: {item.total}
            </li>
          ))}
        </ul>
      </div>

      {/* Sección de solicitudes */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Solicitudes</h3>
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
              {data.requests.map(request => (
                <tr key={request.vin}>
                  <td className="border p-2">{request.full_name}</td>
                  <td className="border p-2">{request.email}</td>
                  <td className="border p-2">{request.phone_number}</td>
                  <td className="border p-2">{request.modelo}</td>
                  <td className="border p-2">{request.retailer}</td>
                  <td className="border p-2">{request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DashboardDataView;
