import { useEffect, useState } from 'react'
import { FaArrowRotateRight } from 'react-icons/fa6'
import DashboardNotice from '../components/dashboard/DashboardNotice'
import DashboardPageHeader from '../components/dashboard/DashboardPageHeader'
import { useAuth } from '../hooks/useAuth'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import {
  bookBusPass,
  bookBusSeat,
  createBusRoute,
  deleteBusRoute,
  fetchAllBuses,
} from '../services/busService'
import { fetchUserProfile } from '../services/userService'
import { formatCurrency, formatNumber } from '../utils/dashboardHelpers'
import { confirmActionAlert, showErrorAlert, showSuccessAlert, showWarningAlert } from '../utils/swal'

const initialBusForm = {
  vehicleName: '',
  from: '',
  start: '',
  ticket: '',
  capacity: '60',
}

function DashboardRoutes() {
  const { currentUser, updateCurrentUser } = useAuth()
  const isAdmin = currentUser?.role === 'admin'

  useDocumentTitle(isAdmin ? 'Manage Routes | SwiftLine' : 'Routes | SwiftLine')

  const [buses, setBuses] = useState([])
  const [busForm, setBusForm] = useState(initialBusForm)
  const [feedback, setFeedback] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [actionKey, setActionKey] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadRoutes() {
      try {
        const routePayload = await fetchAllBuses()

        if (!isActive) {
          return
        }

        setBuses(routePayload)

        if (!isAdmin) {
          const profilePayload = await fetchUserProfile(currentUser?._id)

          if (!isActive) {
            return
          }

          updateCurrentUser(profilePayload)
        }

        setFeedback(null)
      } catch (error) {
        if (isActive) {
          setFeedback({
            type: 'error',
            message: error.message || 'Unable to load route data right now.',
          })
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    if (currentUser?._id) {
      void loadRoutes()
    }

    return () => {
      isActive = false
    }
  }, [currentUser?._id, isAdmin, updateCurrentUser])

  const refreshRoutes = async ({ background = false, preserveFeedback = false } = {}) => {
    if (background) {
      setIsRefreshing(true)
    } else {
      setIsLoading(true)
    }

    try {
      const routePayload = await fetchAllBuses()
      setBuses(routePayload)

      if (!isAdmin) {
        const profilePayload = await fetchUserProfile(currentUser?._id)
        updateCurrentUser(profilePayload)
      }

      if (!preserveFeedback) {
        setFeedback(null)
      }
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || 'Unable to load route data right now.',
      })
    } finally {
      if (background) {
        setIsRefreshing(false)
      } else {
        setIsLoading(false)
      }
    }
  }

  const handleBusFormChange = (event) => {
    const { name, value } = event.target

    setBusForm((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
  }

  const handleCreateBus = async (event) => {
    event.preventDefault()

    if (!busForm.vehicleName || !busForm.from || !busForm.start || !busForm.ticket) {
      await showWarningAlert({
        title: 'Missing details',
        text: 'Please complete all required route details before creating a bus.',
      })
      return
    }

    setActionKey('create-bus')

    try {
      await createBusRoute(busForm)
      setBusForm(initialBusForm)
      await refreshRoutes({ background: true, preserveFeedback: true })
      setFeedback(null)
      await showSuccessAlert({
        title: 'Bus route created',
        text: 'The new route has been saved to the backend.',
      })
    } catch (error) {
      setFeedback(null)
      await showErrorAlert({
        title: 'Route creation failed',
        text: error.message || 'Unable to create the route right now.',
      })
    } finally {
      setActionKey('')
    }
  }

  const handleDeleteBus = async (busId) => {
    const confirmed = await confirmActionAlert({
      title: 'Delete this route?',
      text: 'This will permanently remove the bus route from the backend.',
      confirmButtonText: 'Delete route',
    })

    if (!confirmed.isConfirmed) {
      return
    }

    setActionKey(`delete-${busId}`)

    try {
      await deleteBusRoute(busId)
      await refreshRoutes({ background: true, preserveFeedback: true })
      setFeedback(null)
      await showSuccessAlert({
        title: 'Route deleted',
        text: 'The bus route was removed successfully.',
      })
    } catch (error) {
      setFeedback(null)
      await showErrorAlert({
        title: 'Delete failed',
        text: error.message || 'Unable to delete the route.',
      })
    } finally {
      setActionKey('')
    }
  }

  const handleBookSeat = async (bus) => {
    setActionKey(`book-${bus._id}`)

    try {
      await bookBusSeat({
        bus_id: bus._id,
        user_id: currentUser._id,
        price: bus.ticket,
      })
      await refreshRoutes({ background: true, preserveFeedback: true })
      setFeedback(null)
      await showSuccessAlert({
        title: 'Seat booked',
        text: `Seat booked successfully for ${bus.vehicleName}.`,
      })
    } catch (error) {
      setFeedback(null)
      await showErrorAlert({
        title: 'Booking failed',
        text: error.message || 'Unable to complete the booking.',
      })
    } finally {
      setActionKey('')
    }
  }

  const handleBookPass = async (bus, passType) => {
    setActionKey(`pass-${bus._id}-${passType}`)

    try {
      await bookBusPass({
        bus_id: bus._id,
        user_id: currentUser._id,
        price: bus.ticket,
        pass: passType,
      })
      await refreshRoutes({ background: true, preserveFeedback: true })
      setFeedback(null)
      await showSuccessAlert({
        title: 'Pass requested',
        text: `${passType} requested successfully for ${bus.vehicleName}.`,
      })
    } catch (error) {
      setFeedback(null)
      await showErrorAlert({
        title: 'Pass request failed',
        text: error.message || 'Unable to request the pass right now.',
      })
    } finally {
      setActionKey('')
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6 pb-10">
        <div className="surface-card h-44 animate-pulse" />
        <div className="grid gap-5 xl:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="surface-card h-72 animate-pulse" key={index} />
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
              void refreshRoutes({ background: true })
            }}
            type="button"
          >
            <FaArrowRotateRight className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        }
        description={
          isAdmin
            ? 'Create and manage bus routes only on this page. It uses the current backend bus schema directly.'
            : 'Browse route data only on this page, then book seats or request passes without mixing in your booking or pass history here.'
        }
        eyebrow={isAdmin ? 'Route manager' : 'Available routes'}
        title={isAdmin ? 'Create and manage bus routes' : 'Browse and book current bus routes'}
      />

      {feedback ? <DashboardNotice message={feedback.message} type={feedback.type} /> : null}

      {isAdmin ? (
        <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
          <form className="surface-card space-y-5 p-6 sm:p-7" onSubmit={handleCreateBus}>
            <div>
              <h3 className="text-2xl font-semibold text-slate-900">Create a new bus route</h3>
              <p className="mt-3 text-sm leading-7 text-slate-500">
                This form follows your backend fields exactly: vehicleName, from, start, ticket, and capacity.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Vehicle name</span>
                <input
                  className="input-shell"
                  name="vehicleName"
                  onChange={handleBusFormChange}
                  placeholder="SwiftLine Express"
                  value={busForm.vehicleName}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Route / from</span>
                <input
                  className="input-shell"
                  name="from"
                  onChange={handleBusFormChange}
                  placeholder="Pune - Mumbai"
                  value={busForm.from}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Start time</span>
                <input
                  className="input-shell"
                  name="start"
                  onChange={handleBusFormChange}
                  placeholder="07:30 AM"
                  value={busForm.start}
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Ticket price</span>
                <input
                  className="input-shell"
                  min="0"
                  name="ticket"
                  onChange={handleBusFormChange}
                  placeholder="499"
                  type="number"
                  value={busForm.ticket}
                />
              </label>

              <label className="block md:col-span-2">
                <span className="mb-2 block text-sm font-semibold text-slate-700">Capacity</span>
                <input
                  className="input-shell"
                  min="1"
                  name="capacity"
                  onChange={handleBusFormChange}
                  placeholder="60"
                  type="number"
                  value={busForm.capacity}
                />
              </label>
            </div>

            <button className="btn-primary w-full justify-center" disabled={actionKey === 'create-bus'} type="submit">
              {actionKey === 'create-bus' ? 'Creating route...' : 'Create bus route'}
            </button>
          </form>

          <div className="grid gap-5">
            {buses.length ? (
              buses.map((bus) => (
                <article className="surface-card p-6" key={bus._id}>
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-semibold text-slate-900">
                          {bus.vehicleName}
                        </h3>
                        <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
                          Vehicle #{bus.vehicleNo}
                        </span>
                      </div>
                      <div className="mt-4 grid gap-3 sm:grid-cols-2">
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Route</p>
                          <p className="mt-2 text-lg font-semibold text-slate-900">{bus.from}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Start</p>
                          <p className="mt-2 text-lg font-semibold text-slate-900">{bus.start}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Ticket</p>
                          <p className="mt-2 text-lg font-semibold text-slate-900">
                            {formatCurrency(bus.ticket)}
                          </p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                          <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Capacity left</p>
                          <p className="mt-2 text-lg font-semibold text-slate-900">
                            {formatNumber(bus.capacity)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col gap-3 lg:w-45">
                      <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
                        {formatNumber(bus.bookings?.length)} bookings | {formatNumber(bus.passes?.length)} passes
                      </div>
                      <button
                        className="btn-secondary w-full justify-center border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
                        disabled={actionKey === `delete-${bus._id}`}
                        onClick={() => {
                          void handleDeleteBus(bus._id)
                        }}
                        type="button"
                      >
                        {actionKey === `delete-${bus._id}` ? 'Deleting...' : 'Delete route'}
                      </button>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div className="surface-card p-8 text-center text-slate-500">
                No bus routes found yet. Create the first route from the form.
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="grid gap-5 xl:grid-cols-2">
          {buses.length ? (
            buses.map((bus) => (
              <article
                className="surface-card overflow-hidden border border-slate-200/80 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.14)]"
                key={bus._id}
              >
                <div className="h-2 bg-linear-to-r from-brand-500 via-amber-400 to-brand-300" />

                <div className="p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div className="max-w-xl">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
                          {bus.vehicleName}
                        </h3>
                        <span className="rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
                          Vehicle #{bus.vehicleNo}
                        </span>
                      </div>

                      <p className="mt-4 text-sm uppercase tracking-[0.24em] text-slate-400">
                        Route overview
                      </p>
                      <p className="mt-2 text-xl font-semibold text-slate-900">{bus.from}</p>
                      <p className="mt-2 text-sm text-slate-500">Starts at {bus.start}</p>
                    </div>

                    <div className="rounded-[28px] border border-brand-100 bg-linear-to-br from-brand-50 to-white px-5 py-4 text-right shadow-sm">
                      <p className="text-xs uppercase tracking-[0.22em] text-brand-700">Ticket</p>
                      <p className="mt-2 text-3xl font-semibold text-slate-900">
                        {formatCurrency(bus.ticket)}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">per traveler</p>
                    </div>
                  </div>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Seats left</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        {formatNumber(bus.capacity)}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Activity</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        {formatNumber(bus.bookings?.length)} bookings
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-50 p-4 sm:p-5">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500">
                        Booking actions
                      </p>
                      <p className="text-sm text-slate-500">
                        Choose a seat booking or a pass request.
                      </p>
                    </div>

                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                      <button
                        className="btn-primary w-full justify-center shadow-sm"
                        disabled={Number.parseInt(bus.capacity, 10) < 1 || actionKey === `book-${bus._id}`}
                        onClick={() => {
                          void handleBookSeat(bus)
                        }}
                        type="button"
                      >
                        {actionKey === `book-${bus._id}` ? 'Booking...' : 'Book Seat'}
                      </button>
                      <button
                        className="btn-secondary w-full justify-center bg-white"
                        disabled={actionKey === `pass-${bus._id}-Daily Pass`}
                        onClick={() => {
                          void handleBookPass(bus, 'Daily Pass')
                        }}
                        type="button"
                      >
                        {actionKey === `pass-${bus._id}-Daily Pass` ? 'Requesting...' : 'Daily Pass'}
                      </button>
                      <button
                        className="btn-secondary w-full justify-center bg-white"
                        disabled={actionKey === `pass-${bus._id}-Monthly Pass`}
                        onClick={() => {
                          void handleBookPass(bus, 'Monthly Pass')
                        }}
                        type="button"
                      >
                        {actionKey === `pass-${bus._id}-Monthly Pass` ? 'Requesting...' : 'Monthly Pass'}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="surface-card p-8 text-center text-slate-500 xl:col-span-2">
              No bus routes are available yet.
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default DashboardRoutes
