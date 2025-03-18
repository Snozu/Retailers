// src/pages/Solicitudes/retailers/Walmart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import WalmartTable from "../../../components/WalmartTable"; // Ajusta la ruta según tu estructura

function Walmart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Llamada a la API (podrías filtrar datos para retailer = "Walmart")
    const apiUrl = import.meta.env.VITE_API_URL;
    axios.get(apiUrl)
      .then(response => {
        const walmartData = response.data.requests.filter(r => r.retailer === "Walmart");
        setData(walmartData);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-6">Cargando datos...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error.message}</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Solicitudes Walmart</h2>
      <WalmartTable data={data} />
    </div>
  );
}

export default Walmart;
