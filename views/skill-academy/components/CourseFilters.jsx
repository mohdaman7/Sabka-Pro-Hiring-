"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";

/**
 * CourseFilters Component
 * Reusable filter and search component for courses with click-to-open dropdowns
 */
export default function CourseFilters({
  onSearchChange,
  onCategoryChange,
  onPriceChange,
  onSortChange,
  categories = [],
  searchValue = "",
  selectedCategory = "All",
  selectedPrice = "all",
  selectedSort = "popular",
}) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [localSearch, setLocalSearch] = useState(searchValue);
  const categoryRef = useRef(null);
  const priceRef = useRef(null);
  const sortRef = useRef(null);

  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "free", label: "Free Courses" },
    { value: "0-10000", label: "₹0 - ₹10,000" },
    { value: "10000-25000", label: "₹10,000 - ₹25,000" },
    { value: "25000+", label: "₹25,000+" },
  ];

  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "newest", label: "Newest First" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "rating", label: "Highest Rated" },
  ];

  const handleSearch = (value) => {
    setLocalSearch(value);
    onSearchChange(value);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target) &&
        priceRef.current &&
        !priceRef.current.contains(event.target) &&
        sortRef.current &&
        !sortRef.current.contains(event.target)
      ) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (cat) => {
    onCategoryChange(cat);
    setOpenDropdown(null);
  };

  const handlePriceSelect = (value) => {
    onPriceChange(value);
    setOpenDropdown(null);
  };

  const handleSortSelect = (value) => {
    onSortChange(value);
    setOpenDropdown(null);
  };

  return (
    <div className="space-y-4 relative z-50">
      {/* Search Bar */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search courses..."
          value={localSearch}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-white/8 to-white/5 border-2 border-white/15 rounded-xl text-white placeholder-gray-500 focus:border-[#a87bcc]/60 focus:outline-none focus:bg-gradient-to-r focus:from-white/12 focus:to-white/8 transition-all backdrop-blur-sm"
        />
      </motion.div>

      {/* Filter Buttons Row */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-3 relative z-50"
      >
        {/* Category Filter */}
        <div className="relative" ref={categoryRef}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              setOpenDropdown(openDropdown === "category" ? null : "category")
            }
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white transition-all ${
              openDropdown === "category"
                ? "bg-gradient-to-r from-[#7e4ba3]/40 to-[#a87bcc]/30 border-2 border-[#a87bcc]/60 shadow-lg shadow-[#a87bcc]/20"
                : "bg-white/5 border-2 border-white/15 hover:border-[#a87bcc]/50 hover:bg-white/8"
            }`}
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">{selectedCategory}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                openDropdown === "category" ? "rotate-180" : ""
              }`}
            />
          </motion.button>

          {/* Category Dropdown */}
          <AnimatePresence>
            {openDropdown === "category" && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-56 bg-gradient-to-b from-slate-800/95 to-slate-900/95 border-2 border-[#a87bcc]/30 rounded-xl shadow-2xl shadow-[#a87bcc]/20 backdrop-blur-md z-[9999] overflow-hidden"
              >
                <div className="py-1">
                  {["All", ...categories].map((cat, idx) => (
                    <motion.button
                      key={cat}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ x: 4 }}
                      onClick={() => handleCategorySelect(cat)}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-all flex items-center justify-between group ${
                        selectedCategory === cat
                          ? "bg-gradient-to-r from-[#7e4ba3]/40 to-[#a87bcc]/30 text-[#e6d5f0] border-l-3 border-[#a87bcc]"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {cat}
                      {selectedCategory === cat && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full bg-[#a87bcc]"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Price Filter */}
        <div className="relative" ref={priceRef}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              setOpenDropdown(openDropdown === "price" ? null : "price")
            }
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white transition-all ${
              openDropdown === "price"
                ? "bg-gradient-to-r from-[#7e4ba3]/40 to-[#a87bcc]/30 border-2 border-[#a87bcc]/60 shadow-lg shadow-[#a87bcc]/20"
                : "bg-white/5 border-2 border-white/15 hover:border-[#a87bcc]/50 hover:bg-white/8"
            }`}
          >
            <span className="text-sm font-medium">
              {priceRanges.find((p) => p.value === selectedPrice)?.label ||
                "Price"}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                openDropdown === "price" ? "rotate-180" : ""
              }`}
            />
          </motion.button>

          {/* Price Dropdown */}
          <AnimatePresence>
            {openDropdown === "price" && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-56 bg-gradient-to-b from-slate-800/95 to-slate-900/95 border-2 border-[#a87bcc]/30 rounded-xl shadow-2xl shadow-[#a87bcc]/20 backdrop-blur-md z-[9999] overflow-hidden"
              >
                <div className="py-1">
                  {priceRanges.map((range, idx) => (
                    <motion.button
                      key={range.value}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ x: 4 }}
                      onClick={() => handlePriceSelect(range.value)}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-all flex items-center justify-between group ${
                        selectedPrice === range.value
                          ? "bg-gradient-to-r from-[#7e4ba3]/40 to-[#a87bcc]/30 text-[#e6d5f0] border-l-3 border-[#a87bcc]"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {range.label}
                      {selectedPrice === range.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full bg-[#a87bcc]"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sort Filter */}
        <div className="relative" ref={sortRef}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              setOpenDropdown(openDropdown === "sort" ? null : "sort")
            }
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-white transition-all ${
              openDropdown === "sort"
                ? "bg-gradient-to-r from-[#7e4ba3]/40 to-[#a87bcc]/30 border-2 border-[#a87bcc]/60 shadow-lg shadow-[#a87bcc]/20"
                : "bg-white/5 border-2 border-white/15 hover:border-[#a87bcc]/50 hover:bg-white/8"
            }`}
          >
            <span className="text-sm font-medium">
              {sortOptions.find((s) => s.value === selectedSort)?.label ||
                "Sort"}
            </span>
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                openDropdown === "sort" ? "rotate-180" : ""
              }`}
            />
          </motion.button>

          {/* Sort Dropdown */}
          <AnimatePresence>
            {openDropdown === "sort" && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 mt-2 w-56 bg-gradient-to-b from-slate-800/95 to-slate-900/95 border-2 border-[#a87bcc]/30 rounded-xl shadow-2xl shadow-[#a87bcc]/20 backdrop-blur-md z-[9999] overflow-hidden"
              >
                <div className="py-1">
                  {sortOptions.map((option, idx) => (
                    <motion.button
                      key={option.value}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      whileHover={{ x: 4 }}
                      onClick={() => handleSortSelect(option.value)}
                      className={`w-full text-left px-4 py-3 text-sm font-medium transition-all flex items-center justify-between group ${
                        selectedSort === option.value
                          ? "bg-gradient-to-r from-[#7e4ba3]/40 to-[#a87bcc]/30 text-[#e6d5f0] border-l-3 border-[#a87bcc]"
                          : "text-gray-300 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      {option.label}
                      {selectedSort === option.value && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full bg-[#a87bcc]"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
