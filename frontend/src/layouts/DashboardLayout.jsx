import { useState } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { HiOutlineBars3BottomRight } from 'react-icons/hi2'
import DashboardSidebar from '../components/dashboard/DashboardSidebar'
import { useAuth } from '../hooks/useAuth'
import { formatCurrency } from '../utils/dashboardHelpers'
import {
  adminDashboardLinks,
  getDashboardRouteMeta,
  userDashboardLinks,
} from '../utils/dashboardNavigation'

function DashboardLayout() {
  const { currentUser, isAuthenticated, logout } = useAuth()
  const location = useLocation()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  if (!isAuthenticated) {
    return <Navigate replace to="/login" />
  }

  const isAdmin = currentUser?.role === 'admin'
  const navItems = isAdmin ? adminDashboardLinks : userDashboardLinks
  const routeMeta = getDashboardRouteMeta(location.pathname, isAdmin)

  const handleLogout = async () => {
    setIsLoggingOut(true)

    try {
      await logout()
    } finally {
      setIsLoggingOut(false)
      setIsSidebarOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,_#f8fbff_0%,_#eef4ff_100%)] px-4 py-4 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-[1600px] gap-4 lg:gap-6">
        <DashboardSidebar
          currentUser={currentUser}
          isAdmin={isAdmin}
          isLoggingOut={isLoggingOut}
          isOpen={isSidebarOpen}
          navItems={navItems}
          onClose={() => setIsSidebarOpen(false)}
          onLogout={handleLogout}
        />

        <div className="min-w-0 flex-1">
          <header className="surface-card mb-6 flex flex-col gap-4 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <button
                aria-label="Open dashboard menu"
                className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:border-brand-200 hover:text-brand-600 lg:hidden"
                onClick={() => setIsSidebarOpen(true)}
                type="button"
              >
                <HiOutlineBars3BottomRight className="text-2xl" />
              </button>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">
                  {isAdmin ? 'Admin workspace' : 'Passenger workspace'}
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-slate-900 sm:text-4xl">
                  {routeMeta.label}
                </h1>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-500 sm:text-base">
                  {routeMeta.description}
                </p>
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-6 text-slate-600">
              <p className="font-semibold text-slate-900">
                {currentUser?.name || currentUser?.email}
              </p>
              <p className="mt-1">
                {isAdmin ? 'Administrator' : 'Passenger'} | Wallet{' '}
                {formatCurrency(currentUser?.amount)}
              </p>
            </div>
          </header>

          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default DashboardLayout
