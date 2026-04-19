import {
  setQuestionData,
  setTestcases,
  setLoading,
  resetSubmissions,
} from "../../../Redux/Slices/singleQuestion";
import { apiConnector } from "../../apiConnector";
import { questionendPint } from "../../api";

export function getSingleQuestion(id) {
  return async (dispatch) => {
    dispatch(setLoading(true));
    dispatch(resetSubmissions());
    try {
      const response = await apiConnector(
        "GET",
        `${questionendPint.SINGLE_QUESTION_API}/${id}`
      );
      dispatch(setQuestionData(response.data.data));
      dispatch(setTestcases(response.data.testcases));
    } catch (error) {
      console.log("getSingleQuestion ERROR:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
}