import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HiMiniMagnifyingGlass } from 'react-icons/hi2'
import { useAuth } from '../../hooks/useAuth'
import { popularSearches, searchFieldIcons } from '../../utils/siteData'

const getInitialDate = () => {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return tomorrow.toISOString().split('T')[0]
}

function SearchBusCard() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const timerRef = useRef(null)
  const [searching, setSearching] = useState(false)
  const [searchMessage, setSearchMessage] = useState('')
  const [formValues, setFormValues] = useState({
    from: 'Pune',
    to: 'Mumbai',
    date: getInitialDate(),
  })

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  const updateField = (field) => (event) => {
    setFormValues((current) => ({
      ...current,
      [field]: event.target.value,
    }))
  }

  const handleSwap = () => {
    setFormValues((current) => ({
      ...current,
      from: current.to,
      to: current.from,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
    }

    setSearching(true)
    setSearchMessage('')

    timerRef.current = window.setTimeout(() => {
      setSearching(false)
      setSearchMessage(
        `Showing the fastest ${formValues.from} to ${formValues.to} options for ${formValues.date}.`,
      )
    }, 900)
  }

  const FromIcon = searchFieldIcons.from
  const ToIcon = searchFieldIcons.to
  const DateIcon = searchFieldIcons.date
  const SwapIcon = searchFieldIcons.swap

  return (
    <section className="relative z-20 -mt-14 pb-10 sm:-mt-20" id="search-panel">
      <div className="container-shell">
        <div className="surface-card overflow-hidden p-6 sm:p-8 lg:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <span className="eyebrow">Search buses</span>
              <h2 className="mt-5 text-3xl font-semibold text-slate-900 sm:text-4xl">
                Find your next ride with a faster, calmer booking flow.
              </h2>
              <p className="mt-4 text-base leading-7 text-slate-600">
                Pick your route, choose your date, and preview the best available
                departures in seconds.
              </p>
            </div>
            <div className="rounded-3xl border border-brand-100 bg-brand-50 px-5 py-4 text-sm text-brand-700">
              Smart suggestions are tuned for popular intercity corridors.
            </div>
          </div>

          <form className="mt-8 grid gap-4 lg:grid-cols-[1fr_auto_1fr_1fr_auto]" onSubmit={handleSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">From city</span>
              <div className="relative">
                <FromIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
                <input
                  className="input-shell pl-12"
                  onChange={updateField('from')}
                  placeholder="Departure city"
                  type="text"
                  value={formValues.from}
                />
              </div>
            </label>

            <div className="flex items-end justify-center pb-1">
              <button
                aria-label="Swap cities"
                className="flex h-12 w-12 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600"
                onClick={handleSwap}
                type="button"
              >
                <SwapIcon className="text-xl" />
              </button>
            </div>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">To city</span>
              <div className="relative">
                <ToIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
                <input
                  className="input-shell pl-12"
                  onChange={updateField('to')}
                  placeholder="Arrival city"
                  type="text"
                  value={formValues.to}
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-semibold text-slate-700">Travel date</span>
              <div className="relative">
                <DateIcon className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-slate-400" />
                <input
                  className="input-shell pl-12"
                  min={new Date().toISOString().split('T')[0]}
                  onChange={updateField('date')}
                  type="date"
                  value={formValues.date}
                />
              </div>
            </label>

            <div className="flex items-end">
              <button className="btn-primary h-14 w-full justify-center px-6" type="submit">
                {searching ? 'Searching...' : 'Search Buses'}
                <HiMiniMagnifyingGlass className="text-lg" />
              </button>
            </div>
          </form>

          <div className="mt-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((search) => (
                <button
                  className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 transition hover:border-brand-200 hover:bg-brand-50 hover:text-brand-700"
                  key={search}
                  onClick={() => {
                    const [from, to] = search.split(' to ')
                    setFormValues((current) => ({
                      ...current,
                      from,
                      to,
                    }))
                  }}
                  type="button"
                >
                  {search}
                </button>
              ))}
            </div>

            <p className="text-sm text-slate-500">
              {searchMessage || 'Tip: start with our most-booked corridors for the quickest checkout.'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SearchBusCard
