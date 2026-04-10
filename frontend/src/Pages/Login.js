import { useState } from "react"
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

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="w-full max-w-md bg-[#2a2a2e] rounded-3xl px-10 py-12">

        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-[#e8e6f5] flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
              <path d="M12 12C14.76 12 17 9.76 17 7C17 4.24 14.76 2 12 2C9.24 2 7 4.24 7 7C7 9.76 9.24 12 12 12Z" fill="#6c63d4"/>
              <path d="M12 14C7.58 14 4 17.58 4 22H20C20 17.58 16.42 14 12 14Z" fill="#6c63d4"/>
            </svg>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-[#9ca3af] text-base">Sign in to continue to your account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-5">

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white">
              Email address <span className="text-pink-400">*</span>
            </label>
            <input
              required
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              placeholder="you@example.com"
              className="w-full px-4 py-3.5 rounded-xl bg-[#1e1e22] border border-[#3a3a40] text-white placeholder-[#6b7280] text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-white">
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
                className="w-full px-4 py-3.5 pr-12 rounded-xl bg-[#1e1e22] border border-[#3a3a40] text-white placeholder-[#6b7280] text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-white transition"
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-violet-400 hover:text-violet-300 transition">
                Forgot password?
              </Link>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 mt-1 rounded-xl bg-violet-500 hover:bg-violet-600 active:scale-95 text-white text-base font-semibold transition"
          >
            Sign in
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-[#9ca3af] mt-6">
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