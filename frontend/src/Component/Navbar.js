import { useState, useRef, useEffect } from "react"
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import {
  AiOutlineHome,
  AiOutlineSearch,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineClose,
} from "react-icons/ai"
import { LuLayoutDashboard } from "react-icons/lu"
import { BsCodeSlash } from "react-icons/bs"
import { logout } from "../api/Services/AuthApi/LogoutApi"

const navLinks = [
  { title: "Home", path: "/", icon: <AiOutlineHome size={18} /> },
  { title: "Problems", path: "/problemset", icon: <BsCodeSlash size={18} /> },
  { title: "Dashboard", path: "/dashboard", icon: <LuLayoutDashboard size={17} /> },
]

function Navbar() {
  const location = useLocation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  console.log("User: ",user);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const searchRef = useRef(null)

  const matchRoute = (route) =>
    matchPath({ path: route }, location.pathname)

  const handleLogout = () => {
    setShowLogoutModal(true)
  }

  const confirmLogout = () => {
    dispatch(logout(navigate))
    setShowLogoutModal(false)
  }

  const cancelLogout = () => {
    setShowLogoutModal(false)
  }

  

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#3e3e3e] bg-[#1a1a1a]">
      <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-4 md:px-6">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#ffa116] font-mono text-sm font-bold text-black group-hover:bg-[#ffb84d]">
            {"</>"}
          </div>
          <span className="hidden font-mono text-base font-semibold text-white sm:block">
            Code<span className="text-[#ffa116]">Arena</span>
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
                  className={`group relative flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium
                  ${isActive ? "text-[#ffa116]" : "text-[#ababab] hover:text-[#ffa116]"}`}
                >
                  <span className={isActive ? "text-[#ffa116]" : "text-[#6b6b6b] group-hover:text-[#ffa116]"}>
                    {link.icon}
                  </span>
                  {link.title}
                  <span className={`absolute bottom-0 left-3 right-3 h-[2px] bg-[#ffa116]
                  ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-50"}`} />
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
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ffa116] text-xs font-bold text-black cursor-pointer">
                {user?.name?.[0]?.toUpperCase() ?? "U"}
              </div>
            </Link>
          )}

          {/* Logout */}
          {token && (
            <button
              onClick={handleLogout}
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-sm text-[#ababab] hover:text-red-400"
            >
              <AiOutlineLogout />
              Logout
            </button>
          )}

          {/* Auth Buttons */}
          {!token && (
            <div className="hidden sm:flex gap-2">
              <Link to="/login">
                <button className="px-3 py-1.5 border border-[#3e3e3e] text-[#ababab]">
                  Log in
                </button>
              </Link>
              <Link to="/signup">
                <button className="px-3 py-1.5 bg-[#ffa116] text-black">
                  Sign up
                </button>
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#ababab]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden p-4 border-t border-[#3e3e3e] space-y-3">

          

          {navLinks.map((link) => (
            <Link key={link.title} to={link.path} className="block py-2 text-[#ababab]">
              {link.title}
            </Link>
          ))}

          {token && (
            <button onClick={handleLogout} className="mt-2 text-red-400">
              Logout
            </button>
          )}
        </div>
      )}

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-[90%] max-w-sm rounded-xl border border-[#3e3e3e] bg-[#1f1f1f] p-5">

            <h2 className="text-lg font-semibold text-white">
              Confirm Logout
            </h2>

            <p className="mt-2 text-sm text-[#ababab]">
              Are you sure you want to logout?
            </p>

            <div className="mt-5 flex justify-end gap-3">
              <button
                onClick={cancelLogout}
                className="px-4 py-1.5 border border-[#3e3e3e] text-[#ababab]"
              >
                Cancel
              </button>

              <button
                onClick={confirmLogout}
                className="px-4 py-1.5 bg-red-500 text-white"
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