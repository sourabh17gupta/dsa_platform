import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./Slices/authSlice"; 
import profileReducer   from "./Slices/ProfileSlice";
import dashboardReducer from "./Slices/DashboardSlice";
import questionReducer      from "./Slices/questionSlices";
import singleQuestionReducer from "./Slices/singleQuestion";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile:   profileReducer,
    dashboard: dashboardReducer,
    question:questionReducer,
    singleQuestion: singleQuestionReducer,
  },
});
