import {
  FaApple,
  FaAward,
  FaBusSimple,
  FaCircleCheck,
  FaClock,
  FaEnvelope,
  FaFacebookF,
  FaHeadset,
  FaInstagram,
  FaLinkedinIn,
  FaLocationDot,
  FaPhone,
  FaRoute,
  FaShieldHeart,
  FaStar,
  FaUserGroup,
  FaXTwitter,
} from 'react-icons/fa6'
import {
  HiMiniArrowsRightLeft,
  HiMiniCalendarDays,
  HiMiniDevicePhoneMobile,
  HiMiniMapPin,
} from 'react-icons/hi2'
import appPreviewImage from '../assets/hero.png'
import aboutImage from '../assets/optimized/krisjanis-kazaks-75yQg9Bi5pQ-unsplash.jpg'
import heroSlideOne from '../assets/optimized/city-bus-autumn-forest-road-vehicle-motion.jpg'
import heroSlideTwo from '../assets/optimized/yellow-articulated-city-bus-downtown-public-transport.jpg'
import heroSlideThree from '../assets/optimized/kamil-kalkan-SXm_2GY9ecE-unsplash.jpg'
import whyChooseImage from '../assets/optimized/mitchell-johnson-nd5oU1Duhf0-unsplash.jpg'

export const navigationLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
]

export const heroSlides = [
  {
    id: 'express-booking',
    eyebrow: 'Next generation intercity travel',
    title: 'Book your perfect bus seat in minutes, not moments of stress.',
    subtitle:
      'Compare verified operators, live boarding points, premium sleeper options, and flexible departure slots in one elegant booking flow.',
    image: heroSlideOne,
    imagePosition: 'center center',
    ctaPrimary: { label: 'Book Tickets', href: '#search-panel' },
    ctaSecondary: { label: 'Explore Routes', href: '#popular-routes' },
    chips: ['96% on-time departures', 'Boarding alerts', 'Instant refunds'],
    stats: [
      { value: '2.3M+', label: 'Seats booked yearly' },
      { value: '180+', label: 'Verified operators' },
      { value: '4.8/5', label: 'Average passenger rating' },
    ],
  },
  {
    id: 'smart-routes',
    eyebrow: 'Premium route discovery',
    title: 'Plan faster with smart route suggestions and live travel confidence.',
    subtitle:
      'From weekend getaways to business commutes, SwiftLine helps travellers find dependable routes with transparent pricing and real reviews.',
    image: heroSlideTwo,
    imagePosition: 'center center',
    ctaPrimary: { label: 'Book Tickets', href: '#search-panel' },
    ctaSecondary: { label: 'Explore Routes', href: '#popular-routes' },
    chips: ['Dynamic fares', 'Window seat picks', 'Trusted reviews'],
    stats: [
      { value: '280+', label: 'Cities connected' },
      { value: '35K+', label: 'Daily departures' },
      { value: '24/7', label: 'Passenger support' },
    ],
  },
  {
    id: 'mobile-ready',
    eyebrow: 'Travel startup experience',
    title: 'Stay updated from booking to boarding with live trip visibility.',
    subtitle:
      'Track schedules, receive reminder notifications, and manage your journey through a smooth public booking experience built for mobile travellers.',
    image: heroSlideThree,
    imagePosition: 'center center',
    ctaPrimary: { label: 'Book Tickets', href: '#search-panel' },
    ctaSecondary: { label: 'Explore Routes', href: '#popular-routes' },
    chips: ['Live tracking', 'Digital tickets', 'Fast checkouts'],
    stats: [
      { value: '12 min', label: 'Average booking flow' },
      { value: '87%', label: 'Repeat travellers' },
      { value: '30+', label: 'App-only offers monthly' },
    ],
  },
]

export const heroHighlights = [
  {
    title: 'Verified operator quality',
    description: 'Every partner is reviewed for punctuality, cleanliness, and service.',
    icon: FaShieldHeart,
  },
  {
    title: 'Real-time route visibility',
    description: 'Live updates help travellers track departures and delay changes.',
    icon: FaLocationDot,
  },
  {
    title: 'Travel-first support',
    description: 'Dedicated teams are available before, during, and after your trip.',
    icon: FaHeadset,
  },
]

export const searchFieldIcons = {
  from: HiMiniMapPin,
  to: HiMiniMapPin,
  date: HiMiniCalendarDays,
  swap: HiMiniArrowsRightLeft,
}

export const popularSearches = [
  'Mumbai to Pune',
  'Bangalore to Chennai',
  'Hyderabad to Goa',
  'Delhi to Jaipur',
]

export const platformFeatures = [
  {
    title: 'Easy Booking',
    description: 'Reserve seats in a few taps with a booking flow designed for speed and clarity.',
    icon: FaBusSimple,
  },
  {
    title: 'Live Bus Tracking',
    description: 'Monitor departures and arrival progress with live route visibility.',
    icon: FaLocationDot,
  },
  {
    title: 'Secure Payments',
    description: 'Pay safely using trusted payment gateways and transparent pricing.',
    icon: FaShieldHeart,
  },
  {
    title: 'Multiple Bus Operators',
    description: 'Choose from premium, sleeper, seater, and AC options across trusted brands.',
    icon: FaRoute,
  },
  {
    title: '24/7 Support',
    description: 'Reach dedicated support teams whenever your travel plan needs a hand.',
    icon: FaHeadset,
  },
  {
    title: 'Instant Ticket Confirmation',
    description: 'Receive digital tickets, boarding details, and updates the moment you book.',
    icon: FaCircleCheck,
  },
]

export const popularRoutes = [
  {
    from: 'Pune',
    to: 'Mumbai',
    duration: '3h 30m',
    price: 'From Rs 449',
    frequency: '120+ buses daily',
    note: 'Frequent business and weekend departures',
  },
  {
    from: 'Bangalore',
    to: 'Chennai',
    duration: '6h 10m',
    price: 'From Rs 799',
    frequency: '95+ buses daily',
    note: 'Top-rated AC sleeper and seater options',
  },
  {
    from: 'Hyderabad',
    to: 'Goa',
    duration: '13h 20m',
    price: 'From Rs 1,199',
    frequency: '40+ buses daily',
    note: 'Overnight departures with live updates',
  },
  {
    from: 'Delhi',
    to: 'Jaipur',
    duration: '5h 05m',
    price: 'From Rs 499',
    frequency: '88+ buses daily',
    note: 'Popular express corridor with flexible timings',
  },
]

export const whyChoosePoints = [
  {
    title: 'Curated partner network',
    description:
      'We work with reliable operators to keep seat quality, punctuality, and service standards consistently high.',
    icon: FaAward,
  },
  {
    title: 'Designed for real travellers',
    description:
      'From boarding reminders to route transparency, every detail is shaped around reducing travel friction.',
    icon: FaUserGroup,
  },
  {
    title: 'Trust built into every payment',
    description:
      'Clear fares, protected payments, and rapid confirmations help travellers book with confidence.',
    icon: FaShieldHeart,
  },
]

export { aboutImage, appPreviewImage, whyChooseImage }

export const testimonials = [
  {
    name: 'Riya Malhotra',
    role: 'Weekend traveller',
    quote:
      'SwiftLine made it surprisingly easy to compare operators and grab a premium sleeper seat at the last minute.',
    rating: 5,
  },
  {
    name: 'Arjun Patil',
    role: 'Frequent commuter',
    quote:
      'The live updates and clear boarding details remove the guesswork from my weekly work trips.',
    rating: 5,
  },
  {
    name: 'Neha Reddy',
    role: 'Family trip planner',
    quote:
      'I loved the clean design, quick booking flow, and instant confirmation. It feels much more polished than typical travel sites.',
    rating: 5,
  },
]

export const downloadHighlights = [
  'Manage bookings, cancellations, and tickets in one place.',
  'Get app-only discounts and reminder notifications before departure.',
  'Track your trip live and receive boarding updates on the go.',
]

export const companyStats = [
  { value: '280+', label: 'Cities connected nationwide' },
  { value: '180+', label: 'Trusted operator partners' },
  { value: '2.3M+', label: 'Passengers served each year' },
  { value: '96%', label: 'Trips monitored with live updates' },
]

export const missionVision = [
  {
    title: 'Our mission',
    description:
      'To simplify intercity bus travel with a faster, clearer, and more trustworthy booking experience for every traveller.',
  },
  {
    title: 'Our vision',
    description:
      'To become the most reliable digital platform for discovering, booking, and managing road journeys across India.',
  },
]

export const achievementCards = [
  {
    title: 'High satisfaction journeys',
    description: 'Passengers consistently rate our operator experience above 4.8 out of 5.',
    icon: FaStar,
  },
  {
    title: 'Broad route footprint',
    description: 'From metro corridors to coastal getaways, we connect hundreds of city pairs.',
    icon: FaRoute,
  },
  {
    title: 'Operator success programs',
    description: 'We help partner fleets improve listing quality, seat occupancy, and digital discovery.',
    icon: FaBusSimple,
  },
]

export const teamMembers = [
  {
    name: 'Aarav Kulkarni',
    role: 'Head of Operations',
    blurb: 'Keeps partner routes dependable with a strong focus on schedule quality and service standards.',
  },
  {
    name: 'Sana Iqbal',
    role: 'Passenger Experience Lead',
    blurb: 'Designs every trip touchpoint to make booking, boarding, and support feel effortless.',
  },
  {
    name: 'Vihaan Mehta',
    role: 'Growth Partnerships',
    blurb: 'Expands our operator network and route footprint across high-demand travel corridors.',
  },
]

export const contactCards = [
  {
    title: 'Visit us',
    value: '18 Skyline Avenue, Baner, Pune, Maharashtra 411045',
    icon: FaLocationDot,
  },
  {
    title: 'Email us',
    value: 'hello@swiftline.in',
    icon: FaEnvelope,
  },
  {
    title: 'Call us',
    value: '+91 98765 43210',
    icon: FaPhone,
  },
  {
    title: 'Support hours',
    value: '24/7 for bookings, updates, and cancellations',
    icon: FaClock,
  },
]

export const footerQuickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About Us', to: '/about' },
  { label: 'Contact Us', to: '/contact' },
]

export const footerContact = {
  address: '18 Skyline Avenue, Baner, Pune, Maharashtra 411045',
  email: 'hello@swiftline.in',
  phone: '+91 98765 43210',
  phoneLink: '+919876543210',
}

export const socialLinks = [
  { label: 'Facebook', href: 'https://www.facebook.com/', icon: FaFacebookF },
  { label: 'Instagram', href: 'https://www.instagram.com/', icon: FaInstagram },
  { label: 'X', href: 'https://x.com/', icon: FaXTwitter },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/', icon: FaLinkedinIn },
]

export const appStoreButtons = [
  { label: 'App Store', sublabel: 'Download on the', icon: FaApple },
  {
    label: 'Play Store',
    sublabel: 'Get it on',
    icon: HiMiniDevicePhoneMobile,
  },
]

export const authShowcaseImage = heroSlideTwo

export const authHighlights = [
  {
    title: 'Real backend login',
    description: 'The form submits to your existing `/api/users/login` endpoint and stores the returned session locally.',
    icon: FaShieldHeart,
  },
  {
    title: 'Signup matched to your schema',
    description: 'Registration is wired to the current backend fields for name, email, mobile, address, amount, and password.',
    icon: FaUserGroup,
  },
  {
    title: 'Ready for next-phase booking flows',
    description: 'The stored token and user state can be reused later for bookings, profile pages, and dashboard work.',
    icon: FaRoute,
  },
]
