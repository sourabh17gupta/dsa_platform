import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { MdLockReset } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate, useParams } from "react-router-dom"

import { resetPassword } from "../api/Services/AuthApi/ResetPasswordApi"

function UpdatePassword() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { token } = useParams()
  const { loading } = useSelector((state) => state.auth)

  const [formData, setFormData] = useState({ password: "", confirmPassword: "" })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const { password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(resetPassword(password, confirmPassword, token, navigate))
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4 py-8">
      <div className="w-full max-w-[420px] bg-[#2a2a2e] rounded-2xl sm:rounded-3xl px-5 py-8 sm:px-8 sm:py-10">

        {/* Icon */}
        <div className="flex justify-center mb-4 sm:mb-5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#e8e6f5] flex items-center justify-center">
            <MdLockReset size={28} className="text-violet-600" />
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-6 sm:mb-7">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Choose new password</h2>
          <p className="text-[#9ca3af] text-xs sm:text-sm">Almost done. Enter your new password and you're all set.</p>
        </div>

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">

          {/* New Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-white">
              New Password <span className="text-pink-400">*</span>
            </label>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter new password"
                className="w-full px-4 py-2.5 sm:py-3 pr-12 rounded-xl bg-[#1e1e22] border border-[#3a3a40] text-white placeholder-[#6b7280] text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-white transition"
              >
                {showPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-white">
              Confirm Password <span className="text-pink-400">*</span>
            </label>
            <div className="relative">
              <input
                required
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                placeholder="Confirm new password"
                className="w-full px-4 py-2.5 sm:py-3 pr-12 rounded-xl bg-[#1e1e22] border border-[#3a3a40] text-white placeholder-[#6b7280] text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-white transition"
              >
                {showConfirmPassword ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-2">
              <div className="w-6 h-6 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-3 sm:py-3.5 mt-1 rounded-xl bg-violet-500 hover:bg-violet-600 active:scale-95 text-white text-sm font-semibold transition"
            >
              Reset Password
            </button>
          )}
        </form>

        {/* Back to login */}
        <div className="mt-5 flex justify-center">
          <Link to="/login">
            <p className="flex items-center gap-x-2 text-[#9ca3af] text-sm hover:text-white transition">
              <BiArrowBack /> Back to login
            </p>
          </Link>
        </div>

      </div>
    </div>
  )
}

export default UpdatePassword