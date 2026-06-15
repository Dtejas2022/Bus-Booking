import { FaBusSimple, FaClockRotateLeft, FaTicketSimple, FaUserPen, FaUsers } from 'react-icons/fa6'
import { HiMiniSquares2X2 } from 'react-icons/hi2'

export const adminDashboardLinks = [
  {
    label: 'Overview',
    to: '/dashboard',
    end: true,
    icon: HiMiniSquares2X2,
    description: 'Simple platform cards and charts based on your live dashboard totals.',
  },
  {
    label: 'Profile',
    to: '/dashboard/profile',
    icon: FaUserPen,
    description: 'Update your signed-in admin profile with the backend profile API.',
  },
  {
    label: 'Routes',
    to: '/dashboard/routes',
    icon: FaBusSimple,
    description: 'Create, review, and delete bus routes from the backend bus collection.',
  },
  {
    label: 'Users',
    to: '/dashboard/users',
    icon: FaUsers,
    description: 'View registered passengers and their stored account details.',
  },
  {
    label: 'Passes',
    to: '/dashboard/passes',
    icon: FaTicketSimple,
    description: 'Review and approve daily or monthly pass requests.',
  },
]

export const userDashboardLinks = [
  {
    label: 'Overview',
    to: '/dashboard',
    end: true,
    icon: HiMiniSquares2X2,
    description: 'Simple cards and charts based on your wallet, trips, passes, and routes.',
  },
  {
    label: 'Profile',
    to: '/dashboard/profile',
    icon: FaUserPen,
    description: 'Update your profile details and wallet value with the backend user API.',
  },
  {
    label: 'Routes',
    to: '/dashboard/routes',
    icon: FaBusSimple,
    description: 'Browse active routes, book seats, and request travel passes.',
  },
  {
    label: 'Bookings',
    to: '/dashboard/bookings',
    icon: FaClockRotateLeft,
    description: 'See only your confirmed trip history from the backend.',
  },
  {
    label: 'Passes',
    to: '/dashboard/passes',
    icon: FaTicketSimple,
    description: 'Track your daily and monthly pass requests in one place.',
  },
]

export function getDashboardRouteMeta(pathname, isAdmin) {
  const links = isAdmin ? adminDashboardLinks : userDashboardLinks
  return links.find((item) => item.to === pathname) || links[0]
}
