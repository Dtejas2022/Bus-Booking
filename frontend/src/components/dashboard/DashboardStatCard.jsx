function DashboardStatCard({ helper, icon: Icon, value, label, tone = 'brand' }) {
  const toneClasses =
    tone === 'amber'
      ? 'bg-amber-50 text-amber-600'
      : tone === 'emerald'
        ? 'bg-emerald-50 text-emerald-600'
        : tone === 'slate'
          ? 'bg-slate-100 text-slate-700'
          : 'bg-brand-50 text-brand-600'

  return (
    <article className="surface-card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-900">{value}</p>
          {helper ? <p className="mt-3 text-sm leading-6 text-slate-500">{helper}</p> : null}
        </div>
        <div className={`flex h-14 w-14 items-center justify-center rounded-3xl text-2xl ${toneClasses}`}>
          <Icon />
        </div>
      </div>
    </article>
  )
}

export default DashboardStatCard
