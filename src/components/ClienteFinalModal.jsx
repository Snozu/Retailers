  // src/components/ClienteFinalModal.jsx
import React, { useState } from "react";
import axios from "axios";

const ClienteFinalModal = ({ request, onClose, onDataUpdate = () => {} }) => {
  // Inicializamos el estado con los valores del request y asignamos los valores fijos para detalles de venta
  const [formData, setFormData] = useState({
    ...request,
    promocion: "otro",                 // Siempre "otro"
    tipo_compra: "otro crédito",       // Siempre "otro crédito"
    origen_venta: "Otro",              // Siempre "Otro"
    especifique: request.retailer || "" // Toma el retailer y lo asigna a "Especifique"
  });
  const [loading, setLoading] = useState(false);

  
  // Función para transformar los datos del frontend al formato esperado por el backend
  const transformData = (data) => ({
    user_id: data.user_id,
    vin: data.vin,
    invoice: data.invoice,
    full_name: data.full_name,
    email: data.email,
    phone_number: data.phone_number,
    birthday: data.birthday,
    street: data.street,
    exterior_number: data.exterior_number,
    interior_number: data.interior_number,
    neighborhood: data.neighborhood,
    city: data.city,
    state: data.state,
    zip: data.zip,
    status: data.status,
    modelo: data.modelo,
    anio: data.anio,
    retailer: data.retailer,
  
    promocion: data.promocion,       // Fijo en "otro"
    email_vendedor: data.email_vendedor,
    fecha_venta: data.fecha_venta,
    tipo_persona: data.tipo_persona,
    vendedor: data.vendedor,
    especifique: data.especifique,   // Será el valor del retailer
    tipo_compra: data.tipo_compra,   // Fijo en "otro crédito"
    precio_venta: data.precio_venta,
    origen_venta: data.origen_venta  // Fijo en "Otro"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_CLIENT_UPDATE;
      console.log("apiUrl:", apiUrl);
      // Transformamos los datos antes de enviarlos
      const payload = transformData(formData);
      await axios.post(`${apiUrl}/client-update`, payload);
      alert("Datos actualizados correctamente.");
      onDataUpdate(formData);
      onClose();
    } catch (error) {
      alert("Error al actualizar los datos.");
      console.error(error);
    }
    setLoading(false);
  };

  const handleApproveReject = async (status) => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_CLIENT_UPDATE;
      await axios.post(`${apiUrl}/update-status`, {
        user_id: formData.user_id,
        status,
      });
      alert(
        `Solicitud ${
          status === "approved" ? "aprobada" : "rechazada"
        } correctamente.`
      );
      const updatedData = { ...formData, status };
      setFormData(updatedData);
      onDataUpdate(updatedData);
    } catch (error) {
      alert("Error al cambiar el estatus.");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full backdrop-blur-xs bg-white/5 bg-opacity-20 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-6xl rounded relative overflow-auto max-h-[90vh] shadow-sm">
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-2xl text-gray-700 hover:text-black font-bold"
        >
          &times;
        </button>
        <div className="px-6 py-6"></div>
        <div className="px-6 py-6 text-black text-sm">
          {/* Sección de Datos Personales */}
          <section className="mb-6">
            <h4 className="text-sm font-bold uppercase mb-3">Datos Personales</h4>
            <div className="grid grid-cols-4 gap-x-8 gap-y-4">
              {[
                ["Nombre", "full_name"],
                ["Teléfono", "phone_number"],
                ["Correo", "email"],
                ["Fecha de Nacimiento", "birthday"],
                ["Calle", "street", "col-span-2"],
                ["Número Exterior", "exterior_number"],
                ["Número Interior", "interior_number"],
                ["Código Postal", "zip"],
                ["Colonia", "neighborhood"],
                ["Ciudad", "city"],
                ["Estado", "state"],
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
          <section className="mb-6">
            <h4 className="text-sm font-bold uppercase mb-3">Detalles de Venta</h4>
            <div className="grid grid-cols-2 gap-x-8 gap-y-4">
              {[
                // Los campos fijos se muestran deshabilitados
                ["Promoción", "promocion", true],
                ["Email Vendedor", "email_vendedor", false],
                ["Fecha Venta", "fecha_venta", false],
                ["Tipo Persona", "tipo_persona", false],
                ["Vendedor", "vendedor", false],
                ["Especifique", "especifique", true],
                ["Tipo Compra", "tipo_compra", true],
                ["Precio Venta", "precio_venta", false],
                ["Origen Venta", "origen_venta", true],
              ].map(([label, name, isFixed]) => (
                <div key={name}>
                  <p className="text-xs text-gray-500 mb-1">{label}</p>
                  <input
                    type="text"
                    name={name}
                    value={formData[name] || ""}
                    onChange={handleChange}
                    disabled={isFixed}
                    className="w-full border-b border-gray-200 focus:outline-none px-1 pb-1"
                  />
                </div>
              ))}
            </div>
          </section>
          <div className="flex items-center justify-between mt-8">
            {/* Enlace para ver la factura */}
            <a
              href={formData.invoice || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-[#989898] font-semibold underline hover:no-underline"
            >
              Ver Factura
            </a>
            <div className="flex gap-3">
              <button
                onClick={handleUpdate}
                disabled={loading}
                className="bg-white text-[#989898] px-12 py-2 rounded-md border border-[#989898] transition-colors hover:bg-[#989898] hover:text-white"
              >
                Actualizar
              </button>
              <button
                onClick={() => handleApproveReject("rejected")}
                disabled={loading}
                className="bg-white text-[#ff0033] px-12 py-2 rounded-md border border-[#989898] transition-colors hover:bg-[#ff0033] hover:text-white"
              >
                Rechazar
              </button>
              <button
                onClick={() => handleApproveReject("approved")}
                disabled={loading}
                className="bg-black text-white px-12 py-2 rounded-md border border-[#989898] transition-colors hover:bg-[#989898] hover:text-black"
              >
                Aprobar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClienteFinalModal;
