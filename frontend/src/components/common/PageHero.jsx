import { Link } from 'react-router-dom'

function ActionButton({ action, variant = 'primary' }) {
  if (!action) {
    return null
  }

  const sharedClassName = variant === 'primary' ? 'btn-primary' : 'btn-secondary'

  if (action.href) {
    return (
      <a className={sharedClassName} href={action.href}>
        {action.label}
      </a>
    )
  }

  return (
    <Link className={sharedClassName} to={action.to}>
      {action.label}
    </Link>
  )
}

function PageHero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  stats = [],
}) {
  return (
    <section className="relative isolate overflow-hidden pt-32 pb-18 sm:pt-36 sm:pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-56 w-56 rounded-full bg-brand-300/30 blur-3xl" />
        <div className="absolute bottom-0 right-[10%] h-64 w-64 rounded-full bg-amber-300/25 blur-3xl" />
      </div>

      <div className="container-shell">
        <div className="surface-card overflow-hidden p-8 sm:p-10 lg:p-14">
          <div className="max-w-3xl">
            {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
            <h1 className="mt-6 text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              {description}
            </p>

            {(primaryAction || secondaryAction) ? (
              <div className="mt-8 flex flex-wrap gap-4">
                <ActionButton action={primaryAction} variant="primary" />
                <ActionButton action={secondaryAction} variant="secondary" />
              </div>
            ) : null}
          </div>

          {stats.length ? (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div
                  className="rounded-3xl border border-slate-200 bg-slate-50/90 p-5"
                  key={stat.label}
                >
                  <p className="text-3xl font-semibold text-slate-900">{stat.value}</p>
                  <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}

export default PageHero
