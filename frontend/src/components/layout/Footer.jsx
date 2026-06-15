import { useState } from 'react'
import { Link } from 'react-router-dom'
import { footerContact, footerQuickLinks, socialLinks } from '../../utils/siteData'
import BrandMark from './BrandMark'

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!email.trim()) {
      return
    }

    setSubscribed(true)
    setEmail('')
  }

  return (
    <footer className="bg-slate-950 text-white">
      <div className="container-shell py-14 sm:py-18">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_1fr]">
          <div>
            <BrandMark light />
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
              SwiftLine helps travellers compare operators, reserve the right seat,
              and move between cities with the confidence of a premium digital
              booking experience.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-brand-300/60 hover:bg-brand-500 hover:text-white"
                  href={href}
                  key={label}
                  rel="noreferrer"
                  target="_blank"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Quick links</h3>
            <div className="mt-5 flex flex-col gap-3">
              {footerQuickLinks.map((item) => (
                <Link
                  className="text-sm text-slate-300 transition hover:text-white"
                  key={item.to}
                  to={item.to}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="mt-8 space-y-3 text-sm text-slate-300">
              <p>{footerContact.address}</p>
              <a className="block hover:text-white" href={`mailto:${footerContact.email}`}>
                {footerContact.email}
              </a>
              <a className="block hover:text-white" href={`tel:${footerContact.phoneLink}`}>
                {footerContact.phone}
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white">Stay in the loop</h3>
            <p className="mt-5 text-sm leading-7 text-slate-300">
              Get flash sale alerts, new route launches, and app-only travel perks.
            </p>

            <form className="mt-5 space-y-3" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="newsletter-email">
                Email address
              </label>
              <input
                className="h-13 w-full rounded-2xl border border-white/[0.12] bg-white/[0.06] px-4 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-brand-300 focus:ring-4 focus:ring-brand-500/20"
                id="newsletter-email"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter your email"
                type="email"
                value={email}
              />
              <button className="btn-primary w-full justify-center" type="submit">
                Subscribe
              </button>
            </form>

            <p className="mt-3 text-sm text-slate-400">
              {subscribed
                ? 'Thanks for subscribing. Fresh travel updates are on the way.'
                : 'No spam. Just route news and smart travel offers.'}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-slate-400">
          <p>Copyright {new Date().getFullYear()} SwiftLine. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
