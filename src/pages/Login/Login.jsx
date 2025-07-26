// src/pages/Login/Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import brandLogo from '../../assets/TVS-LOGO-RGB-300DPI.jpg';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_LOGIN}`,
        { username, password }
      );
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.user.username);
        window.location.href = "/dashboard";
      } else {
        setError(response.data.message || "Credenciales inválidas");
      }
    } catch (err) {
      setError("Error de conexión con el servidor");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="p-4 sm:p-6">
        <img src={brandLogo} alt="Logo" className="h-16 sm:h-20 md:h-28" />
      </div>
      <div className="flex-grow flex items-center justify-center px-4 py-6 sm:px-6 md:px-8">
        <div className="w-full max-w-sm sm:max-w-md">
          <h1 className="text-xl sm:text-2xl font-semibold text-center mb-1 sm:mb-2 font-sans">Login</h1>
          <p className="text-sm sm:text-base font-normal text-center mb-6 sm:mb-8 text-gray-600 font-sans">
            Inicia sesión en tu cuenta
          </p>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm font-sans">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2 font-sans">
                Usuario
              </label>
              <input
                type="text"
                className="border border-gray-300 rounded-lg w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200 font-sans"
                placeholder="Ingresa tu usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2 font-sans">
                Contraseña
              </label>
              <input
                type="password"
                className="border border-gray-300 rounded-lg w-full px-4 py-2.5 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-1 focus:ring-blue-500 transition-all duration-200 font-sans"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-black text-white w-full py-2.5 sm:py-3 rounded-lg hover:bg-red-600 transition-colors text-sm sm:text-base font-medium mt-4 cursor-pointer font-sans"
            >
              Iniciar Sesión
            </button>
          </form>
          <div className="text-center mt-5 sm:mt-6">
            <a href="#" className="text-blue-600 hover:underline text-sm sm:text-base cursor-pointer font-sans">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
