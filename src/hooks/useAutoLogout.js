// src/hooks/useAutoLogout.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useAutoLogout = (timeout = 5 * 1000) => { // 5 segundos para pruebas
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const logout = () => {
      console.log("Inactividad detectada: cerrando sesión...");
      localStorage.removeItem('token');
      navigate('/login');
    };

    const resetTimer = () => {
      console.log("Reiniciando timer", new Date());
      if (timer) clearTimeout(timer);
      timer = setTimeout(logout, timeout);
    };

    // Eventos que consideramos actividad
    const events = ['mousemove', 'keydown', 'scroll', 'click'];
    events.forEach(event => window.addEventListener(event, resetTimer));

    // Inicia el timer al montar
    resetTimer();

    return () => {
      events.forEach(event => window.removeEventListener(event, resetTimer));
      if (timer) clearTimeout(timer);
    };
  }, [navigate, timeout]);
};

export default useAutoLogout;
