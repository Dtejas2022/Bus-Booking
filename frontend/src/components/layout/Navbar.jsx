import { useState } from 'react'
import { HiOutlineBars3BottomRight, HiOutlineXMark } from 'react-icons/hi2'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { navigationLinks } from '../../utils/siteData'
import { useScrolled } from '../../hooks/useScrolled'
import BrandMark from './BrandMark'

function Navbar() {
  const scrolled = useScrolled(18)
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const { currentUser, isAuthenticated, logout } = useAuth()

  const shellClassName = scrolled
    ? 'border-white/70 bg-white/90 shadow-[0_24px_60px_rgba(15,23,42,0.12)]'
    : 'border-white/40 bg-white/65'

  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      await logout()
      setIsOpen(false)
    } finally {
      setIsLoggingOut(false)
    }
  }

  return (
    <header className="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className={`mx-auto max-w-7xl rounded-[28px] border backdrop-blur-xl transition-all duration-300 ${shellClassName}`}>
        <div className="flex items-center justify-between px-5 py-4 lg:px-7">
          <BrandMark onClick={() => setIsOpen(false)} />

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
            {navigationLinks.map((item) => (
              <NavLink
                className={({ isActive }) =>
                  `${isActive ? 'nav-link nav-link-active' : 'nav-link'}`
                }
                key={item.to}
                onClick={() => setIsOpen(false)}
                to={item.to}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <>
                <div className="rounded-full border border-slate-200 bg-white/80 px-4 py-3 text-sm text-slate-600">
                  Signed in as{' '}
                  <span className="font-semibold text-slate-900">
                    {currentUser?.name || currentUser?.email}
                  </span>
                </div>
                <Link className="btn-primary px-5 py-3" to="/dashboard">
                  Dashboard
                </Link>
                <button
                  className="btn-secondary px-5 py-3"
                  disabled={isLoggingOut}
                  onClick={handleLogout}
                  type="button"
                >
                  {isLoggingOut ? 'Logging out...' : 'Logout'}
                </button>
              </>
            ) : (
              <>
                <Link className="btn-secondary px-5 py-3" to="/login">
                  Login
                </Link>
                <Link className="btn-primary px-5 py-3" to="/register">
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 transition hover:border-brand-200 hover:text-brand-600 lg:hidden"
            onClick={() => setIsOpen((open) => !open)}
            type="button"
          >
            {isOpen ? <HiOutlineXMark className="text-2xl" /> : <HiOutlineBars3BottomRight className="text-2xl" />}
          </button>
        </div>

        {isOpen ? (
          <div
            className="border-t border-slate-200/80 px-5 pb-5 pt-4 lg:hidden"
            id="mobile-navigation"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile">
              {navigationLinks.map((item) => (
                <NavLink
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? 'bg-brand-50 text-brand-700'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-brand-600'
                    }`
                  }
                  key={item.to}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {isAuthenticated ? (
                <>
                  <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 sm:col-span-2">
                    Signed in as{' '}
                    <span className="font-semibold text-slate-900">
                      {currentUser?.name || currentUser?.email}
                    </span>
                  </div>
                  <Link
                    className="btn-primary w-full justify-center"
                    onClick={() => setIsOpen(false)}
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                  <button
                    className="btn-secondary w-full justify-center"
                    disabled={isLoggingOut}
                    onClick={handleLogout}
                    type="button"
                  >
                    {isLoggingOut ? 'Logging out...' : 'Logout'}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    className="btn-secondary w-full justify-center"
                    onClick={() => setIsOpen(false)}
                    to="/login"
                  >
                    Login
                  </Link>
                  <Link
                    className="btn-primary w-full justify-center"
                    onClick={() => setIsOpen(false)}
                    to="/register"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}

export default Navbar
