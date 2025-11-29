"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import courseService from "@/services/courseService";
import {
  Code,
  Brain,
  Palette,
  TrendingUp,
  Shield,
  Smartphone,
  Sparkles,
  X,
  ArrowRight,
  Zap,
} from "lucide-react";
import { CourseGrid, CourseFilters } from "@/views/skill-academy/components";
import skillAcademyToast from "@/utils/skillAcademyToast";

/**
 * CoursesPageComponent
 * Main courses page component using reusable sub-components
 */
export default function CoursesPageComponent() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("all");
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  const iconOptions = [Code, Brain, Palette, TrendingUp, Shield, Smartphone];
  const gradientOptions = [
    "from-blue-500 to-blue-600",
    "from-emerald-500 to-emerald-600",
    "from-pink-500 to-pink-600",
    "from-orange-500 to-orange-600",
    "from-red-500 to-red-600",
    "from-indigo-500 to-indigo-600",
  ];

  const categories = [
    "Development",
    "Design",
    "Data Science",
    "Marketing",
    "Security",
  ];

  const mapCourseFromApi = (course, index) => {
    const bundlePrice =
      typeof course.bundlePrice === "number" ? course.bundlePrice : 0;
    const isFree = bundlePrice === 0;

    const sumModulePrice =
      typeof course.sumModulePrice === "number" ? course.sumModulePrice : 0;

    let originalPrice = null;
    let discountLabel = null;

    if (!isFree && sumModulePrice > bundlePrice && sumModulePrice > 0) {
      originalPrice = `₹${sumModulePrice.toLocaleString("en-IN")}`;
      const discountPercent = Math.round(
        ((sumModulePrice - bundlePrice) / sumModulePrice) * 100
      );
      if (discountPercent > 0) {
        discountLabel = `${discountPercent}%`;
      }
    }

    const IconComponent = iconOptions[index % iconOptions.length];
    const gradient = gradientOptions[index % gradientOptions.length];

    const enrolledCount = course.enrolledCount || 0;
    let studentsLabel = "0";
    if (enrolledCount >= 1000) {
      const formatted = (enrolledCount / 1000).toFixed(1);
      studentsLabel = `${
        formatted.endsWith(".0") ? formatted.slice(0, -2) : formatted
      }k`;
    } else if (enrolledCount > 0) {
      studentsLabel = `${enrolledCount}`;
    }

    const rating =
      typeof course.rating === "number" ? Number(course.rating.toFixed(1)) : 0;

    return {
      id: course._id,
      title: course.title,
      category: course.category || "General",
      description: course.description || "",
      students: studentsLabel,
      rating,
      duration: course.moduleCount
        ? `${course.moduleCount} modules`
        : "Self paced",
      price: isFree ? "Free" : `₹${bundlePrice.toLocaleString("en-IN")}`,
      originalPrice,
      discount: discountLabel,
      icon: IconComponent,
      gradient,
      level: course.level || "Beginner",
      image: course.thumbnail || "/placeholder.svg",
      isFree,
      bundlePrice,
    };
  };

  const loadCourses = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await courseService.listPublic();
      const mapped = (data || []).map((course, index) =>
        mapCourseFromApi(course, index)
      );

      setCourses(mapped);
      skillAcademyToast.success(
        "Courses Loaded",
        "All courses loaded successfully"
      );
    } catch (e) {
      console.error("Failed to load Skill Academy courses", e);
      const message =
        e?.response?.data?.message ||
        e.message ||
        "Failed to load courses. Please try again.";
      setError(message);
      skillAcademyToast.error("Load Failed", message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const filterCourses = () => {
    let filtered = courses.filter((course) => {
      const matchesCategory =
        selectedCategory === "All" || course.category === selectedCategory;
      const matchesSearch =
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesPrice = true;
      if (selectedPrice === "free") {
        matchesPrice = course.isFree;
      } else if (selectedPrice === "0-10000") {
        matchesPrice = !course.isFree && course.bundlePrice <= 10000;
      } else if (selectedPrice === "10000-25000") {
        matchesPrice =
          !course.isFree &&
          course.bundlePrice > 10000 &&
          course.bundlePrice <= 25000;
      } else if (selectedPrice === "25000+") {
        matchesPrice = !course.isFree && course.bundlePrice > 25000;
      }

      return matchesCategory && matchesSearch && matchesPrice;
    });

    // Sort
    switch (sortBy) {
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.id.localeCompare(a.id));
        break;
      case "price-low":
        filtered.sort((a, b) => (a.bundlePrice || 0) - (b.bundlePrice || 0));
        break;
      case "price-high":
        filtered.sort((a, b) => (b.bundlePrice || 0) - (a.bundlePrice || 0));
        break;
      case "popular":
      default:
        filtered.sort((a, b) => {
          const aStudents = parseInt(a.students) || 0;
          const bStudents = parseInt(b.students) || 0;
          return bStudents - aStudents;
        });
    }

    return filtered;
  };

  const filteredCourses = filterCourses();
  const totalPages = Math.max(
    1,
    Math.ceil(filteredCourses.length / itemsPerPage)
  );
  const startIdx = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm, selectedPrice, sortBy]);

  const handleAddToCart = async (course) => {
    // Implement cart logic here
    console.log("Added to cart:", course.title);
  };

  const handleViewDetails = (course) => {
    router.push(`/skill-academy/courses/${course.id}`);
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchTerm("");
    setSelectedPrice("all");
    setSortBy("popular");
    setCurrentPage(1);
    skillAcademyToast.info("Filters Cleared", "All filters have been reset");
  };

  const hasActiveFilters =
    selectedCategory !== "All" ||
    searchTerm ||
    selectedPrice !== "all" ||
    sortBy !== "popular";

  return (
    <div className="min-h-screen">
      {/* Hero Section with Search & Filters */}
      <section className="relative py-8 overflow-visible">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#692c7a]/40 to-[#9463a8]/15 rounded-full blur-3xl"
            animate={{ y: [0, 30, 0], x: [0, 20, 0] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-l from-[#8b4fa8]/30 to-[#692c7a]/10 rounded-full blur-3xl"
            animate={{ y: [0, -30, 0], x: [0, -20, 0] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 leading-tight"
            >
              <span className="bg-gradient-to-r from-white via-[#c99ee6] to-[#a87bcc] bg-clip-text text-transparent drop-shadow-lg">
                Explore Our Courses
              </span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-gray-300 text-lg max-w-2xl mx-auto"
            >
              {filteredCourses.length} courses available
            </motion.p>
          </motion.div>

          {/* Filters Component */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="max-w-4xl mx-auto relative z-40"
          >
            <CourseFilters
              onSearchChange={setSearchTerm}
              onCategoryChange={setSelectedCategory}
              onPriceChange={setSelectedPrice}
              onSortChange={setSortBy}
              categories={categories}
              searchValue={searchTerm}
              selectedCategory={selectedCategory}
              selectedPrice={selectedPrice}
              selectedSort={sortBy}
            />
          </motion.div>

          {/* Active Filters Pills */}
          <AnimatePresence>
            {hasActiveFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap items-center justify-center gap-3 px-4 mt-6"
              >
                {selectedCategory !== "All" && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7e4ba3]/25 to-[#a87bcc]/20 text-[#c99ee6] text-sm font-bold rounded-full border border-[#a87bcc]/30 backdrop-blur-sm"
                  >
                    {selectedCategory}
                    <X className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
                  </motion.span>
                )}
                {searchTerm && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/25 to-purple-500/20 text-pink-300 text-sm font-bold rounded-full border border-pink-400/30 backdrop-blur-sm"
                  >
                    {searchTerm.slice(0, 20)}
                    {searchTerm.length > 20 && "..."}
                    <X className="w-4 h-4 cursor-pointer hover:text-white transition-colors" />
                  </motion.span>
                )}

                {/* Clear All Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-bold text-gray-300 hover:text-white border border-white/20 rounded-full hover:border-white/40 transition-all"
                >
                  Clear All
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Courses Grid Section */}
      <section className="relative py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 px-4"
            >
              <div className="max-w-md mx-auto">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-r from-[#7e4ba3] to-[#a87bcc] p-1 shadow-2xl"
                >
                  <div className="w-full h-full rounded-3xl bg-[#1a0d2e] flex items-center justify-center">
                    <Sparkles className="w-10 h-10 text-[#a87bcc]" />
                  </div>
                </motion.div>
                <h3 className="text-2xl font-black text-white mb-3 bg-gradient-to-r from-white to-[#c99ee6] bg-clip-text text-transparent">
                  Loading Courses
                </h3>
                <p className="text-gray-300 text-base leading-relaxed">
                  Please wait while we fetch the latest courses for you...
                </p>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 px-4"
            >
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center backdrop-blur-xl shadow-2xl">
                  <X className="w-10 h-10 text-red-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3 bg-gradient-to-r from-white to-red-300 bg-clip-text text-transparent">
                  Failed to Load Courses
                </h3>
                <p className="text-gray-300 text-base mb-6 leading-relaxed">
                  {error}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={loadCourses}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7e4ba3] to-[#a87bcc] text-white font-bold rounded-xl shadow-lg hover:shadow-[#a87bcc]/25 transition-all duration-300"
                >
                  Try Again
                </motion.button>
              </div>
            </motion.div>
          ) : paginatedCourses.length > 0 ? (
            <>
              {/* Results Count */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 text-center"
              >
                <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-xl">
                  <span className="text-gray-300 text-sm font-medium">
                    Showing{" "}
                    <span className="text-[#c99ee6] font-bold">
                      {startIdx + 1}-
                      {Math.min(
                        startIdx + itemsPerPage,
                        filteredCourses.length
                      )}
                    </span>{" "}
                    of{" "}
                    <span className="text-white font-bold">
                      {filteredCourses.length}
                    </span>{" "}
                    courses
                  </span>
                </div>
              </motion.div>

              {/* Courses Grid */}
              <CourseGrid
                courses={paginatedCourses}
                onAddToCart={handleAddToCart}
                onViewDetails={handleViewDetails}
                isLoading={loading}
              />

              {/* Pagination */}
              {totalPages > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col sm:flex-row items-center justify-center gap-4 py-6 mt-8"
                >
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setCurrentPage(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white hover:bg-white/10 hover:border-[#a87bcc]/40 transition-all duration-200 backdrop-blur-sm"
                    >
                      <ArrowRight className="w-5 h-5 transform rotate-180" />
                    </motion.button>

                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <motion.button
                            key={page}
                            whileHover={{
                              scale: page === currentPage ? 1 : 1.05,
                            }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setCurrentPage(page)}
                            className={`w-10 h-10 rounded-xl text-sm font-bold transition-all duration-200 ${
                              page === currentPage
                                ? "bg-gradient-to-r from-[#7e4ba3] to-[#a87bcc] border-[#a87bcc]/50 text-white shadow-lg shadow-[#a87bcc]/20 scale-105"
                                : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-[#a87bcc]/40 backdrop-blur-sm"
                            } border`}
                          >
                            {page}
                          </motion.button>
                        )
                      )}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setCurrentPage(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="p-3 rounded-xl bg-white/5 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white hover:bg-white/10 hover:border-[#a87bcc]/40 transition-all duration-200 backdrop-blur-sm"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.button>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
                  >
                    <span className="text-sm text-gray-300 font-medium">
                      Page{" "}
                      <span className="font-black bg-gradient-to-r from-[#c99ee6] to-[#a87bcc] bg-clip-text text-transparent">
                        {currentPage}
                      </span>{" "}
                      of{" "}
                      <span className="font-bold text-white">{totalPages}</span>
                    </span>
                  </motion.div>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 px-4"
            >
              <div className="max-w-md mx-auto">
                <motion.div
                  animate={{ scale: [1, 1.05, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 flex items-center justify-center backdrop-blur-xl shadow-2xl"
                >
                  <Zap className="w-10 h-10 text-[#a87bcc]" />
                </motion.div>
                <h3 className="text-2xl font-black text-white mb-3 bg-gradient-to-r from-white to-[#c99ee6] bg-clip-text text-transparent">
                  No Courses Found
                </h3>
                <p className="text-gray-300 text-base mb-6 leading-relaxed">
                  Try adjusting your filters or search term to find courses
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={clearFilters}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7e4ba3] to-[#a87bcc] text-white font-bold rounded-xl shadow-lg hover:shadow-[#a87bcc]/25 transition-all duration-300"
                >
                  Clear Filters
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
