// src/components/Pagination.jsx
import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeft, ChevronsRight } from "lucide-react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (totalPages <= 1) return null;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    // En pantallas pequeñas mostramos menos páginas
    const maxPagesToShow = window.innerWidth < 640 ? 3 : 5; // Max number of page buttons to show
    const halfMaxPages = Math.floor(maxPagesToShow / 2);

    let startPage = Math.max(1, currentPage - halfMaxPages);
    let endPage = Math.min(totalPages, currentPage + halfMaxPages);

    if (currentPage - halfMaxPages < 1) {
      endPage = Math.min(totalPages, maxPagesToShow);
    }

    if (currentPage + halfMaxPages > totalPages) {
      startPage = Math.max(1, totalPages - maxPagesToShow + 1);
    }

    // Always show the first page
    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className="min-w-[32px] h-8 px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded-md transition-colors border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(<span key="start-ellipsis" className="px-1 sm:px-3 py-1 text-xs sm:text-sm">...</span>);
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`min-w-[32px] h-8 px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded-md transition-colors ${
            i === currentPage
              ? "bg-black text-white border-black"
              : "border-gray-300 text-gray-700 hover:bg-gray-100"
          }`}
        >
          {i}
        </button>
      );
    }

    // Always show the last page
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(<span key="end-ellipsis" className="px-1 sm:px-3 py-1 text-xs sm:text-sm">...</span>);
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className="min-w-[32px] h-8 px-2 sm:px-3 py-1 text-xs sm:text-sm border rounded-md transition-colors border-gray-300 text-gray-700 hover:bg-gray-100"
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap py-2">
      <button
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
        className={`min-w-[32px] h-8 px-1 sm:px-2 py-1 border rounded-md transition-colors ${
          currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
        }`}
        aria-label="First page"
      >
        <ChevronsLeft className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`min-w-[32px] h-8 px-1 sm:px-2 py-1 border rounded-md transition-colors ${
          currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
        }`}
        aria-label="Previous page"
      >
        <ChevronLeftIcon className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>

      <div className="flex flex-wrap gap-1 sm:gap-2 justify-center">
        {renderPageNumbers()}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`min-w-[32px] h-8 px-1 sm:px-2 py-1 border rounded-md transition-colors ${
          currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
        }`}
        aria-label="Next page"
      >
        <ChevronRightIcon className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
      <button
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
        className={`min-w-[32px] h-8 px-1 sm:px-2 py-1 border rounded-md transition-colors ${
          currentPage === totalPages ? "text-gray-400 cursor-not-allowed" : "hover:bg-gray-100"
        }`}
        aria-label="Last page"
      >
        <ChevronsRight className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>
    </div>
  );
};

export default Pagination;
