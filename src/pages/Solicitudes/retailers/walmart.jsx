// src/pages/Solicitudes/retailers/Walmart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import ClienteFinalTable from "../../../components/WalmartTable";
import SummaryAlerts from "../../../components/SolicitudesCard"; 
import ClienteFinalModal from "../../../components/WalmartModal";
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

  // Llamada a la API para Walmart con token en los headers
  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token"); 
    axios
      .get(`${apiUrl}/retailers/WMT-001-25/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {

        const requests = response.data.users || [];
        setAllRequests([...requests].reverse());
        setLoading(false);
        calculateSummary(requests);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  
  const calculateSummary = (requests) => {

    setTotalSolicitudes(requests.length);
    setTotalPendientes(requests.filter((r) => r.status === "pending").length);
    setTotalAprobados(requests.filter((r) => r.status === "approved").length);
    setTotalRechazados(requests.filter((r) => r.status === "rejected").length);
  };

  const filteredRequests = allRequests.filter((req) => {
    const text = `${req.full_name} ${req.email} ${req.phone_number} ${req.city}`.toLowerCase();
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

  const updateLocalStatus = (user_id, newStatus) => {
    setAllRequests((prev) => {
      const updated = prev.map((req) =>
        req.user_id === user_id ? { ...req, status: newStatus } : req
      );
      calculateSummary(updated);
      return updated;
    });
  };

  if (loading) return <div className="p-6 text-center">Cargando datos...</div>;
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

    {/* Barra de Búsqueda y Paginación en la misma línea */}
    <div className="py-8  flex items-center justify-between ">
        {/* SearchBar ocupa la mitad */}
        <div className="w-1/2 pr-2">
          <SearchBar
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {/* Paginación ocupa la mitad */}
        <div className="w-1/2 pl-2 flex justify-end">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>


      {/* Tabla */}
      <ClienteFinalTable data={pageData} onShowDetails={handleShowDetails} />

      {/* Modal */}
      {showModal && selectedRequest && (
        <ClienteFinalModal
          request={selectedRequest}
          onClose={handleCloseModal}
          onStatusChange={updateLocalStatus}
        />
      )}
    </div>
  );
}

export default Walmart;
