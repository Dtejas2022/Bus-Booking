import { useEffect, useRef, useState } from 'react'
import PageHero from '../components/common/PageHero'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { contactCards, socialLinks } from '../utils/siteData'

const initialFormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
}

function Contact() {
  useDocumentTitle('Contact SwiftLine | Passenger Support')

  const timerRef = useRef(null)
  const [formState, setFormState] = useState(initialFormState)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current)
      }
    }
  }, [])

  const updateField = (field) => (event) => {
    setFormState((current) => ({
      ...current,
      [field]: event.target.value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (timerRef.current) {
      window.clearTimeout(timerRef.current)
    }

    setIsSubmitting(true)
    setIsSubmitted(false)

    timerRef.current = window.setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState(initialFormState)
    }, 900)
  }

  return (
    <>
      <PageHero
        description="Whether you need help with a booking, want to discuss route partnerships, or simply have a travel question, we are here to help."
        eyebrow="Contact us"
        primaryAction={{ label: 'Email support', href: 'mailto:hello@swiftline.in' }}
        secondaryAction={{ label: 'Call our team', href: 'tel:+919876543210' }}
        title="Talk to the team behind your next smoother bus journey"
      />

      <section className="section-shell pt-4">
        <div className="container-shell">
          <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="surface-card p-8 sm:p-10">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">
                  Send a message
                </p>
                <h2 className="mt-4 text-3xl font-semibold text-slate-900 sm:text-4xl">
                  We usually reply with route or booking support in under 30 minutes.
                </h2>
              </div>

              <form className="mt-8 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Full name</span>
                  <input
                    className="input-shell"
                    onChange={updateField('name')}
                    placeholder="Your name"
                    type="text"
                    value={formState.name}
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Email address</span>
                  <input
                    className="input-shell"
                    onChange={updateField('email')}
                    placeholder="you@example.com"
                    type="email"
                    value={formState.email}
                  />
                </label>

                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Subject</span>
                  <input
                    className="input-shell"
                    onChange={updateField('subject')}
                    placeholder="Booking help, partnership, route question..."
                    type="text"
                    value={formState.subject}
                  />
                </label>

                <label className="block md:col-span-2">
                  <span className="mb-2 block text-sm font-semibold text-slate-700">Message</span>
                  <textarea
                    className="min-h-[160px] w-full rounded-[28px] border border-slate-200 bg-white px-4 py-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-brand-300 focus:ring-4 focus:ring-brand-100"
                    onChange={updateField('message')}
                    placeholder="Tell us how we can help."
                    value={formState.message}
                  />
                </label>

                <div className="md:col-span-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-sm text-slate-500">
                    {isSubmitted
                      ? 'Thanks. Our passenger support team will get back to you shortly.'
                      : 'Your message helps us understand how to support your trip.'}
                  </p>
                  <button className="btn-primary min-w-[180px]" type="submit">
                    {isSubmitting ? 'Sending...' : 'Send message'}
                  </button>
                </div>
              </form>
            </div>

            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                {contactCards.map(({ title, value, icon: Icon }) => (
                  <article className="surface-card p-6" key={title}>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-lg text-brand-600">
                      <Icon />
                    </div>
                    <h3 className="mt-5 text-lg font-semibold text-slate-900">{title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-600">{value}</p>
                  </article>
                ))}
              </div>

              <div className="surface-card overflow-hidden p-4">
                <div className="relative min-h-[320px] rounded-[28px] bg-slate-950 p-6 text-white">
                  <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(36,92,255,0.32)_1px,_transparent_1px)] [background-size:22px_22px] opacity-35" />
                  <div className="relative flex h-full flex-col justify-between">
                    <div>
                      <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-200">
                        Map placeholder
                      </p>
                      <h3 className="mt-4 text-3xl font-semibold text-white">
                        Pune support and operations hub
                      </h3>
                      <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
                        This area is ready for an interactive Google Maps embed in the next
                        phase of the public site.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {socialLinks.map(({ label, href, icon: Icon }) => (
                        <a
                          aria-label={label}
                          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/[0.12] bg-white/[0.06] text-white transition hover:border-brand-300 hover:bg-brand-500"
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
