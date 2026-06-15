import { useEffect, useState } from 'react'
import { FaArrowRotateRight, FaClockRotateLeft, FaTicketSimple, FaWallet } from 'react-icons/fa6'
import { HiMiniUserCircle } from 'react-icons/hi2'
import DashboardNotice from '../components/dashboard/DashboardNotice'
import DashboardPageHeader from '../components/dashboard/DashboardPageHeader'
import DashboardStatCard from '../components/dashboard/DashboardStatCard'
import { useAuth } from '../hooks/useAuth'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { fetchUserProfile, updateUserProfile } from '../services/userService'
import { formatCurrency, formatNumber } from '../utils/dashboardHelpers'
import { showErrorAlert, showSuccessAlert } from '../utils/swal'

const initialFormValues = {
  name: '',
  email: '',
  mobile: '',
  address: '',
  amount: '0',
}

function buildFormValues(profile) {
  return {
    name: profile?.name || '',
    email: profile?.email || '',
    mobile: profile?.mobile || '',
    address: profile?.address || '',
    amount: String(profile?.amount ?? '0'),
  }
}

function DashboardProfile() {
  const { currentUser, updateCurrentUser } = useAuth()
  const isAdmin = currentUser?.role === 'admin'

  useDocumentTitle(isAdmin ? 'Admin Profile | SwiftLine' : 'Profile | SwiftLine')

  const [profile, setProfile] = useState(null)
  const [formValues, setFormValues] = useState(initialFormValues)
  const [fieldErrors, setFieldErrors] = useState({})
  const [feedback, setFeedback] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const applyProfile = (profilePayload) => {
    setProfile(profilePayload)
    setFormValues(buildFormValues(profilePayload))
    updateCurrentUser(profilePayload)
  }

  useEffect(() => {
    let isActive = true

    async function loadInitialProfile() {
      try {
        const profilePayload = await fetchUserProfile(currentUser?._id)

        if (!isActive) {
          return
        }

        setProfile(profilePayload)
        setFormValues(buildFormValues(profilePayload))
        updateCurrentUser(profilePayload)
        setFeedback(null)
      } catch (error) {
        if (isActive) {
          setFeedback({
            type: 'error',
            message: error.message || 'Unable to load your profile right now.',
          })
        }
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }

    if (currentUser?._id) {
      void loadInitialProfile()
    }

    return () => {
      isActive = false
    }
  }, [currentUser?._id, updateCurrentUser])

  const loadProfile = async ({ background = false, preserveFeedback = false } = {}) => {
    if (background) {
      setIsRefreshing(true)
    } else {
      setIsLoading(true)
    }

    try {
      const profilePayload = await fetchUserProfile(currentUser?._id)
      applyProfile(profilePayload)

      if (!preserveFeedback) {
        setFeedback(null)
      }
    } catch (error) {
      setFeedback({
        type: 'error',
        message: error.message || 'Unable to load your profile right now.',
      })
    } finally {
      if (background) {
        setIsRefreshing(false)
      } else {
        setIsLoading(false)
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))
    setFieldErrors((currentErrors) => ({
      ...currentErrors,
      [name]: '',
    }))
  }

  const validateForm = () => {
    const nextErrors = {}
    const numericAmount = Number.parseInt(formValues.amount || '0', 10)

    if (!formValues.name.trim()) {
      nextErrors.name = 'Please enter your full name.'
    }

    if (!formValues.email.trim()) {
      nextErrors.email = 'Please enter your email address.'
    }

    if (!formValues.mobile.trim()) {
      nextErrors.mobile = 'Please enter your mobile number.'
    } else if (formValues.mobile.trim().length < 10) {
      nextErrors.mobile = 'Please enter a valid mobile number.'
    }

    if (Number.isNaN(numericAmount) || numericAmount < 0) {
      nextErrors.amount = 'Amount must be zero or more.'
    }

    setFieldErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSaving(true)
    setFeedback(null)

    try {
      const updatedProfile = await updateUserProfile(currentUser._id, {
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        mobile: formValues.mobile.trim(),
        address: formValues.address.trim(),
        amount: String(Number.parseInt(formValues.amount || '0', 10)),
      })

      applyProfile(updatedProfile)
      setFeedback(null)
      await showSuccessAlert({
        title: 'Profile updated',
        text: 'Your account details were saved successfully.',
      })
    } catch (error) {
      const message = error.message || 'Unable to update your profile right now.'
      setFeedback(null)
      await showErrorAlert({
        title: 'Profile update failed',
        text: message,
      })
    } finally {
      setIsSaving(false)
    }
  }

  const profileStats = [
    {
      label: 'Wallet balance',
      value: formatCurrency(profile?.amount),
      helper: 'This is the same amount field stored in the backend user record.',
      icon: FaWallet,
      tone: 'brand',
    },
    {
      label: 'Booking refs',
      value: formatNumber(profile?.bookings?.length),
      helper: 'Booking IDs currently linked to this account.',
      icon: FaClockRotateLeft,
      tone: 'amber',
    },
    {
      label: 'Pass refs',
      value: formatNumber(profile?.passes?.length),
      helper: 'Pass IDs currently linked to this account.',
      icon: FaTicketSimple,
      tone: 'emerald',
    },
    {
      label: 'Account role',
      value: profile?.role === 'admin' ? 'Admin' : 'User',
      helper: 'Role value coming directly from the backend user model.',
      icon: HiMiniUserCircle,
      tone: 'slate',
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
        <div className="surface-card h-135 animate-pulse" />
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
              void loadProfile({ background: true })
            }}
            type="button"
          >
            <FaArrowRotateRight className={isRefreshing ? 'animate-spin' : ''} />
            {isRefreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        }
        description="This page is connected to the backend profile update API. It updates your current session immediately after a successful save, including the wallet amount field."
        eyebrow="Profile settings"
        title="Manage your account details"
      />

      {feedback ? <DashboardNotice message={feedback.message} type={feedback.type} /> : null}

      <DashboardNotice message="Password is intentionally not editable here because the current backend update endpoint does not hash password changes." />

      <div className="grid gap-5 xl:grid-cols-4">
        {profileStats.map((stat) => (
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

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <form className="surface-card space-y-5 p-6 sm:p-7" onSubmit={handleSubmit}>
          <div>
            <h3 className="text-2xl font-semibold text-slate-900">Update profile</h3>
            <p className="mt-3 text-sm leading-7 text-slate-500">
              These fields map directly to the current user model: name, email, mobile, address, and amount.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Full name</span>
              <input
                className="input-shell"
                name="name"
                onChange={handleChange}
                placeholder="Your full name"
                value={formValues.name}
              />
              {fieldErrors.name ? (
                <p className="mt-2 text-sm text-rose-600">{fieldErrors.name}</p>
              ) : null}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Email</span>
              <input
                className="input-shell"
                name="email"
                onChange={handleChange}
                placeholder="you@example.com"
                type="email"
                value={formValues.email}
              />
              {fieldErrors.email ? (
                <p className="mt-2 text-sm text-rose-600">{fieldErrors.email}</p>
              ) : null}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Mobile</span>
              <input
                className="input-shell"
                name="mobile"
                onChange={handleChange}
                placeholder="9876543210"
                type="tel"
                value={formValues.mobile}
              />
              {fieldErrors.mobile ? (
                <p className="mt-2 text-sm text-rose-600">{fieldErrors.mobile}</p>
              ) : null}
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Wallet amount</span>
              <input
                className="input-shell"
                min="0"
                name="amount"
                onChange={handleChange}
                placeholder="0"
                type="number"
                value={formValues.amount}
              />
              {fieldErrors.amount ? (
                <p className="mt-2 text-sm text-rose-600">{fieldErrors.amount}</p>
              ) : null}
            </label>

            <label className="block md:col-span-2">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Address</span>
              <textarea
                className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-300 focus:ring-4 focus:ring-brand-100"
                name="address"
                onChange={handleChange}
                placeholder="Area, city, landmark"
                value={formValues.address}
              />
            </label>
          </div>

          <button className="btn-primary w-full justify-center" disabled={isSaving} type="submit">
            {isSaving ? 'Saving profile...' : 'Save profile changes'}
          </button>
        </form>

        <div className="surface-card p-6 sm:p-7">
          <h3 className="text-2xl font-semibold text-slate-900">Backend-linked profile note</h3>
          <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600">
            <p>
              The wallet amount field is included here because your backend update route allows it, and the dashboard overview uses that same value.
            </p>
            <p>
              After saving, the sidebar and overview cards update from the same profile payload, so you do not need to log in again to see the new amount.
            </p>
            <p>
              This page edits only the signed-in user profile. It does not modify other users or create any admin-only profile management flow.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardProfile
