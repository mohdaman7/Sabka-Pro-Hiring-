"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
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
} from "lucide-react";
import Link from "next/link";

const CourseCard = ({ course, index }) => {
  const Icon = course.icon;

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
              repeat: Number.POSITIVE_INFINITY,
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

        <div className="relative p-7 flex flex-col flex-grow">
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

          <p className="text-gray-400 text-xs mb-4 leading-relaxed">
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

          <Link href={`/skill-academy/courses/${course.id}`} className="w-full">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2 px-3 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2 border-purple-500/30 hover:border-purple-400 hover:from-purple-600/40 hover:to-pink-600/40 text-white font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group/btn shadow-lg text-sm"
            >
              <span>Enroll Now</span>
              <ArrowRight className="w-3 h-3 group-hover/btn:translate-x-1 transition-transform" />
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
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
      className="flex items-center justify-center gap-3 py-12 md:py-16"
    >
      {/* Previous Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-3 rounded-xl border-2 border-white/10 hover:border-purple-500/50 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all duration-300 hover:bg-purple-500/20 backdrop-blur-xl"
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
              className="w-10 h-10 rounded-lg border-2 border-white/10 hover:border-purple-500 text-white font-semibold transition-all duration-300 hover:bg-white/5 backdrop-blur-xl"
            >
              1
            </motion.button>
            {startPage > 2 && <span className="px-2 text-gray-400">...</span>}
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
            className={`w-10 h-10 rounded-lg font-semibold transition-all duration-300 backdrop-blur-xl border-2 ${
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
              <span className="px-2 text-gray-400">...</span>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(totalPages)}
              className="w-10 h-10 rounded-lg border-2 border-white/10 hover:border-purple-500 text-white font-semibold transition-all duration-300 hover:bg-white/5 backdrop-blur-xl"
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
        className="p-3 rounded-xl border-2 border-white/10 hover:border-purple-500/50 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all duration-300 hover:bg-purple-500/20 backdrop-blur-xl"
      >
        <ArrowRight className="w-5 h-5" />
      </motion.button>

      {/* Page Info */}
      <div className="ml-4 px-4 py-2 rounded-lg bg-white/5 border border-white/10 backdrop-blur-xl">
        <span className="text-sm text-gray-300">
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

  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      category: "Development",
      description:
        "Master modern web development with React, Node.js, and MongoDB",
      students: "12.5k",
      rating: 4.9,
      duration: "40 hours",
      price: "Free",
      originalPrice: null,
      discount: null,
      icon: Code,
      gradient: "from-blue-500 to-blue-600",
      level: "Beginner",
      image:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isFree: true,
    },
    {
      id: 2,
      title: "Data Science & AI",
      category: "Data Science",
      description: "Learn machine learning, data analysis, and AI fundamentals",
      students: "8.3k",
      rating: 4.8,
      duration: "35 hours",
      price: "₹24,999",
      originalPrice: "₹34,999",
      discount: "28%",
      icon: Brain,
      gradient: "from-emerald-500 to-emerald-600",
      level: "Intermediate",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isFree: false,
    },
    {
      id: 3,
      title: "UI/UX Design Mastery",
      category: "Design",
      description: "Create stunning user interfaces and experiences",
      students: "6.7k",
      rating: 4.9,
      duration: "30 hours",
      price: "₹16,999",
      originalPrice: null,
      discount: null,
      icon: Palette,
      gradient: "from-pink-500 to-pink-600",
      level: "Beginner",
      image:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isFree: false,
    },
    {
      id: 4,
      title: "Digital Marketing Mastery",
      category: "Marketing",
      description:
        "Learn SEO, social media marketing, and digital advertising strategies",
      students: "9.2k",
      rating: 4.7,
      duration: "25 hours",
      price: "₹12,999",
      originalPrice: "₹18,999",
      discount: "31%",
      icon: TrendingUp,
      gradient: "from-orange-500 to-orange-600",
      level: "Beginner",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isFree: false,
    },
    {
      id: 5,
      title: "Cybersecurity Fundamentals",
      category: "Security",
      description:
        "Protect systems and networks from digital attacks and threats",
      students: "5.8k",
      rating: 4.8,
      duration: "45 hours",
      price: "₹29,999",
      originalPrice: null,
      discount: null,
      icon: Shield,
      gradient: "from-red-500 to-red-600",
      level: "Intermediate",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isFree: false,
    },
    {
      id: 6,
      title: "Mobile App Development",
      category: "Development",
      description: "Build native and cross-platform mobile applications",
      students: "7.1k",
      rating: 4.6,
      duration: "50 hours",
      price: "₹22,999",
      originalPrice: null,
      discount: null,
      icon: Smartphone,
      gradient: "from-indigo-500 to-indigo-600",
      level: "Intermediate",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      isFree: false,
    },
  ];

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

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
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
      <section className="relative py-8 lg:py-10 overflow-hidden">
        <div className="absolute inset-0 opacity-30 pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-balance">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Explore Our Courses
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Discover world-class courses designed to accelerate your career
              growth. From free beginner-friendly courses to advanced
              professional certifications.
            </p>
          </motion.div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
            {/* Search */}
            <div className="relative w-full lg:flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses by title or topic..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white/5 border-2 border-white/10 hover:border-purple-500/50 rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-all duration-300 shadow-xl backdrop-blur-xl"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-3 w-full lg:w-auto flex-wrap lg:flex-nowrap">
              <div className="flex items-center gap-2 text-gray-400">
                <Filter className="w-5 h-5" />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white/5 border-2 border-white/10 hover:border-purple-500/50 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-all duration-300 shadow-xl backdrop-blur-xl"
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

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white/5 border-2 border-white/10 hover:border-purple-500/50 rounded-xl text-white focus:outline-none focus:border-purple-500 transition-all duration-300 shadow-xl backdrop-blur-xl"
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
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-6 lg:py-8">
        <div className="max-w-7xl mx-auto px-6">
          {paginatedCourses.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {paginatedCourses.map((course, index) => (
                  <CourseCard key={course.id} course={course} index={index} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-16"
            >
              <X className="w-16 h-16 text-gray-600 mx-auto mb-4 opacity-50" />
              <p className="text-gray-400 text-lg mb-2">
                No courses found matching your criteria.
              </p>
              <p className="text-gray-500 text-base">
                Try adjusting your filters or search term
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
