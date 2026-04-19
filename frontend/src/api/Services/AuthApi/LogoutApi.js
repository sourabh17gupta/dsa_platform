import { toast } from "react-hot-toast";
import { setUser } from "../../../Redux/Slices/ProfileSlice";
import { setToken, setLoading } from "../../../Redux/Slices/authSlice";

export function logout(navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Logging out...");

    try {
      dispatch(setLoading(true));

      dispatch(setUser(null));
      dispatch(setToken(null)); 

      toast.success("Logged Out");

      navigate("/login");

    } catch (error) {
      console.log("LOGOUT ERROR:", error);
      toast.error("Logout Failed");
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}