/* eslint-disable prettier/prettier */
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../utils/userSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
    },
});