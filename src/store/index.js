import { configureStore } from '@reduxjs/toolkit';
import jobsSlice from './slices/studentSlice/jobsSlice';
import applicationsSlice from './slices/employerSlice/applicationsSlice';

export const store = configureStore({
  reducer: {
    jobs: jobsSlice,
    applications: applicationsSlice,
  },
});