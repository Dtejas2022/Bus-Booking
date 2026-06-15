import { FaBusSimple } from 'react-icons/fa6'
import { Link } from 'react-router-dom'

function BrandMark({ light = false, onClick }) {
  return (
    <Link className="inline-flex items-center gap-3" onClick={onClick} to="/">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 via-brand-400 to-amber-300 text-lg text-white shadow-lg shadow-brand-500/30">
        <FaBusSimple />
      </span>
      <span className="flex flex-col">
        <span className={`font-display text-lg font-semibold ${light ? 'text-white' : 'text-slate-900'}`}>
          SwiftLine
        </span>
        <span className={`text-xs ${light ? 'text-slate-300' : 'text-slate-500'}`}>
          Smart bus journeys across India
        </span>
      </span>
    </Link>
  )
}

export default BrandMark
