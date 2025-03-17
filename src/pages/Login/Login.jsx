import React, { useState } from 'react';

function Login() {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

  
    alert(`Usuario: ${username}\nContraseña: ${password}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      
      {/* Contenedor principal (tarjeta) */}
      <div className="bg-white w-full max-w-md rounded shadow-md p-8">
        
        {/* Logo (opcional) */}
        <div className="flex justify-center mb-4">
          <img 
            alt="Logo" 
            className="h-12" 
          />
        </div>

        <h1 className="text-2xl font-semibold text-center mb-6">Login</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo de Usuario */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Usuario
            </label>
            <input
              type="text"
              className="border border-gray-300 rounded w-full px-3 py-2 
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* Campo de Contraseña */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Contraseña
            </label>
            <input
              type="password"
              className="border border-gray-300 rounded w-full px-3 py-2
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Botón de Iniciar Sesión */}
          <button
            type="submit"
            className="bg-black text-white w-full py-2 rounded 
                       hover:bg-gray-800 transition-colors"
          >
            Iniciar Sesión
          </button>
        </form>

        {/* Enlace opcional: ¿Olvidaste tu contraseña? */}
        <div className="text-center mt-4">
          <a href="#" className="text-blue-600 hover:underline">
            ¿Olvidaste tu contraseña?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
