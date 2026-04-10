import { toast } from "react-hot-toast"
import { setUser, setLoading } from "../../../Redux/Slices/ProfileSlice"
import { apiConnector } from "../../apiConnector"
import { endPoints } from "../../api"

const { LOGIN_API } = endPoints

export function login(email, password, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")

    try {
        console.log("0");
      dispatch(setLoading(true))
      console.log(LOGIN_API);

      const response = await apiConnector("POST", LOGIN_API, {
        email,
        password,
      })
      console.log("2");

      console.log("LOGIN RESPONSE:", response)

      if (!response?.data?.success) {
        throw new Error(response?.data?.message)
      }

      dispatch(setUser(response.data.user))

      localStorage.setItem("token", response.data.token)

      toast.success("Login Successful")

      navigate("/dashboard")

    } catch (error) {
      console.log("LOGIN ERROR:", error)
      toast.error(error.message || "Login Failed")
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}