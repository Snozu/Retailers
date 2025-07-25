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
  
  // Estado para el filtro de tarjetas
  const [statusFilter, setStatusFilter] = useState(null);

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

  // Manejar cambio de filtro por tarjetas
  const handleFilterChange = (filter) => {
    setStatusFilter(filter);
    setCurrentPage(1); // Resetear a la primera página al cambiar el filtro
  };

  // Filtrado de solicitudes basado en datos del usuario (ubicados en r.user) y el filtro de estado
  const filteredRequests = allRequests.filter((req) => {
    // Filtro por texto de búsqueda
    const text = `${req.user?.full_name || ""} ${req.user?.email || ""} ${req.user?.phone_number || ""} ${req.user?.city || ""}`.toLowerCase();
    const matchesSearch = text.includes(searchTerm.toLowerCase());
    
    // Filtro por estado
    let matchesStatus = true;
    if (statusFilter) {
      if (statusFilter === 'pending') {
        matchesStatus = req.conversation && (req.conversation.status_code === 'pending' || req.conversation.status_code === 'hold');
      } else {
        matchesStatus = req.conversation && req.conversation.status_code === statusFilter;
      }
    }
    
    return matchesSearch && matchesStatus;
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
    <div className="p-4 sm:p-6 text-gray-800">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-3xl sm:text-4xl font-bold">Walmart</h2>
        </div>
        <SummaryAlerts
          total={totalSolicitudes}
          pending={totalPendientes}
          approved={totalAprobados}
          rejected={totalRechazados}
          onFilterChange={handleFilterChange}
        />
      </div>
      <div className="py-4 sm:py-8 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-0 sm:justify-between">
        <div className="w-full sm:w-1/2 sm:pr-2">
          <SearchBar
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="w-full sm:w-1/2 sm:pl-2 flex justify-center sm:justify-end">
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
