// src/components/SummaryAlerts.jsx
import React, { useState, useEffect } from "react";
import {
  FileTextIcon,
  ClockIcon,
  CheckCircle2Icon,
  XCircleIcon,
} from "lucide-react";
import CountUp from "react-countup";

function SummaryAlerts({ total, pending, approved, rejected, onFilterChange }) {
  const [activeFilter, setActiveFilter] = useState(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Activar animación después de que el componente se monte
    setAnimate(true);
  }, []);

  const handleCardClick = (filter) => {
    // Si ya está activo, desactivarlo
    const newFilter = activeFilter === filter ? null : filter;
    setActiveFilter(newFilter);
    // Llamar a la función de filtrado del componente padre
    if (onFilterChange) {
      onFilterChange(newFilter);
    }
  };

  return (
    <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 w-full px-2 sm:px-0">
      {/* TOTAL */}
      <div 
        onClick={() => handleCardClick('all')}
        className={`group w-36 sm:w-40 h-36 sm:h-40 rounded-xl flex flex-col items-center justify-center gap-1 p-2 cursor-pointer transition-all duration-300 ${activeFilter === 'all' ? 'bg-black text-white' : 'bg-black text-white hover:bg-gray-700/70'} ${animate ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '0ms' }}
      >
        <FileTextIcon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
        <span className="text-sm group-hover:text-base transition-all duration-300">Total solicitudes</span>
        <span className="text-2xl font-bold transition-all duration-300 group-hover:text-3xl">
          <CountUp end={total} duration={2.5} enableScrollSpy={true} />
        </span>
      </div>

      {/* PENDIENTES */}
      <div 
        onClick={() => handleCardClick('pending')}
        className={`group w-36 sm:w-40 h-36 sm:h-40 rounded-xl flex flex-col items-center justify-center gap-1 p-2 cursor-pointer transition-all duration-300 ${activeFilter === 'pending' ? 'bg-[#f0b100] text-white border border-[#f0b100]' : 'bg-white border border-[#f0b100] hover:bg-[#f0b100]/60 hover:text-white hover:border-[#f0b100]/60'} ${animate ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '150ms' }}
      >
        <ClockIcon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${activeFilter === 'pending' ? 'text-white' : 'text-[#f0b100] group-hover:text-white'}`} />
        <span className={`text-sm group-hover:text-base transition-all duration-300 ${activeFilter === 'pending' ? 'text-white' : 'text-[#f0b100] group-hover:text-white'}`}>Pendientes</span>
        <span className={`text-2xl font-bold transition-all duration-300 group-hover:text-3xl ${activeFilter === 'pending' ? 'text-white' : 'text-[#f0b100] group-hover:text-white'}`}>
          <CountUp end={pending} duration={2.5} enableScrollSpy={true} />
        </span>
      </div>

      {/* APROBADAS */}
      <div 
        onClick={() => handleCardClick('approved')}
        className={`group w-36 sm:w-40 h-36 sm:h-40 rounded-xl flex flex-col items-center justify-center gap-1 p-2 cursor-pointer transition-all duration-300 ${activeFilter === 'approved' ? 'bg-green-500 text-white border border-green-500' : 'bg-white border border-green-400 hover:bg-green-500/60 hover:text-white hover:border-green-500/60'} ${animate ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '300ms' }}
      >
        <CheckCircle2Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${activeFilter === 'approved' ? 'text-white' : 'text-green-500 group-hover:text-white'}`} />
        <span className={`text-sm group-hover:text-base transition-all duration-300 ${activeFilter === 'approved' ? 'text-white' : 'text-gray-700 group-hover:text-white'}`}>Aprobadas</span>
        <span className={`text-2xl font-bold transition-all duration-300 group-hover:text-3xl ${activeFilter === 'approved' ? 'text-white' : 'text-green-600 group-hover:text-white'}`}>
          <CountUp end={approved} duration={2.5} enableScrollSpy={true} />
        </span>
      </div>

      {/* RECHAZADAS */}
      <div 
        onClick={() => handleCardClick('rejected')}
        className={`group w-36 sm:w-40 h-36 sm:h-40 rounded-xl flex flex-col items-center justify-center gap-1 p-2 cursor-pointer transition-all duration-300 ${activeFilter === 'rejected' ? 'bg-red-500 text-white border border-red-500' : 'bg-white border border-red-400 hover:bg-red-500/60 hover:text-white hover:border-red-500/60'} ${animate ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: '450ms' }}
      >
        <XCircleIcon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${activeFilter === 'rejected' ? 'text-white' : 'text-red-500 group-hover:text-white'}`} />
        <span className={`text-sm group-hover:text-base transition-all duration-300 ${activeFilter === 'rejected' ? 'text-white' : 'text-gray-700 group-hover:text-white'}`}>Rechazadas</span>
        <span className={`text-2xl font-bold transition-all duration-300 group-hover:text-3xl ${activeFilter === 'rejected' ? 'text-white' : 'text-red-600 group-hover:text-white'}`}>
          <CountUp end={rejected} duration={2.5} enableScrollSpy={true} />
        </span>
      </div>
    </div>
  );
}

export default SummaryAlerts;
