"use client";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

export default function PremiumPagination({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  showItemsPerPage = true,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 20, 50, 100],
}) {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1 && !showItemsPerPage) return null;

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 px-2">
      {/* Items Info */}
      <div className="text-white/60 text-sm font-medium">
        Showing <span className="text-white font-bold">{startItem}</span> to{" "}
        <span className="text-white font-bold">{endItem}</span> of{" "}
        <span className="text-white font-bold">{totalItems}</span> items
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center gap-2">
        {/* First Page */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:border-white/10 transition-all"
          title="First page"
        >
          <ChevronsLeft className="w-4 h-4 text-white" />
        </button>

        {/* Previous Page */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:border-white/10 transition-all"
          title="Previous page"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>

        {/* Page Numbers */}
        <div className="hidden sm:flex items-center gap-1">
          {getPageNumbers().map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-3 py-2 text-white/40 font-medium"
                >
                  ...
                </span>
              );
            }

            return (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`min-w-[40px] px-3 py-2 rounded-lg font-semibold transition-all ${
                  currentPage === page
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/30 scale-105"
                    : "bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 hover:border-purple-500 hover:text-white"
                }`}
              >
                {page}
              </button>
            );
          })}
        </div>

        {/* Mobile: Current Page Display */}
        <div className="sm:hidden px-4 py-2 bg-white/5 border border-white/10 rounded-lg">
          <span className="text-white font-semibold">
            {currentPage} / {totalPages}
          </span>
        </div>

        {/* Next Page */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:border-white/10 transition-all"
          title="Next page"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>

        {/* Last Page */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-purple-500 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white/5 disabled:hover:border-white/10 transition-all"
          title="Last page"
        >
          <ChevronsRight className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Items Per Page */}
      {showItemsPerPage && onItemsPerPageChange && (
        <div className="flex items-center gap-2">
          <span className="text-white/60 text-sm font-medium">Show:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-semibold focus:outline-none focus:border-purple-500 hover:bg-white/10 transition-all cursor-pointer"
          >
            {itemsPerPageOptions.map((option) => (
              <option key={option} value={option} className="bg-slate-900">
                {option}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}
