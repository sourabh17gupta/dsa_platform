import { toast } from "react-hot-toast";
import { setUser, setLoading } from "../../../Redux/Slices/ProfileSlice";
import { setToken } from "../../../Redux/Slices/authSlice"; // ✅ IMPORTANT
import { apiConnector } from "../../apiConnector";
import { endPoints } from "../../api";

const { LOGIN_API } = endPoints;

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...");

    try {
      dispatch(setLoading(true));

      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      });

      if (!response?.data?.success) {
        throw new Error(response?.data?.message);
      }

      dispatch(setUser(response.data.user));

      dispatch(setToken(response.data.token));

      toast.success("Login Successful");
      navigate("/");

    } catch (error) {
      console.log("LOGIN ERROR:", error);
      toast.error(error.message || "Login Failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}