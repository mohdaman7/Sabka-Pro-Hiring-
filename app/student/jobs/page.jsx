"use client";

import { useState, useEffect } from "react";
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

export default function JobListingsPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  ApplyNowModal;
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

  const handleSearch = (query) => {
    dispatch(setSearchQuery(query));
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
      // Optimistic update
      dispatch(toggleSaveJob(jobId));

      const isCurrentlySaved = savedJobs.includes(jobId);

      if (isCurrentlySaved) {
        await dispatch(unsaveJob(jobId)).unwrap();
      } else {
        await dispatch(saveJob(jobId)).unwrap();
      }
    } catch (error) {
      // Revert optimistic update on error
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
    // TODO: Make API call to submit application
    // dispatch(submitApplication({ jobId: selectedJob._id, ...formData }));
    customToast.success("Success", "Application submitted successfully!");
  };

  const getJobTypeColor = (jobType) => {
    const colors = {
      "Full-time": "bg-green-500/20 text-green-300",
      "Part-time": "bg-blue-500/20 text-blue-300",
      Contract: "bg-orange-500/20 text-orange-300",
      Internship: "bg-purple-500/20 text-purple-300",
      Freelance: "bg-pink-500/20 text-pink-300",
    };
    return colors[jobType] || "bg-gray-500/20 text-gray-300";
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

  return (
    <div className="relative min-h-screen p-6 overflow-hidden">
      {/* Decorative background orbs matching dashboard theme */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(128,55,145,0.08)" }}
        />
        <div
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full blur-3xl"
          style={{ background: "rgba(184,123,209,0.06)" }}
        />
        <div
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full blur-2xl"
          style={{ background: "rgba(240,194,238,0.03)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(128,55,145,0.03),_transparent_30%)]" />
      </div>

      {/* Header Section */}
      <div
        className="relative overflow-hidden rounded-2xl p-8 text-white shadow-2xl backdrop-blur-md border border-white/6 mb-6"
        style={{
          background:
            "linear-gradient(90deg, rgba(128,55,145,0.14), rgba(184,123,209,0.08))",
          boxShadow: "0 12px 40px rgba(128,55,145,0.12)",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
              Find Your Dream Job
            </h1>
            <p className="text-white/85">
              Discover opportunities that match your skills and aspirations
            </p>
          </div>
          <button
            className="md:hidden px-4 py-2 bg-white/6 hover:bg-white/10 text-white rounded-lg transition-colors font-medium border border-white/12 flex items-center gap-2"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/70" />
          <input
            type="text"
            placeholder="Search by job title, company, or skills..."
            value={filters.searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-4 text-base border border-white/12 bg-white/6 text-white placeholder:text-white/60 focus:border-[#b87bd1] focus:outline-none focus:ring-2 focus:ring-[#b87bd1]/20 rounded-xl"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="rounded-xl p-6 shadow-lg transition-all hover:-translate-y-1"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-white/80 mb-1">
                  {stat.label}
                </p>
                <p className="text-4xl font-bold text-white">{stat.value}</p>
              </div>
              <div
                className="h-16 w-16 rounded-2xl flex items-center justify-center shadow-lg"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <Briefcase className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <aside
          className={`w-64 flex-shrink-0 space-y-6 ${
            showFilters ? "block" : "hidden md:block"
          }`}
        >
          <div
            className="p-6 rounded-2xl shadow-xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-white text-lg">Filters</h3>
              {showFilters && (
                <button
                  className="md:hidden text-white/80 hover:text-white"
                  onClick={() => setShowFilters(false)}
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-white/80 mb-3 block">
                  Job Type
                </label>
                <div className="space-y-2">
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
                      className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        filters.selectedType === type
                          ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-md"
                          : "bg-white/6 text-white/80 hover:bg-white/10"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() +
                        type.slice(1).replace("-", " ")}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-white/80 mb-3 block">
                  Work Mode
                </label>
                <div className="space-y-2">
                  {["On-site", "Remote", "Hybrid"].map((mode) => (
                    <label
                      key={mode}
                      className="flex items-center gap-2 cursor-pointer group"
                    >
                      <input
                        type="checkbox"
                        checked={workModeFilters[mode]}
                        onChange={() => handleWorkModeChange(mode)}
                        className="w-4 h-4 rounded border-white/12 text-[#803791] focus:ring-[#b87bd1] bg-white/6"
                      />
                      <span className="text-sm text-white/80 group-hover:text-white">
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
        <div className="flex-1">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-sm text-white/70">
              Showing{" "}
              <span className="font-semibold text-white">{jobs.length}</span>{" "}
              jobs
            </p>
            <button
              onClick={() => dispatch(fetchJobs())}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-2 bg-white/6 hover:bg-white/10 text-white rounded-lg transition-colors font-medium border border-white/12 disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Clock className="h-4 w-4" />
              )}
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 text-[#b87bd1] animate-spin" />
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="rounded-xl p-6 shadow-xl transition-all hover:-translate-y-1 hover:shadow-2xl"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex gap-6">
                    {/* Company Logo */}
                    <div className="flex-shrink-0">
                      <div
                        className="w-16 h-16 rounded-xl flex items-center justify-center overflow-hidden shadow-md"
                        style={{
                          background: "linear-gradient(135deg,#803791,#b87bd1)",
                        }}
                      >
                        {job.employerId?.company ? (
                          <span className="text-white font-bold text-sm">
                            {getInitials(job.employerId.company)}
                          </span>
                        ) : (
                          <Building2 className="w-8 h-8 text-white" />
                        )}
                      </div>
                    </div>

                    {/* Job Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1">
                            {job.title}
                          </h3>
                          <p className="text-base font-medium text-white/80">
                            {job.employerId?.company || "Company Not Specified"}
                          </p>
                        </div>
                        <button
                          onClick={() => handleSaveJob(job._id)}
                          className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                            savedJobs.includes(job._id)
                              ? "text-[#b87bd1] bg-[#b87bd1]/10"
                              : "text-white/60 hover:text-white/80 hover:bg-white/6"
                          }`}
                        >
                          <Bookmark
                            className={`h-5 w-5 ${
                              savedJobs.includes(job._id) ? "fill-current" : ""
                            }`}
                          />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-4 mb-4 text-sm text-white/70">
                        <div className="flex items-center gap-1.5">
                          <MapPin className="h-4 w-4" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="h-4 w-4" />
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${getJobTypeColor(
                              job.jobType
                            )}`}
                          >
                            {job.jobType}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-semibold text-white">
                            {job.salary}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-4 w-4" />
                          <span>{formatDate(job.createdAt)}</span>
                        </div>
                      </div>

                      <p className="text-white/70 mb-4 line-clamp-2">
                        {job.description}
                      </p>

                      {job.skills && job.skills.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          {job.skills.slice(0, 5).map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{
                                background: "rgba(184,123,209,0.08)",
                                color: "#b87bd1",
                                border: "1px solid rgba(184,123,209,0.2)",
                              }}
                            >
                              {skill}
                            </span>
                          ))}
                          {job.skills.length > 5 && (
                            <span
                              className="px-3 py-1 rounded-full text-xs font-medium"
                              style={{
                                background: "rgba(255,255,255,0.06)",
                                color: "rgba(255,255,255,0.7)",
                              }}
                            >
                              +{job.skills.length - 5} more
                            </span>
                          )}
                        </div>
                      )}

                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApply(job._id)}
                          className="px-6 py-2 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-lg transition-transform transform hover:-translate-y-0.5 font-medium shadow-lg flex items-center gap-2"
                        >
                          Apply Now
                          <ExternalLink className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleViewDetails(job._id)}
                          className="px-6 py-2 bg-white/6 hover:bg-white/10 text-white rounded-lg transition-colors font-medium border border-white/12"
                        >
                          View Details
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
              className="rounded-xl p-12 text-center shadow-xl"
              style={{
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02))",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{
                  background: "linear-gradient(135deg,#803791,#b87bd1)",
                }}
              >
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No jobs found
              </h3>
              <p className="text-white/70">
                {filters.searchQuery ||
                filters.selectedType !== "all" ||
                filters.workMode.length > 0
                  ? "Try adjusting your search or filters to find more opportunities."
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
    </div>
  );
}
