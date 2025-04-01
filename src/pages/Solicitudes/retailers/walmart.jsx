// src/pages/Solicitudes/retailers/Walmart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import WalmartTable from "../../../components/WalmartTable";
import SummaryAlerts from "../../../components/SolicitudesCard"; 
import WalmartModal from "../../../components/WalmartModal";
import SearchBar from "../../../components/SearchBar";
import Pagination from "../../../components/Pagination";

function Walmart() {
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [totalSolicitudes, setTotalSolicitudes] = useState(0);
  const [totalPendientes, setTotalPendientes] = useState(0);
  const [totalAprobados, setTotalAprobados] = useState(0);
  const [totalRechazados, setTotalRechazados] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Llamada a la API para Walmart (se usa el endpoint que devuelve los usuarios completos)
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token"); 
    axios
      .get(`${apiUrl}/users/complete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const requests = response.data.users || [];
        // Revertimos el array para mostrar el último registro primero
        setAllRequests([...requests].reverse());
        setLoading(false);
        calculateSummary(requests);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // Calcula los contadores a partir de la estructura de datos recibida
  // Se usa request.conversation.status_code para determinar el estado
  const calculateSummary = (requests) => {
    setTotalSolicitudes(requests.length);
    setTotalPendientes(
      requests.filter(
        (r) =>
          r.conversation &&
          (r.conversation.status_code === "pending" ||
            r.conversation.status_code === "hold")
      ).length
    );
    setTotalAprobados(
      requests.filter(
        (r) => r.conversation && r.conversation.status_code === "approved"
      ).length
    );
    setTotalRechazados(
      requests.filter(
        (r) => r.conversation && r.conversation.status_code === "rejected"
      ).length
    );
  };

  // Filtrado de solicitudes basado en datos del usuario (ubicados en r.user)
  const filteredRequests = allRequests.filter((req) => {
    const text = `${req.user?.full_name || ""} ${req.user?.email || ""} ${req.user?.phone_number || ""} ${req.user?.city || ""}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const pageData = filteredRequests.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleShowDetails = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };

  // Actualiza el estado local al recibir datos actualizados desde el modal.
  // Se busca el registro por VIN (que es único) y se actualiza el status en conversation.
  const updateLocalStatus = (updatedData) => {
    setAllRequests((prev) => {
      const updated = prev.map((req) => {
        if (req.user?.vin === updatedData.vin) {
          return {
            ...req,
            conversation: {
              ...req.conversation,
              status_code: updatedData.status,
            },
          };
        }
        return req;
      });
      calculateSummary(updated);
      return updated;
    });
  };

  if (loading)
    return <div className="p-6 text-center">Cargando datos...</div>;
  if (error)
    return (
      <div className="p-6 text-center text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="p-6 text-gray-800">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-4xl font-bold">Walmart</h2>
        </div>
        <SummaryAlerts
          total={totalSolicitudes}
          pending={totalPendientes}
          approved={totalAprobados}
          rejected={totalRechazados}
        />
      </div>

      {/* Barra de búsqueda y paginación */}
      <div className="py-8 flex items-center justify-between">
        <div className="w-1/2 pr-2">
          <SearchBar
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="w-1/2 pl-2 flex justify-end">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Tabla */}
      <WalmartTable data={pageData} onShowDetails={handleShowDetails} />

      {/* Modal */}
      {showModal && selectedRequest && (
        <WalmartModal
          request={selectedRequest}
          onClose={handleCloseModal}
          onStatusChange={updateLocalStatus}
        />
      )}
    </div>
  );
}

export default Walmart;
