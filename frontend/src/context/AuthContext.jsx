import { createContext, useCallback, useEffect, useState } from 'react'
import { loginUser, logoutUser, registerUser } from '../services/authService'
import { showSuccessAlert } from '../utils/swal'

const STORAGE_KEY = 'swiftline-auth-session'

const AuthContext = createContext(null)

function sanitizeUser(user) {
  if (!user) {
    return null
  }

  const safeUser = { ...user }
  delete safeUser.password
  return safeUser
}

function readStoredSession() {
  if (typeof window === 'undefined') {
    return { token: null, user: null }
  }

  try {
    const storedSession = window.localStorage.getItem(STORAGE_KEY)
    return storedSession ? JSON.parse(storedSession) : { token: null, user: null }
  } catch {
    return { token: null, user: null }
  }
}

function persistSession(session) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
}

function clearSessionStorage() {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.removeItem(STORAGE_KEY)
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession)

  useEffect(() => {
    if (session?.token && session?.user) {
      persistSession(session)
      return
    }

    clearSessionStorage()
  }, [session])

  const finishLogin = useCallback((payload) => {
    const nextSession = {
      token: payload.token,
      user: sanitizeUser(payload.user),
    }

    setSession(nextSession)
    return nextSession
  }, [])

  const login = useCallback(async (credentials) => {
    const response = await loginUser(credentials)
    await showSuccessAlert({
      title: 'Login successful',
      text: 'You have been signed in and will be taken to your dashboard.',
    })
    return finishLogin(response)
  }, [finishLogin])

  const register = useCallback(async (payload) => {
    await registerUser(payload)
    const response = await loginUser({
      email: payload.email,
      password: payload.password,
    })

    await showSuccessAlert({
      title: 'Registration successful',
      text: 'Your account has been created and you are now signed in.',
    })
    return finishLogin(response)
  }, [finishLogin])

  const logout = useCallback(async () => {
    try {
      await logoutUser()
    } finally {
      setSession({ token: null, user: null })
    }
  }, [])

  const updateCurrentUser = useCallback((userPayload) => {
    const safeUser = sanitizeUser(userPayload)

    setSession((currentSession) => {
      if (!currentSession?.user || !safeUser) {
        return currentSession
      }

      return {
        ...currentSession,
        user: {
          ...currentSession.user,
          ...safeUser,
        },
      }
    })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        currentUser: session.user,
        isAuthenticated: Boolean(session.token && session.user),
        login,
        logout,
        register,
        token: session.token,
        updateCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
