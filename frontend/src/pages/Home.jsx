import FeaturesSection from '../components/home/FeaturesSection'
import HeroCarousel from '../components/home/HeroCarousel'
import PopularRoutesSection from '../components/home/PopularRoutesSection'
import SearchBusCard from '../components/home/SearchBusCard'
import TestimonialsSection from '../components/home/TestimonialsSection'
import AppDownloadBanner from '../components/home/AppDownloadBanner'
import WhyChooseUsSection from '../components/home/WhyChooseUsSection'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function Home() {
  useDocumentTitle('SwiftLine | Online Bus Booking Platform')

  return (
    <>
      <HeroCarousel />
      <SearchBusCard />
      <FeaturesSection />
      <PopularRoutesSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <AppDownloadBanner />
    </>
  )
}

export default Home
