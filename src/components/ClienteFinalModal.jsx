// src/components/ClienteFinalModal.jsx
import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Opciones para el select de Estados (valor y label son el mismo texto)
const estadoOptions = [
  { label: "Aguascalientes", value: "Aguascalientes" },
  { label: "Baja California Norte", value: "Baja California Norte" },
  { label: "Baja California Sur", value: "Baja California Sur" },
  { label: "Campeche", value: "Campeche" },
  { label: "Chiapas", value: "Chiapas" },
  { label: "Chihuahua", value: "Chihuahua" },
  { label: "Ciudad de México", value: "Ciudad de México" },
  { label: "Coahuila", value: "Coahuila" },
  { label: "Colima", value: "Colima" },
  { label: "Durango", value: "Durango" },
  { label: "Estado de México", value: "Estado de México" },
  { label: "Guanajuato", value: "Guanajuato" },
  { label: "Guerrero", value: "Guerrero" },
  { label: "Hidalgo", value: "Hidalgo" },
  { label: "Jalisco", value: "Jalisco" },
  { label: "Michoacán", value: "Michoacán" },
  { label: "Morelos", value: "Morelos" },
  { label: "Nayarit", value: "Nayarit" },
  { label: "Nuevo León", value: "Nuevo León" },
  { label: "Oaxaca", value: "Oaxaca" },
  { label: "Puebla", value: "Puebla" },
  { label: "Querétaro", value: "Querétaro" },
  { label: "Quintana Roo", value: "Quintana Roo" },
  { label: "San Luís Potosí", value: "San Luís Potosí" },
  { label: "Sinaloa", value: "Sinaloa" },
  { label: "Sonora", value: "Sonora" },
  { label: "Tabasco", value: "Tabasco" },
  { label: "Tamaulipas", value: "Tamaulipas" },
  { label: "Tlaxcala", value: "Tlaxcala" },
  { label: "Veracruz", value: "Veracruz" },
  { label: "Yucatán", value: "Yucatán" },
  { label: "Zacatecas", value: "Zacatecas" }
];

// Opciones para Tipo de Persona
const tipoPersonaOptions = [
  { label: "Persona Física", value: "Persona Física" },
  { label: "Persona Moral", value: "Persona Moral" }
];

// Opciones para Tipo de Compra y Promoción (texto fijo)
const tipoCompraOptions = [{ label: "Otro Crédito", value: "Otro Crédito" }];
const promocionOptions = [{ label: "Otro", value: "Otro" }];

// Objetos de mapeo para transformar los valores antes de enviarlos a la API
const estadosMapping = {
  "Aguascalientes": "AGS",
  "Baja California Norte": "BC",
  "Baja California Sur": "BCS",
  "Campeche": "CAM",
  "Chiapas": "CHS",
  "Chihuahua": "CHH",
  "Ciudad de México": "DF",
  "Coahuila": "COA",
  "Colima": "COL",
  "Durango": "DGO",
  "Estado de México": "MEX",
  "Guanajuato": "GTO",
  "Guerrero": "GRO",
  "Hidalgo": "HGO",
  "Jalisco": "JAL",
  "Michoacán": "MIC",
  "Morelos": "MOR",
  "Nayarit": "NAY",
  "Nuevo León": "NL",
  "Oaxaca": "OAX",
  "Puebla": "PUE",
  "Querétaro": "QRO",
  "Quintana Roo": "QR",
  "San Luís Potosí": "SLP",
  "Sinaloa": "SIN",
  "Sonora": "SON",
  "Tabasco": "TAB",
  "Tamaulipas": "TAM",
  "Tlaxcala": "TLA",
  "Veracruz": "VER",
  "Yucatán": "YUC",
  "Zacatecas": "ZAC"
};

const tipoPersonaMapping = {
  "Persona Física": "1",
  "Persona Moral": "2"
};

const tipoCompraMapping = {
  "Otro Crédito": "2"
};

const origenVentaMapping = {
  "Otro": "5"
};

const promocionMapping = {
  "Otro": "6"
};

// Función para separar el nombre completo y extraer nombre y apellido paterno
const parseNombreApellido = (fullName) => {
  const parts = fullName.trim().split(" ");
  if (parts.length >= 2) {
    return {
      nombre: parts[0],
      apellidoPaterno: parts[1]
    };
  }
  return { nombre: fullName, apellidoPaterno: "N/A" };
};

// Función para transformar los datos para la API de tarjeta.
const transformDataTarjeta = (data) => {
  const { nombre, apellidoPaterno } = parseNombreApellido(data.full_name);
  return {
    vcNIV: data.vin,
    nombre,
    apellidoPaterno: apellidoPaterno || "N/A",
    apellidoMaterno: data.apellidoMaterno || "",
    fechaNacimiento: data.birthday,
    calle: data.street,
    numeroExterior: data.exterior_number,
    numeroInterior: data.interior_number,
    colonia: data.neighborhood,
    estado: estadosMapping[data.state] || data.state,
    ciudad: data.city,
    codigoPostal: data.zip,
    emailCliente: data.email,
    tipoPersona: tipoPersonaMapping[data.tipo_persona] || data.tipo_persona,
    tipoCompra: tipoCompraMapping[data.tipo_compra] || data.tipo_compra,
    origenVenta: origenVentaMapping[data.origen_venta] || data.origen_venta,
    promocion: promocionMapping[data.promocion] || data.promocion,
    telefono: data.phone_number,
    fechaVenta: data.fecha_venta,
    vendedor: data.vendedor,
    precioVenta: data.precio_venta,
    emailVendedor: data.email_vendedor
  };
};

// Función para transformar datos para la actualización (client-update)
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
  promocion: data.promocion,
  email_vendedor: data.email_vendedor,
  fecha_venta: data.fecha_venta,
  tipo_persona: data.tipo_persona,
  vendedor: data.vendedor,
  especifique: data.especifique,
  tipo_compra: data.tipo_compra,
  precio_venta: data.precio_venta,
  origen_venta: data.origen_venta,
  folio: data.folio || ""
});

const ClienteFinalModal = ({ request, onClose, onDataUpdate = () => {} }) => {
  const [formData, setFormData] = useState({
    ...request,
    promocion: "Otro",            // Fijo a "Otro" para Promoción
    tipo_compra: "Otro Crédito",  // Fijo a "Otro Crédito"
    origen_venta: request?.origen_venta || "Otro", // Se muestra el texto ingresado
    especifique: request?.retailer || ""
  });
  const [loading, setLoading] = useState(false);

  // Función para actualizar datos (client-update)
  const handleUpdate = async () => {
    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_CLIENT_UPDATE;
      const payload = transformData(formData);
      await axios.post(`${apiUrl}/client-update`, payload);
      toast.success("Datos actualizados correctamente.", { autoClose: 3000 });
      onDataUpdate(formData);
      // Puedes cerrar el modal si se actualiza correctamente (opcional)
      // onClose();
    } catch (error) {
      toast.error("Error al actualizar los datos.", { autoClose: 3000 });
      console.error(error);
    }
    setLoading(false);
  };

  // Función para notificar aprobación o rechazo
  const handleApproveReject = async (status) => {
    setLoading(true);
    const toastId = toast.loading(
      `Enviando notificación de ${status === "approved" ? "aprobación" : "rechazo"}...`
    );
    try {
      const apiUrl = import.meta.env.VITE_API_CLIENT_UPDATE;
      await axios.post(`${apiUrl}/update-status`, {
        user_id: formData.user_id,
        status,
      });
      const updatedData = { ...formData, status };
      setFormData(updatedData);
      onDataUpdate(updatedData);
      toast.update(toastId, {
        render: `Solicitud ${status === "approved" ? "aprobada" : "rechazada"} correctamente.`,
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      // Cierra el modal tras aprobación o rechazo
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

  // Función para generar la tarjeta y actualizar datos
  const handleAprobarTarjeta = async () => {
    setLoading(true);
    try {
      const payloadTarjeta = transformDataTarjeta(formData);
      console.log("Payload que se enviará a la API:", payloadTarjeta);

      const apiTarjetaUrl = import.meta.env.VITE_API_TARJETA;
      const response = await axios.post(`${apiTarjetaUrl}/api/tarjeta`, payloadTarjeta);

      if (response.data && response.data.folioTarjetaRegistro) {
        const folio = response.data.folioTarjetaRegistro;
        toast.info(`Folio generado: ${folio}`, { autoClose: 3000 });

        const updatedFormData = { ...formData, folio };
        setFormData(updatedFormData);

        const apiUrl = import.meta.env.VITE_API_CLIENT_UPDATE;
        const payloadUpdate = transformData(updatedFormData);
        await axios.post(`${apiUrl}/client-update`, payloadUpdate);

        await axios.post(`${apiUrl}/update-status`, {
          user_id: updatedFormData.user_id,
          status: "approved"
        });
        
        toast.success("Documentos enviados correctamente", { autoClose: 3000 });
        onDataUpdate(updatedFormData);
        // Cierra el modal tras éxito
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

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
                <button
                  onClick={handleUpdate}
                  disabled={loading}
                  className="bg-white text-[#989898] px-4 sm:px-8 md:px-12 py-2 text-xs sm:text-sm rounded-md border border-[#989898] transition-colors hover:bg-[#989898] hover:text-white"
                >
                  Actualizar
                </button>
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

export default ClienteFinalModal;