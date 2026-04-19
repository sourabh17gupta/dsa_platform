import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { FcGoogle } from "react-icons/fc"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { login } from "../api/Services/AuthApi/LoginApi"
import { setProgress } from "../Redux/Slices/loadingBarSlice"

function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [showPassword, setShowPassword] = useState(false)
  const { email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(setProgress(60))
    dispatch(login(email, password, navigate))
  }

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_BASE_URL}/api/v1/auth/google`
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4 py-8">
      <div className="w-full max-w-[420px] bg-[#2a2a2e] rounded-2xl sm:rounded-3xl px-5 py-8 sm:px-8 sm:py-10">

        {/* Icon */}
        {/* <div className="flex justify-center mb-4 sm:mb-5">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-[#e8e6f5] flex items-center justify-center">
            <FcGoogle size={24} className="sm:text-[28px]" />
          </div>
        </div> */}

        {/* Heading */}
        <div className="text-center mb-6 sm:mb-7">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">Welcome back</h2>
          <p className="text-[#9ca3af] text-xs sm:text-sm">Sign in to continue to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-white">
              Email address <span className="text-pink-400">*</span>
            </label>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="Enter Email Address"
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-[#1e1e22] border border-[#3a3a40] text-white placeholder-[#6b7280] text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-white">
              Password <span className="text-pink-400">*</span>
            </label>
            <div className="relative">
              <input
                required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                placeholder="Enter password"
                className="w-full px-4 py-2.5 sm:py-3 pr-12 rounded-xl bg-[#1e1e22] border border-[#3a3a40] text-white placeholder-[#6b7280] text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-white transition"
              >
                {showPassword
                  ? <AiOutlineEyeInvisible size={20} />
                  : <AiOutlineEye size={20} />
                }
              </button>
            </div>
            <div className="text-right">
              <Link to="/forgot-password" className="text-xs text-violet-400 hover:text-violet-300 transition">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 sm:py-3.5 mt-1 rounded-xl bg-violet-500 hover:bg-violet-600 active:scale-95 text-white text-sm font-semibold transition"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4 sm:my-5">
          <div className="flex-1 h-px bg-[#3a3a40]" />
          <span className="text-xs text-[#6b7280]">or continue with</span>
          <div className="flex-1 h-px bg-[#3a3a40]" />
        </div>

        {/* Google Button */}
        <button
          type="button"
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 py-2.5 sm:py-3 rounded-xl bg-[#1e1e22] border border-[#3a3a40] text-white text-sm font-medium hover:bg-[#26262b] active:scale-95 transition"
        >
          <FcGoogle size={20} />
          Continue with Google
        </button>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-[#9ca3af] mt-4 sm:mt-5">
          Don't have an account?{" "}
          <Link to="/signup" className="text-violet-400 hover:text-violet-300 font-semibold transition">
            Sign up
          </Link>
        </p>

      </div>
    </div>
  )
}

export default LoginForm