import { configureStore } from "@reduxjs/toolkit";
import questionReducer      from "./Slices/questionSlices";
import singleQuestionReducer from "./Slices/singleQuestion";

export const store1 = configureStore({
  reducer: {
    question:       questionReducer,
    singleQuestion: singleQuestionReducer,
  },
});