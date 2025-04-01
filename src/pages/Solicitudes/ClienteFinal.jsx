// src/pages/ClienteFinal.jsx
import React, { useState, useEffect } from "react";
import ClienteFinalTable from "../../components/ClienteFinalTable";
import SummaryAlerts from "../../components/SolicitudesCard";
import ClienteFinalModal from "../../components/ClienteFinalModal";
import SearchBar from "../../components/SearchBar";
import Pagination from "../../components/Pagination"; 
import useClientRequests from "../../hooks/useClientRequests";

function ClienteFinal() {
  const { requests: allRequests, setRequests, loading, error } = useClientRequests();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  const [totalSolicitudes, setTotalSolicitudes] = useState(0);
  const [totalPendientes, setTotalPendientes] = useState(0);
  const [totalAprobados, setTotalAprobados] = useState(0);
  const [totalRechazados, setTotalRechazados] = useState(0);

  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  // Calcula totales
  const calculateSummary = (requests) => {
    setTotalSolicitudes(requests.length);
    setTotalPendientes(requests.filter((r) => r.status === "pending").length);
    setTotalAprobados(requests.filter((r) => r.status === "approved").length);
    setTotalRechazados(requests.filter((r) => r.status === "rejected").length);
  };

  // Actualizar totales cada vez que cambien las solicitudes
  useEffect(() => {
    calculateSummary(allRequests);
  }, [allRequests]);

  // Filtrar solicitudes
  const filteredRequests = allRequests.filter((req) => {
    const text = `${req.full_name} ${req.email} ${req.phone_number} ${req.city}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  // Paginación
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

  // Callback para actualizar la solicitud en el estado local
  const updateLocalData = (updatedRequest) => {
    setRequests((prev) => {
      const updated = prev.map((req) =>
        req.user_id === updatedRequest.user_id ? updatedRequest : req
      );
      calculateSummary(updated);
      return updated;
    });
  };

  if (loading) return <div className="p-6 text-center">Cargando datos...</div>;
  if (error)
    return (
      <div className="text-center text-red-500">
        Error: {error.message}
      </div>
    );

  return (
    <div className="p-6 py-15 text-gray-800">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-4xl font-bold">Cliente Final</h2>
        </div>
        <SummaryAlerts
          total={totalSolicitudes}
          pending={totalPendientes}
          approved={totalAprobados}
          rejected={totalRechazados}
        />
      </div>
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
      <ClienteFinalTable data={pageData} onShowDetails={handleShowDetails} />
      {showModal && selectedRequest && (
        <ClienteFinalModal
          request={selectedRequest}
          onClose={handleCloseModal}
          onDataUpdate={updateLocalData}
        />
      )}
    </div>
  );
}

export default ClienteFinal;