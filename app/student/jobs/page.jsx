"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Search,
  MapPin,
  Briefcase,
  DollarSign,
  Clock,
  Bookmark,
  ExternalLink,
  Filter,
  X,
  Loader2,
  Building2,
  ChevronRight,
  TrendingUp,
  Users,
  Star,
  Award,
  Zap,
} from "lucide-react";
import {
  fetchJobs,
  toggleSaveJob,
  saveJob,
  unsaveJob,
  setSearchQuery,
  setSelectedType,
  setWorkModeFilter,
  selectFilteredJobs,
  selectJobStats,
  selectJobsLoading,
  selectJobsError,
  selectFilters,
  selectSavedJobs,
  clearError,
} from "@/src/store/slices/studentSlice/jobsSlice";
import { useRouter } from "next/navigation";
import { customToast } from "@/components/ui/toast";
import ApplyNowModal from "@/components/ui/ApplyNowModal";
import JobDetailsModal from "@/components/ui/JobDetailsModal";
import { createPortal } from "react-dom";

export default function JobListingsPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const jobs = useSelector(selectFilteredJobs);
  const loading = useSelector(selectJobsLoading);
  const error = useSelector(selectJobsError);
  const filters = useSelector(selectFilters);
  const savedJobs = useSelector(selectSavedJobs);
  const stats = useSelector(selectJobStats);

  const [showFilters, setShowFilters] = useState(false);
  const [workModeFilters, setWorkModeFilters] = useState({
    "On-site": false,
    Remote: false,
    Hybrid: false,
  });
  const [hoveredJob, setHoveredJob] = useState(null);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Search suggestions state
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const searchWrapperRef = useRef(null);
  const [suggestionPos, setSuggestionPos] = useState({ left: 0, top: 0, width: 0 });

  // Modal states
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  // Fetch jobs on component mount
  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  // Handle search with debounce
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const apiFilters = {};

      if (filters.searchQuery) {
        apiFilters.search = filters.searchQuery;
      }

      if (filters.selectedType !== "all") {
        apiFilters.jobType = filters.selectedType;
      }

      if (filters.workMode.length > 0) {
        apiFilters.workMode = filters.workMode.join(",");
      }

      dispatch(fetchJobs(apiFilters));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [filters.searchQuery, filters.selectedType, filters.workMode, dispatch]);

  // Handle errors
  useEffect(() => {
    if (error) {
      customToast.error("Error", error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Keep pagination in bounds when list size changes
  const totalPages = Math.max(1, Math.ceil(jobs.length / pageSize));
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(1);
  }, [jobs.length, totalPages, currentPage]);

  const paginatedJobs = jobs.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const goToPage = (p) => setCurrentPage(p);
  const prevPage = () => setCurrentPage((p) => Math.max(1, p - 1));
  const nextPage = () => setCurrentPage((p) => Math.min(totalPages, p + 1));

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filters.searchQuery, filters.selectedType, filters.workMode]);

  // Keep portal dropdown positioned under the input
  useEffect(() => {
    const updatePos = () => {
      if (!searchWrapperRef.current) return;
      const rect = searchWrapperRef.current.getBoundingClientRect();
      setSuggestionPos({ left: rect.left, top: rect.bottom + 8, width: rect.width });
    };
    updatePos();
    if (showSuggestions) {
      window.addEventListener("scroll", updatePos, true);
      window.addEventListener("resize", updatePos);
    }
    return () => {
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
    };
  }, [showSuggestions]);

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
    
    // Generate suggestions
    if (query.trim().length > 0) {
      const allJobs = jobs.length > 0 ? jobs : [];
      const uniqueSuggestions = new Set();
      
      allJobs.forEach(job => {
        // Add job titles
        if (job.title?.toLowerCase().includes(query.toLowerCase())) {
          uniqueSuggestions.add(JSON.stringify({ type: 'title', value: job.title, icon: 'briefcase' }));
        }
        
        // Add company names
        const companyName = job?.employerId?.employerProfile?.company?.name || job?.employerId?.company?.name || job?.company?.name || job?.company || "";
        if (companyName?.toLowerCase().includes(query.toLowerCase())) {
          uniqueSuggestions.add(JSON.stringify({ type: 'company', value: companyName, icon: 'building' }));
        }
        
        // Add skills
        job.skills?.forEach(skill => {
          if (skill.toLowerCase().includes(query.toLowerCase())) {
            uniqueSuggestions.add(JSON.stringify({ type: 'skill', value: skill, icon: 'code' }));
          }
        });
      });
      
      const suggestionArray = Array.from(uniqueSuggestions)
        .map(s => JSON.parse(s))
        .slice(0, 8); // Limit to 8 suggestions
      
      setSuggestions(suggestionArray);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };
  
  const handleSuggestionClick = (value) => {
    dispatch(setSearchQuery(value));
    setShowSuggestions(false);
  };

  const handleTypeChange = (type) => {
    dispatch(setSelectedType(type));
  };

  const handleWorkModeChange = (mode) => {
    const updatedFilters = {
      ...workModeFilters,
      [mode]: !workModeFilters[mode],
    };
    setWorkModeFilters(updatedFilters);

    const selectedModes = Object.keys(updatedFilters).filter(
      (mode) => updatedFilters[mode]
    );
    dispatch(setWorkModeFilter(selectedModes));
  };

  const handleSaveJob = async (jobId) => {
    try {
      dispatch(toggleSaveJob(jobId));
      const isCurrentlySaved = savedJobs.includes(jobId);

      if (isCurrentlySaved) {
        await dispatch(unsaveJob(jobId)).unwrap();
      } else {
        await dispatch(saveJob(jobId)).unwrap();
      }
    } catch (error) {
      dispatch(toggleSaveJob(jobId));
      customToast.error("Error", "Failed to update saved jobs");
    }
  };

  const handleApply = (jobId) => {
    router.push(`/student/jobs/apply/${jobId}`);
  };

  const handleViewDetails = (jobId) => {
    const job = jobs.find((j) => j._id === jobId);
    setSelectedJob(job);
    setShowDetailsModal(true);
  };

  const handleApplicationSubmit = (formData) => {
    console.log("Application submitted:", formData);
    customToast.success("Success", "Application submitted successfully!");
  };

  const getJobTypeColor = (jobType) => {
    const colors = {
      "Full-time": "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
      "Part-time": "bg-sky-500/15 text-sky-400 border-sky-500/30",
      Contract: "bg-amber-500/15 text-amber-400 border-amber-500/30",
      Internship: "bg-violet-500/15 text-violet-400 border-violet-500/30",
      Freelance: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    };
    return colors[jobType] || "bg-gray-500/15 text-gray-400 border-gray-500/30";
  };

  const getInitials = (name) => {
    return name
      ? name
          .split(" ")
          .map((word) => word[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : "CO";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Recently";

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "1 day ago";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
    return `${Math.ceil(diffDays / 30)} months ago`;
  };

  const statIcons = [TrendingUp, Users, Award];

  return (
    <div className="relative min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden overflow-y-auto">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <div
          className="absolute -top-12 -left-12 md:-top-24 md:-left-24 w-48 h-48 md:w-96 md:h-96 rounded-full blur-2xl md:blur-3xl animate-pulse"
          style={{
            background: "rgba(128,55,145,0.12)",
            animation: "pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        />
        <div
          className="absolute -bottom-16 -right-16 md:-bottom-32 md:-right-32 w-64 h-64 md:w-[500px] md:h-[500px] rounded-full blur-2xl md:blur-3xl animate-pulse"
          style={{
            background: "rgba(184,123,209,0.08)",
            animation: "pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite",
          }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-80 h-80 rounded-full blur-2xl"
          style={{ background: "rgba(240,194,238,0.04)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.04),_transparent_40%)]" />

        {/* Animated gradient mesh */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/15 to-transparent animate-pulse" />
          <div
            className="absolute top-0 left-2/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/15 to-transparent animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-0 left-3/4 w-px h-full bg-gradient-to-b from-transparent via-purple-500/15 to-transparent animate-pulse"
            style={{ animationDelay: "2s" }}
          />

          {/* Floating particles */}
          <div
            className="absolute top-32 left-16 w-1 h-1 bg-purple-400/40 rounded-full animate-bounce"
            style={{ animationDelay: "0s" }}
          />
          <div
            className="absolute top-64 right-24 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-bounce"
            style={{ animationDelay: "1.5s" }}
          />
          <div
            className="absolute bottom-40 left-1/3 w-1 h-1 bg-purple-300/35 rounded-full animate-bounce"
            style={{ animationDelay: "3s" }}
          />
        </div>
      </div>

      {/* Premium Header Section */}
      <div
        className="relative overflow-visible rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 lg:p-12 text-white shadow-xl sm:shadow-2xl backdrop-blur-xl border border-white/15 mb-6 sm:mb-8 md:mb-10 group transition-all duration-500 hover:shadow-purple-500/30"
        style={{
          background:
            "linear-gradient(135deg, rgba(128,55,145,0.18) 0%, rgba(184,123,209,0.12) 50%, rgba(240,194,238,0.08) 100%)",
          boxShadow:
            "0 20px 60px rgba(128,55,145,0.15), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Animated accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Floating orbs */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute -bottom-10 -left-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 sm:mb-8 md:mb-10 gap-4 sm:gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 sm:gap-4 md:gap-5 mb-3 sm:mb-4">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur-lg opacity-30 animate-pulse" />
                <div className="relative w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-purple-500 via-purple-600 to-pink-500 flex items-center justify-center shadow-2xl shadow-purple-500/50 group-hover:scale-110 transition-all duration-500">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-3xl" />
                  <Zap className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white animate-pulse" strokeWidth={3} />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black mb-2 sm:mb-3 bg-gradient-to-r from-white via-purple-100 to-pink-100 bg-clip-text text-transparent drop-shadow-2xl">
                  Discover Your Future
                </h1>
                <p className="text-purple-100 text-sm sm:text-base md:text-lg lg:text-xl font-bold">
                  Find opportunities that match your ambitions
                </p>
              </div>
            </div>
          </div>
          <button
            className="md:hidden px-6 py-3 sm:px-8 sm:py-4 bg-white/15 hover:bg-white/25 backdrop-blur-xl text-white rounded-xl sm:rounded-2xl transition-all duration-300 font-black text-sm sm:text-base border-2 border-white/30 flex items-center gap-2 sm:gap-3 shadow-xl hover:shadow-2xl hover:scale-110 active:scale-95"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
            Filters
          </button>
        </div>

        {/* Premium Search Bar with Suggestions */}
        <div className="relative group/search">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-3xl blur-2xl opacity-0 group-hover/search:opacity-100 transition-opacity duration-500 pointer-events-none" />
          <div className="relative" ref={searchWrapperRef}>
            <Search className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-purple-300 group-hover/search:text-purple-100 transition-colors" strokeWidth={2.5} />
            <input
              type="text"
              placeholder="Search jobs..."
              value={filters.searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={() => { if (filters.searchQuery && suggestions.length > 0) setShowSuggestions(true); }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full pl-12 sm:pl-16 md:pl-20 pr-4 sm:pr-6 md:pr-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg border-2 border-white/20 bg-white/10 backdrop-blur-xl text-white placeholder:text-white/60 focus:border-purple-400 focus:outline-none focus:ring-4 focus:ring-purple-400/30 rounded-2xl sm:rounded-3xl transition-all duration-300 font-semibold shadow-2xl hover:shadow-purple-500/20 hover:bg-white/15"
            />

            {/* Suggestions Dropdown via portal */}
            {showSuggestions && suggestions.length > 0 &&
              createPortal(
                <div
                  className="rounded-3xl shadow-2xl overflow-visible animate-slideDown max-h-96 overflow-y-auto"
                  style={{
                    position: "fixed",
                    left: suggestionPos.left,
                    top: suggestionPos.top,
                    width: suggestionPos.width,
                    zIndex: 9999,
                    background: "linear-gradient(135deg, rgba(25,15,35,0.98), rgba(45,25,55,0.98))",
                    backdropFilter: "blur(24px)",
                    border: "3px solid rgba(184,123,209,0.5)",
                    boxShadow: "0 25px 50px rgba(128,55,145,0.6), 0 0 0 1px rgba(255,255,255,0.1)"
                  }}
                >
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion.value)}
                      className="w-full px-8 py-5 text-left transition-all duration-200 flex items-center gap-4 text-white group/suggestion border-b last:border-b-0"
                      style={{
                        borderBottom: index !== suggestions.length - 1 ? "1px solid rgba(255,255,255,0.2)" : "none"
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = "linear-gradient(135deg, rgba(128,55,145,0.4), rgba(184,123,209,0.3))"}
                      onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                    >
                      {suggestion.type === 'title' && <Briefcase className="w-7 h-7 text-purple-300 shrink-0" strokeWidth={2.5} />}
                      {suggestion.type === 'company' && <Building2 className="w-7 h-7 text-pink-300 shrink-0" strokeWidth={2.5} />}
                      {suggestion.type === 'skill' && <Zap className="w-7 h-7 text-emerald-300 shrink-0" strokeWidth={2.5} />}
                      <div className="flex-1 min-w-0">
                        <div className="font-black text-xl text-white mb-1">{suggestion.value}</div>
                        <div className="text-sm text-purple-200 font-bold uppercase tracking-wider">{suggestion.type}</div>
                      </div>
                      <ChevronRight className="w-6 h-6 text-white/60 group-hover/suggestion:text-white group-hover/suggestion:translate-x-1 transition-all shrink-0" strokeWidth={2.5} />
                    </button>
                  ))}
                </div>,
                document.body
              )}
          </div>
        </div>
      </div>

      {/* Premium Stats Cards - Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10">
        {stats.map((stat, index) => {
          const Icon = statIcons[index % statIcons.length];
          return (
            <div
              key={index}
              className="group relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl sm:shadow-2xl transition-all duration-500 hover:-translate-y-2 sm:hover:-translate-y-3 hover:shadow-purple-500/30 cursor-pointer overflow-hidden"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
                border: "1.5px solid rgba(255,255,255,0.12)",
              }}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500 rounded-2xl" />

              {/* Animated border on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(184,123,209,0.3), rgba(128,55,145,0.3))",
                  padding: "2px",
                  WebkitMask:
                    "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  maskComposite: "exclude",
                }}
              />

              <div className="relative flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs sm:text-sm md:text-base font-black text-white/80 mb-2 sm:mb-3 uppercase tracking-wider">
                    {stat.label}
                  </p>
                  <p suppressHydrationWarning className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white mb-2 group-hover:scale-110 transition-transform duration-300 inline-block drop-shadow-2xl">
                    {stat.value}
                  </p>
                  <div className="flex items-center gap-1.5 sm:gap-2 text-emerald-300 text-xs sm:text-sm md:text-base font-black animate-pulse">
                    <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={2.5} />
                    <span>+12% this week</span>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute -inset-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
                  <div
                    className="relative h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-2xl sm:rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 overflow-hidden"
                    style={{
                      background:
                        "linear-gradient(135deg,#803791,#b87bd1,#f0c2ee)",
                      boxShadow: "0 10px 30px rgba(128,55,145,0.4)",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent" />
                    <Icon className="relative h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 text-white drop-shadow-2xl" strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-start">
        {/* Premium Filters Sidebar */}
        <aside
          className={`w-full lg:w-80 flex-shrink-0 transition-all duration-300 ${
            showFilters ? "block" : "hidden lg:block"
          }`}
        >
          <div
            className="p-5 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl backdrop-blur-xl border border-white/15 transition-all duration-300 hover:shadow-purple-500/30"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
            }}
          >
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h3 className="font-black text-white text-lg sm:text-xl md:text-2xl flex items-center gap-2 sm:gap-3">
                <Filter className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" strokeWidth={2.5} />
                Filters
              </h3>
              {showFilters && (
                <button
                  className="lg:hidden text-white/80 hover:text-white hover:bg-white/15 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all hover:scale-110"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
                </button>
              )}
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div>
                <label className="text-sm sm:text-base font-black text-white mb-4 sm:mb-5 block uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" strokeWidth={2.5} />
                  Job Type
                </label>
                <div className="space-y-3">
                  {[
                    "all",
                    "Full-time",
                    "Part-time",
                    "Contract",
                    "Internship",
                    "Freelance",
                  ].map((type) => (
                    <button
                      key={type}
                      onClick={() => handleTypeChange(type)}
                      className={`relative w-full text-left px-4 py-3 sm:px-6 sm:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base font-bold transition-all duration-300 group overflow-hidden ${
                        filters.selectedType === type
                          ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-2xl shadow-purple-500/40 scale-105"
                          : "bg-white/8 text-white/80 hover:bg-white/15 hover:scale-105 hover:text-white border border-white/10"
                      }`}
                    >
                      {filters.selectedType === type && (
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 animate-shimmer" />
                      )}
                      <span className="relative flex items-center justify-between">
                        {type.charAt(0).toUpperCase() +
                          type.slice(1).replace("-", " ")}
                        {filters.selectedType === type && (
                          <ChevronRight className="w-5 h-5" strokeWidth={2.5} />
                        )}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-white/15">
                <label className="text-base font-black text-white mb-5 block uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-400" strokeWidth={2.5} />
                  Work Mode
                </label>
                <div className="space-y-4">
                  {["On-site", "Remote", "Hybrid"].map((mode) => (
                    <label
                      key={mode}
                      className="flex items-center gap-4 cursor-pointer group p-4 rounded-2xl hover:bg-white/8 transition-all duration-300 hover:scale-105"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={workModeFilters[mode]}
                          onChange={() => handleWorkModeChange(mode)}
                          className="w-6 h-6 rounded-lg border-2 border-white/30 text-purple-600 focus:ring-2 focus:ring-purple-500/50 bg-white/10 cursor-pointer transition-all shadow-lg"
                        />
                      </div>
                      <span className="text-base font-bold text-white/80 group-hover:text-white transition-colors">
                        {mode}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Job Listings */}
        <div className="flex-1 min-w-0">
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex items-center gap-4">
              <p className="text-lg text-white/80 font-bold">
                Showing{" "}
                <span suppressHydrationWarning className="font-black text-white text-2xl">
                  {jobs.length}
                </span>{" "}
                <span className="text-purple-300 font-black">opportunities</span>
              </p>
            </div>
            <button
              onClick={() => dispatch(fetchJobs())}
              disabled={loading}
              className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-2xl transition-all duration-300 font-black text-base border-2 border-white/20 disabled:opacity-50 hover:scale-110 active:scale-95 shadow-2xl hover:shadow-purple-500/30"
            >
              {loading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin" strokeWidth={2.5} />
                  <span>Refreshing...</span>
                </>
              ) : (
                <>
                  <Clock className="h-6 w-6" strokeWidth={2.5} />
                  <span>Refresh</span>
                </>
              )}
            </button>
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center py-24">
              <div className="relative">
                <Loader2 className="h-20 w-20 text-purple-400 animate-spin" strokeWidth={2.5} />
                <div className="absolute inset-0 h-20 w-20 border-4 border-purple-500/30 rounded-full animate-ping" />
              </div>
              <p className="mt-8 text-white/80 font-black text-xl">
                Loading opportunities...
              </p>
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              {paginatedJobs.map((job, index) => (
                <div
                  key={job._id}
                  onMouseEnter={() => setHoveredJob(job._id)}
                  onMouseLeave={() => setHoveredJob(null)}
                  className="group relative rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-xl sm:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:shadow-purple-500/30 cursor-pointer overflow-hidden"
                  style={{
                    background:
                      hoveredJob === job._id
                        ? "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))"
                        : "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))",
                    border:
                      hoveredJob === job._id
                        ? "2px solid rgba(184,123,209,0.4)"
                        : "1.5px solid rgba(255,255,255,0.12)",
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500 rounded-3xl pointer-events-none" />

                  {/* Shimmer effect on hover */}
                  {hoveredJob === job._id && (
                    <div className="absolute inset-0 overflow-hidden rounded-3xl">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 animate-shimmer" />
                    </div>
                  )}

                  <div className="relative flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6">
                    {/* Company Logo */}
                    <div className="flex-shrink-0">
                      <div className="relative">
                        <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div
                          className="relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl flex items-center justify-center overflow-hidden shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500"
                          style={{
                            background:
                              "linear-gradient(135deg,#803791,#b87bd1,#f0c2ee)",
                            boxShadow: "0 10px 30px rgba(128,55,145,0.4)",
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-white/25 to-transparent" />
                          <div className="absolute inset-0 bg-gradient-to-tl from-purple-400/20 to-transparent" />
                          {job?.employerId?.employerProfile?.company?.logo?.url ? (
                            <img
                              src={job.employerId.employerProfile.company.logo.url}
                              alt={(job?.employerId?.employerProfile?.company?.name || job?.employerId?.company?.name || job?.company?.name || "Company") + " logo"}
                              className="relative w-full h-full object-cover"
                            />
                          ) : (
                            <span className="relative text-white font-black text-xl drop-shadow-2xl">
                              {getInitials(job?.employerId?.employerProfile?.company?.name || job?.employerId?.company?.name || job?.company?.name || job?.company || "")}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Job Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-3 mb-3">
                            <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white group-hover:text-purple-200 transition-colors leading-tight drop-shadow-lg">
                              {job.title}
                            </h3>
                            {index < 3 && (
                              <span className="flex-shrink-0 px-4 py-2 bg-gradient-to-r from-amber-500/40 to-orange-500/40 text-amber-100 text-sm font-black rounded-full border-2 border-amber-400/50 flex items-center gap-2 animate-pulse shadow-2xl shadow-amber-500/30">
                                <Star
                                  className="w-4 h-4 fill-current animate-spin"
                                  style={{ animationDuration: "3s" }}
                                  strokeWidth={2.5}
                                />
                                HOT
                              </span>
                            )}
                          </div>
                          <p className="text-sm sm:text-base md:text-lg font-black text-white/90 flex items-center gap-2">
                            <Building2 className="w-5 h-5 text-purple-400" strokeWidth={2.5} />
                            {job?.employerId?.employerProfile?.company?.name || job?.employerId?.company?.name || job?.company?.name || job?.company || "Company Not Specified"}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSaveJob(job._id);
                          }}
                          className={`flex-shrink-0 p-4 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
                            savedJobs.includes(job._id)
                              ? "text-purple-300 bg-purple-500/30 shadow-2xl shadow-purple-500/40"
                              : "text-white/60 hover:text-purple-400 hover:bg-white/15"
                          }`}
                        >
                          <Bookmark
                            className={`h-7 w-7 ${
                              savedJobs.includes(job._id) ? "fill-current" : ""
                            }`}
                            strokeWidth={2.5}
                          />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 mb-6 text-base">
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-white/8 rounded-2xl border border-white/15 text-white/90 font-bold backdrop-blur-sm shadow-lg">
                          <MapPin className="h-5 w-5 text-purple-400" strokeWidth={2.5} />
                          <span>{job.location}</span>
                        </div>
                        <span
                          className={`px-5 py-2.5 rounded-2xl text-sm font-black border-2 backdrop-blur-sm shadow-lg ${getJobTypeColor(
                            job.jobType
                          )}`}
                        >
                          {job.jobType}
                        </span>
                        <div className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500/15 text-emerald-300 rounded-2xl border-2 border-emerald-500/30 font-black shadow-lg">
                          <DollarSign className="h-5 h-5" strokeWidth={2.5} />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2 text-white/60">
                          <Clock className="h-4 w-4" />
                          <span suppressHydrationWarning className="font-medium">
                            {formatDate(job.createdAt)}
                          </span>
                        </div>
                      </div>

                      <p className="text-white/80 mb-6 line-clamp-2 leading-relaxed font-semibold text-lg">
                        {job.description}
                      </p>

                      {job.skills && job.skills.length > 0 && (
                        <div className="flex flex-wrap items-center gap-3 mb-8">
                          {job.skills.slice(0, 5).map((skill, skillIndex) => (
                            <span
                              key={skillIndex}
                              className="px-5 py-2.5 rounded-2xl text-sm font-black backdrop-blur-sm transition-all duration-300 hover:scale-105 shadow-lg"
                              style={{
                                background: "rgba(184,123,209,0.12)",
                                color: "#d8b4e6",
                                border: "1px solid rgba(184,123,209,0.25)",
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 5 && (
                            <span
                              className="px-5 py-2.5 rounded-2xl text-sm font-black backdrop-blur-sm shadow-lg"
                              style={{
                                background: "rgba(255,255,255,0.08)",
                                color: "rgba(255,255,255,0.7)",
                                border: "1px solid rgba(255,255,255,0.12)",
                              }}
                            >
                              +{job.skills.length - 5} more
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex flex-wrap gap-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleApply(job._id);
                          }}
                          className="group/btn relative px-10 py-4 bg-gradient-to-r from-[#803791] via-[#9d4baa] to-[#b87bd1] text-white rounded-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 font-black text-base shadow-2xl shadow-purple-500/50 hover:shadow-purple-400/70 flex items-center gap-3 overflow-hidden"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700" />
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-300/20 to-purple-400/0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                          <span className="relative font-black text-base">Apply Now</span>
                          <ExternalLink className="relative h-6 w-6 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300 drop-shadow-lg" strokeWidth={2.5} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(job._id);
                          }}
                          className="relative px-10 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white rounded-2xl transition-all duration-300 font-black text-base border-2 border-white/20 hover:border-purple-400/50 hover:scale-110 active:scale-95 shadow-2xl hover:shadow-purple-500/30 overflow-hidden group/details"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-400/10 to-purple-500/0 translate-x-[-100%] group-hover/details:translate-x-[100%] transition-transform duration-500" />
                          <span className="relative">View Details</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && jobs.length === 0 && (
            <div
              className="rounded-3xl p-20 text-center shadow-2xl backdrop-blur-xl border-2 border-white/15 transition-all duration-500 hover:shadow-purple-500/30"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))",
              }}
            >
              <div
                className="w-28 h-28 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1,#f0c2ee)",
                  boxShadow: "0 20px 40px rgba(128,55,145,0.4)",
                }}
              >
                <Search className="h-14 w-14 text-white" strokeWidth={2.5} />
              </div>
              <h3 className="text-4xl font-black text-white mb-5 drop-shadow-lg">
                No opportunities found
              </h3>
              <p className="text-white/80 text-xl font-bold max-w-md mx-auto">
                {filters.searchQuery ||
                filters.selectedType !== "all" ||
                filters.workMode.length > 0
                  ? "Try adjusting your search or filters to discover more amazing opportunities."
                  : "No jobs are currently available. Check back later for new opportunities."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Apply Now Modal */}
      <ApplyNowModal
        job={selectedJob}
        isOpen={showApplyModal}
        onClose={() => {
          setShowApplyModal(false);
          setSelectedJob(null);
        }}
        onSubmit={handleApplicationSubmit}
      />

      {/* Job Details Modal */}
      <JobDetailsModal
        job={selectedJob}
        isOpen={showDetailsModal}
        onClose={() => {
          setShowDetailsModal(false);
          setSelectedJob(null);
        }}
        onApply={() => {
          setShowDetailsModal(false);
          setShowApplyModal(true);
        }}
        isSaved={selectedJob ? savedJobs.includes(selectedJob._id) : false}
        onToggleSave={() => {
          if (selectedJob) {
            handleSaveJob(selectedJob._id);
          }
        }}
      />

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
          }
          100% {
            transform: translateX(200%) skewX(-12deg);
          }
        }

        .animate-shimmer {
          animation: shimmer 3s infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        @keyframes slideDown {
          0% {
            opacity: 0;
            transform: translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
}
