import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import { jobService } from "@/services/jobService";

// Async thunks for API calls
export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await jobService.getAllJobs(filters);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch jobs"
      );
    }
  }
);

export const saveJob = createAsyncThunk(
  "jobs/saveJob",
  async (jobId, { rejectWithValue }) => {
    try {
      // If you have a save job endpoint, use it here
      // const response = await jobService.saveJob(jobId);
      // return response.data;

      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { jobId, success: true };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to save job"
      );
    }
  }
);

export const unsaveJob = createAsyncThunk(
  "jobs/unsaveJob",
  async (jobId, { rejectWithValue }) => {
    try {
      // If you have an unsave job endpoint, use it here
      // const response = await jobService.unsaveJob(jobId);
      // return response.data;

      // For now, simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      return { jobId, success: true };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to unsave job"
      );
    }
  }
);

const initialState = {
  jobs: [],
  savedJobs: [], // Array of job IDs that are saved
  filters: {
    searchQuery: "",
    selectedType: "all",
    location: [],
    experience: [],
    workMode: [],
  },
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalJobs: 0,
    hasNext: false,
    hasPrev: false,
  },
};

const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
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
    setWorkModeFilter: (state, action) => {
      state.filters.workMode = action.payload;
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    },

    // Local saved jobs toggle (for immediate UI feedback)
    toggleSaveJob: (state, action) => {
      const jobId = action.payload;
      if (state.savedJobs.includes(jobId)) {
        state.savedJobs = state.savedJobs.filter((id) => id !== jobId);
      } else {
        state.savedJobs.push(jobId);
      }
    },

    // Set saved jobs from API
    setSavedJobs: (state, action) => {
      state.savedJobs = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Update pagination
    setPagination: (state, action) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Jobs
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.data || [];

        // Update pagination if available
        if (action.payload.pagination) {
          state.pagination = action.payload.pagination;
        }
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.jobs = [];
      })

      // Save Job
      .addCase(saveJob.fulfilled, (state, action) => {
        // Job is already optimistically saved, just confirm
      })
      .addCase(saveJob.rejected, (state, action) => {
        state.error = action.payload;
        // Remove from saved jobs if API call failed
        state.savedJobs = state.savedJobs.filter(
          (id) => id !== action.meta.arg
        );
      })

      // Unsave Job
      .addCase(unsaveJob.fulfilled, (state, action) => {
        // Job is already optimistically unsaved, just confirm
      })
      .addCase(unsaveJob.rejected, (state, action) => {
        state.error = action.payload;
        // Add back to saved jobs if API call failed
        if (!state.savedJobs.includes(action.meta.arg)) {
          state.savedJobs.push(action.meta.arg);
        }
      });
  },
});

export const {
  setSearchQuery,
  setSelectedType,
  setLocationFilter,
  setExperienceFilter,
  setWorkModeFilter,
  clearFilters,
  toggleSaveJob,
  setSavedJobs,
  clearError,
  setPagination,
} = jobsSlice.actions;

// Basic Selectors
export const selectAllJobs = (state) => state.jobs.jobs;
export const selectSavedJobs = (state) => state.jobs.savedJobs;
export const selectFilters = (state) => state.jobs.filters;
export const selectJobsLoading = (state) => state.jobs.loading;
export const selectJobsError = (state) => state.jobs.error;
export const selectPagination = (state) => state.jobs.pagination;

// Memoized Selectors using createSelector
export const selectFilteredJobs = createSelector(
  [selectAllJobs, selectFilters],
  (jobs, filters) => {
    return jobs.filter((job) => {
      const matchesSearch =
        !filters.searchQuery ||
        job.title?.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
        job.employerId?.company
          ?.toLowerCase()
          .includes(filters.searchQuery.toLowerCase()) ||
        job.skills?.some((skill) =>
          skill.toLowerCase().includes(filters.searchQuery.toLowerCase())
        );

      const matchesType =
        filters.selectedType === "all" ||
        job.jobType?.toLowerCase() === filters.selectedType.toLowerCase();

      const matchesWorkMode =
        filters.workMode.length === 0 ||
        filters.workMode.includes(job.workMode);

      return matchesSearch && matchesType && matchesWorkMode;
    });
  }
);

export const selectJobStats = createSelector(
  [selectAllJobs, selectSavedJobs],
  (jobs, savedJobs) => {
    const today = new Date();
    const newToday = jobs.filter((job) => {
      if (!job.createdAt) return false;
      const jobDate = new Date(job.createdAt);
      return jobDate.toDateString() === today.toDateString();
    }).length;

    return [
      {
        label: "Total Jobs",
        value: jobs.length,
      },
      {
        label: "New Today",
        value: newToday,
      },
      {
        label: "Saved Jobs",
        value: savedJobs.length,
      },
    ];
  }
);

export const selectJobById = createSelector(
  [selectAllJobs, (state, jobId) => jobId],
  (jobs, jobId) => jobs.find((job) => job._id === jobId)
);

export const selectIsJobSaved = createSelector(
  [selectSavedJobs, (state, jobId) => jobId],
  (savedJobs, jobId) => savedJobs.includes(jobId)
);

export default jobsSlice.reducer;
