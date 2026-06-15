function DashboardNotice({ message, type = 'info' }) {
  const toneClasses =
    type === 'success'
      ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
      : type === 'error'
        ? 'border-rose-200 bg-rose-50 text-rose-700'
        : 'border-brand-100 bg-brand-50 text-brand-800'

  return (
    <div className={`rounded-[26px] border px-5 py-4 text-sm leading-7 ${toneClasses}`}>
      {message}
    </div>
  )
}

export default DashboardNotice
