// src/services/clientService.js
import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;
const clientUpdateUrl = import.meta.env.VITE_API_CLIENT_UPDATE;
const apiTarjetaUrl = import.meta.env.VITE_API_TARJETA;

export const getClientRequests = async () => {
  const response = await axios.get(`${apiUrl}/client-requests`);
  return response.data.requests || [];
};

export const updateClientData = async (payload) => {
  await axios.post(`${clientUpdateUrl}/client-update`, payload);
};

export const updateClientStatus = async (user_id, status) => {
  await axios.post(`${clientUpdateUrl}/update-status`, { user_id, status });
};

export const generateTarjeta = async (payloadTarjeta) => {
  const response = await axios.post(`${apiTarjetaUrl}/api/tarjeta`, payloadTarjeta);
  return response.data;
};
