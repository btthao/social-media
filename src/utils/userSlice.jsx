import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: null,
  email: null,
  id: null,
  dateJoined: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      Object.keys(state).forEach((k) => (state[k] = action.payload[k]));
    },
    logout: (state) => {
      Object.keys(state).forEach((k) => (state[k] = null));
    },
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state) => state.user;

export default userSlice.reducer;
