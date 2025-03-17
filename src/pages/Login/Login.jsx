import React, { useState } from 'react';
import brandLogo from '../../assets/TVS-LOGO-RGB-300DPI.jpg'; // Ajusta la ruta a tu logo

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Usuario: ${username}\nContraseña: ${password}`);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      
      {/* LOGO ARRIBA IZQUIERDA */}
      <div>
        <img 
          src={brandLogo} 
          alt="Logo" 
          className="h-28" 
        />
      </div>

      {/* CONTENEDOR PARA CENTRAR EL FORM */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md p-8">
          <h1 className="text-2xl font-semibold text-center">Login</h1>
          <p className="text-2l font-normal text-center mb-6 text-gray">Inicia sesión en tu cuenta</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* USUARIO */}
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

            {/* CONTRASEÑA */}
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

            {/* BOTÓN: HOVER EN ROJO */}
            <button
              type="submit"
              className="bg-black text-white w-full py-2 rounded 
                         hover:bg-red-600 transition-colors"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* ENLACE OPCIONAL */}
          <div className="text-center mt-4">
            <a href="#" className="text-blue-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
