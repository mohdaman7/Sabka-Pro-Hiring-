"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Search,
  Filter,
  Star,
  Users,
  Clock,
  Play,
  BookOpen,
  Code,
  Palette,
  BarChart3,
  Brain,
  Shield,
  Smartphone,
  Camera,
  ArrowRight,
  CheckCircle,
  Award,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

// Course Card Component
const CourseCard = ({ course, index }) => {
  const Icon = course.icon;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        y: -10,
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="group relative bg-white/5 border-2 border-gray-700 rounded-3xl overflow-hidden hover:border-purple-500 hover:bg-white/10 transition-all duration-500 shadow-2xl"
    >
      {/* Course Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Floating Icon */}
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.2,
            ease: "easeInOut",
          }}
          whileHover={{ rotate: 360, scale: 1.1 }}
          className={`absolute top-4 right-4 w-12 h-12 bg-gradient-to-r ${course.gradient} rounded-xl flex items-center justify-center shadow-lg`}
        >
          <Icon className="w-6 h-6 text-white" />
        </motion.div>
      </div>
      
      <div className="relative p-6">

        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm font-medium rounded-full">
            {course.category}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm font-bold ${
            course.price === "Free" 
              ? "bg-green-500/20 text-green-300" 
              : "bg-orange-500/20 text-orange-300"
          }`}>
            {course.price}
          </span>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
          {course.title}
        </h3>
        
        <p className="text-gray-400 mb-6 leading-relaxed">
          {course.description}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-400 mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              {course.students}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {course.duration}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {course.rating}
          </div>
        </div>

        <Link href={`/skill-academy/courses/${course.id}`}>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl font-semibold text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <span>Enroll Now</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default function CoursesPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("popular");

  // Sample courses data
  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      category: "Development",
      description: "Master modern web development with React, Node.js, and MongoDB",
      students: "12.5k",
      rating: 4.9,
      duration: "40 hours",
      price: "Free",
      icon: Code,
      gradient: "from-blue-500 to-purple-600",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
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
      icon: Brain,
      gradient: "from-emerald-500 to-teal-600",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
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
      icon: Palette,
      gradient: "from-pink-500 to-rose-600",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 4,
      title: "Digital Marketing Mastery",
      category: "Marketing",
      description: "Learn SEO, social media marketing, and digital advertising strategies",
      students: "9.2k",
      rating: 4.7,
      duration: "25 hours",
      price: "₹12,999",
      icon: TrendingUp,
      gradient: "from-orange-500 to-red-600",
      level: "Beginner",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    },
    {
      id: 5,
      title: "Cybersecurity Fundamentals",
      category: "Security",
      description: "Protect systems and networks from digital attacks and threats",
      students: "5.8k",
      rating: 4.8,
      duration: "45 hours",
      price: "₹29,999",
      icon: Shield,
      gradient: "from-red-500 to-pink-600",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
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
      icon: Smartphone,
      gradient: "from-indigo-500 to-purple-600",
      level: "Intermediate",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }
  ];

  const categories = [
    { value: "all", label: "All Courses" },
    { value: "Development", label: "Development" },
    { value: "Design", label: "Design" },
    { value: "Data Science", label: "Data Science" },
    { value: "Marketing", label: "Marketing" },
    { value: "Business", label: "Business" },
  ];

  const sortOptions = [
    { value: "popular", label: "Most Popular" },
    { value: "rating", label: "Highest Rated" },
    { value: "newest", label: "Newest" },
    { value: "price-low", label: "Price: Low to High" },
  ];

  // Filter and sort courses
  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen py-12">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-8 shadow-2xl"
            >
              <BookOpen className="w-10 h-10 text-white" />
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Our Courses
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Discover world-class courses designed to accelerate your career growth
            </p>
          </motion.div>

          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12">
            {/* Search */}
            <div className="relative w-full lg:w-96">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/5 border-2 border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors shadow-xl"
              />
            </div>

            {/* Filters */}
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-2xl text-white focus:outline-none focus:border-purple-500 transition-colors shadow-xl"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value} className="bg-gray-800">
                    {category.label}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-3 bg-white/5 border-2 border-gray-700 rounded-2xl text-white focus:outline-none focus:border-purple-500 transition-colors shadow-xl"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value} className="bg-gray-800">
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-8">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <CourseCard key={course.id} course={course} index={index} />
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-400 text-xl">No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
