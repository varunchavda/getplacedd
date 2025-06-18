// This slice is managing job-related data in your app
import { createSlice } from "@reduxjs/toolkit"; 

const jobSlice = createSlice({
  name: "job",
initialState: {
  allJobs: [],            // All jobs available to users
  allAdminJobs: [],       // Jobs visible to the admin ( with more controls )
  singleJob: null,        // A specific job’s details
  searchJobByText: "",    // Text input used to search jobs
  allAppliedJobs: [],     // Jobs the user has applied to
  searchedQuery: "",      // Another search-related field ( for filtering )
},
  
  // Each of these functions is a state-change

  reducers: {
    // Sets all available jobs (when we fetch job listings from the backend for users).
    setAllJobs: (state, action) => {
      state.allJobs = action.payload;
    },
    // Sets one job’s detailed info (for a job description page).
    setSingleJob: (state, action) => {
      state.singleJob = action.payload;
    },
    // Updates the jobs only the admin can see/manage (like for approval, edit, delete).
    setAllAdminJobs: (state, action) => {
      state.allAdminJobs = action.payload;
    },
    // Sets the search term typed by the user. Could be used to filter allJobs
    setSearchJobByText: (state, action) => {
      state.searchJobByText = action.payload;
    },
    // Sets the jobs the current user has applied to (shown in profile).
    setAllAppliedJobs: (state, action) => {
      state.allAppliedJobs = action.payload;
    },
    // Another search-related field , for filter.
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    // Removes a job from the admin’s list using the job’s _id. used when the admin deletes a job.
    removeJob: (state, action) => {
      state.allAdminJobs = state.allAdminJobs.filter(
        (job) => job._id !== action.payload
      );
    },
  },
});

export const {
  setAllJobs,
  setSingleJob,
  setAllAdminJobs,
  setSearchJobByText,
  setAllAppliedJobs,
  setSearchedQuery,
  removeJob,
} = jobSlice.actions;

// the actual reducer function that you'll plug into your Redux store.
export default jobSlice.reducer;
