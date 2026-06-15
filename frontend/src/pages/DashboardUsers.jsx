import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { FaArrowRotateRight } from 'react-icons/fa6'
import DashboardNotice from '../components/dashboard/DashboardNotice'
import DashboardPageHeader from '../components/dashboard/DashboardPageHeader'
import { useAuth } from '../hooks/useAuth'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { fetchAllUsers } from '../services/userService'
import { formatCurrency, formatNumber } from '../utils/dashboardHelpers'

function DashboardUsers() {
  const { currentUser } = useAuth()
  const isAdmin = currentUser?.role === 'admin'

  useDocumentTitle('Users | SwiftLine')

  const [users, setUsers] = useState([])
  const [feedback, setFeedback] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    let isActive = true

    async function loadUsers() {
      try {
        const usersPayload = await fetchAllUsers()

        if (!isActive) {
          return
        }

        setUsers(usersPayload)
        setFeedback(null)
      } catch (error) {
        if (isActive) {
          setFeedback({
            type: 'error',
            message: error.message || 'Unable to load users right now.',
          })
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    if (isAdmin) {
      void loadUsers()
    }

    return () => {
      isActive = false
    }
  }, [isAdmin])

  const refreshUsers = async ({ background = false, preserveFeedback = false } = {}) => {
    if (background) {
      setIsRefreshing(true)
    } else {
      setIsLoading(true)
    }

    try {
      const usersPayload = await fetchAllUsers()
      setUsers(usersPayload)

      if (!preserveFeedback) {
        setFeedback(null)
      }
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || 'Unable to load users right now.',
      })
    } finally {
      if (background) {
        setIsRefreshing(false)
      } else {
        setIsLoading(false)
      }
    }
  }

  if (!isAdmin) {
    return <Navigate replace to="/dashboard" />
  }

  if (isLoading) {
    return (
      <div className="space-y-6 pb-10">
        <div className="surface-card h-44 animate-pulse" />
        <div className="surface-card h-[520px] animate-pulse" />
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-10">
      <DashboardPageHeader
        action={
          <button
            className="btn-secondary px-4 py-3"
            disabled={isRefreshing}
            onClick={() => {
              void refreshUsers({ background: true })
            }}
            type="button"
          >
            <FaArrowRotateRight className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        }
        description="This tab shows only user directory data from the backend, including wallet amount, contact details, booking references, and pass references."
        eyebrow="Users directory"
        title="Review registered users"
      />

      {feedback ? <DashboardNotice message={feedback.message} type={feedback.type} /> : null}

      {users.length ? (
        <div className="surface-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">User</th>
                  <th className="px-5 py-4 font-semibold">Role</th>
                  <th className="px-5 py-4 font-semibold">Wallet</th>
                  <th className="px-5 py-4 font-semibold">Mobile</th>
                  <th className="px-5 py-4 font-semibold">Bookings</th>
                  <th className="px-5 py-4 font-semibold">Passes</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr className="border-t border-slate-100" key={user._id}>
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-slate-900">{user.name}</p>
                        <p className="mt-1 text-slate-500">{user.email}</p>
                        {user.address ? (
                          <p className="mt-1 text-slate-400">{user.address}</p>
                        ) : null}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700">
                        {user.role || 'user'}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-medium text-slate-700">
                      {formatCurrency(user.amount)}
                    </td>
                    <td className="px-5 py-4 text-slate-600">{user.mobile}</td>
                    <td className="px-5 py-4 text-slate-600">
                      {formatNumber(user.bookings?.length)}
                    </td>
                    <td className="px-5 py-4 text-slate-600">
                      {formatNumber(user.passes?.length)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="surface-card p-8 text-center text-slate-500">
          No users found in the backend yet.
        </div>
      )}
    </div>
  )
}

export default DashboardUsers
