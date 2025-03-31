import { createSlice } from '@reduxjs/toolkit';

// Define your initial state
const initialState = {
  user: null,
  isLoggedIn: false, // Add isLoggedIn state
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isLoggedIn = true; // Set isLoggedIn to true when the user logs in
    },
    logoutUser: (state) => {
      state.user = null;
      state.isLoggedIn = false; // Set isLoggedIn to false when the user logs out
    },
  },
});

// Export the actions
export const { setUser, logoutUser } = authSlice.actions;

// Export the reducer as default
export default authSlice.reducer;
