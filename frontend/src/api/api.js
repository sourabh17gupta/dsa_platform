const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log(BASE_URL)

export const endPoints={
    SIGNUP_API: BASE_URL + "/api/v1/auth/register",
    LOGIN_API:BASE_URL+"/api/v1/auth/login",
    RESETPASSTOKEN_API: BASE_URL + "/api/v1/auth/resetpassword",
    RESETPASSWORD_API: BASE_URL + "/api/v1/auth/resetpassword",
    LOGOUT_API:BASE_URL+"/api/v1/auth/logout"
}