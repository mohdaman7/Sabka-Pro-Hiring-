import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  jobs: [
    {
      id: 1,
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      logo: "/company1.png",
      location: "Remote",
      type: "Full-time",
      salary: "$130k - $160k",
      posted: "2 days ago",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      description: "We're looking for an experienced frontend developer to join our growing team.",
      saved: false,
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "InnovateLabs",
      logo: "/company2.jpg",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$130k - $180k",
      posted: "1 week ago",
      skills: ["Node.js", "React", "PostgreSQL", "AWS"],
      description: "Join our team building cutting-edge SaaS products for enterprise clients.",
      saved: true,
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "DesignHub",
      logo: "/company3.jpg",
      location: "Hybrid - New York",
      type: "Full-time",
      salary: "$90k - $130k",
      posted: "3 days ago",
      skills: ["Figma", "Adobe XD", "Prototyping", "User Research"],
      description: "Create beautiful and intuitive user experiences for our mobile and web applications.",
      saved: false,
    },
    {
      id: 4,
      title: "Backend Developer",
      company: "CloudScale Inc",
      logo: "/company4.jpg",
      location: "Remote",
      type: "Contract",
      salary: "$100k - $140k",
      posted: "5 days ago",
      skills: ["Python", "Django", "Docker", "Kubernetes"],
      description: "Build scalable backend systems for our cloud infrastructure platform.",
      saved: false,
    },
    {
      id: 5,
      title: "Product Manager",
      company: "StartupXYZ",
      logo: "/company1.jpg",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$110k - $150k",
      posted: "1 day ago",
      skills: ["Product Strategy", "Agile", "Analytics", "Roadmapping"],
      description: "Lead product development and strategy for our B2B SaaS platform.",
      saved: true,
    },
    {
      id: 6,
      title: "DevOps Engineer",
      company: "SecureCloud",
      logo: "/company3.jpg",
      location: "Remote",
      type: "Full-time",
      salary: "$125k - $165k",
      posted: "4 days ago",
      skills: ["AWS", "Terraform", "CI/CD", "Monitoring"],
      description: "Manage and optimize our cloud infrastructure and deployment pipelines.",
      saved: false,
    },
  ],
  savedJobs: [2, 5], // IDs of saved jobs
  filters: {
    searchQuery: "",
    selectedType: "all",
    location: [],
    experience: [],
  },
  loading: false,
  error: null,
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    // Job actions
    addJob: (state, action) => {
      state.jobs.push(action.payload);
    },
    updateJob: (state, action) => {
      const index = state.jobs.findIndex(job => job.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = { ...state.jobs[index], ...action.payload };
      }
    },
    deleteJob: (state, action) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
    },
    
    // Saved jobs actions
    toggleSaveJob: (state, action) => {
      const jobId = action.payload;
      if (state.savedJobs.includes(jobId)) {
        state.savedJobs = state.savedJobs.filter(id => id !== jobId);
        // Also update the job's saved status
        const job = state.jobs.find(j => j.id === jobId);
        if (job) job.saved = false;
      } else {
        state.savedJobs.push(jobId);
        // Also update the job's saved status
        const job = state.jobs.find(j => j.id === jobId);
        if (job) job.saved = true;
      }
    },
    
    // Filter actions
    setSearchQuery: (state, action) => {
      state.filters.searchQuery = action.payload;
    },
    setSelectedType: (state, action) => {
      state.filters.selectedType = action.payload;
    },
    setLocationFilter: (state, action) => {
      state.filters.location = action.payload;
    },
    setExperienceFilter: (state, action) => {
      state.filters.experience = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },
    
    // Loading states
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addJob,
  updateJob,
  deleteJob,
  toggleSaveJob,
  setSearchQuery,
  setSelectedType,
  setLocationFilter,
  setExperienceFilter,
  clearFilters,
  setLoading,
  setError,
} = jobsSlice.actions;

// Selectors
export const selectAllJobs = (state) => state.jobs.jobs;
export const selectSavedJobs = (state) => state.jobs.savedJobs;
export const selectFilters = (state) => state.jobs.filters;
export const selectJobsLoading = (state) => state.jobs.loading;
export const selectJobsError = (state) => state.jobs.error;

export const selectFilteredJobs = (state) => {
  const { jobs, filters, savedJobs } = state.jobs;
  
  return jobs.filter((job) => {
    const matchesSearch =
      !filters.searchQuery ||
      job.title.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      job.skills.some((skill) => skill.toLowerCase().includes(filters.searchQuery.toLowerCase()));

    const matchesType = filters.selectedType === "all" || 
                       job.type.toLowerCase() === filters.selectedType.toLowerCase();

    return matchesSearch && matchesType;
  });
};

export const selectJobStats = (state) => {
  const jobs = state.jobs.jobs;
  const savedJobs = state.jobs.savedJobs;
  
  return [
    { 
      label: "Total Jobs", 
      value: jobs.length, 
      gradient: "from-purple-500 to-blue-500" 
    },
    {
      label: "New Today",
      value: jobs.filter((j) => j.posted.includes("day")).length,
      gradient: "from-blue-500 to-cyan-500",
    },
    { 
      label: "Saved Jobs", 
      value: savedJobs.length, 
      gradient: "from-pink-500 to-purple-500" 
    },
  ];
};

export default jobsSlice.reducer;

