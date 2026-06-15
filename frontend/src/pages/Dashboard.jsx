import { useEffect, useState } from 'react'
import {
  FaArrowRotateRight,
  FaBusSimple,
  FaClockRotateLeft,
  FaTicketSimple,
  FaUsers,
  FaWallet,
} from 'react-icons/fa6'
import DashboardBarChart from '../components/dashboard/DashboardBarChart'
import DashboardDonutChart from '../components/dashboard/DashboardDonutChart'
import DashboardNotice from '../components/dashboard/DashboardNotice'
import DashboardPageHeader from '../components/dashboard/DashboardPageHeader'
import DashboardStatCard from '../components/dashboard/DashboardStatCard'
import { useAuth } from '../hooks/useAuth'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { fetchAllBuses } from '../services/busService'
import {
  fetchAllPasses,
  fetchAllUsers,
  fetchBookingHistory,
  fetchPassHistory,
  fetchUserProfile,
} from '../services/userService'
import { formatCurrency, formatNumber, getPassStatus } from '../utils/dashboardHelpers'

function parseCount(value) {
  const parsedValue = Number.parseInt(value ?? 0, 10)
  return Number.isNaN(parsedValue) ? 0 : parsedValue
}

async function fetchOverviewData({ isAdmin, userId }) {
  if (isAdmin) {
    const [buses, users, passes] = await Promise.all([
      fetchAllBuses(),
      fetchAllUsers(),
      fetchAllPasses(),
    ])

    return {
      allPasses: passes,
      bookings: [],
      buses,
      passes: [],
      profile: null,
      users,
    }
  }

  const [profile, buses, bookings, passes] = await Promise.all([
    fetchUserProfile(userId),
    fetchAllBuses(),
    fetchBookingHistory(userId),
    fetchPassHistory(userId),
  ])

  return {
    allPasses: [],
    bookings,
    buses,
    passes,
    profile,
    users: [],
  }
}

function Dashboard() {
  const { currentUser, updateCurrentUser } = useAuth()
  const isAdmin = currentUser?.role === 'admin'

  useDocumentTitle(isAdmin ? 'Admin Overview | SwiftLine' : 'Dashboard Overview | SwiftLine')

  const [dashboardData, setDashboardData] = useState({
    allPasses: [],
    bookings: [],
    buses: [],
    passes: [],
    profile: null,
    users: [],
  })
  const [feedback, setFeedback] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    let isActive = true

    async function loadOverview() {
      try {
        const payload = await fetchOverviewData({
          isAdmin,
          userId: currentUser?._id,
        })

        if (!isActive) {
          return
        }

        setDashboardData(payload)

        if (payload.profile) {
          updateCurrentUser(payload.profile)
        }

        setFeedback(null)
      } catch (error) {
        if (isActive) {
          setFeedback({
            type: 'error',
            message: error.message || 'Unable to load dashboard overview right now.',
          })
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    if (currentUser?._id) {
      void loadOverview()
    }

    return () => {
      isActive = false
    }
  }, [currentUser?._id, isAdmin, updateCurrentUser])

  const refreshOverview = async ({ background = false, preserveFeedback = false } = {}) => {
    if (background) {
      setIsRefreshing(true)
    } else {
      setIsLoading(true)
    }

    try {
      const payload = await fetchOverviewData({
        isAdmin,
        userId: currentUser?._id,
      })

      setDashboardData(payload)

      if (payload.profile) {
        updateCurrentUser(payload.profile)
      }

      if (!preserveFeedback) {
        setFeedback(null)
      }
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || 'Unable to load dashboard overview right now.',
      })
    } finally {
      if (background) {
        setIsRefreshing(false)
      } else {
        setIsLoading(false)
      }
    }
  }

  const activeProfile = dashboardData.profile || currentUser
  const routeCount = dashboardData.buses.length
  const userCount = dashboardData.users.length
  const bookingCount = dashboardData.bookings.length
  const passCount = isAdmin ? dashboardData.allPasses.length : dashboardData.passes.length
  const pendingPassCount = (isAdmin ? dashboardData.allPasses : dashboardData.passes).filter(
    (passRecord) => getPassStatus(passRecord).label === 'Pending',
  ).length
  const walletAmount = parseCount(activeProfile?.amount)

  const overviewStats = isAdmin
    ? [
        {
          label: 'Active routes',
          value: formatNumber(routeCount),
          rawValue: routeCount,
          helper: 'Current bus route entries available in the backend.',
          icon: FaBusSimple,
          tone: 'brand',
          color: '#245cff',
        },
        {
          label: 'Registered users',
          value: formatNumber(userCount),
          rawValue: userCount,
          helper: 'User accounts currently stored in the user collection.',
          icon: FaUsers,
          tone: 'amber',
          color: '#f59e0b',
        },
        {
          label: 'Total passes',
          value: formatNumber(passCount),
          rawValue: passCount,
          helper: 'Daily and monthly pass records across the platform.',
          icon: FaTicketSimple,
          tone: 'emerald',
          color: '#10b981',
        },
        {
          label: 'Pending passes',
          value: formatNumber(pendingPassCount),
          rawValue: pendingPassCount,
          helper: 'Requests still waiting for admin approval.',
          icon: FaClockRotateLeft,
          tone: 'slate',
          color: '#475569',
        },
      ]
    : [
        {
          label: 'Wallet balance',
          value: formatCurrency(walletAmount),
          rawValue: walletAmount,
          helper: 'Live amount pulled from your backend profile.',
          icon: FaWallet,
          tone: 'brand',
          color: '#245cff',
        },
        {
          label: 'Booked trips',
          value: formatNumber(bookingCount),
          rawValue: bookingCount,
          helper: 'Confirmed reservations currently linked to your account.',
          icon: FaClockRotateLeft,
          tone: 'amber',
          color: '#f59e0b',
        },
        {
          label: 'Travel passes',
          value: formatNumber(passCount),
          rawValue: passCount,
          helper: 'Daily and monthly pass requests on your profile.',
          icon: FaTicketSimple,
          tone: 'emerald',
          color: '#10b981',
        },
        {
          label: 'Available routes',
          value: formatNumber(routeCount),
          rawValue: routeCount,
          helper: 'Routes currently open for booking or pass requests.',
          icon: FaBusSimple,
          tone: 'slate',
          color: '#475569',
        },
      ]

  if (isLoading) {
    return (
      <div className="space-y-6 pb-10">
        <div className="surface-card h-44 animate-pulse" />
        <div className="grid gap-5 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="surface-card h-36 animate-pulse" key={index} />
          ))}
        </div>
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="surface-card h-96 animate-pulse" />
          <div className="surface-card h-96 animate-pulse" />
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
              void refreshOverview({ background: true })
            }}
            type="button"
          >
            <FaArrowRotateRight className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        }
        description={
          isAdmin
            ? 'This overview keeps the admin dashboard intentionally simple: just live summary cards and charts based on those same card values.'
            : 'This overview keeps the user dashboard simple: wallet, trips, passes, and routes, with charts built directly from those same card values.'
        }
        eyebrow="Dashboard overview"
        title={isAdmin ? 'Simple platform snapshot' : 'Simple trip snapshot'}
      />

      {feedback ? <DashboardNotice message={feedback.message} type={feedback.type} /> : null}

      <DashboardNotice
        message="Both charts below are generated only from the overview cards above, so the visuals always stay in sync with those same values."
      />

      <div className="grid gap-5 xl:grid-cols-4">
        {overviewStats.map((stat) => (
          <DashboardStatCard
            helper={stat.helper}
            icon={stat.icon}
            key={stat.label}
            label={stat.label}
            tone={stat.tone}
            value={stat.value}
          />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <DashboardBarChart items={overviewStats} />
        <DashboardDonutChart items={overviewStats} />
      </div>
    </div>
  )
}

export default Dashboard
