"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  BookOpen,
  Clock,
  Users,
  CheckCircle,
  PlayCircle,
  Star,
  TrendingUp,
  Award,
  Filter,
  Search,
  Grid,
  List as ListIcon,
  ExternalLink,
} from "lucide-react";
import { enrollInCourse, getMyEnrollments, checkEnrollmentStatus } from "@/services/enrollmentService";
import courseService from "@/services/courseService";
import customToast from "@/utils/customToast";

export default function StudentCoursesEnhanced() {
  const [courses, setCourses] = useState([]);
  const [viewMode, setViewMode] = useState("all"); // "all" or "enrolled"
  const [layoutMode, setLayoutMode] = useState("grid"); // "grid" or "list"
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [enrollments, setEnrollments] = useState([]);
  const [enrollmentStatus, setEnrollmentStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [enrollingCourseId, setEnrollingCourseId] = useState(null);

  // Fetch courses on mount
  useEffect(() => {
    fetchCourses();
  }, []);

  // Fetch enrollments
  useEffect(() => {
    if (viewMode === "enrolled") {
      fetchEnrollments();
    }
  }, [viewMode]);

  // Check enrollment status for all courses
  useEffect(() => {
    if (courses.length > 0) {
      checkAllEnrollmentStatus();
    }
  }, [courses]);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await courseService.publicList();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      customToast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await getMyEnrollments({ limit: 100 });
      setEnrollments(response.data.enrollments);
    } catch (error) {
      console.error("Error fetching enrollments:", error);
      customToast.error("Failed to load enrollments");
    } finally {
      setLoading(false);
    }
  };

  const checkAllEnrollmentStatus = async () => {
    const statusMap = {};
    for (const course of courses) {
      try {
        const response = await checkEnrollmentStatus(course._id);
        statusMap[course._id] = response.data;
      } catch (error) {
        console.error(`Error checking enrollment for ${course._id}:`, error);
      }
    }
    setEnrollmentStatus(statusMap);
  };

  const handleEnroll = async (courseId) => {
    try {
      setEnrollingCourseId(courseId);
      const response = await enrollInCourse(courseId);
      customToast.success("Enrolled Successfully!", response.message);
      
      // Update enrollment status
      await checkAllEnrollmentStatus();
      
      // Refresh enrollments if in enrolled view
      if (viewMode === "enrolled") {
        await fetchEnrollments();
      }
    } catch (error) {
      console.error("Error enrolling:", error);
      customToast.error("Enrollment Failed", error.message || "Failed to enroll in course");
    } finally {
      setEnrollingCourseId(null);
    }
  };

  // Get unique categories
  const categories = ["all", ...new Set(courses.map((c) => c.category).filter(Boolean))];

  // Filter courses
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Display courses based on view mode
  const displayCourses = viewMode === "enrolled" 
    ? enrollments.map(e => ({ ...e.courseId, enrollment: e }))
    : filteredCourses;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30">
              <GraduationCap className="w-8 h-8 text-purple-400" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">Training Courses</h1>
              <p className="text-white/70 mt-1">Enhance your skills with our professional courses</p>
            </div>
          </div>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 space-y-4"
        >
          {/* View Mode Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 bg-white/10 p-1 rounded-xl border border-white/20">
              <button
                onClick={() => setViewMode("all")}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  viewMode === "all"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "text-white/70 hover:text-white"
                }`}
              >
                All Courses
              </button>
              <button
                onClick={() => setViewMode("enrolled")}
                className={`px-6 py-2.5 rounded-lg font-medium transition-all ${
                  viewMode === "enrolled"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "text-white/70 hover:text-white"
                }`}
              >
                My Enrollments
              </button>
            </div>

            {/* Layout Toggle */}
            <div className="flex items-center gap-2 bg-white/10 p-1 rounded-xl border border-white/20">
              <button
                onClick={() => setLayoutMode("grid")}
                className={`p-2.5 rounded-lg transition-all ${
                  layoutMode === "grid"
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setLayoutMode("list")}
                className={`p-2.5 rounded-lg transition-all ${
                  layoutMode === "list"
                    ? "bg-white/20 text-white"
                    : "text-white/70 hover:text-white"
                }`}
              >
                <ListIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Search and Category Filter */}
          {viewMode === "all" && (
            <div className="flex flex-wrap gap-4">
              {/* Search */}
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                  <input
                    type="text"
                    placeholder="Search courses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-purple-500/50 focus:bg-white/15 transition-all"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="pl-12 pr-8 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:border-purple-500/50 focus:bg-white/15 transition-all appearance-none cursor-pointer"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat} className="bg-slate-800">
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </motion.div>

        {/* Courses Grid/List */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
          </div>
        ) : displayCourses.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <BookOpen className="w-16 h-16 text-white/30 mx-auto mb-4" />
            <p className="text-white/70 text-lg">
              {viewMode === "enrolled" ? "No enrollments yet" : "No courses found"}
            </p>
          </motion.div>
        ) : (
          <div
            className={
              layoutMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                : "space-y-4"
            }
          >
            <AnimatePresence>
              {displayCourses.map((course, index) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  index={index}
                  layoutMode={layoutMode}
                  enrollmentStatus={enrollmentStatus[course._id]}
                  onEnroll={handleEnroll}
                  isEnrolling={enrollingCourseId === course._id}
                  viewMode={viewMode}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}

// Course Card Component
function CourseCard({ course, index, layoutMode, enrollmentStatus, onEnroll, isEnrolling, viewMode }) {
  const isEnrolled = enrollmentStatus?.isEnrolled;
  const enrollment = course.enrollment || enrollmentStatus?.enrollment;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ delay: index * 0.05 }}
      className={`group relative bg-gradient-to-br from-white/10 to-white/5 rounded-2xl border border-white/20 hover:border-purple-500/50 transition-all duration-300 overflow-hidden ${
        layoutMode === "list" ? "flex gap-6" : ""
      }`}
    >
      {/* Thumbnail */}
      <div className={layoutMode === "list" ? "w-64 flex-shrink-0" : "w-full"}>
        <div className="relative aspect-video overflow-hidden">
          {course.thumbnail ? (
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center">
              <GraduationCap className="w-16 h-16 text-white/50" />
            </div>
          )}
          
          {/* Enrollment Badge */}
          {isEnrolled && (
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-emerald-500/90 backdrop-blur-sm border border-emerald-400/50 flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-white" />
              <span className="text-xs font-bold text-white">Enrolled</span>
            </div>
          )}

          {/* Level Badge */}
          <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-purple-500/90 backdrop-blur-sm border border-purple-400/50">
            <span className="text-xs font-bold text-white">{course.level || "Beginner"}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1">
        {/* Category */}
        {course.category && (
          <div className="inline-block px-3 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 mb-3">
            <span className="text-xs font-semibold text-pink-300">{course.category}</span>
          </div>
        )}

        {/* Title */}
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-white/70 text-sm mb-4 line-clamp-2">{course.description}</p>

        {/* Instructor */}
        {course.instructor && (
          <div className="flex items-center gap-2 mb-4">
            <Award className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-white/80">{course.instructor}</span>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center gap-4 mb-4 text-sm text-white/70">
          <div className="flex items-center gap-1.5">
            <Users className="w-4 h-4" />
            <span>{course.enrolledCount || 0} enrolled</span>
          </div>
          {course.lessons && (
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4" />
              <span>{course.lessons.length} lessons</span>
            </div>
          )}
        </div>

        {/* Progress Bar (for enrolled courses) */}
        {enrollment && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-white/80">Progress</span>
              <span className="text-purple-400 font-bold">{enrollment.progress || 0}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                style={{ width: `${enrollment.progress || 0}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex gap-3">
          {isEnrolled ? (
            <button className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all flex items-center justify-center gap-2">
              <PlayCircle className="w-5 h-5" />
              Continue Learning
            </button>
          ) : (
            <button
              onClick={() => onEnroll(course._id)}
              disabled={isEnrolling}
              className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isEnrolling ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Enrolling...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Enroll Now
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
