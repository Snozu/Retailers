// src/constants.js
// Opciones para el select de Estados
export const estadoOptions = [
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
export const tipoPersonaOptions = [
  { label: "Persona Física", value: "Persona Física" },
  { label: "Persona Moral", value: "Persona Moral" }
];

// Opciones para Tipo de Compra y Promoción
export const tipoCompraOptions = [{ label: "Otro Crédito", value: "Otro Crédito" }];
export const promocionOptions = [{ label: "Otro", value: "Otro" }];

// Mapeos para transformar los valores
export const estadosMapping = {
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

export const tipoPersonaMapping = {
  "Persona Física": "1",
  "Persona Moral": "2"
};

export const tipoCompraMapping = {
  "Otro Crédito": "2"
};

export const origenVentaMapping = {
  "Otro": "5"
};

export const promocionMapping = {
  "Otro": "6"
};

// Función para separar el nombre completo en nombre y apellido paterno
export const parseNombreApellido = (fullName) => {
  const parts = fullName.trim().split(" ");
  if (parts.length >= 2) {
    return {
      nombre: parts[0],
      apellidoPaterno: parts[1]
    };
  }
  return { nombre: fullName, apellidoPaterno: "N/A" };
};

// Función para transformar los datos para la API de tarjeta
export const transformDataTarjeta = (data) => {
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
export const transformData = (data) => ({
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


