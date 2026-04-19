import {
  setSubmitResult,
  setSubmitLoading,
  setSubmissions,
} from "../../../Redux/Slices/singleQuestion";
import { apiConnector } from "../../apiConnector";
import { questionendPint } from "../../api";

export function submitCode(questionId, code, languageId) {
  return async (dispatch, getState) => {
    dispatch(setSubmitLoading(true));
    dispatch(setSubmitResult(null));

    try {
      const response = await apiConnector(
        "POST",
        questionendPint.SUBMIT_CODE_API,
        { questionId, code, languageId }
      );

      dispatch(setSubmitResult(response.data));
      try {
        const subResponse = await apiConnector(
          "GET",
          `${questionendPint.SUBMISSIONS_API}/${questionId}`
        );
        dispatch(setSubmissions(subResponse.data.submissions || []));
      } catch (e) {
        console.log("submissions refresh error:", e);
      }

    } catch (error) {
      console.log("submitCode ERROR:", error);
      dispatch(
        setSubmitResult({
          success: false,
          message: "Submission failed. Try again.",
        })
      );
    } finally {
      dispatch(setSubmitLoading(false));
    }
  };
}