import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  const [maxVisiblePages, setMaxVisiblePages] = useState(5);

  useEffect(() => {
    function updateMaxPages() {
      if (window.innerWidth < 640) {
        setMaxVisiblePages(3);
      } else if (window.innerWidth < 768) {
        setMaxVisiblePages(4);
      } else {
        setMaxVisiblePages(5);
      }
    }

    updateMaxPages();
    window.addEventListener('resize', updateMaxPages);
    return () => window.removeEventListener('resize', updateMaxPages);
  }, []);

  const pages = [];
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
  
  if (endPage - startPage < maxVisiblePages - 1) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center items-center gap-1.5 mt-6 mb-2 flex-wrap"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
        }}
      >
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Prev</span>
      </motion.button>
      
      {startPage > 1 && (
        <>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(1)}
            className="px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
            }}
          >
            1
          </motion.button>
          {startPage > 2 && <span className="px-1 text-xs text-gray-400">...</span>}
        </>
      )}
      
      {pages.map((page) => (
        <motion.button
          key={page}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(page)}
          className={`px-2.5 py-1.5 text-xs font-medium rounded-lg transition-colors ${
            page === currentPage
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
          }`}
          style={{
            fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
          }}
        >
          {page}
        </motion.button>
      ))}
      
      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="px-1 text-xs text-gray-400">...</span>}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onPageChange(totalPages)}
            className="px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            style={{
              fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
            }}
          >
            {totalPages}
          </motion.button>
        </>
      )}
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif'
        }}
      >
        <span className="hidden sm:inline">Next</span>
        <span className="sm:hidden">Next</span>
      </motion.button>
    </motion.div>
  );
}
