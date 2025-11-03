// "use client";

// import { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   Search,
//   MapPin,
//   Briefcase,
//   DollarSign,
//   Clock,
//   Bookmark,
//   ExternalLink,
//   Filter,
//   X,
//   Loader2,
//   Building2,
//   Sparkles,
//   TrendingUp,
//   Target,
//   CheckCircle2,
// } from "lucide-react";
// import {
//   fetchJobs,
//   toggleSaveJob,
//   saveJob,
//   unsaveJob,
//   setSearchQuery,
//   setSelectedType,
//   setWorkModeFilter,
//   selectFilteredJobs,
//   selectJobStats,
//   selectJobsLoading,
//   selectJobsError,
//   selectFilters,
//   selectSavedJobs,
//   clearError,
// } from "@/store/slices/jobsSlice";
// import { customToast } from "@/components/ui/toast";

// export default function JobListingsPage() {
//   const dispatch = useDispatch();
//   const jobs = useSelector(selectFilteredJobs);
//   const loading = useSelector(selectJobsLoading);
//   const error = useSelector(selectJobsError);
//   const filters = useSelector(selectFilters);
//   const savedJobs = useSelector(selectSavedJobs);
//   const stats = useSelector(selectJobStats);

//   const [showFilters, setShowFilters] = useState(false);
//   const [workModeFilters, setWorkModeFilters] = useState({
//     "On-site": false,
//     Remote: false,
//     Hybrid: false,
//   });

//   // Fetch jobs on component mount
//   useEffect(() => {
//     dispatch(fetchJobs());
//   }, [dispatch]);

//   // Handle search with debounce
//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       const apiFilters = {};

//       if (filters.searchQuery) {
//         apiFilters.search = filters.searchQuery;
//       }

//       if (filters.selectedType !== "all") {
//         apiFilters.jobType = filters.selectedType;
//       }

//       if (filters.workMode.length > 0) {
//         apiFilters.workMode = filters.workMode.join(",");
//       }

//       dispatch(fetchJobs(apiFilters));
//     }, 500);

//     return () => clearTimeout(delayDebounceFn);
//   }, [filters.searchQuery, filters.selectedType, filters.workMode, dispatch]);

//   // Handle errors
//   useEffect(() => {
//     if (error) {
//       customToast.error("Error", error);
//       dispatch(clearError());
//     }
//   }, [error, dispatch]);

//   const handleSearch = (query) => {
//     dispatch(setSearchQuery(query));
//   };

//   const handleTypeChange = (type) => {
//     dispatch(setSelectedType(type));
//   };

//   const handleWorkModeChange = (mode) => {
//     const updatedFilters = {
//       ...workModeFilters,
//       [mode]: !workModeFilters[mode],
//     };
//     setWorkModeFilters(updatedFilters);

//     const selectedModes = Object.keys(updatedFilters).filter(
//       (mode) => updatedFilters[mode]
//     );
//     dispatch(setWorkModeFilter(selectedModes));
//   };

//   const handleSaveJob = async (jobId) => {
//     try {
//       // Optimistic update
//       dispatch(toggleSaveJob(jobId));

//       const isCurrentlySaved = savedJobs.includes(jobId);

//       if (isCurrentlySaved) {
//         await dispatch(unsaveJob(jobId)).unwrap();
//       } else {
//         await dispatch(saveJob(jobId)).unwrap();
//       }
//     } catch (error) {
//       // Revert optimistic update on error
//       dispatch(toggleSaveJob(jobId));
//       customToast.error("Error", "Failed to update saved jobs");
//     }
//   };

//   const handleApply = (jobId) => {
//     customToast.info(
//       "Application",
//       "Apply functionality will be implemented soon"
//     );
//   };

//   const handleViewDetails = (jobId) => {
//     customToast.info(
//       "Details",
//       "View details functionality will be implemented soon"
//     );
//   };

//   const getJobTypeColor = (jobType) => {
//     const colors = {
//       "Full-time": "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/30",
//       "Part-time": "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 text-blue-300 border-blue-500/30",
//       Contract: "bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-300 border-orange-500/30",
//       Internship: "bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30",
//       Freelance: "bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-300 border-pink-500/30",
//     };
//     return colors[jobType] || "bg-gray-500/20 text-gray-300 border-gray-500/30";
//   };

//   const getInitials = (name) => {
//     return name
//       ? name
//           .split(" ")
//           .map((word) => word[0])
//           .join("")
//           .toUpperCase()
//           .slice(0, 2)
//       : "CO";
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "Recently";

//     const date = new Date(dateString);
//     const now = new Date();
//     const diffTime = Math.abs(now - date);
//     const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//     if (diffDays === 1) return "1 day ago";
//     if (diffDays < 7) return `${diffDays} days ago`;
//     if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;
//     return `${Math.ceil(diffDays / 30)} months ago`;
//   };

//   return (
//     <div className="relative min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
//       {/* Animated Background */}
//       <div className="fixed inset-0 pointer-events-none overflow-hidden">
//         <div
//           className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse-slow opacity-20"
//           style={{
//             background: "radial-gradient(circle, #803791 0%, transparent 70%)",
//           }}
//         />
//         <div
//           className="absolute -bottom-40 -right-40 w-[700px] h-[700px] rounded-full blur-[140px] animate-pulse-slower opacity-15"
//           style={{
//             background: "radial-gradient(circle, #b87bd1 0%, transparent 70%)",
//           }}
//         />
//         <div
//           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[100px] animate-float opacity-10"
//           style={{
//             background: "radial-gradient(circle, #f0c2ee 0%, transparent 70%)",
//           }}
//         />
//       </div>

//       <div className="relative container mx-auto px-6 py-8">
//         {/* Header Section */}
//         <div
//           className="relative overflow-hidden rounded-3xl p-8 md:p-10 text-white shadow-2xl mb-8 border"
//           style={{
//             background:
//               "linear-gradient(135deg, rgba(128,55,145,0.2) 0%, rgba(184,123,209,0.1) 100%)",
//             backdropFilter: "blur(20px)",
//             borderColor: "rgba(255,255,255,0.1)",
//           }}
//         >
//           {/* Gradient Overlay */}
//           <div className="absolute inset-0 opacity-30">
//             <div className="absolute inset-0 bg-gradient-to-br from-[#803791]/20 via-transparent to-[#b87bd1]/20 animate-gradient-shift" />
//           </div>

//           <div className="relative flex items-center justify-between mb-8">
//             <div className="flex items-center gap-4">
//               <div
//                 className="p-4 rounded-2xl shadow-2xl"
//                 style={{
//                   background: "linear-gradient(135deg,#803791,#b87bd1)",
//                 }}
//               >
//                 <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" strokeWidth={2.5} />
//               </div>
//               <div>
//                 <h1 className="text-lg sm:text-xl md:text-2xl sm:text-3xl md:text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
//                   Find Your Dream Job
//                 </h1>
//                 <p className="text-white/90 text-lg font-medium">
//                   Discover opportunities that match your skills and aspirations
//                 </p>
//               </div>
//             </div>
//             <button
//               className="md:hidden px-5 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl transition-all font-bold border border-white/20 flex items-center gap-2 backdrop-blur-sm"
//               onClick={() => setShowFilters(!showFilters)}
//             >
//               <Filter className="h-5 w-5" strokeWidth={2.5} />
//               Filters
//             </button>
//           </div>

//           {/* Search Bar */}
//           <div className="relative group">
//             <div className="absolute -inset-1 bg-gradient-to-r from-[#803791] to-[#b87bd1] rounded-[24px] opacity-0 group-focus-within:opacity-30 blur-xl transition-opacity duration-500" />
//             <div className="relative">
//               <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-6 w-6 text-white/60 group-focus-within:text-purple-300 transition-colors duration-500" strokeWidth={2.5} />
//               <input
//                 type="text"
//                 placeholder="Search by job title, company, or skills..."
//                 value={filters.searchQuery}
//                 onChange={(e) => handleSearch(e.target.value)}
//                 className="w-full pl-16 pr-6 py-5 text-lg border-2 border-white/15 bg-white/10 text-white placeholder:text-white/50 focus:border-purple-400/50 focus:outline-none focus:ring-4 focus:ring-purple-500/20 rounded-[20px] font-medium backdrop-blur-xl transition-all duration-500"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//           {stats.map((stat, index) => {
//             const icons = [TrendingUp, Briefcase, Target];
//             const Icon = icons[index] || Briefcase;
//             return (
//               <div
//                 key={index}
//                 className="group relative overflow-hidden rounded-2xl p-6 shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
//                   borderColor: "rgba(255,255,255,0.1)",
//                   backdropFilter: "blur(10px)",
//                 }}
//               >
//                 {/* Hover Gradient */}
//                 <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300" />

//                 <div className="relative flex items-center justify-between">
//                   <div>
//                     <p className="text-sm font-bold text-white/70 mb-2 uppercase tracking-wider">
//                       {stat.label}
//                     </p>
//                     <p className="text-base sm:text-lg md:text-xl sm:text-2xl md:text-3xl sm:text-4xl md:text-5xl font-black text-white">{stat.value}</p>
//                   </div>
//                   <div
//                     className="h-20 w-20 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300"
//                     style={{
//                       background: "linear-gradient(135deg,#803791,#b87bd1)",
//                     }}
//                   >
//                     <Icon className="h-10 w-10 text-white" strokeWidth={2.5} />
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="flex gap-4 sm:gap-6 md:gap-8">
//           {/* Sticky Filters Sidebar */}
//           <aside
//             className={`w-80 flex-shrink-0 ${
//               showFilters ? "block" : "hidden md:block"
//             }`}
//           >
//             <div className="sticky top-8 space-y-6">
//               <div
//                 className="relative overflow-hidden rounded-2xl p-6 shadow-2xl border backdrop-blur-xl"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
//                   borderColor: "rgba(255,255,255,0.15)",
//                 }}
//               >
//                 {/* Gradient Overlay */}
//                 <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-purple-500/20 via-transparent to-pink-500/20 opacity-50" />

//                 <div className="relative">
//                   <div className="flex items-center justify-between mb-6">
//                     <div className="flex items-center gap-3">
//                       <div
//                         className="p-2 rounded-xl shadow-lg"
//                         style={{
//                           background: "linear-gradient(135deg,#803791,#b87bd1)",
//                         }}
//                       >
//                         <Filter className="h-5 w-5 text-white" strokeWidth={2.5} />
//                       </div>
//                       <h3 className="font-black text-white text-xl">Filters</h3>
//                     </div>
//                     {showFilters && (
//                       <button
//                         className="md:hidden p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-all"
//                         onClick={() => setShowFilters(false)}
//                       >
//                         <X className="h-5 w-5" strokeWidth={2.5} />
//                       </button>
//                     )}
//                   </div>

//                   <div className="space-y-6">
//                     {/* Job Type Filter */}
//                     <div>
//                       <label className="text-sm font-bold text-white/80 mb-3 block uppercase tracking-wider">
//                         Job Type
//                       </label>
//                       <div className="space-y-2">
//                         {[
//                           "all",
//                           "Full-time",
//                           "Part-time",
//                           "Contract",
//                           "Internship",
//                           "Freelance",
//                         ].map((type) => (
//                           <button
//                             key={type}
//                             onClick={() => handleTypeChange(type)}
//                             className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
//                               filters.selectedType === type
//                                 ? "bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white shadow-lg scale-105"
//                                 : "bg-white/8 text-white/80 hover:bg-white/15 hover:text-white"
//                             }`}
//                           >
//                             <div className="flex items-center justify-between">
//                               <span>
//                                 {type.charAt(0).toUpperCase() +
//                                   type.slice(1).replace("-", " ")}
//                               </span>
//                               {filters.selectedType === type && (
//                                 <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
//                               )}
//                             </div>
//                           </button>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Work Mode Filter */}
//                     <div>
//                       <label className="text-sm font-bold text-white/80 mb-3 block uppercase tracking-wider">
//                         Work Mode
//                       </label>
//                       <div className="space-y-3">
//                         {["On-site", "Remote", "Hybrid"].map((mode) => (
//                           <label
//                             key={mode}
//                             className="flex items-center gap-3 cursor-pointer group p-3 rounded-xl hover:bg-white/8 transition-all"
//                           >
//                             <div className="relative">
//                               <input
//                                 type="checkbox"
//                                 checked={workModeFilters[mode]}
//                                 onChange={() => handleWorkModeChange(mode)}
//                                 className="w-5 h-5 rounded-lg border-2 border-white/20 text-purple-600 focus:ring-2 focus:ring-purple-500/50 bg-white/10 transition-all"
//                               />
//                             </div>
//                             <span className="text-base font-semibold text-white/80 group-hover:text-white transition-colors">
//                               {mode}
//                             </span>
//                           </label>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </aside>

//           {/* Job Listings */}
//           <div className="flex-1 min-w-0">
//             <div className="mb-6 flex justify-between items-center">
//               <p className="text-base text-white/70 font-medium">
//                 Showing{" "}
//                 <span className="font-black text-white text-xl">{jobs.length}</span>{" "}
//                 jobs
//               </p>
//               <button
//                 onClick={() => dispatch(fetchJobs())}
//                 disabled={loading}
//                 className="flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl transition-all font-bold border border-white/20 disabled:opacity-50 hover:scale-105 backdrop-blur-sm"
//               >
//                 {loading ? (
//                   <Loader2 className="h-5 w-5 animate-spin" strokeWidth={2.5} />
//                 ) : (
//                   <Clock className="h-5 w-5" strokeWidth={2.5} />
//                 )}
//                 Refresh
//               </button>
//             </div>

//             {loading ? (
//               <div className="flex justify-center items-center py-20">
//                 <div className="relative">
//                   <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-xl opacity-50" />
//                   <Loader2 className="relative h-12 w-12 text-purple-400 animate-spin" strokeWidth={2.5} />
//                 </div>
//               </div>
//             ) : (
//               <div className="space-y-5">
//                 {jobs.map((job) => (
//                   <div
//                     key={job._id}
//                     className="group relative overflow-hidden rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-500/20 border backdrop-blur-sm"
//                     style={{
//                       background:
//                         "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
//                       borderColor: "rgba(255,255,255,0.1)",
//                     }}
//                   >
//                     {/* Hover Gradient */}
//                     <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/5 group-hover:to-pink-500/5 transition-all duration-300" />

//                     <div className="relative flex gap-6">
//                       {/* Company Logo */}
//                       <div className="flex-shrink-0">
//                         <div
//                           className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl group-hover:scale-110 transition-transform duration-300"
//                           style={{
//                             background: "linear-gradient(135deg,#803791,#b87bd1)",
//                           }}
//                         >
//                           {job.employerId?.company ? (
//                             <span className="text-white font-black text-lg">
//                               {getInitials(job.employerId.company)}
//                             </span>
//                           ) : (
//                             <Building2 className="w-10 h-10 text-white" strokeWidth={2.5} />
//                           )}
//                         </div>
//                       </div>

//                       {/* Job Details */}
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-start justify-between gap-4 mb-3">
//                           <div className="flex-1 min-w-0">
//                             <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-2 group-hover:text-purple-200 transition-colors">
//                               {job.title}
//                             </h3>
//                             <p className="text-lg font-bold text-white/80">
//                               {job.employerId?.company || "Company Not Specified"}
//                             </p>
//                           </div>
//                           <button
//                             onClick={() => handleSaveJob(job._id)}
//                             className={`flex-shrink-0 p-3 rounded-xl transition-all duration-300 ${
//                               savedJobs.includes(job._id)
//                                 ? "text-purple-400 bg-purple-500/20 scale-110"
//                                 : "text-white/60 hover:text-white/90 hover:bg-white/10"
//                             }`}
//                           >
//                             <Bookmark
//                               className={`h-6 w-6 ${
//                                 savedJobs.includes(job._id) ? "fill-current" : ""
//                               }`}
//                               strokeWidth={2.5}
//                             />
//                           </button>
//                         </div>

//                         <div className="flex flex-wrap items-center gap-4 mb-4">
//                           <div className="flex items-center gap-2 text-white/70">
//                             <MapPin className="h-5 w-5 text-purple-400" strokeWidth={2.5} />
//                             <span className="font-semibold">{job.location}</span>
//                           </div>
//                           <span
//                             className={`px-4 py-2 rounded-xl text-sm font-bold border ${getJobTypeColor(
//                               job.jobType
//                             )}`}
//                           >
//                             {job.jobType}
//                           </span>
//                           <div className="flex items-center gap-2 text-white">
//                             <DollarSign className="h-5 w-5 text-emerald-400" strokeWidth={2.5} />
//                             <span className="font-black text-lg">{job.salary}</span>
//                           </div>
//                           <div className="flex items-center gap-2 text-white/60">
//                             <Clock className="h-4 w-4" strokeWidth={2.5} />
//                             <span className="text-sm font-semibold">{formatDate(job.createdAt)}</span>
//                           </div>
//                         </div>

//                         <p className="text-white/70 mb-4 line-clamp-2 text-base font-medium">
//                           {job.description}
//                         </p>

//                         {job.skills && job.skills.length > 0 && (
//                           <div className="flex flex-wrap items-center gap-2 mb-5">
//                             {job.skills.slice(0, 5).map((skill, index) => (
//                               <span
//                                 key={index}
//                                 className="px-4 py-2 rounded-xl text-sm font-bold border"
//                                 style={{
//                                   background: "rgba(184,123,209,0.15)",
//                                   color: "#e9d5ff",
//                                   borderColor: "rgba(184,123,209,0.3)",
//                                 }}
//                               >
//                                 {skill}
//                               </span>
//                             ))}
//                             {job.skills.length > 5 && (
//                               <span className="px-4 py-2 rounded-xl text-sm font-bold bg-white/10 text-white/70 border border-white/20">
//                                 +{job.skills.length - 5} more
//                               </span>
//                             )}
//                           </div>
//                         )}

//                         <div className="flex gap-4">
//                           <button
//                             onClick={() => handleApply(job._id)}
//                             className="px-8 py-3 bg-gradient-to-r from-[#803791] to-[#b87bd1] text-white rounded-xl transition-all duration-300 hover:scale-105 font-black shadow-2xl flex items-center gap-2 hover:shadow-purple-500/50"
//                           >
//                             Apply Now
//                             <ExternalLink className="h-5 w-5" strokeWidth={2.5} />
//                           </button>
//                           <button
//                             onClick={() => handleViewDetails(job._id)}
//                             className="px-8 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl transition-all duration-300 font-bold border border-white/20 hover:scale-105 backdrop-blur-sm"
//                           >
//                             View Details
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {!loading && jobs.length === 0 && (
//               <div
//                 className="relative overflow-hidden rounded-3xl p-16 text-center shadow-2xl border"
//                 style={{
//                   background:
//                     "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
//                   borderColor: "rgba(255,255,255,0.1)",
//                 }}
//               >
//                 <div className="relative">
//                   <div className="absolute -inset-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-20" />
//                   <div
//                     className="relative w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl"
//                     style={{
//                       background: "linear-gradient(135deg,#803791,#b87bd1)",
//                     }}
//                   >
//                     <Search className="h-12 w-12 text-white" strokeWidth={2.5} />
//                   </div>
//                 </div>
//                 <h3 className="text-base sm:text-lg md:text-xl sm:text-2xl md:text-3xl font-black text-white mb-4">
//                   No jobs found
//                 </h3>
//                 <p className="text-white/70 text-lg font-medium max-w-md mx-auto">
//                   {filters.searchQuery ||
//                   filters.selectedType !== "all" ||
//                   filters.workMode.length > 0
//                     ? "Try adjusting your search or filters to find more opportunities."
//                     : "No jobs are currently available. Check back later for new opportunities."}
//                 </p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Custom Animations */}
//       <style jsx>{`
//         @keyframes pulse-slow {
//           0%,
//           100% {
//             opacity: 0.2;
//             transform: scale(1);
//           }
//           50% {
//             opacity: 0.3;
//             transform: scale(1.05);
//           }
//         }

//         @keyframes pulse-slower {
//           0%,
//           100% {
//             opacity: 0.15;
//             transform: scale(1);
//           }
//           50% {
//             opacity: 0.25;
//             transform: scale(1.08);
//           }
//         }

//         @keyframes float {
//           0%,
//           100% {
//             transform: translate(0, 0) rotate(0deg);
//           }
//           33% {
//             transform: translate(40px, -40px) rotate(8deg);
//           }
//           66% {
//             transform: translate(-30px, 30px) rotate(-8deg);
//           }
//         }

//         @keyframes gradient-shift {
//           0%,
//           100% {
//             transform: translateX(0) translateY(0);
//           }
//           50% {
//             transform: translateX(100px) translateY(50px);
//           }
//         }

//         .animate-pulse-slow {
//           animation: pulse-slow 5s ease-in-out infinite;
//         }

//         .animate-pulse-slower {
//           animation: pulse-slower 6s ease-in-out infinite;
//         }

//         .animate-float {
//           animation: float 10s ease-in-out infinite;
//         }

//         .animate-gradient-shift {
//           animation: gradient-shift 8s ease-in-out infinite;
//         }
//       `}</style>
//     </div>
//   );
// }
