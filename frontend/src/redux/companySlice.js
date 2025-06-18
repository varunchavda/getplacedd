import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
  name: "company",
  initialState: { 
    singleCompany: null, // For storing details of one selected company
    companies: [],       // For storing a list of companies
    searchCompanyByText: "",  // For search input or filtering
  },
  reducers: {
    // Updates the state with one company's details ( when viewing/editing a company).
    setSingleCompany: (state, action) => {
      state.singleCompany = action.payload;
    },
    // Updates the companies array with a new list ( from a database/API).
    setCompanies: (state, action) => {
      state.companies = action.payload; 
    },
    // Stores whatever the user typed to search companies. used to filter the list in the UI & in searchbar.
    setSearchCompanyByText: (state, action) => {
      state.searchCompanyByText = action.payload;
    },
    // Removes a company from the list by comparing _id
    removeCompany: (state, action) => {
      state.companies = state.companies.filter(
        (company) => company._id !== action.payload
      );
    },
  },
});

export const {
  setSingleCompany,
  setCompanies,
  setSearchCompanyByText,
  removeCompany,
} = companySlice.actions;
export default companySlice.reducer;
