// src/hooks/useClientRequests.js
import { useState, useEffect } from "react";
import { getClientRequests } from "../services/clientService";

const useClientRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const data = await getClientRequests();
        setRequests([...data].reverse());
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, []);

  return { requests, setRequests, loading, error };
};

export default useClientRequests;
