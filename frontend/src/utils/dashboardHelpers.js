export function formatCurrency(value) {
  const numericValue = Number.parseInt(value ?? 0, 10)

  if (Number.isNaN(numericValue)) {
    return 'Rs 0'
  }

  return `Rs ${new Intl.NumberFormat('en-IN').format(numericValue)}`
}

export function formatNumber(value) {
  const numericValue = Number.parseInt(value ?? 0, 10)

  if (Number.isNaN(numericValue)) {
    return '0'
  }

  return new Intl.NumberFormat('en-IN').format(numericValue)
}

export function formatDateTime(value) {
  if (!value) {
    return 'Not available'
  }

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value))
}

export function getPassType(passRecord) {
  if (passRecord?.daily) {
    return 'Daily Pass'
  }

  if (passRecord?.monthly) {
    return 'Monthly Pass'
  }

  return 'Travel Pass'
}

export function getPassStatus(passRecord) {
  const rawStatus = passRecord?.daily ? passRecord?.approvedd : passRecord?.approvedm

  if (rawStatus === '1') {
    return {
      label: 'Approved',
      className: 'border-emerald-200 bg-emerald-50 text-emerald-700',
    }
  }

  if (rawStatus === '2') {
    return {
      label: 'Expired',
      className: 'border-amber-200 bg-amber-50 text-amber-700',
    }
  }

  return {
    label: 'Pending',
    className: 'border-slate-200 bg-slate-100 text-slate-700',
  }
}

export function sortNewestFirst(items = []) {
  return [...items].sort(
    (firstItem, secondItem) =>
      new Date(secondItem?.createdAt || 0).getTime() -
      new Date(firstItem?.createdAt || 0).getTime(),
  )
}
