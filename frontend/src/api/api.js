const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endPoints = {
  // existing auth
  LOGIN_API:    BASE_URL + "/api/v1/auth/login",
  REGISTER_API: BASE_URL + "/api/v1/auth/register",
  LOGOUT_API:   BASE_URL + "/api/v1/auth/logout",

  // dashboard — new
  GET_ME_API:            BASE_URL + "/api/v1/auth/me",
  GET_ALL_QUESTIONS_API: BASE_URL + "/api/v1/question/getAllQuestion",
  GET_SUBMISSIONS_API:   BASE_URL + "/api/v1/submission",  // + /:questionId appended in service
  GET_SUBMISSION_API_BY_USER:BASE_URL + "/api/v1/submission/submissionByUser"
};