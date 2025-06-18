// authentication slice – it handles who is logged in
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false, // Shows if something auth-related is loading (login/signup)
    user: null, // Stores user data (null = not logged in)
  },
  reducers: {
    // actions
    // call this when login or signup starts (true), and then turn it back off (false) after it finishes.
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});
// action creators (functions that create actions)
export const { setLoading, setUser } = authSlice.actions;
export default authSlice.reducer;
