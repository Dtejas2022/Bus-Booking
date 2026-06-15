import { formatNumber } from '../../utils/dashboardHelpers'

function DashboardDonutChart({ items }) {
  const normalizedItems = items.map((item) => ({
    ...item,
    rawValue: Math.max(Number(item.rawValue) || 0, 0),
  }))
  const total = normalizedItems.reduce((sum, item) => sum + item.rawValue, 0)

  let currentAngle = 0

  const chartGradient =
    total > 0
      ? normalizedItems
          .map((item) => {
            const startAngle = currentAngle
            const angleSize = (item.rawValue / total) * 360
            currentAngle += angleSize
            return `${item.color} ${startAngle}deg ${currentAngle}deg`
          })
          .join(', ')
      : '#e2e8f0 0deg 360deg'

  return (
    <article className="surface-card p-6 sm:p-7">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
        Pie chart
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-slate-900">Card composition</h3>
      <p className="mt-3 text-sm leading-7 text-slate-500">
        This donut mirrors the same card values, grouped into one visual split.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr] lg:items-center">
        <div
          className="relative mx-auto h-56 w-56 rounded-full"
          style={{ background: `conic-gradient(${chartGradient})` }}
        >
          <div className="absolute inset-[22%] rounded-full bg-white/95 shadow-inner shadow-slate-200/70" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">
                Total
              </p>
              <p className="mt-2 text-3xl font-semibold text-slate-900">
                {formatNumber(total)}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {normalizedItems.map((item) => {
            const percentage = total > 0 ? Math.round((item.rawValue / total) * 100) : 0

            return (
              <div
                className="flex items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
                key={item.label}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-3.5 w-3.5 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{item.label}</p>
                    <p className="text-sm text-slate-500">{item.value}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-slate-500">{percentage}%</span>
              </div>
            )
          })}
        </div>
      </div>
    </article>
  )
}

export default DashboardDonutChart
