import { configureStore } from "@reduxjs/toolkit";

import profileReducer   from "./Slices/ProfileSlice";
import dashboardReducer from "./Slices/DashboardSlice";
import questionReducer      from "./Slices/questionSlices";
import singleQuestionReducer from "./Slices/singleQuestion";

export const store = configureStore({
  reducer: {
    profile:   profileReducer,
    dashboard: dashboardReducer,
    question:questionReducer,
    singleQuestion: singleQuestionReducer,
  },
});
