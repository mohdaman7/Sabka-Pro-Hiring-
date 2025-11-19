"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import courseService from "@/services/courseService";
import {
  Search,
  Filter,
  Star,
  Users,
  Clock,
  Code,
  Palette,
  Brain,
  Shield,
  Smartphone,
  TrendingUp,
  ArrowRight,
  Zap,
  X,
  ChevronDown,
} from "lucide-react";

const CourseCard = ({ course, index }) => {
  const Icon = course.icon;
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -12, transition: { duration: 0.3 } }}
      className="group relative"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/15 to-pink-500/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

      <div className="relative h-full bg-gradient-to-b from-white/8 to-white/5 border border-white/10 group-hover:border-purple-500/50 rounded-3xl overflow-hidden transition-all duration-500 backdrop-blur-xl shadow-2xl flex flex-col">
        <div className="relative h-48 overflow-hidden bg-gradient-to-br from-purple-600/30 to-purple-500/20">
          <img
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.2,
              ease: "easeInOut",
            }}
            whileHover={{ rotate: 360, scale: 1.15 }}
            className={`absolute top-4 right-4 w-14 h-14 bg-gradient-to-br ${course.gradient} rounded-2xl flex items-center justify-center shadow-lg border border-white/20`}
          >
            <Icon className="w-7 h-7 text-white" />
          </motion.div>

          {course.isFree ? (
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.15 + 0.2 }}
              className="absolute top-4 left-4 inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 px-4 py-2 rounded-lg shadow-lg"
            >
              <Zap className="w-4 h-4" />
              <span className="text-xs font-bold text-white">FREE</span>
            </motion.div>
          ) : (
            course.discount && (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.15 + 0.2 }}
                className="absolute top-4 left-4 inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-600 px-4 py-2 rounded-lg shadow-lg"
              >
                <TrendingUp className="w-4 h-4" />
                <span className="text-xs font-bold text-white">
                  Save {course.discount}
                </span>
              </motion.div>
            )
          )}
        </div>

        <div className="relative p-6 sm:p-7 flex flex-col flex-grow">
          <div className="flex items-center justify-between mb-4">
            <span className="px-3 py-1.5 bg-purple-500/20 text-purple-300 text-xs font-bold rounded-full border border-purple-500/30">
              {course.category}
            </span>
            <div className="flex items-center gap-1 bg-black/30 backdrop-blur px-2.5 py-1.5 rounded-lg">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-bold text-yellow-400">
                {course.rating}
              </span>
            </div>
          </div>

          <h3 className="text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors leading-tight">
            {course.title}
          </h3>

          <p className="text-gray-400 text-xs mb-4 leading-relaxed line-clamp-2">
            {course.description}
          </p>

          <div className="flex items-center justify-between text-xs text-gray-400 mb-6 pb-6 border-b border-white/10 mt-auto">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span className="font-medium">{course.students}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="font-medium">{course.duration}</span>
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col gap-1">
              {course.isFree ? (
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-green-400" />
                  <span className="text-xl font-bold text-green-400">Free</span>
                </div>
              ) : (
                <>
                  <span className="text-xl font-bold text-white">
                    {course.price}
                  </span>
                  {course.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {course.originalPrice}
                    </span>
                  )}
                </>
              )}
            </div>
            {course.isFree && (
              <span className="text-xs font-bold text-green-300 bg-green-500/20 px-3 py-1 rounded-full border border-green-500/30">
                COMPLIMENTARY
              </span>
            )}
          </div>

          <motion.button
            onClick={() => router.push(`/skill-academy/courses/${course.id}`)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-2.5 px-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2 border-purple-500/30 hover:border-purple-400 hover:from-purple-600/40 hover:to-pink-600/40 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg text-sm"
          >
            <span>Enroll Now</span>
            <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 py-12 md:py-16"
    >
      <div className="flex items-center gap-2 sm:gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-2.5 sm:p-3 rounded-xl border-2 border-white/10 hover:border-purple-500/50 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all duration-300 hover:bg-purple-500/20 backdrop-blur-xl"
        >
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transform rotate-180" />
        </motion.button>

        <div className="flex items-center gap-1.5 sm:gap-2">
          {startPage > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(1)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border-2 border-white/10 hover:border-purple-500 text-white text-sm font-semibold transition-all duration-300 hover:bg-white/5 backdrop-blur-xl"
              >
                1
              </motion.button>
              {startPage > 2 && (
                <span className="px-1 text-gray-400 text-sm">...</span>
              )}
            </>
          )}

          {Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
          ).map((page) => (
            <motion.button
              key={page}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(page)}
              className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg text-sm font-semibold transition-all duration-300 backdrop-blur-xl border-2 ${
                page === currentPage
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 border-purple-500 text-white shadow-lg shadow-purple-500/50"
                  : "border-white/10 hover:border-purple-500 text-white hover:bg-white/5"
              }`}
            >
              {page}
            </motion.button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="px-1 text-gray-400 text-sm">...</span>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(totalPages)}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border-2 border-white/10 hover:border-purple-500 text-white text-sm font-semibold transition-all duration-300 hover:bg-white/5 backdrop-blur-xl"
              >
                {totalPages}
              </motion.button>
            </>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-2.5 sm:p-3 rounded-xl border-2 border-white/10 hover:border-purple-500/50 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all duration-300 hover:bg-purple-500/20 backdrop-blur-xl"
        >
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.button>
      </div>

      <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xl">
        <span className="text-xs sm:text-sm text-gray-300">
          Page <span className="font-bold text-purple-300">{currentPage}</span>{" "}
          of <span className="font-bold text-white">{totalPages}</span>
        </span>
      </div>
    </motion.div>
  );
};

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const iconOptions = [Code, Brain, Palette, TrendingUp, Shield, Smartphone];
  const gradientOptions = [
    "from-blue-500 to-blue-600",
    "from-emerald-500 to-emerald-600",
    "from-pink-500 to-pink-600",
    "from-orange-500 to-orange-600",
    "from-red-500 to-red-600",
    "from-indigo-500 to-indigo-600",
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
    } catch (e) {
      console.error("Failed to load Skill Academy courses", e);
      const message =
        e?.response?.data?.message ||
        e.message ||
        "Failed to load courses. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCourses();
  }, []);

  const categories = [
    { value: "all", label: "All Courses" },
    { value: "Development", label: "Development" },
    { value: "Design", label: "Design" },
    { value: "Data Science", label: "Data Science" },
    { value: "Marketing", label: "Marketing" },
    { value: "Security", label: "Security" },
  ];

  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
  }, [selectedCategory, searchTerm, sortBy]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <section className="relative py-8 lg:py-12 overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-10 lg:mb-12"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 px-4">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Explore Our Courses
              </span>
            </h1>

            <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Discover world-class courses designed to accelerate your career
              growth. From free beginner-friendly courses to advanced
              professional certifications.
            </p>
          </motion.div>

          {/* Search and Filters - Mobile Optimized */}
          <div className="space-y-4 mb-10 lg:mb-12">
            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative w-full"
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 sm:py-4 bg-white/5 border-2 border-white/10 hover:border-purple-500/50 rounded-2xl text-white text-sm sm:text-base placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300 shadow-xl backdrop-blur-xl"
              />
            </motion.div>

            {/* Filters Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
            >
              {/* Filter Icon + Label (Hidden on mobile, shows on sm+) */}
              <div className="hidden sm:flex items-center gap-2 text-gray-400 shrink-0">
                <Filter className="w-5 h-5" />
                <span className="text-sm font-medium">Filter:</span>
              </div>

              {/* Category Filter */}
              <div className="relative flex-1 sm:flex-initial sm:min-w-[180px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none px-4 py-3 sm:py-3.5 bg-white/5 border-2 border-white/10 hover:border-purple-500/50 rounded-xl text-white text-sm sm:text-base focus:outline-none focus:border-purple-500 transition-all duration-300 shadow-xl backdrop-blur-xl cursor-pointer"
                  style={{ paddingRight: "2.5rem" }}
                >
                  {categories.map((category) => (
                    <option
                      key={category.value}
                      value={category.value}
                      className="bg-gray-900 text-white"
                    >
                      {category.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>

              {/* Sort Filter */}
              <div className="relative flex-1 sm:flex-initial sm:min-w-[180px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none px-4 py-3 sm:py-3.5 bg-white/5 border-2 border-white/10 hover:border-purple-500/50 rounded-xl text-white text-sm sm:text-base focus:outline-none focus:border-purple-500 transition-all duration-300 shadow-xl backdrop-blur-xl cursor-pointer"
                  style={{ paddingRight: "2.5rem" }}
                >
                  {sortOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-gray-900 text-white"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </motion.div>

            {/* Active Filters Summary (Mobile only) */}
            {(selectedCategory !== "all" || searchTerm) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="sm:hidden flex flex-wrap items-center gap-2 px-1"
              >
                {selectedCategory !== "all" && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-500/20 text-purple-300 text-xs font-medium rounded-lg border border-purple-500/30">
                    {
                      categories.find((c) => c.value === selectedCategory)
                        ?.label
                    }
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-white transition-colors"
                      onClick={() => setSelectedCategory("all")}
                    />
                  </span>
                )}
                {searchTerm && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-pink-500/20 text-pink-300 text-xs font-medium rounded-lg border border-pink-500/30">
                    Search: {searchTerm.slice(0, 15)}...
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-white transition-colors"
                      onClick={() => setSearchTerm("")}
                    />
                  </span>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </section>

      <section className="relative py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          {loading ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 px-4"
            >
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center">
                  <Zap className="w-10 h-10 text-purple-400 animate-spin" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Loading courses
                </h3>
                <p className="text-gray-400 text-base">
                  Please wait while we fetch the latest courses for you.
                </p>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 px-4"
            >
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/10 border-2 border-red-500/40 flex items-center justify-center">
                  <X className="w-10 h-10 text-red-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Failed to load courses
                </h3>
                <p className="text-gray-400 text-base mb-4">{error}</p>
                <button
                  onClick={loadCourses}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600/20 hover:bg-purple-600/30 border-2 border-purple-500/30 hover:border-purple-500/50 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  <Filter className="w-4 h-4" />
                  Try Again
                </button>
              </div>
            </motion.div>
          ) : paginatedCourses.length > 0 ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                {paginatedCourses.map((course, index) => (
                  <CourseCard key={course.id} course={course} index={index} />
                ))}
              </div>

              {totalPages > 1 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16 px-4"
            >
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center">
                  <X className="w-10 h-10 text-gray-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  No courses found
                </h3>
                <p className="text-gray-400 text-base mb-4">
                  We couldn't find any courses matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchTerm("");
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-purple-600/20 hover:bg-purple-600/30 border-2 border-purple-500/30 hover:border-purple-500/50 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  <Filter className="w-4 h-4" />
                  Clear Filters
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
