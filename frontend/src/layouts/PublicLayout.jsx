import { Outlet } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'
import { useScrollToTop } from '../hooks/useScrollToTop'

function PublicLayout() {
  useScrollToTop()

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-x-0 top-0 -z-10 h-[460px] bg-[radial-gradient(circle_at_top,_rgba(36,92,255,0.15),_transparent_46%),radial-gradient(circle_at_15%_20%,_rgba(255,191,71,0.15),_transparent_20%),linear-gradient(180deg,_#fbfcff_0%,_#f4f7fb_100%)]" />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default PublicLayout
