// src/api/Services/QuestionApi/getSubmission.js
import {
  setSubmissions,
  setSubmissionsLoading,
} from "../../../Redux/Slices/singleQuestion";
import { apiConnector } from "../../apiConnector";
import { questionendPint } from "../../api";

export function getSubmissions(questionId) {
  return async (dispatch, getState) => {

    const { submissionsFetched } = getState().singleQuestion;
    if (submissionsFetched) {
      console.log("Submissions already in Redux, skipping fetch");
      return;
    }

    dispatch(setSubmissionsLoading(true));
    try {
      const response = await apiConnector(
        "GET",
        `${questionendPint.SUBMISSIONS_API}/${questionId}`
      );
      console.log(response.data);
      dispatch(setSubmissions(response.data.submissions || []));
      // setSubmissions also sets submissionsFetched = true in the slice
    } catch (error) {
      console.error("getSubmissions ERROR:", error);
      dispatch(setSubmissions([]));
    } finally {
      dispatch(setSubmissionsLoading(false));
    }
  };
}