import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slice/Auth/authSlice";
import chatSlice from "../Slice/Auth/chatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatSlice, // ✅ name matches ChatApp.jsx selector
  },
});
