import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AuthField from '../components/auth/AuthField'
import AuthPageShell from '../components/auth/AuthPageShell'
import { useAuth } from '../hooks/useAuth'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { showErrorAlert } from '../utils/swal'

const initialFormValues = {
  email: '',
  password: '',
}

function Login() {
  useDocumentTitle('Login | SwiftLine')

  const navigate = useNavigate()
  const { isAuthenticated, login } = useAuth()
  const [formValues, setFormValues] = useState(initialFormValues)
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
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      await login(formValues)
      navigate('/dashboard', { replace: true })
    } catch (error) {
      await showErrorAlert({
        title: 'Login failed',
        text: error.message || 'Unable to sign in right now.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthPageShell
      description="Sign in to continue with your bookings, stored passenger details, and trip activity using the backend already running on your project."
      eyebrow="Welcome back"
      footerLabel="Need a new account?"
      footerLink="/register"
      footerText="Create one here"
      title="Login to your SwiftLine account"
    >
      <div className="max-w-xl">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">
          Account access
        </p>
        <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
          Pick up your journey where you left it.
        </h2>
        <p className="mt-4 text-base leading-7 text-slate-600">
          Use the same email and password supported by your current backend login API.
        </p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <AuthField
            autoComplete="email"
            label="Email address"
            name="email"
            onChange={handleChange}
            placeholder="you@example.com"
            required
            type="email"
            value={formValues.email}
          />

          <AuthField
            autoComplete="current-password"
            label="Password"
            name="password"
            onChange={handleChange}
            placeholder="Enter your password"
            required
            type="password"
            value={formValues.password}
          />

          <button className="btn-primary w-full justify-center" disabled={isSubmitting} type="submit">
            {isSubmitting ? 'Signing in...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 px-5 py-4 text-sm leading-7 text-slate-600">
          New registrations are also supported here. If you do not have an account yet,
          head to{' '}
          <Link className="font-semibold text-brand-600" to="/register">
            signup
          </Link>
          .
        </div>
      </div>
    </AuthPageShell>
  )
}

export default Login
