import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { FaArrowRotateRight } from 'react-icons/fa6'
import DashboardNotice from '../components/dashboard/DashboardNotice'
import DashboardPageHeader from '../components/dashboard/DashboardPageHeader'
import { useAuth } from '../hooks/useAuth'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { fetchBookingHistory } from '../services/userService'
import { formatCurrency, formatDateTime } from '../utils/dashboardHelpers'

function DashboardBookings() {
  const { currentUser } = useAuth()
  const isAdmin = currentUser?.role === 'admin'

  useDocumentTitle('Booking History | SwiftLine')

  const [bookings, setBookings] = useState([])
  const [feedback, setFeedback] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    let isActive = true

    async function loadBookings() {
      try {
        const bookingsPayload = await fetchBookingHistory(currentUser?._id)

        if (!isActive) {
          return
        }

        setBookings(bookingsPayload)
        setFeedback(null)
      } catch (error) {
        if (isActive) {
          setFeedback({
            type: 'error',
            message: error.message || 'Unable to load booking history right now.',
          })
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    if (!isAdmin && currentUser?._id) {
      void loadBookings()
    }

    return () => {
      isActive = false
    }
  }, [currentUser?._id, isAdmin])

  const refreshBookings = async ({ background = false, preserveFeedback = false } = {}) => {
    if (background) {
      setIsRefreshing(true)
    } else {
      setIsLoading(true)
    }

    try {
      const bookingsPayload = await fetchBookingHistory(currentUser?._id)
      setBookings(bookingsPayload)

      if (!preserveFeedback) {
        setFeedback(null)
      }
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || 'Unable to load booking history right now.',
      })
    } finally {
      if (background) {
        setIsRefreshing(false)
      } else {
        setIsLoading(false)
      }
    }
  }

  if (isAdmin) {
    return <Navigate replace to="/dashboard" />
  }

  if (isLoading) {
    return (
      <div className="space-y-6 pb-10">
        <div className="surface-card h-44 animate-pulse" />
        <div className="grid gap-5 xl:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="surface-card h-64 animate-pulse" key={index} />
          ))}
        </div>
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
              void refreshBookings({ background: true })
            }}
            type="button"
          >
            <FaArrowRotateRight className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        }
        description="This tab is intentionally focused only on the signed-in user's booking history from the backend."
        eyebrow="Booking history"
        title="Review your confirmed trips"
      />

      {feedback ? <DashboardNotice message={feedback.message} type={feedback.type} /> : null}

      {bookings.length ? (
        <div className="grid gap-5 xl:grid-cols-2">
          {bookings.map((booking) => (
            <article className="surface-card p-6" key={booking._id}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                    {booking.bus_id?.vehicleNo ? `Vehicle #${booking.bus_id.vehicleNo}` : 'Booked trip'}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold text-slate-900">
                    {booking.bus_id?.vehicleName || 'Unknown bus'}
                  </h3>
                  <p className="mt-3 text-sm text-slate-500">
                    Route: {booking.bus_id?.from || 'Unknown route'}
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Start: {booking.bus_id?.start || 'Not provided'}
                  </p>
                </div>

                <div className="rounded-3xl border border-brand-100 bg-brand-50 px-4 py-3 text-right">
                  <p className="text-xs uppercase tracking-[0.2em] text-brand-700">Price</p>
                  <p className="mt-2 text-2xl font-semibold text-slate-900">
                    {formatCurrency(booking.price)}
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                Booked on {formatDateTime(booking.createdAt)}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="surface-card p-8 text-center text-slate-500">
          No bookings found yet. Your confirmed trips will appear here.
        </div>
      )}
    </div>
  )
}

export default DashboardBookings
