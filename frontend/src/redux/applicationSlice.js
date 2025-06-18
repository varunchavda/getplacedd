// This file is creating a Redux slice for managing applicants data.
 
import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
    name:'application',
    initialState:{
        applicants:null,
    },
    reducers:{
        setAllApplicants:(state,action) => {
            state.applicants = action.payload;
        }
    }
});
export const {setAllApplicants} = applicationSlice.actions;
export default applicationSlice.reducer;