import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  applications: [
    {
      id: 1,
      candidate: "Amit Sharma",
      initials: "AS",
      email: "amit.sharma@email.com",
      phone: "+91 98765 43210",
      position: "Senior Frontend Developer",
      appliedDate: "2024-01-20",
      experience: "5 years",
      location: "Mumbai, Maharashtra",
      education: "B.Tech Computer Science",
      stage: "new",
      skills: ["React", "Next.js", "TypeScript", "Tailwind"],
      matchScore: 95,
      lastActivity: "2 hours ago",
      notes: "Strong portfolio with modern tech stack",
    },
    {
      id: 2,
      candidate: "Neha Verma",
      initials: "NV",
      email: "neha.verma@email.com",
      phone: "+91 99876 54321",
      position: "UI/UX Designer",
      appliedDate: "2024-01-18",
      experience: "3 years",
      location: "Pune, Maharashtra",
      education: "B.Des Design",
      stage: "screening",
      skills: ["Figma", "Prototyping", "User Research", "Accessibility"],
      matchScore: 88,
      lastActivity: "Yesterday",
      notes: "Excellent design portfolio",
    },
    {
      id: 3,
      candidate: "Rahul Gupta",
      initials: "RG",
      email: "rahul.gupta@email.com",
      phone: "+91 91234 56780",
      position: "Backend Engineer",
      appliedDate: "2024-01-15",
      experience: "6 years",
      location: "Remote",
      education: "M.Tech Computer Science",
      stage: "interview",
      skills: ["Node.js", "PostgreSQL", "AWS", "Docker", "Redis"],
      matchScore: 92,
      lastActivity: "Today",
      notes: "Scheduled for technical interview tomorrow",
    },
    {
      id: 4,
      candidate: "Priya Nair",
      initials: "PN",
      email: "priya.nair@email.com",
      phone: "+91 90909 10101",
      position: "Data Analyst",
      appliedDate: "2024-01-12",
      experience: "2 years",
      location: "Bengaluru, Karnataka",
      education: "B.Sc Statistics",
      stage: "shortlisted",
      skills: ["SQL", "Python", "Power BI", "Tableau", "Excel"],
      matchScore: 85,
      lastActivity: "2 days ago",
      notes: "Strong analytical skills",
    },
    {
      id: 5,
      candidate: "Vikram Singh",
      initials: "VS",
      email: "vikram.singh@email.com",
      phone: "+91 90000 22222",
      position: "Recruiter",
      appliedDate: "2024-01-10",
      experience: "4 years",
      location: "Delhi",
      education: "MBA HR",
      stage: "rejected",
      skills: ["Sourcing", "ATS", "Screening", "Interviewing"],
      matchScore: 78,
      lastActivity: "1 week ago",
      notes: "Not enough tech recruitment experience",
    },
  ],
  filters: {
    search: "",
    stage: "all",
    sortBy: "newest",
  },
  stages: [
    { value: "all", label: "All Applications", color: "slate", count: 47 },
    { value: "new", label: "New", color: "blue", count: 12 },
    { value: "screening", label: "Screening", color: "cyan", count: 8 },
    { value: "interview", label: "Interview", color: "indigo", count: 6 },
    { value: "shortlisted", label: "Shortlisted", color: "emerald", count: 15 },
    { value: "rejected", label: "Rejected", color: "rose", count: 6 },
  ],
  expandedApplication: null,
  loading: false,
  error: null,
};

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    // Application actions
    addApplication: (state, action) => {
      state.applications.push(action.payload);
    },
    updateApplication: (state, action) => {
      const index = state.applications.findIndex(app => app.id === action.payload.id);
      if (index !== -1) {
        state.applications[index] = { ...state.applications[index], ...action.payload };
      }
    },
    deleteApplication: (state, action) => {
      state.applications = state.applications.filter(app => app.id !== action.payload);
    },
    
    // Stage management
    updateApplicationStage: (state, action) => {
      const { applicationId, stage } = action.payload;
      const application = state.applications.find(app => app.id === applicationId);
      if (application) {
        application.stage = stage;
      }
    },
    
    // Filter actions
    setSearchFilter: (state, action) => {
      state.filters.search = action.payload;
    },
    setStageFilter: (state, action) => {
      state.filters.stage = action.payload;
    },
    setSortBy: (state, action) => {
      state.filters.sortBy = action.payload;
    },
    clearApplicationFilters: (state) => {
      state.filters = initialState.filters;
    },
    
    // UI actions
    setExpandedApplication: (state, action) => {
      state.expandedApplication = action.payload;
    },
    
    // Notes management
    updateApplicationNotes: (state, action) => {
      const { applicationId, notes } = action.payload;
      const application = state.applications.find(app => app.id === applicationId);
      if (application) {
        application.notes = notes;
        application.lastActivity = "Just now";
      }
    },
    
    // Loading states
    setApplicationsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setApplicationsError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  addApplication,
  updateApplication,
  deleteApplication,
  updateApplicationStage,
  setSearchFilter,
  setStageFilter,
  setSortBy,
  clearApplicationFilters,
  setExpandedApplication,
  updateApplicationNotes,
  setApplicationsLoading,
  setApplicationsError,
} = applicationsSlice.actions;

// Selectors
export const selectAllApplications = (state) => state.applications.applications;
export const selectApplicationFilters = (state) => state.applications.filters;
export const selectApplicationStages = (state) => state.applications.stages;
export const selectExpandedApplication = (state) => state.applications.expandedApplication;
export const selectApplicationsLoading = (state) => state.applications.loading;
export const selectApplicationsError = (state) => state.applications.error;

export const selectFilteredApplications = (state) => {
  const { applications, filters } = state.applications;
  const { search, stage, sortBy } = filters;
  
  let filtered = applications.filter((app) => {
    const matchesStage = stage === "all" || app.stage === stage;
    const matchesSearch =
      !search ||
      app.candidate.toLowerCase().includes(search.toLowerCase()) ||
      app.position.toLowerCase().includes(search.toLowerCase()) ||
      app.location.toLowerCase().includes(search.toLowerCase()) ||
      app.skills.join(" ").toLowerCase().includes(search.toLowerCase());
    
    return matchesStage && matchesSearch;
  });

  // Sort applications
  switch (sortBy) {
    case "newest":
      filtered.sort((a, b) => new Date(b.appliedDate) - new Date(a.appliedDate));
      break;
    case "oldest":
      filtered.sort((a, b) => new Date(a.appliedDate) - new Date(b.appliedDate));
      break;
    case "match":
      filtered.sort((a, b) => b.matchScore - a.matchScore);
      break;
    case "name":
      filtered.sort((a, b) => a.candidate.localeCompare(b.candidate));
      break;
    default:
      break;
  }

  return filtered;
};

export const selectApplicationStats = (state) => {
  const applications = state.applications.applications;
  const stages = state.applications.stages.map(stage => ({
    ...stage,
    count: stage.value === "all" 
      ? applications.length 
      : applications.filter(app => app.stage === stage.value).length
  }));
  
  return stages;
};

export default applicationsSlice.reducer;