import { createSlice } from "@reduxjs/toolkit";

//rtk uses immer, so you can mutate state in the reducers. it creates a new copy

//export so you can reference these reducers directly in dispatch hooks in other components
const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false
  },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice;
