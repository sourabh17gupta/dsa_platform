import {
  setSubmissionDetail,
  setSubmissionDetailLoading,
} from "../../../Redux/Slices/singleQuestion";
import { apiConnector } from "../../apiConnector";
import { questionendPint } from "../../api";

export function getSubmissionDetail(submissionId) {
  return async (dispatch) => {
    dispatch(setSubmissionDetailLoading(true));
    dispatch(setSubmissionDetail(null));
    try {
      const response = await apiConnector(
        "GET",
        `${questionendPint.SUBMISSION_DETAIL_API}/${submissionId}`
      );
      dispatch(setSubmissionDetail(response.data.submission));
    } catch (error) {
      console.log("getSubmissionDetail ERROR:", error);
    } finally {
      dispatch(setSubmissionDetailLoading(false));
    }
  };
}