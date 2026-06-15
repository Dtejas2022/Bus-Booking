function DashboardSection({ id, title, description, action, children }) {
  return (
    <section className="space-y-6" id={id}>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">
            Dashboard section
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 text-base leading-7 text-slate-600">{description}</p>
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
      {children}
    </section>
  )
}

export default DashboardSection
