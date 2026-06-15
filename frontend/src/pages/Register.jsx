import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import AuthField from '../components/auth/AuthField'
import AuthPageShell from '../components/auth/AuthPageShell'
import { useAuth } from '../hooks/useAuth'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { showErrorAlert } from '../utils/swal'

const initialFormValues = {
  name: '',
  email: '',
  mobile: '',
  address: '',
  password: '',
  confirmPassword: '',
}

function Register() {
  useDocumentTitle('Register | SwiftLine')

  const navigate = useNavigate()
  const { isAuthenticated, register } = useAuth()
  const [formValues, setFormValues] = useState(initialFormValues)
  const [fieldErrors, setFieldErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (isAuthenticated) {
    return <Navigate replace to="/dashboard" />
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((current) => ({
      ...current,
      [name]: value,
    }))
    setFieldErrors((current) => ({
      ...current,
      [name]: '',
    }))
  }

  const validateForm = () => {
    const nextErrors = {}

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

    if (!formValues.password) {
      nextErrors.password = 'Please choose a password.'
    } else if (formValues.password.length < 6) {
      nextErrors.password = 'Password should be at least 6 characters.'
    }

    if (formValues.confirmPassword !== formValues.password) {
      nextErrors.confirmPassword = 'Passwords do not match.'
    }

    setFieldErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await register({
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        mobile: formValues.mobile.trim(),
        address: formValues.address.trim(),
        amount: '0',
        password: formValues.password,
      })

      navigate('/dashboard', { replace: true })
    } catch (error) {
      await showErrorAlert({
        title: 'Registration failed',
        text: error.message || 'Unable to create your account right now.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthPageShell
      description="Create a passenger account connected to your backend signup API. New users start with a default wallet balance of 0 to match the current backend schema."
      eyebrow="Create account"
      footerLabel="Already have an account?"
      footerLink="/login"
      footerText="Login here"
      title="Sign up and start booking smarter trips"
    >
      <div className="max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">
          Passenger registration
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Build your SwiftLine account with real backend integration.
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          We will create the account through `/api/users/signup` and then sign you in automatically.
        </p>

        <form className="mt-8 grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
          <AuthField
            autoComplete="name"
            error={fieldErrors.name}
            label="Full name"
            name="name"
            onChange={handleChange}
            placeholder="Your name"
            required
            value={formValues.name}
          />

          <AuthField
            autoComplete="email"
            error={fieldErrors.email}
            label="Email address"
            name="email"
            onChange={handleChange}
            placeholder="you@example.com"
            required
            type="email"
            value={formValues.email}
          />

          <AuthField
            autoComplete="tel"
            error={fieldErrors.mobile}
            label="Mobile number"
            name="mobile"
            onChange={handleChange}
            placeholder="9876543210"
            required
            type="tel"
            value={formValues.mobile}
          />

          <AuthField
            autoComplete="street-address"
            label="Address"
            name="address"
            onChange={handleChange}
            placeholder="City, area, street"
            value={formValues.address}
          />

          <AuthField
            autoComplete="new-password"
            error={fieldErrors.password}
            label="Password"
            name="password"
            onChange={handleChange}
            placeholder="Create a password"
            required
            type="password"
            value={formValues.password}
          />

          <AuthField
            autoComplete="new-password"
            error={fieldErrors.confirmPassword}
            label="Confirm password"
            name="confirmPassword"
            onChange={handleChange}
            placeholder="Repeat your password"
            required
            type="password"
            value={formValues.confirmPassword}
          />

          <div className="rounded-[24px] border border-brand-100 bg-brand-50 px-5 py-4 text-sm leading-7 text-brand-800 md:col-span-2">
            Backend note: the current user model requires an `amount` field, so this
            form creates new users with a starting wallet balance of `0`.
          </div>

          <button className="btn-primary w-full justify-center md:col-span-2" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Creating account...' : 'Create account'}
          </button>
        </form>
      </div>
    </AuthPageShell>
  )
}

export default Register
