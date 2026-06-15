import { Link } from 'react-router-dom'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

function NotFound() {
  useDocumentTitle('Page Not Found | SwiftLine')

  return (
    <section className="flex min-h-[70vh] items-center px-4 py-24">
      <div className="container-shell">
        <div className="surface-card mx-auto max-w-2xl p-10 text-center sm:p-14">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">
            404 error
          </p>
          <h1 className="mt-5 text-4xl font-semibold text-slate-900 sm:text-5xl">
            This route is not on our schedule
          </h1>
          <p className="mt-5 text-base leading-8 text-slate-600">
            The page you were looking for could not be found. Head back to the homepage
            to explore routes, features, and support options.
          </p>
          <Link className="btn-primary mt-8" to="/">
            Return home
          </Link>
        </div>
      </div>
    </section>
  )
}

export default NotFound
