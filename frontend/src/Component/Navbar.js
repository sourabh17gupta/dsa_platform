import { useState, useEffect } from "react"
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai"
import { LuLayoutDashboard } from "react-icons/lu"
import { BsCodeSlash } from "react-icons/bs"
import { logout } from "../api/Services/AuthApi/LogoutApi"

const navLinks = [
  { title: "Home",      path: "/",          icon: <AiOutlineHome size={18} /> },
  { title: "Problems",  path: "/problemset", icon: <BsCodeSlash size={18} /> },
  { title: "Dashboard", path: "/dashboard",  icon: <LuLayoutDashboard size={17} /> },
]

function Navbar() {
  const location  = useLocation()
  const dispatch  = useDispatch()
  const navigate  = useNavigate()

  const { token } = useSelector((state) => state.auth)
  const { user }  = useSelector((state) => state.profile)

  const [mobileMenuOpen,  setMobileMenuOpen]  = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const matchRoute = (route) => matchPath({ path: route }, location.pathname)

  const confirmLogout = () => {
    dispatch(logout(navigate))
    setShowLogoutModal(false)
  }

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#1e1e2e] bg-[#0a0a0f]">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 md:px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-600 font-mono text-xs font-bold text-white group-hover:bg-violet-500 transition-colors">
            {"</>"}
          </div>
          <span className="hidden font-mono text-base font-semibold text-white sm:block">
            Code<span className="text-violet-400">Arena</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = matchRoute(link.path)
            return (
              <li key={link.title}>
                <Link
                  to={link.path}
                  className={`group relative flex items-center gap-1.5 rounded-md px-3 py-1.5 font-mono text-sm font-medium transition-colors
                    ${isActive ? "text-violet-400" : "text-slate-500 hover:text-violet-400"}`}
                >
                  <span className={isActive ? "text-violet-400" : "text-slate-600 group-hover:text-violet-400 transition-colors"}>
                    {link.icon}
                  </span>
                  {link.title}
                  <span className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full bg-violet-500
                    ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-40"} transition-opacity`} />
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Right Section */}
        <div className="flex items-center gap-2">

          {/* Avatar */}
          {token && user && (
            <Link to="/dashboard">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/20 border border-violet-500/30 text-xs font-bold text-violet-300 font-mono cursor-pointer hover:bg-violet-500/30 transition-colors">
                {user?.name?.[0]?.toUpperCase() ?? "U"}
              </div>
            </Link>
          )}

          {/* Logout */}
          {token && (
            <button
              onClick={() => setShowLogoutModal(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 font-mono text-sm text-slate-500 hover:text-red-400 transition-colors cursor-pointer"
            >
              <AiOutlineLogout />
              Logout
            </button>
          )}

          {/* Auth Buttons */}
          {!token && (
            <div className="hidden sm:flex gap-2">
              <Link to="/login">
                <button className="px-3 py-1.5 border border-[#1e1e2e] bg-[#111118] font-mono text-sm text-slate-400 rounded-lg hover:border-violet-600 hover:text-violet-400 transition-colors cursor-pointer">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-3 py-1.5 bg-violet-600 font-mono text-sm text-white rounded-lg hover:bg-violet-500 transition-colors cursor-pointer">
                  Sign up
                </button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-slate-500 hover:text-slate-300 transition-colors cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 py-4 border-t border-[#1e1e2e] bg-[#0a0a0f] flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = matchRoute(link.path)
            return (
              <Link
                key={link.title}
                to={link.path}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg font-mono text-sm transition-colors
                  ${isActive
                    ? "bg-violet-500/10 text-violet-400 border border-violet-500/20"
                    : "text-slate-500 hover:text-slate-200 hover:bg-[#111118]"
                  }`}
              >
                {link.icon}
                {link.title}
              </Link>
            )
          })}

          {!token && (
            <div className="flex gap-2 mt-2 pt-3 border-t border-[#1e1e2e]">
              <Link to="/login" className="flex-1">
                <button className="w-full px-3 py-2 border border-[#1e1e2e] bg-[#111118] font-mono text-sm text-slate-400 rounded-lg hover:border-violet-600 transition-colors cursor-pointer">
                  Log in
                </button>
              </Link>
              <Link to="/signup" className="flex-1">
                <button className="w-full px-3 py-2 bg-violet-600 font-mono text-sm text-white rounded-lg hover:bg-violet-500 transition-colors cursor-pointer">
                  Sign up
                </button>
              </Link>
            </div>
          )}

          {token && (
            <button
              onClick={() => setShowLogoutModal(true)}
              className="mt-2 pt-3 border-t border-[#1e1e2e] flex items-center gap-2 px-3 py-2 font-mono text-sm text-red-400 hover:bg-red-500/5 rounded-lg transition-colors cursor-pointer"
            >
              <AiOutlineLogout />
              Logout
            </button>
          )}
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70">
          <div className="w-[90%] max-w-sm rounded-xl border border-[#1e1e2e] bg-[#111118] p-6">
            <h2 className="text-base font-extrabold text-white font-mono tracking-tight">
              Confirm Logout
            </h2>
            <p className="mt-2 text-sm text-slate-500 font-mono">
              // Are you sure you want to logout?
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-1.5 border border-[#1e1e2e] text-slate-400 font-mono text-sm rounded-lg hover:border-slate-500 hover:text-slate-200 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 font-mono text-sm rounded-lg hover:bg-red-500/20 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar