import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Question
  questionData: null,
  testcases: [],
  loading: false,

  // Submit
  submitResult: null,
  submitLoading: false,
  status: null,
  isAccepted: false,

  // Submissions list
  submissions: [],
  submissionsLoading: false,
  submissionsFetched: false, // cache flag — true means already fetched for this question

  // Single submission detail
  submissionDetail: null,
  submissionDetailLoading: false,
};

const singleQuestionSlice = createSlice({
  name: "singleQuestion",
  initialState,
  reducers: {
    setQuestionData(state, action) {
      state.questionData = action.payload;
    },
    setTestcases(state, action) {
      state.testcases = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },

    setSubmitResult(state, action) {
      const payload = action.payload;
      state.submitResult = payload;

      // ── Detect status from your backend response shape:
      // success case:  { message, result: { status: "", input:"", ... } }
      // backend sends status="" (empty string) on accepted
      const resultStatus = payload?.result?.status;

      let isAccepted = false;
      if (
        payload?.success === true ||
        resultStatus === "Accepted" ||
        resultStatus === "" ||       // ✅ your backend sends "" on all-pass
        resultStatus === null ||
        resultStatus === undefined
      ) {
        // If result exists but status is empty/null → all passed
        if (payload?.result !== undefined) {
          isAccepted =
            !resultStatus ||          // empty string or falsy = accepted
            resultStatus === "Accepted";
        } else {
          isAccepted = payload?.success === true;
        }
      }

      // Double-check: if message says "pass on all testcases" → accepted
      if (payload?.message?.includes("pass on all testcases")) {
        isAccepted = true;
      }

      state.isAccepted = isAccepted;
      state.status = isAccepted ? "Accepted" : resultStatus || "Wrong Answer";
    },

    setSubmitLoading(state, action) {
      state.submitLoading = action.payload;
    },

    setSubmissions(state, action) {
      state.submissions = action.payload;
      state.submissionsFetched = true;
    },
    setSubmissionsLoading(state, action) {
      state.submissionsLoading = action.payload;
    },
    resetSubmissions(state) {
      // Call this when navigating to a new question
      state.submissions = [];
      state.submissionsFetched = false;
      state.submissionDetail = null;
    },

    setSubmissionDetail(state, action) {
      state.submissionDetail = action.payload;
    },
    setSubmissionDetailLoading(state, action) {
      state.submissionDetailLoading = action.payload;
    },
  },
});

export const {
  setQuestionData,
  setTestcases,
  setLoading,
  setSubmitResult,
  setSubmitLoading,
  setSubmissions,
  setSubmissionsLoading,
  resetSubmissions,
  setSubmissionDetail,
  setSubmissionDetailLoading,
} = singleQuestionSlice.actions;

export default singleQuestionSlice.reducer;