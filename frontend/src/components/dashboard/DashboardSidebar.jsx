import { NavLink } from 'react-router-dom'
import { HiOutlineArrowLeftOnRectangle, HiOutlineXMark } from 'react-icons/hi2'
import BrandMark from '../layout/BrandMark'

function SidebarContent({
  currentUser,
  isAdmin,
  isLoggingOut,
  navItems,
  onClose,
  onLogout,
}) {
  const initials = (currentUser?.name || currentUser?.email || 'SW')
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="flex h-full flex-col rounded-[30px] border border-white/10 bg-slate-950 p-5 text-white shadow-[0_24px_70px_rgba(15,23,42,0.25)] sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <BrandMark light onClick={onClose} />
        <button
          aria-label="Close dashboard menu"
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.07] text-white transition hover:bg-white/[0.12] lg:hidden"
          onClick={onClose}
          type="button"
        >
          <HiOutlineXMark className="text-2xl" />
        </button>
      </div>

      <div className="mt-8 rounded-[28px] border border-white/10 bg-white/[0.06] p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-500 text-lg font-semibold text-white">
            {initials}
          </div>
          <div>
            <p className="text-lg font-semibold text-white">
              {currentUser?.name || 'SwiftLine User'}
            </p>
            <p className="mt-1 text-sm text-slate-300">{currentUser?.email}</p>
          </div>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <span className="rounded-full border border-brand-300/30 bg-brand-500/20 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-100">
            {isAdmin ? 'Admin dashboard' : 'User dashboard'}
          </span>
          <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-semibold text-slate-200">
            Wallet {currentUser?.amount ? `Rs ${currentUser.amount}` : 'Rs 0'}
          </span>
        </div>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-2" aria-label="Dashboard sections">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                isActive
                  ? 'bg-white/[0.12] text-white'
                  : 'text-slate-300 hover:bg-white/[0.08] hover:text-white'
              }`
            }
            end={end}
            key={to}
            onClick={onClose}
            to={to}
          >
            {({ isActive }) => (
              <>
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl text-base ${
                    isActive
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                      : 'bg-white/[0.06] text-slate-100'
                  }`}
                >
                  <Icon />
                </span>
                <span>{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <button
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.1]"
        disabled={isLoggingOut}
        onClick={onLogout}
        type="button"
      >
        <HiOutlineArrowLeftOnRectangle className="text-lg" />
        {isLoggingOut ? 'Logging out...' : 'Logout'}
      </button>
    </div>
  )
}

function DashboardSidebar({
  currentUser,
  isAdmin,
  isLoggingOut,
  isOpen,
  navItems,
  onClose,
  onLogout,
}) {
  return (
    <>
      {isOpen ? (
        <div className="fixed inset-0 z-50 bg-slate-950/45 px-4 py-5 backdrop-blur-sm lg:hidden">
          <div className="mx-auto h-full max-w-sm">
            <SidebarContent
              currentUser={currentUser}
              isAdmin={isAdmin}
              isLoggingOut={isLoggingOut}
              navItems={navItems}
              onClose={onClose}
              onLogout={onLogout}
            />
          </div>
        </div>
      ) : null}

      <aside className="hidden lg:block lg:w-80 lg:shrink-0">
        <div className="sticky top-4">
          <SidebarContent
            currentUser={currentUser}
            isAdmin={isAdmin}
            isLoggingOut={isLoggingOut}
            navItems={navItems}
            onClose={onClose}
            onLogout={onLogout}
          />
        </div>
      </aside>
    </>
  )
}

export default DashboardSidebar
