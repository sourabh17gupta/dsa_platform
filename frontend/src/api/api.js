const BASE_URL = process.env.REACT_APP_BASE_URL;

export const endPoints = {
  LOGIN_API:    BASE_URL + "/api/v1/auth/login",
  REGISTER_API: BASE_URL + "/api/v1/auth/register",
  LOGOUT_API:   BASE_URL + "/api/v1/auth/logout",

  GET_ME_API:            BASE_URL + "/api/v1/auth/me",
  GET_ALL_QUESTIONS_API: BASE_URL + "/api/v1/question/getAllQuestion",
  GET_SUBMISSIONS_API:   BASE_URL + "/api/v1/submission", 
  GET_SUBMISSION_API_BY_USER:BASE_URL + "/api/v1/submission/submissionByUser"
};

export const questionendPint = {
  Question_API:         BASE_URL + "/api/v1/question/getAllQuestion",
  SINGLE_QUESTION_API:  BASE_URL + "/api/v1/question/singleQuestion",
  SUBMIT_CODE_API:      BASE_URL + "/api/v1/submission/submit",
  SUBMISSIONS_API:      BASE_URL + "/api/v1/submission",   
  SUBMISSION_DETAIL_API: BASE_URL + "/api/v1/submission/getSingleSubmission",
  
};