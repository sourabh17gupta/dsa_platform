import { toast } from "react-hot-toast"
import { setLoading, setToken } from "../../../Redux/Slices/authSlice"
import { setUser } from "../../../Redux/Slices/ProfileSlice"
import { apiConnector } from "../../apiConnector"
import { endPoints } from "../../api"
import { setProgress } from "../../../Redux/Slices/loadingBarSlice"

const { SIGNUP_API } = endPoints

export function signUp(formData, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Creating account...")
    dispatch(setLoading(true))

    try {
      const response = await apiConnector("POST", SIGNUP_API, formData)

      console.log("SIGNUP API RESPONSE:", response)

      if (!response.data.success) {
        throw new Error(response.data.message)
      }

      const token = response.data.token
      const user = response.data.user

      dispatch(setToken(token))
      dispatch(setUser(user))

      localStorage.setItem("token", JSON.stringify(token))
      localStorage.setItem("user", JSON.stringify(user))

      dispatch(setProgress(100))
      toast.success("Signup Successful")

      navigate("/") 

    } catch (error) {
      console.log("SIGNUP API ERROR:", error)
      toast.error(error?.response?.data?.message || "Signup Failed")
      dispatch(setProgress(100))
      navigate("/signup")
    }

    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}