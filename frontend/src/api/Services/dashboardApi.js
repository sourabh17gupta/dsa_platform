import { apiConnector } from "../apiConnector";
import { endPoints } from "../api";

/**
 * GET /api/auth/me
 * Returns { success, user: { name, email } }
 */
export const getMe = async () => {
  const response = await apiConnector("GET", endPoints.GET_ME_API);
  return response.data;
};

/**
 * GET /api/question/all
 * Returns { message, data: [ { _id, heading, type } ] }
 */
export const getAllQuestions = async () => {
  const response = await apiConnector("GET", endPoints.GET_ALL_QUESTIONS_API);
  return response.data;
};

/**
 * GET /api/submission/:questionId
 * Returns { success, submissions: [...] }
 */
export const getSubmissionsByQuestion = async (questionId) => {
  const response = await apiConnector(
    "GET",
    `${endPoints.GET_SUBMISSIONS_API}/${questionId}`
  );
  return response.data;
};

export const getSubmissionByUser = async()=>{
    const response = await apiConnector("GET",`${endPoints.GET_SUBMISSION_API_BY_USER}`);
    console.log(response.data);
    return response.data;
}