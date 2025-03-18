// src/pages/Solicitudes/ClienteFinal.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTableShadcn from "@/components/DataTableShadcnColumns.jsx";

function ClienteFinal() {
  // Estados principales
  const [allRequests, setAllRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Para la búsqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Resumen de estatus
  const [totalSolicitudes, setTotalSolicitudes] = useState(0);
  const [totalPendientes, setTotalPendientes] = useState(0);
  const [totalAprobados, setTotalAprobados] = useState(0);
  const [totalRechazados, setTotalRechazados] = useState(0);

  // Modal (simplificado)
  const [showModal, setShowModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL;
    axios
      .get(apiUrl)
      .then((response) => {
        const requests = response.data.requests || [];
        setAllRequests(requests);
        setLoading(false);
        calculateSummary(requests);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  // Calcula los totales
  const calculateSummary = (requests) => {
    setTotalSolicitudes(requests.length);
    setTotalPendientes(requests.filter((r) => r.status === "pending").length);
    setTotalAprobados(requests.filter((r) => r.status === "approved").length);
    setTotalRechazados(requests.filter((r) => r.status === "rejected").length);
  };

  // Filtra datos según searchTerm
  const filteredRequests = allRequests.filter((req) => {
    const text = `${req.full_name} ${req.email} ${req.phone_number} ${req.city}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  // Paginación
  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const pageData = filteredRequests.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Modal
  const handleShowDetails = (request) => {
    setSelectedRequest(request);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedRequest(null);
  };

  if (loading) {
    return <div className="p-6">Cargando datos...</div>;
  }
  if (error) {
    return <div className="p-6 text-red-500">Error: {error.message}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Solicitudes de Cliente Final</h2>

      {/* Resumen */}
      <div className="summary-container mb-4">
        <div className="summary-item">
          <i className="fas fa-users"></i>
          <div>
            <p className="summary-title">Total solicitudes</p>
            <p className="summary-value">{totalSolicitudes}</p>
          </div>
        </div>
        <div className="summary-item">
          <i className="fas fa-clock"></i>
          <div>
            <p className="summary-title">Pendientes</p>
            <p className="summary-value">{totalPendientes}</p>
          </div>
        </div>
        <div className="summary-item">
          <i className="fas fa-check-circle"></i>
          <div>
            <p className="summary-title">Aprobados</p>
            <p className="summary-value">{totalAprobados}</p>
          </div>
        </div>
        <div className="summary-item">
          <i className="fa-solid fa-circle-xmark"></i>
          <div>
            <p className="summary-title">Rechazados</p>
            <p className="summary-value">{totalRechazados}</p>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda */}
      <div className="table-header mb-4">
        <div className="search-container">
          <i className="fas fa-search search-icon"></i>
          <input
            type="text"
            id="searchInput"
            placeholder="Buscar"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>

      {/* Tabla */}
      <DataTableShadcn
        data={pageData}
        onShowDetails={handleShowDetails} // Pasamos un callback para "Ver Detalles"
      />

      {/* Paginación */}
      <div id="paginationContainer" className="paginacion">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <a
            key={page}
            href="#!"
            className={"page-link" + (page === currentPage ? " active" : "")}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(page);
            }}
          >
            {page}
          </a>
        ))}
      </div>

      {/* Modal (simplificado) */}
      {showModal && selectedRequest && (
        <div className="modal" role="dialog" aria-modal="true">
          <div className="modal-header">
            <div id="modal-title">Detalles de la solicitud</div>
            <button className="close" onClick={handleCloseModal}>
              &times;
            </button>
          </div>

          <div className="seccion">
            <div className="seccion-titulo">Datos personales</div>
            <table className="tabla">
              <tbody>
                <tr>
                  <th>Nombre:</th>
                  <td>{selectedRequest.full_name || "N/A"}</td>
                  <th>Teléfono:</th>
                  <td>{selectedRequest.phone_number || "N/A"}</td>
                </tr>
                <tr>
                  <th>Correo:</th>
                  <td>{selectedRequest.email || "N/A"}</td>
                  <th>Fecha Nac.:</th>
                  <td>{selectedRequest.birthday || "N/A"}</td>
                </tr>
                <tr>
                  <th>VIN:</th>
                  <td>{selectedRequest.vin || "N/A"}</td>
                  <th>Modelo:</th>
                  <td>{selectedRequest.modelo || "N/A"}</td>
                </tr>
                <tr>
                  <th>Retailer:</th>
                  <td>{selectedRequest.retailer || "N/A"}</td>
                  <th>Año:</th>
                  <td>{selectedRequest.anio || "N/A"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="modal-footer">
            <a
              href={selectedRequest.invoice || "#"}
              target="_blank"
              rel="noopener noreferrer"
              id="ver-factura-link"
            >
              Ver Factura
            </a>
            <div>
              <button
                id="btn-actualizar"
                onClick={() => alert("Implementar lógica de actualización")}
              >
                Actualizar
              </button>
              <button
                id="btn-rechazar"
                onClick={() => alert("Implementar lógica para rechazar")}
              >
                Rechazar
              </button>
              <button
                id="btn-aprobar"
                onClick={() => alert("Implementar lógica para aprobar")}
              >
                Aprobar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClienteFinal;
