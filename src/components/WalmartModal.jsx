// src/components/WalmartModal.jsx
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  estadoOptions,
  tipoPersonaOptions,
  tipoCompraOptions,
  promocionOptions,
  transformDataTarjeta
} from "../mocks/constants"; // Asegúrate de que la ruta sea correcta

const WalmartModal = ({ request, onClose, onStatusChange = () => {} }) => {
  // En Walmart usamos el VIN para identificar la solicitud
  const initialData = {
    vin: request.user?.vin || "",
    invoice: request.user?.invoice || "",
    full_name: request.user?.full_name || "",
    email: request.user?.email || "",
    phone_number: request.user?.phone_number || "",
    birthday: request.user?.birthday || "",
    street: request.user?.street || "",
    exterior_number: request.user?.exterior_number || "",
    interior_number: request.user?.interior_number || "",
    neighborhood: request.user?.neighborhood || "",
    state: request.user?.state || "",
    city: request.user?.city || "",
    zip: request.user?.zip || "",
    // Usamos conversation.status_code para el estado
    status: request.conversation?.status_code || "",
    // Usamos finish_date como fecha de venta (ajusta según sea necesario)
    fecha_venta: request.conversation?.finish_date || "",
    // Datos del vehículo
    modelo: request.vehicle?.modelo || "",
    anio: request.vehicle?.anio || "",
    retailer: request.vehicle?.retailer || "",
    // Valores fijos para el formulario
    promocion: "Otro",
    tipo_compra: "Otro Crédito",
    origen_venta: request?.origen_venta || "Otro",
    especifique: request?.retailer || "",
    email_vendedor: "",
    tipo_persona: "",
    vendedor: "",
    precio_venta: "",
    folio: ""
  };

  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // En Walmart NO se hace un update separado; para notificar se usa exclusivamente el endpoint de retailer-update-status.
  // La función para aprobar o rechazar envía { vin, status } al endpoint.
  const handleApproveReject = async (status) => {
    setLoading(true);
    const toastId = toast.loading(
      `Enviando notificación de ${status === "approved" ? "aprobación" : "rechazo"}...`
    );
    try {
      const updateStatusEndpoint = import.meta.env.VITE_API_RETAILER_UPDATE_STATUS;
      await axios.post(updateStatusEndpoint, {
        vin: formData.vin,
        status,
      });
      const updatedData = { ...formData, status };
      setFormData(updatedData);
      onStatusChange(updatedData);
      toast.update(toastId, {
        render: `Solicitud ${status === "approved" ? "aprobada" : "rechazada"} correctamente.`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      onClose();
    } catch (error) {
      console.error(error);
      toast.update(toastId, {
        render: "Error al cambiar el estatus.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
    setLoading(false);
  };

  // Función para aprobar y generar la tarjeta.
  // Se genera la tarjeta, se actualizan los datos del cliente y, finalmente, se notifica la aprobación usando { vin, status: "approved" }
  const handleAprobarTarjeta = async () => {
    setLoading(true);
    try {
      const payloadTarjeta = transformDataTarjeta(formData);
      console.log("Payload de tarjeta:", payloadTarjeta);
      const apiTarjetaUrl = import.meta.env.VITE_API_TARJETA; // Ejemplo: https://bdcmotomex.com/MINI_CRM/api/public/index.php
      const fullUrl = `${apiTarjetaUrl}/api/tarjeta`;
      console.log("API Tarjeta URL:", fullUrl);
      const response = await axios.post(fullUrl, payloadTarjeta);

      if (response.data && response.data.folioTarjetaRegistro) {
        const folio = response.data.folioTarjetaRegistro;
        toast.info(`Folio generado: ${folio}`, { autoClose: 3000 });
        const updatedFormData = { ...formData, folio };
        setFormData(updatedFormData);

        // Actualizamos los datos del cliente (client-update) si es necesario
        const apiUrl = import.meta.env.VITE_API_CLIENT_UPDATE;
        // Aquí se utiliza transformData si se necesita enviar payload adicional, de lo contrario omite esta parte.
        // await axios.post(`${apiUrl}/client-update`, transformData(updatedFormData));

        // Envía la notificación de aprobación usando el VIN y el endpoint retailer-update-status
        const updateStatusEndpoint = import.meta.env.VITE_API_RETAILER_UPDATE_STATUS;
        await axios.post(updateStatusEndpoint, {
          vin: updatedFormData.vin,
          status: "approved"
        });
        toast.success("Documentos enviados correctamente", { autoClose: 3000 });
        onStatusChange(updatedFormData);
        onClose();
      } else {
        throw new Error("No se generó el folio");
      }
    } catch (error) {
      console.error("Error en el proceso:", error);
      toast.error("Error al generar la tarjeta y enviar documentos", { autoClose: 3000 });
    }
    setLoading(false);
  };

  return (
    <>
      <ToastContainer position="bottom-right" />
      <div className="fixed top-0 left-0 w-full h-full backdrop-blur-xs bg-white/5 bg-opacity-20 flex items-center justify-center z-50 p-2 sm:p-4">
        <div className="bg-white w-full max-w-6xl rounded relative overflow-auto max-h-[90vh] shadow-sm">
          <button
            onClick={onClose}
            className="absolute top-2 sm:top-4 right-2 sm:right-5 text-xl sm:text-2xl text-gray-700 hover:text-black font-bold z-10"
          >
            &times;
          </button>
          <div className="px-3 sm:px-6 py-3 sm:py-6"></div>
          <div className="px-3 sm:px-6 py-3 sm:py-6 text-black text-sm">
            {/* Sección de Datos Personales */}
            <section className="mb-4 sm:mb-6">
              <h4 className="text-sm font-bold uppercase mb-2 sm:mb-3">Datos Personales</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4">
                {[
                  ["Nombre", "full_name"],
                  ["Teléfono", "phone_number"],
                  ["Correo", "email"],
                  ["Fecha de Nacimiento", "birthday"],
                ].map(([label, name]) => (
                  <div key={name}>
                    <p className="text-xs text-gray-500 mb-1">{label}</p>
                    <input
                      type={name === "birthday" ? "date" : "text"}
                      name={name}
                      value={formData[name] || ""}
                      onChange={handleChange}
                      className="w-full border-b border-gray-200 focus:outline-none px-1 pb-1"
                    />
                  </div>
                ))}
                <div className="col-span-1">
                  <p className="text-xs text-gray-500 mb-1">Estado</p>
                  <select
                    name="state"
                    value={formData.state || ""}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 focus:outline-none px-1 pb-1"
                  >
                    <option value="">Selecciona Estado</option>
                    {estadoOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                {[
                  ["Calle", "street", "col-span-2"],
                  ["Número Exterior", "exterior_number"],
                  ["Número Interior", "interior_number"],
                  ["Código Postal", "zip"],
                  ["Colonia", "neighborhood"],
                  ["Ciudad", "city"],
                  ["NIV", "vin"],
                  ["Modelo", "modelo"],
                  ["Año", "anio"],
                ].map(([label, name, extraClass = ""]) => (
                  <div key={name} className={extraClass}>
                    <p className="text-xs text-gray-500 mb-1">{label}</p>
                    <input
                      type="text"
                      name={name}
                      value={formData[name] || ""}
                      onChange={handleChange}
                      className="w-full border-b border-gray-200 focus:outline-none px-1 pb-1"
                    />
                  </div>
                ))}
              </div>
            </section>
            {/* Sección de Detalles de Venta */}
            <section className="mb-4 sm:mb-6">
              <h4 className="text-sm font-bold uppercase mb-2 sm:mb-3">Detalles de Venta</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4">
                <div className="col-span-1">
                  <p className="text-xs text-gray-500 mb-1">Tipo de Persona</p>
                  <select
                    name="tipo_persona"
                    value={formData.tipo_persona || ""}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 focus:outline-none px-1 pb-1"
                  >
                    <option value="">Selecciona Tipo de Persona</option>
                    {tipoPersonaOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-1">
                  <p className="text-xs text-gray-500 mb-1">Tipo de Compra</p>
                  <input
                    type="text"
                    name="tipo_compra"
                    value={formData.tipo_compra}
                    disabled
                    className="w-full border-b border-gray-200 focus:outline-none px-1 pb-1"
                  />
                </div>
                <div className="col-span-1">
                  <p className="text-xs text-gray-500 mb-1">Promoción</p>
                  <input
                    type="text"
                    name="promocion"
                    value={formData.promocion}
                    disabled
                    className="w-full border-b border-gray-200 focus:outline-none px-1 pb-1"
                  />
                </div>
                <div className="col-span-1">
                  <p className="text-xs text-gray-500 mb-1">Origen Venta</p>
                  <input
                    type="text"
                    name="origen_venta"
                    value={formData.origen_venta || ""}
                    onChange={handleChange}
                    className="w-full border-b border-gray-200 focus:outline-none px-1 pb-1"
                  />
                </div>
                {[
                  ["Email Vendedor", "email_vendedor"],
                  ["Fecha Venta", "fecha_venta"],
                  ["Vendedor", "vendedor"],
                  ["Especifique", "especifique"],
                  ["Precio Venta", "precio_venta"]
                ].map(([label, name]) => (
                  <div key={name} className="col-span-1">
                    <p className="text-xs text-gray-500 mb-1">{label}</p>
                    <input
                      type="text"
                      name={name}
                      value={formData[name] || ""}
                      onChange={handleChange}
                      className="w-full border-b border-gray-200 focus:outline-none px-1 pb-1"
                    />
                  </div>
                ))}
              </div>
            </section>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-6 sm:mt-8 gap-4 sm:gap-0">
              <a
                href={formData.invoice || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[#989898] font-semibold underline hover:no-underline mb-2 sm:mb-0"
              >
                Ver Factura
              </a>
              <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                {/* En Walmart no se usa el update separado */}
                <button
                  onClick={() => handleApproveReject("rejected")}
                  disabled={loading}
                  className="bg-white text-[#ff0033] px-4 sm:px-8 md:px-12 py-2 text-xs sm:text-sm rounded-md border border-[#989898] transition-colors hover:bg-[#ff0033] hover:text-white"
                >
                  Rechazar
                </button>
                <button
                  onClick={handleAprobarTarjeta}
                  disabled={loading}
                  className="bg-black text-white px-4 sm:px-8 md:px-12 py-2 text-xs sm:text-sm rounded-md border border-[#989898] transition-colors hover:bg-[#989898] hover:text-black"
                >
                  Aprobar y Generar Tarjeta
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WalmartModal;
