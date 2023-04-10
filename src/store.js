import { configureStore } from "@reduxjs/toolkit";
import userReducer from "features/user";
import transactionReducer from "features/api";

export const store = configureStore({
  reducer: {
    user: userReducer,
    api: transactionReducer,
    
  },
  devTools: process.env.NODE_ENV !== "production",
});
