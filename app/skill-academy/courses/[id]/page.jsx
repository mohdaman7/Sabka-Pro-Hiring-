"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Star,
  Users,
  Clock,
  BookOpen,
  Download,
  Share2,
  Heart,
  ShoppingCart,
  ChevronDown,
  Check,
  Lock,
  Play,
  Code,
  Award,
  Zap,
  Target,
  TrendingUp,
  MessageSquare,
  Calendar,
  BarChart3,
} from "lucide-react";
import Link from "next/link";

export default function CourseDetailPage({ params }) {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [expandedModule, setExpandedModule] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedModules, setSelectedModules] = useState(new Set());

  // Mock course data - replace with API call
  const course = {
    id: params.id,
    title: "Full Stack Web Development Masterclass",
    category: "Web Development",
    instructor: {
      name: "John Doe",
      image: "/instructor.jpg",
      title: "Senior Full Stack Developer at Google",
      students: "12.5k",
      rating: 4.9,
    },
    image: "/course-hero.jpg",
    rating: 4.8,
    reviews: 1247,
    students: 15420,
    price: 4999,
    originalPrice: 9999,
    learningOutcomes: [
      "Master React, Node.js, and MongoDB",
      "Build production-ready applications",
      "Deploy applications to cloud platforms",
      "Implement authentication and security",
    ],
    description:
      "Learn full-stack web development from scratch. This comprehensive course covers frontend, backend, and database technologies. Build real-world projects and become a professional full-stack developer.",
    modules: [
      {
        id: 1,
        title: "Module 1: JavaScript Fundamentals",
        duration: "8 days",
        lessons: 24,
        hours: 16,
        topics: [
          "Variables and Data Types",
          "Functions and Closures",
          "ES6+ Features",
          "Async/Await",
          "DOM Manipulation",
        ],
        price: 599,
      },
      {
        id: 2,
        title: "Module 2: React.js Essentials",
        duration: "10 days",
        lessons: 32,
        hours: 20,
        topics: [
          "Components and Props",
          "Hooks and State Management",
          "Context API",
          "React Router",
          "Performance Optimization",
        ],
        price: 799,
      },
      {
        id: 3,
        title: "Module 3: Node.js & Express",
        duration: "9 days",
        lessons: 28,
        hours: 18,
        topics: [
          "Express Basics",
          "RESTful APIs",
          "Middleware",
          "Error Handling",
          "Security Best Practices",
        ],
        price: 799,
      },
      {
        id: 4,
        title: "Module 4: Database & MongoDB",
        duration: "7 days",
        lessons: 20,
        hours: 14,
        topics: [
          "MongoDB Basics",
          "CRUD Operations",
          "Indexing and Aggregation",
          "Schema Design",
          "Database Optimization",
        ],
        price: 599,
      },
      {
        id: 5,
        title: "Module 5: Deployment & DevOps",
        duration: "6 days",
        lessons: 16,
        hours: 12,
        topics: [
          "Docker Basics",
          "Deployment to Cloud",
          "CI/CD Pipelines",
          "Monitoring",
          "Scaling Applications",
        ],
        price: 699,
      },
    ],
    requirements: [
      "Basic JavaScript knowledge",
      "Familiarity with HTML and CSS",
      "A code editor (VS Code recommended)",
      "Node.js installed on your computer",
    ],
  };

  const toggleModuleSelection = (moduleId) => {
    const newSelected = new Set(selectedModules);
    if (newSelected.has(moduleId)) {
      newSelected.delete(moduleId);
    } else {
      newSelected.add(moduleId);
    }
    setSelectedModules(newSelected);
  };

  const calculateModulePrice = () => {
    return Array.from(selectedModules).reduce((sum, id) => {
      const module = course.modules.find((m) => m.id === parseInt(id));
      return sum + (module?.price || 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a0f2e] via-[#0f0820] to-[#1a0f2e]">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative pt-20 pb-12 md:pb-16 lg:pb-20 overflow-hidden"
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-0 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-purple-600/8 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ x: [0, -40, 0], y: [0, 30, 0] }}
            transition={{ duration: 18, repeat: Infinity, delay: 2 }}
            className="absolute bottom-0 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-pink-500/8 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-start">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="md:col-span-2"
              >
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-6 text-sm text-gray-400">
                  <Link
                    href="/skill-academy"
                    className="hover:text-purple-300 transition-colors"
                  >
                    Home
                  </Link>
                  <span>/</span>
                  <Link
                    href="/skill-academy/courses"
                    className="hover:text-purple-300 transition-colors"
                  >
                    Courses
                  </Link>
                  <span>/</span>
                  <span className="text-purple-300">{course.category}</span>
                </div>

                {/* Title */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
                >
                  {course.title}
                </motion.h1>

                {/* Rating and Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap items-center gap-6 mb-8 text-sm md:text-base"
                >
                  <div className="flex items-center gap-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < 4
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-yellow-400 font-semibold">
                      {course.rating}
                    </span>
                    <span className="text-gray-400">
                      ({course.reviews} reviews)
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-300">
                    <Users className="w-4 h-4" />
                    <span>{course.students.toLocaleString()} students</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-300">
                    <Clock className="w-4 h-4" />
                    <span>47 hours total</span>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg text-gray-300 mb-8 leading-relaxed max-w-2xl"
                >
                  {course.description}
                </motion.p>

                {/* Instructor Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl"
                >
                  <img
                    src={course.instructor.image}
                    alt={course.instructor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="font-bold text-white">
                      {course.instructor.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {course.instructor.title}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                      <span>{course.instructor.students} students</span>
                      <span className="flex items-center gap-1">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        {course.instructor.rating}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Sidebar - Pricing */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="md:col-span-1 sticky top-24"
              >
                {/* Course Image */}
                <div className="relative h-64 rounded-2xl overflow-hidden mb-6 shadow-2xl">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                {/* Price Card */}
                <div className="bg-gradient-to-b from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-6 mb-6">
                  <div className="mb-6">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-4xl font-bold text-white">
                        ₹{course.price}
                      </span>
                      <span className="text-xl text-gray-400 line-through">
                        ₹{course.originalPrice}
                      </span>
                    </div>
                    <p className="text-sm text-green-400 font-semibold">
                      Save ₹{course.originalPrice - course.price} (50% off)
                    </p>
                  </div>

                  {/* Bundle Info */}
                  <div className="bg-white/5 rounded-lg p-4 mb-6">
                    <p className="text-sm text-gray-300 mb-3">
                      Or purchase modules individually:
                    </p>
                    <p className="text-xs text-gray-400">
                      Selected: {selectedModules.size} module(s) - ₹
                      {calculateModulePrice()}
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Enroll Now
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3 border border-white/20 hover:border-white/40 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      <Heart
                        className={`w-5 h-5 ${
                          isFavorite ? "fill-red-500 text-red-500" : ""
                        }`}
                        onClick={() => setIsFavorite(!isFavorite)}
                      />
                      Wishlist
                    </motion.button>

                    <button className="w-full py-3 border border-white/20 hover:border-white/40 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all">
                      <Share2 className="w-5 h-5" />
                      Share
                    </button>
                  </div>
                </div>

                {/* Info Cards */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                    <Certificate className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-gray-300">
                      Certificate on completion
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                    <Download className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-gray-300">
                      Lifetime access
                    </span>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                    <Zap className="w-5 h-5 text-purple-400" />
                    <span className="text-sm text-gray-300">
                      Money-back guarantee
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Tabs Section */}
      <section className="relative w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-12 border-b border-white/10 pb-6">
            {["overview", "modules", "requirements", "reviews"].map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-6 py-3 font-semibold capitalize rounded-lg transition-all ${
                  selectedTab === tab
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
                whileHover={{ scale: 1.05 }}
              >
                {tab}
              </motion.button>
            ))}
          </div>

          {/* Tab Content */}
          {selectedTab === "overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-12"
            >
              {/* Learning Outcomes */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                  What You'll Learn
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {course.learningOutcomes.map((outcome, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-xl hover:border-purple-500/30 transition-colors"
                    >
                      <Check className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                      <p className="text-gray-300">{outcome}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {selectedTab === "modules" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Course Modules
                </h2>
                <p className="text-sm text-gray-400">
                  {selectedModules.size}/{course.modules.length} selected
                </p>
              </div>

              {course.modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-white/10 rounded-2xl overflow-hidden hover:border-purple-500/30 transition-colors"
                >
                  <div
                    className="p-6 bg-white/5 hover:bg-white/8 transition-colors cursor-pointer"
                    onClick={() =>
                      setExpandedModule(
                        expandedModule === module.id ? null : module.id
                      )
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <input
                            type="checkbox"
                            checked={selectedModules.has(module.id)}
                            onChange={() => toggleModuleSelection(module.id)}
                            className="w-5 h-5 rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <h3 className="text-lg font-bold text-white">
                            {module.title}
                          </h3>
                        </div>

                        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
                          <span className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            {module.duration}
                          </span>
                          <span className="flex items-center gap-2">
                            <BookOpen className="w-4 h-4" />
                            {module.lessons} lessons
                          </span>
                          <span className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            {module.hours}h
                          </span>
                          <span className="ml-auto font-bold text-purple-300">
                            ₹{module.price}
                          </span>
                        </div>
                      </div>

                      <motion.div
                        animate={{
                          rotate: expandedModule === module.id ? 180 : 0,
                        }}
                        className="ml-4"
                      >
                        <ChevronDown className="w-6 h-6 text-gray-400" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Expanded Content */}
                  {expandedModule === module.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="px-6 py-6 bg-black/20 border-t border-white/10"
                    >
                      <p className="text-gray-300 mb-4 font-semibold">
                        Topics covered:
                      </p>
                      <ul className="space-y-3">
                        {module.topics.map((topic, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="flex items-center gap-3 text-gray-300"
                          >
                            <Play className="w-4 h-4 text-purple-400 flex-shrink-0" />
                            {topic}
                          </motion.li>
                        ))}
                      </ul>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        className="mt-6 py-2 px-6 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
                      >
                        Preview Module
                      </motion.button>
                    </motion.div>
                  )}
                </motion.div>
              ))}

              {/* Module Summary */}
              {selectedModules.size > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-6 border-t border-white/10 md:relative md:border-t-0 md:mt-12"
                >
                  <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      <p className="text-gray-300 mb-2">
                        {selectedModules.size} module(s) selected
                      </p>
                      <p className="text-2xl font-bold text-white">
                        Total: ₹{calculateModulePrice()}
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      Buy Selected Modules
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {selectedTab === "requirements" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                Course Requirements
              </h2>
              {course.requirements.map((requirement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 p-6 bg-white/5 border border-white/10 rounded-xl"
                >
                  <Check className="w-6 h-6 text-green-400 mt-1 flex-shrink-0" />
                  <p className="text-gray-300">{requirement}</p>
                </motion.div>
              ))}
            </motion.div>
          )}

          {selectedTab === "reviews" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">
                Student Reviews
              </h2>
              <p className="text-gray-400 text-center py-12">
                Reviews will appear here soon
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}

// Certificate Icon Component
const Certificate = (props) => (
  <svg {...props} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);
