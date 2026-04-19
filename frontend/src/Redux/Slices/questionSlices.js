import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  question: [],
  loading: false,
};

const questionSlice = createSlice({
  name: "question",
  initialState,
  reducers: {
    setQuestion(state, action) {
      state.question = Array.isArray(action.payload) ? action.payload : [];
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setQuestion, setLoading } = questionSlice.actions;
export default questionSlice.reducer;