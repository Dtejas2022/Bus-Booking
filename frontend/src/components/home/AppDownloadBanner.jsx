import { FaArrowRightLong } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import SectionHeading from '../common/SectionHeading'
import { appPreviewImage, appStoreButtons, downloadHighlights } from '../../utils/siteData'

function AppDownloadBanner() {
  return (
    <section className="section-shell pt-8" id="download-app">
      <div className="container-shell">
        <div className="relative overflow-hidden rounded-[34px] bg-slate-950 px-6 py-8 text-white sm:px-8 sm:py-10 lg:px-12 lg:py-14">
          <div className="absolute -left-10 top-8 h-44 w-44 rounded-full bg-brand-500/20 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />

          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.7fr] lg:items-center">
            <div>
              <SectionHeading
                description="Keep tickets, route alerts, boarding updates, and exclusive discounts within quick reach on every trip."
                eyebrow="App download"
                light
                title="Take the complete SwiftLine journey with you"
              />

              <div className="mt-8 space-y-3">
                {downloadHighlights.map((highlight) => (
                  <div className="flex items-start gap-3 text-sm text-slate-200" key={highlight}>
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-amber-300" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {appStoreButtons.map(({ label, sublabel, icon: Icon }) => (
                  <button
                    className="flex min-w-[180px] items-center gap-3 rounded-3xl border border-white/[0.12] bg-white/[0.08] px-5 py-4 text-left transition hover:border-white/30 hover:bg-white/[0.12]"
                    key={label}
                    type="button"
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-xl text-white">
                      <Icon />
                    </span>
                    <span>
                      <span className="block text-xs uppercase tracking-[0.2em] text-slate-300">
                        {sublabel}
                      </span>
                      <span className="mt-1 block text-base font-semibold text-white">{label}</span>
                    </span>
                  </button>
                ))}
              </div>

              <Link className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brand-200 transition hover:text-white" to="/contact">
                Partner with SwiftLine
                <FaArrowRightLong />
              </Link>
            </div>

            <div className="mx-auto w-full max-w-sm">
              <div className="glass-panel mx-auto max-w-sm p-5">
                <div className="rounded-[32px] bg-white/[0.08] p-4">
                  <img
                    alt="SwiftLine mobile booking preview"
                    className="mx-auto max-h-[380px] object-contain"
                    loading="lazy"
                    src={appPreviewImage}
                  />
                </div>
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <p className="text-2xl font-semibold text-white">4.8</p>
                    <p className="mt-2 text-sm text-slate-300">Average app rating</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/[0.06] p-4">
                    <p className="text-2xl font-semibold text-white">1 tap</p>
                    <p className="mt-2 text-sm text-slate-300">Digital boarding pass access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AppDownloadBanner
