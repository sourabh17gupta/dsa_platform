import { setQuestion, setLoading } from "../../../Redux/Slices/questionSlices";
import { apiConnector } from "../../apiConnector";
import { questionendPint } from "../../api";

export function getAllQuestion() {
  return async (dispatch, getState) => {
    console.log("hi 1");
    const existing = getState().question.question;
    if (existing && existing.length > 0) return;
    console.log("hi 2");


    dispatch(setLoading(true));
    try {
      const response = await apiConnector("GET", questionendPint.Question_API);
      dispatch(setQuestion(response.data.data));
    } catch (error) {
      console.log("getAllQuestion ERROR:", error);
    } finally {
      dispatch(setLoading(false));
    }
  };
}