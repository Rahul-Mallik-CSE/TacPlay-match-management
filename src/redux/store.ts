/** @format */

import { configureStore } from "@reduxjs/toolkit";
import baseAPI from "@/redux/api/baseAPI";
import authReducer from "@/redux/features/auth/authSlice";
import settingsReducer from "@/redux/features/settings/settingsSlice";

export const store = configureStore({
  reducer: {
    [baseAPI.reducerPath]: baseAPI.reducer,
    auth: authReducer,
    settings: settingsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
