"use client";

import { motion, AnimatePresence } from "framer-motion";
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
  Sparkles,
  Award,
  Play,
} from "lucide-react";

const CourseCard = ({ course, index }) => {
  const Icon = course.icon;
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative h-full"
    >
      {/* Premium Glow Effect */}
      <motion.div
        className="absolute -inset-0.5 bg-gradient-to-br from-[#a87bcc]/30 via-[#7e4ba3]/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl"
        animate={isHovered ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />

      <motion.div
        whileHover={{ y: -12 }}
        transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
        className="relative h-full bg-gradient-to-br from-white/[0.08] via-white/[0.05] to-transparent border border-white/10 group-hover:border-[#a87bcc]/40 rounded-3xl overflow-hidden backdrop-blur-xl shadow-2xl flex flex-col"
      >
        {/* Shine Effect on Hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
          initial={{ x: "-100%" }}
          animate={isHovered ? { x: "100%" } : { x: "-100%" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ pointerEvents: "none" }}
        />

        {/* Course Image Header */}
        <div className="relative h-44 overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-[#7e4ba3]/30 via-[#a87bcc]/20 to-transparent"
            animate={{ opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
          />

          <motion.img
            src={course.image || "/api/placeholder/400/320"}
            alt={course.title}
            className="w-full h-full object-cover"
            animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          />

          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Premium Floating Icon */}
          <motion.div
            animate={
              isHovered
                ? { y: -8, rotate: 8, scale: 1.1 }
                : { y: [0, -6, 0], rotate: [0, 3, -3, 0] }
            }
            transition={{
              duration: isHovered ? 0.3 : 5,
              repeat: isHovered ? 0 : Infinity,
              delay: index * 0.2,
            }}
            className={`absolute top-4 right-4 w-14 h-14 bg-gradient-to-br ${course.gradient} rounded-2xl flex items-center justify-center shadow-2xl border border-white/30 backdrop-blur-sm`}
          >
            <Icon className="w-7 h-7 text-white drop-shadow-lg" />
          </motion.div>

          {/* Premium Badges */}
          <AnimatePresence>
            {course.isFree ? (
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                className="absolute top-4 left-4 inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-500 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-sm border border-white/20"
              >
                <Sparkles className="w-4 h-4" />
                <span>FREE ACCESS</span>
              </motion.div>
            ) : (
              course.discount && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                  className="absolute top-4 left-4 inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg backdrop-blur-sm border border-white/20"
                >
                  <TrendingUp className="w-4 h-4" />
                  <span>{course.discount} OFF</span>
                </motion.div>
              )
            )}
          </AnimatePresence>

          {/* Play Button Overlay on Hover */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isHovered ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.3 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center">
              <Play className="w-7 h-7 text-white ml-1" fill="white" />
            </div>
          </motion.div>
        </div>

        {/* Course Content */}
        <div className="relative p-5 flex flex-col flex-grow">
          {/* Category & Rating Row */}
          <div className="flex items-center justify-between mb-3">
            <motion.span
              whileHover={{ scale: 1.05 }}
              className="px-3 py-1.5 bg-gradient-to-r from-[#7e4ba3]/20 to-[#a87bcc]/10 text-[#c99ee6] text-xs font-bold rounded-full border border-[#a87bcc]/30 backdrop-blur-sm shadow-sm"
            >
              {course.category}
            </motion.span>
            <div className="flex items-center gap-1.5 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 px-3 py-1.5 rounded-full border border-yellow-400/20 backdrop-blur-sm">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 drop-shadow-lg" />
              <span className="font-bold text-yellow-300 text-sm">
                {course.rating}
              </span>
            </div>
          </div>

          {/* Course Title */}
          <h3 className="text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-[#c99ee6] group-hover:bg-clip-text leading-tight min-h-[3rem] transition-all duration-300">
            {course.title}
          </h3>

          {/* Description */}
          <p className="text-gray-300 text-sm mb-4 leading-relaxed line-clamp-2 flex-grow">
            {course.description}
          </p>

          {/* Stats with Icons */}
          <div className="flex items-center justify-between text-sm mb-4 pb-4 border-b border-white/10">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10"
            >
              <Users className="w-4 h-4 text-[#c99ee6]" />
              <span className="font-semibold text-gray-200">
                {course.students}
              </span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/10"
            >
              <Clock className="w-4 h-4 text-[#c99ee6]" />
              <span className="font-semibold text-gray-200">
                {course.duration}
              </span>
            </motion.div>
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex flex-col gap-1">
              {course.isFree ? (
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-green-400" />
                  <span className="text-2xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    Free
                  </span>
                </div>
              ) : (
                <>
                  <span className="text-2xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                    {course.price}
                  </span>
                  {course.originalPrice && (
                    <span className="text-sm text-gray-400 line-through font-medium">
                      {course.originalPrice}
                    </span>
                  )}
                </>
              )}
            </div>
            {course.isFree && (
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center gap-1.5 text-xs font-black text-green-300 bg-green-500/15 px-3 py-1.5 rounded-full border border-green-400/30 backdrop-blur-sm"
              >
                <Award className="w-4 h-4" />
                <span>LIMITED</span>
              </motion.div>
            )}
          </div>

          {/* Premium Enroll Button */}
          <motion.button
            onClick={() => router.push(`/skill-academy/courses/${course.id}`)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full relative group/btn overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#7e4ba3] via-[#9d6fcc] to-[#a87bcc] opacity-100 group-hover/btn:opacity-90 transition-opacity rounded-xl" />
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
            <div className="relative py-3.5 px-4 flex items-center justify-center gap-2 text-white font-bold text-sm">
              <span>Enroll Now</span>
              <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
            </div>
          </motion.button>
        </div>
      </motion.div>
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col sm:flex-row items-center justify-center gap-4 py-6"
    >
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="p-3 rounded-xl bg-white/5 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white hover:bg-white/10 hover:border-[#a87bcc]/40 transition-all duration-200 backdrop-blur-sm"
        >
          <ArrowRight className="w-5 h-5 transform rotate-180" />
        </motion.button>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {startPage > 1 && (
            <>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(1)}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#a87bcc]/40 text-white text-sm font-bold transition-all duration-200 backdrop-blur-sm"
              >
                1
              </motion.button>
              {startPage > 2 && (
                <span className="px-2 text-gray-400 text-sm font-bold">
                  ...
                </span>
              )}
            </>
          )}

          {Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i
          ).map((page) => (
            <motion.button
              key={page}
              whileHover={{ scale: page === currentPage ? 1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-xl text-sm font-bold transition-all duration-200 ${
                page === currentPage
                  ? "bg-gradient-to-r from-[#7e4ba3] to-[#a87bcc] border-[#a87bcc]/50 text-white shadow-lg shadow-[#a87bcc]/20 scale-105"
                  : "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-[#a87bcc]/40 backdrop-blur-sm"
              } border`}
            >
              {page}
            </motion.button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <span className="px-2 text-gray-400 text-sm font-bold">
                  ...
                </span>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onPageChange(totalPages)}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#a87bcc]/40 text-white text-sm font-bold transition-all duration-200 backdrop-blur-sm"
              >
                {totalPages}
              </motion.button>
            </>
          )}
        </div>

        {/* Next Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="p-3 rounded-xl bg-white/5 border border-white/10 disabled:opacity-30 disabled:cursor-not-allowed text-white hover:bg-white/10 hover:border-[#a87bcc]/40 transition-all duration-200 backdrop-blur-sm"
        >
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Page Info */}
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
      >
        <span className="text-sm text-gray-300 font-medium">
          Page{" "}
          <span className="font-black bg-gradient-to-r from-[#c99ee6] to-[#a87bcc] bg-clip-text text-transparent">
            {currentPage}
          </span>{" "}
          of <span className="font-bold text-white">{totalPages}</span>
        </span>
      </motion.div>
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
    <div className="min-h-screen">
      {/* Hero Section with Search & Filters */}
      <section className="relative py-8 overflow-hidden">
        {/* Background Effects - Matching Layout Theme */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#692c7a]/40 to-[#9463a8]/15 rounded-full blur-3xl"
            animate={{
              y: [0, 30, 0],
              x: [0, 20, 0],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-l from-[#8b4fa8]/30 to-[#692c7a]/10 rounded-full blur-3xl"
            animate={{
              y: [0, -30, 0],
              x: [0, -20, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: 1,
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* Enhanced Header */}
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
          </motion.div>

          {/* Enhanced Search and Filters */}
          <div className="space-y-4">
            {/* Premium Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="relative w-full max-w-3xl mx-auto group"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#7e4ba3] to-[#a87bcc] rounded-2xl opacity-30 group-hover:opacity-50 blur transition-opacity duration-300" />
              <div className="relative">
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#c99ee6] pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search for courses, skills, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 bg-white/10 border border-white/20 focus:border-[#a87bcc]/60 rounded-2xl text-white text-base placeholder-gray-400 focus:outline-none transition-all duration-300 backdrop-blur-xl shadow-xl"
                />
              </div>
            </motion.div>

            {/* Enhanced Filters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-4xl mx-auto"
            >
              {/* Filter Label */}
              <div className="hidden sm:flex items-center gap-2 text-gray-200">
                <Filter className="w-5 h-5 text-[#c99ee6]" />
                <span className="text-sm font-bold">Filters:</span>
              </div>

              {/* Category Dropdown */}
              <div className="relative flex-1 sm:max-w-[240px]">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full appearance-none px-5 py-3 bg-white/10 border border-white/20 focus:border-[#a87bcc]/60 rounded-xl text-white text-sm font-medium focus:outline-none backdrop-blur-xl shadow-lg transition-all duration-200 cursor-pointer"
                >
                  {categories.map((category) => (
                    <option
                      key={category.value}
                      value={category.value}
                      className="bg-[#1a0d2e] text-white"
                    >
                      {category.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#c99ee6] pointer-events-none" />
              </div>

              {/* Sort Dropdown */}
              <div className="relative flex-1 sm:max-w-[240px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none px-5 py-3 bg-white/10 border border-white/20 focus:border-[#a87bcc]/60 rounded-xl text-white text-sm font-medium focus:outline-none backdrop-blur-xl shadow-lg transition-all duration-200 cursor-pointer"
                >
                  {sortOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                      className="bg-[#1a0d2e] text-white"
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#c99ee6] pointer-events-none" />
              </div>
            </motion.div>

            {/* Active Filters Pills */}
            <AnimatePresence>
              {(selectedCategory !== "all" || searchTerm) && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-wrap items-center justify-center gap-3 px-4"
                >
                  {selectedCategory !== "all" && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#7e4ba3]/25 to-[#a87bcc]/20 text-[#c99ee6] text-sm font-bold rounded-full border border-[#a87bcc]/30 backdrop-blur-sm cursor-pointer"
                      onClick={() => setSelectedCategory("all")}
                    >
                      {
                        categories.find((c) => c.value === selectedCategory)
                          ?.label
                      }
                      <X className="w-4 h-4 hover:text-white transition-colors" />
                    </motion.span>
                  )}
                  {searchTerm && (
                    <motion.span
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1.05 }}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/25 to-purple-500/20 text-pink-300 text-sm font-bold rounded-full border border-pink-400/30 backdrop-blur-sm cursor-pointer"
                      onClick={() => setSearchTerm("")}
                    >
                      {searchTerm.slice(0, 20)}
                      {searchTerm.length > 20 && "..."}
                      <X className="w-4 h-4 hover:text-white transition-colors" />
                    </motion.span>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
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
                  <Filter className="w-5 h-5" />
                  Try Again
                </motion.button>
              </div>
            </motion.div>
          ) : paginatedCourses.length > 0 ? (
            <>
              {/* Results Count with Premium Design */}
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

              {/* Premium Courses Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
                {paginatedCourses.map((course, index) => (
                  <CourseCard key={course.id} course={course} index={index} />
                ))}
              </div>

              {/* Pagination */}
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
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 px-4"
            >
              <div className="max-w-md mx-auto">
                <motion.div
                  animate={{
                    scale: [1, 1.05, 1],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="w-24 h-24 mx-auto mb-6 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 flex items-center justify-center backdrop-blur-xl shadow-2xl"
                >
                  <Search className="w-12 h-12 text-gray-400" />
                </motion.div>
                <h3 className="text-2xl font-black text-white mb-3 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                  No Courses Found
                </h3>
                <p className="text-gray-300 text-base mb-6 leading-relaxed">
                  We couldn't find any courses matching your search criteria.
                  Try adjusting your filters or search terms.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setSelectedCategory("all");
                    setSearchTerm("");
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#7e4ba3] to-[#a87bcc] text-white font-bold rounded-xl shadow-lg hover:shadow-[#a87bcc]/25 transition-all duration-300"
                >
                  <Filter className="w-5 h-5" />
                  Clear All Filters
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
