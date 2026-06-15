import { FaBusSimple } from 'react-icons/fa6'

function PageLoader() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="surface-card w-full max-w-md p-8 text-center">
        <div className="mx-auto flex h-18 w-18 animate-pulse-glow items-center justify-center rounded-full bg-brand-500 text-2xl text-white">
          <FaBusSimple />
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-slate-900">
          Building your trip experience
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          Loading routes, schedules, and travel perks for a smoother journey.
        </p>
        <div className="mt-6 space-y-3">
          <div className="h-3 rounded-full bg-slate-200/80" />
          <div className="h-3 w-4/5 rounded-full bg-slate-200/60" />
          <div className="h-3 w-3/5 rounded-full bg-slate-200/40" />
        </div>
      </div>
    </div>
  )
}

export default PageLoader
