import { configureStore } from "@reduxjs/toolkit";
import jobsSlice from "./slices/studentSlice/jobsSlice";
import applicationsSlice from "./slices/employerSlice/applicationsSlice";
import employerSlice from "./slices/employerSlice";
import candidateSlice from "./slices/studentSlice";

export const store = configureStore({
  reducer: {
    jobs: jobsSlice,
    applications: applicationsSlice,
    employer: employerSlice,
    candidate: candidateSlice,
  },
});
