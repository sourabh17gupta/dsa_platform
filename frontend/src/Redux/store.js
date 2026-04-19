import { configureStore } from "@reduxjs/toolkit";

import profileReducer   from "./Slices/ProfileSlice";
import dashboardReducer from "./Slices/DashboardSlice";

export const store = configureStore({
  reducer: {
    profile:   profileReducer,
    dashboard: dashboardReducer,
  },
});