import { useState } from "react"
import { BiArrowBack } from "react-icons/bi"
import { MdLockReset } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getPasswordResetToken } from "../api/Services/AuthApi/ResetPasswordApi"

function ForgotPassword() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.auth)

  const handleOnSubmit = (e) => {
    e.preventDefault()
    dispatch(getPasswordResetToken(email, setEmailSent))
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
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-1">
            {!emailSent ? "Reset your password" : "Check your email"}
          </h2>
          <p className="text-[#9ca3af] text-xs sm:text-sm">
            {!emailSent
              ? "Enter your email and we'll send you a reset link"
              : `We have sent the reset link to ${email}`}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleOnSubmit} className="flex flex-col gap-4">
          {!emailSent && (
            <div className="flex flex-col gap-1.5">
              <label className="text-xs sm:text-sm font-semibold text-white">
                Email address <span className="text-pink-400">*</span>
              </label>
              <input
                required
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 sm:py-3 rounded-xl bg-[#1e1e22] border border-[#3a3a40] text-white placeholder-[#6b7280] text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition"
              />
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-2">
              <div className="w-6 h-6 border-2 border-violet-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-3 sm:py-3.5 mt-1 rounded-xl bg-violet-500 hover:bg-violet-600 active:scale-95 text-white text-sm font-semibold transition"
            >
              {!emailSent ? "Send reset link" : "Resend Email"}
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

export default ForgotPassword