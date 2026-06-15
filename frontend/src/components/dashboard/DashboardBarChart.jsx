function DashboardBarChart({ items }) {
  const normalizedItems = items.map((item) => ({
    ...item,
    rawValue: Math.max(Number(item.rawValue) || 0, 0),
  }))
  const maxValue = normalizedItems.reduce(
    (highestValue, item) => Math.max(highestValue, item.rawValue),
    0,
  )

  return (
    <article className="surface-card p-6 sm:p-7">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
        Bar chart
      </p>
      <h3 className="mt-3 text-2xl font-semibold text-slate-900">Card comparison</h3>
      <p className="mt-3 text-sm leading-7 text-slate-500">
        Each bar uses the same raw value shown in the overview cards above.
      </p>

      <div className="mt-8">
        <div className="relative h-72">
          <div className="absolute inset-0 flex flex-col justify-between">
            {Array.from({ length: 4 }).map((_, index) => (
              <div className="border-t border-dashed border-slate-200" key={index} />
            ))}
          </div>

          <div className="relative flex h-full items-end gap-3 sm:gap-4">
            {normalizedItems.map((item) => {
              const height = maxValue > 0 ? Math.max((item.rawValue / maxValue) * 100, 10) : 10

              return (
                <div className="flex h-full flex-1 flex-col items-center justify-end gap-3" key={item.label}>
                  <div className="text-center text-xs font-semibold text-slate-400">
                    {item.value}
                  </div>
                  <div className="flex h-full w-full items-end">
                    <div
                      className="w-full rounded-t-[22px] shadow-lg shadow-slate-200/80 transition duration-300 hover:-translate-y-1"
                      style={{
                        backgroundColor: item.color,
                        height: `${height}%`,
                      }}
                    />
                  </div>
                  <div className="text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 sm:text-xs">
                    {item.label}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </article>
  )
}

export default DashboardBarChart
