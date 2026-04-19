import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

import { signUp } from "../api/Services/AuthApi/SignupApi"
import { setProgress } from "../Redux/Slices/loadingBarSlice"

function SignupForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [showPassword, setShowPassword] = useState(false)

  const { username, email, password } = formData

  const handleOnChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    dispatch(setProgress(30))

    dispatch(
      signUp(
        {
          username,
          email,
          password,
        },
        navigate
      )
    )

    setFormData({
      username: "",
      email: "",
      password: "",
    })
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black px-4 py-8">
      <div className="w-full max-w-[420px] bg-[#2a2a2e] rounded-2xl sm:rounded-3xl px-5 py-8 sm:px-8 sm:py-10">

        {/* Heading */}
        <div className="text-center mb-5 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
            Create account
          </h2>
          <p className="text-[#9ca3af] text-xs sm:text-sm">
            Sign up to get started
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">

          {/* Username */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs sm:text-sm font-semibold text-white">
              Username <span className="text-pink-400">*</span>
            </label>
            <input
              required
              type="text"
              name="username"
              value={username}
              onChange={handleOnChange}
              placeholder="Enter username"
              className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-[#1e1e22] border border-[#3a3a40] text-white placeholder-[#6b7280] text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition"
            />
          </div>

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
                placeholder="Create password"
                className="w-full px-4 py-2.5 sm:py-3 pr-12 rounded-xl bg-[#1e1e22] border border-[#3a3a40] text-white placeholder-[#6b7280] text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#6b7280] hover:text-white transition"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible size={20} />
                ) : (
                  <AiOutlineEye size={20} />
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 sm:py-3.5 mt-1 rounded-xl bg-violet-500 hover:bg-violet-600 active:scale-95 text-white text-sm font-semibold transition"
          >
            Create Account
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs sm:text-sm text-[#9ca3af] mt-4 sm:mt-5">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-violet-400 hover:text-violet-300 font-semibold transition"
          >
            Sign in
          </Link>
        </p>

      </div>
    </div>
  )
}

export default SignupForm