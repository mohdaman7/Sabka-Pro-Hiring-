"use client";

import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  Edit2,
  Trash2,
  Video,
  BookOpen,
  IndianRupee,
  Users,
  TrendingUp,
  Star,
} from "lucide-react";
import courseService from "@/services/courseService";
import CreateParentCourseModal from "@/components/ui/CreateParentCourseModal";
import CreateModuleModal from "@/components/ui/CreateModuleModal";
import CourseDetailView from "@/components/ui/CourseDetailView";
import CourseAccessManager from "@/components/ui/CourseAccessManager";

export default function CourseManagement() {
  const [activeTab, setActiveTab] = useState("courses");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showCreateParentModal, setShowCreateParentModal] = useState(false);
  const [showCreateModuleModal, setShowCreateModuleModal] = useState(false);
  const [defaultParentId, setDefaultParentId] = useState("");
  const [showDetailView, setShowDetailView] = useState(false);
  const [showAccessManager, setShowAccessManager] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [adminCourses, setAdminCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hoveredCourse, setHoveredCourse] = useState(null);

  const categories = [
    "IT & Software",
    "Management",
    "Engineering",
    "Marketing",
    "Design",
    "Business",
  ];

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    setLoading(true);
    courseService
      .adminList()
      .then((data) => {
        setAdminCourses(data);
      })
      .catch((e) => setError(e?.response?.data?.message || e.message))
      .finally(() => setLoading(false));
  };

  const handleDelete = async (courseId) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await courseService.adminDelete(courseId);
      loadCourses();
    } catch (e) {
      alert(e?.response?.data?.message || e.message);
    }
  };

  const handleViewDetails = (course) => {
    setSelectedCourse(course);
    setShowDetailView(true);
  };

  const handleAddModuleFor = (parent) => {
    setDefaultParentId(parent?._id || "");
    setShowCreateModuleModal(true);
  };

  const parentCourses = adminCourses.filter((c) => c.type === "parent");
  const filteredCourses = parentCourses
    .filter((c) =>
      selectedCategory !== "all" ? c.category === selectedCategory : true
    )
    .filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const moduleCourses = adminCourses.filter((c) => c.type === "module");
  const filteredModules = moduleCourses.filter((c) =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate stats
  const totalCourses = parentCourses.length;
  const totalModules = moduleCourses.length;
  const totalEnrolled = adminCourses.reduce(
    (sum, c) => sum + (c.enrolledCount || 0),
    0
  );
  const avgRating =
    adminCourses.length > 0
      ? (
          adminCourses.reduce((sum, c) => sum + (c.rating || 0), 0) /
          adminCourses.length
        ).toFixed(1)
      : 0;

  const getLevelColor = (level) => {
    const colors = {
      Beginner: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      Intermediate: "bg-amber-500/15 text-amber-400 border-amber-500/30",
      Advanced: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    };
    return colors[level] || colors.Beginner;
  };

  const getStatusColor = (status) => {
    const colors = {
      active: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      draft: "bg-amber-500/15 text-amber-400 border-amber-500/30",
      archived: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    };
    return colors[status] || colors.draft;
  };

  return (
    <div className="relative p-6 md:p-8 space-y-8 min-h-screen overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse-slow opacity-20"
          style={{
            background: "radial-gradient(circle, #803791 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full blur-[140px] animate-pulse-slower opacity-15"
          style={{
            background: "radial-gradient(circle, #b87bd1 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] animate-float opacity-10"
          style={{
            background: "radial-gradient(circle, #f0c2ee 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Premium Header */}
      <div
        className="relative overflow-hidden rounded-[32px] p-10 shadow-[0_20px_80px_-20px_rgba(128,55,145,0.5)] backdrop-blur-xl group transition-all duration-700 hover:shadow-[0_30px_100px_-20px_rgba(128,55,145,0.6)]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.06) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-br from-[#803791]/10 via-transparent to-[#b87bd1]/10 animate-gradient-shift" />
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
        </div>

        <div className="relative flex items-start justify-between">
          <div className="space-y-4 ">
            <div className="flex items-center gap-4">
              <div className="relative group/icon">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-[24px] blur-xl opacity-50 group-hover/icon:opacity-75 transition-all duration-500" />
                <div
                  className="relative w-20 h-20 rounded-[20px] flex items-center justify-center shadow-2xl transform group-hover/icon:scale-110 group-hover/icon:rotate-6 transition-all duration-500"
                  style={{
                    background:
                      "linear-gradient(135deg,#803791 0%,#b87bd1 100%)",
                  }}
                >
                  <BookOpen className="w-9 h-9 text-white" strokeWidth={2.5} />
                </div>
              </div>

              <div>
                <h1 className="text-5xl font-black tracking-tight mb-2 ">
                  <span className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent">
                    Course Management
                  </span>
                </h1>
                <p className="text-white/60 text-lg font-medium">
                  Create, manage, and organize your educational content
                </p>
              </div>
            </div>

            <div className="flex items-center gap-6 pl-24">
              <div className="flex items-center gap-2 text-white/70">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-sm font-semibold">Live System</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-semibold">Real-time Updates</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <button
              onClick={() => setShowAccessManager(true)}
              className="group/btn relative px-6 py-3 rounded-2xl font-bold text-white border-2 border-white/15 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:border-white/30"
            >
              <div className="absolute inset-0 bg-white/5 group-hover/btn:bg-white/10 transition-all duration-500" />
              <span className="relative flex items-center gap-2.5">
                <Users
                  className="w-5 h-5 group-hover/btn:scale-110 transition-transform duration-500"
                  strokeWidth={2.5}
                />
                Access Control
              </span>
            </button>

            <button
              onClick={() => setShowCreateParentModal(true)}
              className="group/btn relative px-6 py-3 rounded-2xl font-bold text-white overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_-10px_rgba(184,123,209,0.6)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#803791] to-[#b87bd1] transition-transform group-hover/btn:scale-110 duration-500" />
              <span className="relative flex items-center gap-2.5">
                <Plus
                  className="w-5 h-5 group-hover/btn:rotate-90 transition-transform duration-500"
                  strokeWidth={2.5}
                />
                Create Course
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Premium Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            label: "Total Courses",
            value: totalCourses,
            icon: BookOpen,
            gradient: "from-purple-500 to-pink-500",
          },
          {
            label: "Total Modules",
            value: totalModules,
            icon: Video,
            gradient: "from-blue-500 to-cyan-500",
          },
          {
            label: "Total Students",
            value: totalEnrolled,
            icon: Users,
            gradient: "from-amber-500 to-orange-500",
          },
          {
            label: "Avg Rating",
            value: avgRating,
            icon: Star,
            gradient: "from-rose-500 to-pink-500",
          },
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="group relative rounded-[24px] p-6 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl cursor-pointer overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="relative flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p className="text-5xl font-black text-white mb-1 group-hover:scale-110 transition-transform duration-300 inline-block">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`h-20 w-20 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 bg-gradient-to-br ${stat.gradient}`}
                >
                  <Icon className="h-10 w-10 text-white" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Premium Tabs */}
      <div className="flex gap-3">
        {[
          { id: "courses", label: "Courses", icon: BookOpen },
          { id: "modules", label: "Modules", icon: Video },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`group relative px-8 py-4 rounded-2xl font-bold whitespace-nowrap transition-all duration-300 flex items-center gap-3 overflow-hidden ${
                isActive
                  ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-2xl shadow-purple-500/40 scale-105"
                  : "bg-white/6 text-white/80 hover:bg-white/12 hover:text-white shadow-lg hover:shadow-xl hover:scale-105 border border-white/10"
              }`}
            >
              <div
                className={`p-2 rounded-xl ${
                  isActive ? "bg-white/20" : "bg-white/10"
                } transition-all duration-300 group-hover:scale-110 group-hover:rotate-12`}
              >
                <Icon className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <span className="relative">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div
        className="rounded-[28px] p-8 shadow-2xl backdrop-blur-xl border"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.05))",
          borderColor: "rgba(255,255,255,0.12)",
        }}
      >
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-[20px] opacity-0 group-focus-within:opacity-25 blur-lg transition-opacity duration-500" />
            <div className="relative">
              <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 group-focus-within:text-[#b87bd1] group-focus-within:scale-110 transition-all duration-500"
                strokeWidth={2.5}
              />
              <input
                type="text"
                placeholder="Search courses or modules..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-14 pr-5 py-5 bg-white/5 text-white placeholder-white/40 rounded-[20px] border-2 border-white/10 focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40 focus:border-[#b87bd1]/50 transition-all duration-500 hover:bg-white/[0.08] font-medium"
              />
            </div>
          </div>

          {activeTab === "courses" && (
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-6 py-5 bg-white/5 text-white border-2 border-white/10 rounded-[20px] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/40 focus:border-[#b87bd1]/50 transition-all duration-500 hover:bg-white/[0.08] cursor-pointer font-semibold appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.6)%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpolyline%20points%3D%226%209%2012%2015%2018%209%22%3E%3C%2Fpolyline%3E%3C%2Fsvg%3E')] bg-no-repeat bg-[center_right_1rem]"
              style={{ paddingRight: "3rem" }}
            >
              <option value="all">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          )}

          <button
            onClick={() =>
              activeTab === "courses"
                ? setShowCreateParentModal(true)
                : setShowCreateModuleModal(true)
            }
            className="px-6 py-5 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-[20px] font-bold hover:shadow-lg transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <Plus className="w-5 h-5" strokeWidth={2.5} />
            {activeTab === "courses" ? "New Course" : "New Module"}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-500/20 border-2 border-red-500/50 text-white px-6 py-4 rounded-2xl font-semibold">
          {error}
        </div>
      )}

      {/* Courses/Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          <div className="col-span-3 text-center py-12 text-white/80 font-semibold">
            Loading...
          </div>
        ) : activeTab === "courses" && filteredCourses.length > 0 ? (
          filteredCourses.map((course, index) => (
            <div
              key={course._id}
              onMouseEnter={() => setHoveredCourse(course._id)}
              onMouseLeave={() => setHoveredCourse(null)}
              className="group relative rounded-[28px] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-purple-500/30 cursor-pointer"
              style={{
                background:
                  hoveredCourse === course._id
                    ? "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.06))"
                    : "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
                border:
                  hoveredCourse === course._id
                    ? "1px solid rgba(184,123,209,0.3)"
                    : "1px solid rgba(255,255,255,0.1)",
                animationDelay: `${index * 50}ms`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-[28px] pointer-events-none z-10" />

              {/* Image */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={course.thumbnail || "/placeholder.svg"}
                  alt={course.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-30 flex gap-2">
                  <span
                    className={`px-3 py-2 rounded-xl text-xs font-black border ${getStatusColor(
                      course.status
                    )}`}
                  >
                    {course.status}
                  </span>
                  {course.type && (
                    <span className="px-3 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white border border-white/20">
                      Bundle
                    </span>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6 space-y-4 z-20">
                <div>
                  <h3 className="text-white font-black text-xl leading-tight group-hover:text-purple-200 transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-white/70 text-sm mt-1 font-semibold">
                    {course.category || "Uncategorized"}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-sm flex-wrap">
                  <span className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 text-white/80 font-semibold">
                    <BookOpen
                      className="w-4 h-4 text-purple-400"
                      strokeWidth={2.5}
                    />
                    {course.modules?.length || 0} modules
                  </span>
                  <span className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 text-white/80 font-semibold">
                    <IndianRupee
                      className="w-4 h-4 text-purple-400"
                      strokeWidth={2.5}
                    />
                    ₹{course.pricing?.bundlePrice ?? 0}
                  </span>
                  {course.level && (
                    <span
                      className={`px-3 py-2 rounded-xl text-xs font-bold border ${getLevelColor(
                        course.level
                      )}`}
                    >
                      {course.level}
                    </span>
                  )}
                </div>

                {course.enrolledCount > 0 && (
                  <div className="text-sm text-white/70 font-semibold flex items-center gap-2">
                    <Users
                      className="w-4 h-4 text-purple-400"
                      strokeWidth={2.5}
                    />
                    {course.enrolledCount} students
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleViewDetails(course)}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:opacity-95 text-white rounded-2xl font-black transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" strokeWidth={2.5} />
                    Manage
                  </button>
                  <button
                    onClick={() => handleAddModuleFor(course)}
                    className="px-4 py-3 bg-white/8 hover:bg-white/15 text-white rounded-2xl transition-all duration-300 hover:scale-105"
                  >
                    <Plus className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    className="px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-2xl transition-all duration-300 hover:scale-105"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : activeTab === "modules" && filteredModules.length > 0 ? (
          filteredModules.map((module, index) => (
            <div
              key={module._id}
              onMouseEnter={() => setHoveredCourse(module._id)}
              onMouseLeave={() => setHoveredCourse(null)}
              className="group relative rounded-[28px] overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-purple-500/30 cursor-pointer"
              style={{
                background:
                  hoveredCourse === module._id
                    ? "linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.06))"
                    : "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))",
                border:
                  hoveredCourse === module._id
                    ? "1px solid rgba(184,123,209,0.3)"
                    : "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500" />

              {/* Image */}
              <div className="relative overflow-hidden h-56">
                <img
                  src={module.thumbnail || "/placeholder.svg"}
                  alt={module.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Status Badge */}
                <div className="absolute top-4 right-4 z-30 flex gap-2">
                  <span
                    className={`px-3 py-2 rounded-xl text-xs font-black border ${getStatusColor(
                      module.status
                    )}`}
                  >
                    {module.status}
                  </span>
                  <span className="px-3 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-purple-500 to-pink-500 text-white border border-white/20">
                    Module
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="relative p-6 space-y-4 z-20">
                <div>
                  <h3 className="text-white font-black text-xl leading-tight group-hover:text-purple-200 transition-colors line-clamp-2">
                    {module.title}
                  </h3>
                  <p className="text-white/70 text-sm mt-1 font-semibold">
                    {module.category || "Uncategorized"}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-sm flex-wrap">
                  <span className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 text-white/80 font-semibold">
                    <Video
                      className="w-4 h-4 text-purple-400"
                      strokeWidth={2.5}
                    />
                    {module.lessons?.length || 0} lessons
                  </span>
                  <span className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-xl border border-white/10 text-white/80 font-semibold">
                    <IndianRupee
                      className="w-4 h-4 text-purple-400"
                      strokeWidth={2.5}
                    />
                    ₹{module.pricing?.individualPrice ?? 0}
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => handleViewDetails(module)}
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] hover:opacity-95 text-white rounded-2xl font-black transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Edit2 className="w-4 h-4" strokeWidth={2.5} />
                    Manage
                  </button>
                  <button
                    onClick={() => handleDelete(module._id)}
                    className="px-4 py-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-2xl transition-all duration-300 hover:scale-105"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={2.5} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center py-20">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-3xl blur-2xl opacity-30 animate-pulse" />
              <div
                className="relative w-32 h-32 rounded-3xl flex items-center justify-center shadow-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.12), rgba(255,255,255,0.06))",
                  border: "2px solid rgba(255,255,255,0.2)",
                }}
              >
                {activeTab === "courses" ? (
                  <BookOpen
                    className="w-16 h-16 text-white/40"
                    strokeWidth={2}
                  />
                ) : (
                  <Video className="w-16 h-16 text-white/40" strokeWidth={2} />
                )}
              </div>
            </div>

            <h3 className="text-3xl font-black text-white mb-3">
              No {activeTab === "courses" ? "courses" : "modules"} found
            </h3>
            <p className="text-white/60 text-lg font-medium mb-8 max-w-md mx-auto">
              {searchQuery
                ? "Try adjusting your search criteria"
                : `Create your first ${
                    activeTab === "courses" ? "course" : "module"
                  } to get started`}
            </p>

            <button
              onClick={() => {
                if (searchQuery) {
                  setSearchQuery("");
                } else {
                  activeTab === "courses"
                    ? setShowCreateParentModal(true)
                    : setShowCreateModuleModal(true);
                }
              }}
              className="group relative px-10 py-5 rounded-2xl font-black text-white overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_60px_-10px_rgba(184,123,209,0.6)]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#803791] to-[#b87bd1] transition-transform group-hover:scale-110 duration-500" />
              <span className="relative flex items-center gap-3">
                {searchQuery ? (
                  <>
                    <Search
                      className="w-5 h-5 group-hover:scale-110 transition-transform duration-500"
                      strokeWidth={2.5}
                    />
                    Clear Search
                  </>
                ) : (
                  <>
                    <Plus
                      className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500"
                      strokeWidth={2.5}
                    />
                    Create {activeTab === "courses" ? "Course" : "Module"}
                  </>
                )}
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.05);
          }
        }

        @keyframes pulse-slower {
          0%,
          100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.08);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          33% {
            transform: translate(40px, -40px) rotate(8deg);
          }
          66% {
            transform: translate(-30px, 30px) rotate(-8deg);
          }
        }

        @keyframes gradient-shift {
          0%,
          100% {
            transform: translateX(0) translateY(0);
          }
          50% {
            transform: translateX(100px) translateY(50px);
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes orbit-1 {
          0% {
            transform: rotate(0deg) translateX(40px) rotate(0deg);
          }
          100% {
            transform: rotate(360deg) translateX(40px) rotate(-360deg);
          }
        }

        @keyframes orbit-2 {
          0% {
            transform: rotate(120deg) translateX(40px) rotate(-120deg);
          }
          100% {
            transform: rotate(480deg) translateX(40px) rotate(-480deg);
          }
        }

        .animate-pulse-slow {
          animation: pulse-slow 5s ease-in-out infinite;
        }

        .animate-pulse-slower {
          animation: pulse-slower 6s ease-in-out infinite;
        }

        .animate-float {
          animation: float 10s ease-in-out infinite;
        }

        .animate-gradient-shift {
          animation: gradient-shift 8s ease-in-out infinite;
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }

        .animate-orbit-1 {
          animation: orbit-1 4s linear infinite;
        }

        .animate-orbit-2 {
          animation: orbit-2 6s linear infinite;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

      {/* Modals */}
      {showCreateParentModal && (
        <CreateParentCourseModal
          onClose={() => setShowCreateParentModal(false)}
          onSuccess={loadCourses}
        />
      )}
      {showCreateModuleModal && (
        <CreateModuleModal
          onClose={() => setShowCreateModuleModal(false)}
          onSuccess={loadCourses}
          parentCourses={parentCourses}
          defaultParentId={defaultParentId}
        />
      )}
      {showDetailView && selectedCourse && (
        <CourseDetailView
          course={selectedCourse}
          onClose={() => setShowDetailView(false)}
          onSuccess={loadCourses}
        />
      )}
      {showAccessManager && (
        <CourseAccessManager onClose={() => setShowAccessManager(false)} />
      )}
    </div>
  );
}
