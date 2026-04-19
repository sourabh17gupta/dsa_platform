import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllQuestions } from "../../api/Services/dashboardApi";

export const fetchDashboardData = createAsyncThunk(
  "dashboard/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllQuestions();
      // backend returns { message, data: [...] }
      return res.data || [];
    } catch (err) {
      return rejectWithValue(err?.data?.message || "Failed to load questions");
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    questions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default dashboardSlice.reducer;