"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search, Filter, X, ChevronDown } from "lucide-react";

/**
 * CourseFilters Component
 * Reusable filter and search component for courses
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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchValue);

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

  return (
    <div className="space-y-4">
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
          className="w-full pl-12 pr-4 py-3 bg-white/5 border-2 border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-[#a87bcc]/50 focus:outline-none transition-all"
        />
      </motion.div>

      {/* Filter Buttons Row */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-wrap gap-3"
      >
        {/* Category Filter */}
        <div className="relative group">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border-2 border-white/10 rounded-xl text-white hover:border-[#a87bcc]/50 transition-all"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">{selectedCategory}</span>
            <ChevronDown className="w-4 h-4" />
          </motion.button>

          {/* Category Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border-2 border-white/10 rounded-xl shadow-2xl z-50 hidden group-hover:block"
          >
            {["All", ...categories].map((cat) => (
              <motion.button
                key={cat}
                whileHover={{ backgroundColor: "rgba(168, 123, 204, 0.1)" }}
                onClick={() => onCategoryChange(cat)}
                className={`
                  w-full text-left px-4 py-2.5 text-sm transition-all
                  ${
                    selectedCategory === cat
                      ? "text-[#d8b4f0] bg-[#a87bcc]/20 border-l-2 border-[#a87bcc]"
                      : "text-gray-300 hover:text-white"
                  }
                `}
              >
                {cat}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Price Filter */}
        <div className="relative group">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border-2 border-white/10 rounded-xl text-white hover:border-[#a87bcc]/50 transition-all"
          >
            <span className="text-sm font-medium">
              {priceRanges.find((p) => p.value === selectedPrice)?.label ||
                "Price"}
            </span>
            <ChevronDown className="w-4 h-4" />
          </motion.button>

          {/* Price Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border-2 border-white/10 rounded-xl shadow-2xl z-50 hidden group-hover:block"
          >
            {priceRanges.map((range) => (
              <motion.button
                key={range.value}
                whileHover={{ backgroundColor: "rgba(168, 123, 204, 0.1)" }}
                onClick={() => onPriceChange(range.value)}
                className={`
                  w-full text-left px-4 py-2.5 text-sm transition-all
                  ${
                    selectedPrice === range.value
                      ? "text-[#d8b4f0] bg-[#a87bcc]/20 border-l-2 border-[#a87bcc]"
                      : "text-gray-300 hover:text-white"
                  }
                `}
              >
                {range.label}
              </motion.button>
            ))}
          </motion.div>
        </div>

        {/* Sort Filter */}
        <div className="relative group">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border-2 border-white/10 rounded-xl text-white hover:border-[#a87bcc]/50 transition-all"
          >
            <span className="text-sm font-medium">
              {sortOptions.find((s) => s.value === selectedSort)?.label ||
                "Sort"}
            </span>
            <ChevronDown className="w-4 h-4" />
          </motion.button>

          {/* Sort Dropdown */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 mt-2 w-48 bg-slate-900 border-2 border-white/10 rounded-xl shadow-2xl z-50 hidden group-hover:block"
          >
            {sortOptions.map((option) => (
              <motion.button
                key={option.value}
                whileHover={{ backgroundColor: "rgba(168, 123, 204, 0.1)" }}
                onClick={() => onSortChange(option.value)}
                className={`
                  w-full text-left px-4 py-2.5 text-sm transition-all
                  ${
                    selectedSort === option.value
                      ? "text-[#d8b4f0] bg-[#a87bcc]/20 border-l-2 border-[#a87bcc]"
                      : "text-gray-300 hover:text-white"
                  }
                `}
              >
                {option.label}
              </motion.button>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
