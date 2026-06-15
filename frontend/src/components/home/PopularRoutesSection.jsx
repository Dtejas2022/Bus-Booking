import { FaArrowRightLong } from 'react-icons/fa6'
import SectionHeading from '../common/SectionHeading'
import { popularRoutes } from '../../utils/siteData'

function PopularRoutesSection() {
  return (
    <section className="section-shell" id="popular-routes">
      <div className="container-shell">
        <div className="surface-card overflow-hidden p-8 sm:p-10 lg:p-12">
          <SectionHeading
            description="Explore our most-booked routes with dependable schedules, standout operators, and price-friendly departures."
            eyebrow="Popular routes"
            title="High-demand city pairs travellers book again and again"
          />

          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {popularRoutes.map((route) => (
              <article
                className="group rounded-[30px] border border-slate-200 bg-slate-50/90 p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-100 hover:bg-white"
                key={`${route.from}-${route.to}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-700">
                      {route.frequency}
                    </p>
                    <h3 className="mt-4 text-2xl font-semibold text-slate-900 sm:text-3xl">
                      {route.from} <span className="text-brand-500">to</span> {route.to}
                    </h3>
                  </div>
                  <span className="rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-sm font-semibold text-brand-700">
                    {route.price}
                  </span>
                </div>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Travel time</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{route.duration}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Best for</p>
                    <p className="mt-2 text-lg font-semibold text-slate-900">{route.note}</p>
                  </div>
                </div>

                <a
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand-600 transition group-hover:text-brand-700"
                  href="#search-panel"
                >
                  View departures
                  <FaArrowRightLong />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default PopularRoutesSection
