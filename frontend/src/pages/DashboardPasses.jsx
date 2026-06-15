import { useEffect, useState } from 'react'
import { FaArrowRotateRight } from 'react-icons/fa6'
import DashboardNotice from '../components/dashboard/DashboardNotice'
import DashboardPageHeader from '../components/dashboard/DashboardPageHeader'
import { useAuth } from '../hooks/useAuth'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import {
  approvePassRequest,
  fetchAllPasses,
  fetchPassHistory,
} from '../services/userService'
import {
  formatCurrency,
  formatDateTime,
  getPassStatus,
  getPassType,
  sortNewestFirst,
} from '../utils/dashboardHelpers'
import { showErrorAlert, showSuccessAlert } from '../utils/swal'

function DashboardPasses() {
  const { currentUser } = useAuth()
  const isAdmin = currentUser?.role === 'admin'

  useDocumentTitle(isAdmin ? 'Pass Requests | SwiftLine' : 'Pass History | SwiftLine')

  const [passes, setPasses] = useState([])
  const [feedback, setFeedback] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [actionKey, setActionKey] = useState('')

  useEffect(() => {
    let isActive = true

    async function loadPasses() {
      try {
        const passPayload = isAdmin
          ? await fetchAllPasses()
          : await fetchPassHistory(currentUser?._id)

        if (!isActive) {
          return
        }

        setPasses(sortNewestFirst(passPayload))
        setFeedback(null)
      } catch (error) {
        if (isActive) {
          setFeedback({
            type: 'error',
            message: error.message || 'Unable to load pass history right now.',
          })
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    if (currentUser?._id) {
      void loadPasses()
    }

    return () => {
      isActive = false
    }
  }, [currentUser?._id, isAdmin])

  const refreshPasses = async ({ background = false, preserveFeedback = false } = {}) => {
    if (background) {
      setIsRefreshing(true)
    } else {
      setIsLoading(true)
    }

    try {
      const passPayload = isAdmin
        ? await fetchAllPasses()
        : await fetchPassHistory(currentUser?._id)

      setPasses(sortNewestFirst(passPayload))

      if (!preserveFeedback) {
        setFeedback(null)
      }
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || 'Unable to load pass history right now.',
      })
    } finally {
      if (background) {
        setIsRefreshing(false)
      } else {
        setIsLoading(false)
      }
    }
  }

  const handleApprovePass = async (passRecord) => {
    setActionKey(`approve-${passRecord._id}`)

    try {
      await approvePassRequest(
        passRecord._id,
        passRecord.daily ? 'Daily' : 'Monthly',
      )
      await refreshPasses({ background: true, preserveFeedback: true })
      setFeedback(null)
      await showSuccessAlert({
        title: 'Pass approved',
        text: `${getPassType(passRecord)} approved successfully.`,
      })
    } catch (error) {
      setFeedback(null)
      await showErrorAlert({
        title: 'Approval failed',
        text: error.message || 'Unable to approve the pass right now.',
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
              void refreshPasses({ background: true })
            }}
            type="button"
          >
            <FaArrowRotateRight className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        }
        description={
          isAdmin
            ? 'This tab stays focused on pass approval data only, including passenger details, route details, and approval status.'
            : 'This tab stays focused on your own daily and monthly pass requests only.'
        }
        eyebrow={isAdmin ? 'Pass approvals' : 'Pass history'}
        title={isAdmin ? 'Review and approve pass requests' : 'Track your pass requests'}
      />

      {feedback ? <DashboardNotice message={feedback.message} type={feedback.type} /> : null}

      {passes.length ? (
        <div className="grid gap-5">
          {passes.map((passRecord) => {
            const status = getPassStatus(passRecord)
            const isPending = status.label === 'Pending'

            return (
              <article className="surface-card p-6" key={passRecord._id}>
                <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
                  <div className="grid gap-5 md:grid-cols-2 xl:flex-1">
                    {isAdmin ? (
                      <div>
                        <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                          Passenger
                        </p>
                        <h3 className="mt-2 text-xl font-semibold text-slate-900">
                          {passRecord.user_id?.name || 'Unknown user'}
                        </h3>
                        <p className="mt-2 text-sm text-slate-500">
                          {passRecord.user_id?.email}
                        </p>
                      </div>
                    ) : null}

                    <div>
                      <p className="text-xs uppercase tracking-[0.24em] text-slate-400">
                        Route
                      </p>
                      <h3 className="mt-2 text-xl font-semibold text-slate-900">
                        {passRecord.bus_id?.vehicleName || 'Unknown bus'}
                      </h3>
                      <p className="mt-2 text-sm text-slate-500">
                        {passRecord.bus_id?.from || 'Unknown route'} | {passRecord.bus_id?.start || 'No start set'}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Pass type</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        {getPassType(passRecord)}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                      <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Recorded price</p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        {formatCurrency(passRecord.price)}
                      </p>
                    </div>
                  </div>

                  <div className="flex min-w-[220px] flex-col gap-3">
                    <span className={`inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-semibold ${status.className}`}>
                      {status.label}
                    </span>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-500">
                      Requested {formatDateTime(passRecord.createdAt)}
                    </div>

                    {isAdmin ? (
                      <button
                        className="btn-primary w-full justify-center"
                        disabled={!isPending || actionKey === `approve-${passRecord._id}`}
                        onClick={() => {
                          void handleApprovePass(passRecord)
                        }}
                        type="button"
                      >
                        {actionKey === `approve-${passRecord._id}`
                          ? 'Approving...'
                          : isPending
                            ? 'Approve request'
                            : 'Already processed'}
                      </button>
                    ) : null}
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <div className="surface-card p-8 text-center text-slate-500">
          {isAdmin ? 'No pass requests found yet.' : 'No pass requests found yet. Daily and monthly passes will appear here.'}
        </div>
      )}
    </div>
  )
}

export default DashboardPasses
