"use client";

import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * PaginationControls - Premium pagination component for student portal
 * 
 * @param {number} currentPage - Current page number (1-indexed)
 * @param {number} totalPages - Total number of pages
 * @param {function} onPageChange - Callback when page changes
 * @param {object} options - Optional configuration
 *   - itemsPerPage: Number of items per page (default: 8)
 *   - totalItems: Total number of items
 *   - showPageNumbers: Show page numbers (default: true)
 *   - maxVisiblePages: Max page numbers to show (default: 5)
 *   - variant: 'default' | 'compact' (default: 'default')
 */
export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  options = {},
}) {
  const {
    itemsPerPage = 8,
    totalItems = 0,
    showPageNumbers = true,
    maxVisiblePages = 5,
    variant = "default",
  } = options;

  if (totalPages <= 1) return null;

  // Calculate visible page numbers
  const getVisiblePages = () => {
    const pages = [];
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return { pages, startPage, endPage };
  };

  const { pages, startPage, endPage } = getVisiblePages();

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePageClick = (page) => {
    if (page !== currentPage) {
      onPageChange(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (variant === "compact") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-center gap-2 py-4"
      >
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-white border border-white/20"
          aria-label="Previous page"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <span className="text-sm font-semibold text-white px-4">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-white border border-white/20"
          aria-label="Next page"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 px-4 sm:px-6 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 border border-white/15 backdrop-blur-xl"
    >
      {/* Left section - Info */}
      {totalItems > 0 && (
        <div className="text-sm text-white/70 font-medium">
          Showing{" "}
          <span className="text-white font-semibold">
            {(currentPage - 1) * itemsPerPage + 1}
          </span>{" "}
          to{" "}
          <span className="text-white font-semibold">
            {Math.min(currentPage * itemsPerPage, totalItems)}
          </span>{" "}
          of{" "}
          <span className="text-white font-semibold">{totalItems}</span> items
        </div>
      )}

      {/* Center section - Page numbers */}
      {showPageNumbers && (
        <div className="flex items-center gap-1 sm:gap-2">
          {/* Previous button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-white border border-white/20"
            aria-label="Previous page"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>

          {/* First page */}
          {startPage > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageClick(1)}
                className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-white font-medium text-sm border border-white/20"
              >
                1
              </motion.button>
              {startPage > 2 && (
                <span className="text-white/50 px-2">...</span>
              )}
            </>
          )}

          {/* Page numbers */}
          {pages.map((page) => (
            <motion.button
              key={page}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handlePageClick(page)}
              className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 border ${
                page === currentPage
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-400 shadow-lg shadow-purple-500/30"
                  : "bg-white/10 hover:bg-white/20 text-white border-white/20"
              }`}
            >
              {page}
            </motion.button>
          ))}

          {/* Last page */}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="text-white/50 px-2">...</span>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handlePageClick(totalPages)}
                className="px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all duration-300 text-white font-medium text-sm border border-white/20"
              >
                {totalPages}
              </motion.button>
            </>
          )}

          {/* Next button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-white border border-white/20"
            aria-label="Next page"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </div>
      )}

      {/* Right section - Page info */}
      <div className="text-sm text-white/70 font-medium">
        Page <span className="text-white font-semibold">{currentPage}</span> of{" "}
        <span className="text-white font-semibold">{totalPages}</span>
      </div>
    </motion.div>
  );
}
