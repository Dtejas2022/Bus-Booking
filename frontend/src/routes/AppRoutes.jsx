import { Suspense, lazy } from 'react'
import { useRoutes } from 'react-router-dom'
import PageLoader from '../components/common/PageLoader'
import DashboardLayout from '../layouts/DashboardLayout'
import PublicLayout from '../layouts/PublicLayout'

const HomePage = lazy(() => import('../pages/Home'))
const AboutPage = lazy(() => import('../pages/About'))
const ContactPage = lazy(() => import('../pages/Contact'))
const DashboardBookingsPage = lazy(() => import('../pages/DashboardBookings'))
const DashboardPage = lazy(() => import('../pages/Dashboard'))
const DashboardPassesPage = lazy(() => import('../pages/DashboardPasses'))
const DashboardProfilePage = lazy(() => import('../pages/DashboardProfile'))
const DashboardRoutesPage = lazy(() => import('../pages/DashboardRoutes'))
const DashboardUsersPage = lazy(() => import('../pages/DashboardUsers'))
const LoginPage = lazy(() => import('../pages/Login'))
const NotFoundPage = lazy(() => import('../pages/NotFound'))
const RegisterPage = lazy(() => import('../pages/Register'))

function AppRoutes() {
  const routes = useRoutes([
    {
      path: '/',
      element: <PublicLayout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'about', element: <AboutPage /> },
        { path: 'contact', element: <ContactPage /> },
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
      ],
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { index: true, element: <DashboardPage /> },
        { path: 'profile', element: <DashboardProfilePage /> },
        { path: 'routes', element: <DashboardRoutesPage /> },
        { path: 'users', element: <DashboardUsersPage /> },
        { path: 'bookings', element: <DashboardBookingsPage /> },
        { path: 'passes', element: <DashboardPassesPage /> },
      ],
    },
    { path: '*', element: <NotFoundPage /> },
  ])

  return <Suspense fallback={<PageLoader />}>{routes}</Suspense>
}

export default AppRoutes
