// src/components/Pagination.jsx
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const pagesArray = [];
  for (let i = 1; i <= totalPages; i++) {
    pagesArray.push(i);
  }

  return (
    
    <div className="flex items-center gap-2">
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`px-3 py-1 border rounded-md transition-colors ${
          currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
        }`}
      >
        <ChevronLeftIcon className="w-4 h-4" />
      </button>

      {pagesArray.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 border rounded-md transition-colors ${
            page === currentPage
              ? "bg-black text-white border-black"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 border rounded-md transition-colors ${
          currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
        }`}
      >
        <ChevronRightIcon className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Pagination;
