import { Link } from 'react-router-dom'
import BrandMark from '../layout/BrandMark'
import { authHighlights, authShowcaseImage } from '../../utils/siteData'

function AuthPageShell({
  children,
  description,
  eyebrow,
  footerLabel,
  footerLink,
  footerText,
  title,
}) {
  return (
    <section className="px-4 py-10 sm:px-6 lg:px-8">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch">
          <aside className="relative overflow-hidden rounded-[34px] bg-slate-950 p-8 text-white sm:p-10 lg:p-12">
            <div className="absolute -left-14 top-10 h-52 w-52 rounded-full bg-brand-500/25 blur-3xl" />
            <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-amber-300/20 blur-3xl" />

            <div className="relative flex h-full flex-col">
              <BrandMark light />

              <div className="mt-10 max-w-xl">
                <span className="eyebrow border-white/20 bg-white/10 text-white">
                  {eyebrow}
                </span>
                <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl">
                  {title}
                </h1>
                <p className="mt-5 text-base leading-8 text-slate-200">
                  {description}
                </p>
              </div>

              <div className="mt-10 grid gap-4">
                {authHighlights.map(({ title: itemTitle, description: itemDescription, icon: Icon }) => (
                  <article
                    className="rounded-[28px] border border-white/10 bg-white/[0.06] p-5 backdrop-blur-sm"
                    key={itemTitle}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg text-white">
                        <Icon />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-white">{itemTitle}</h2>
                        <p className="mt-2 text-sm leading-7 text-slate-200">
                          {itemDescription}
                        </p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="relative mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.06] p-4">
                <img
                  alt="SwiftLine bus booking travel experience"
                  className="h-64 w-full rounded-[22px] object-cover"
                  loading="lazy"
                  src={authShowcaseImage}
                />
                <div className="mt-4 flex items-center justify-between gap-3 rounded-[22px] border border-white/10 bg-slate-950/45 px-4 py-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.26em] text-brand-100">
                      Live backend flow
                    </p>
                    <p className="mt-2 text-sm text-slate-200">
                      Connected to your existing `/api/users` auth endpoints.
                    </p>
                  </div>
                  <div className="rounded-full bg-emerald-400/20 px-3 py-2 text-xs font-semibold text-emerald-200">
                    API ready
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <div className="surface-card p-7 sm:p-9 lg:p-12">
            {children}

            <p className="mt-8 text-sm text-slate-500">
              {footerLabel}{' '}
              <Link className="font-semibold text-brand-600 transition hover:text-brand-700" to={footerLink}>
                {footerText}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AuthPageShell
