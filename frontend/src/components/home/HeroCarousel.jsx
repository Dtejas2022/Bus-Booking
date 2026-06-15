import { useEffect, useState } from 'react'
import { FaArrowRightLong } from 'react-icons/fa6'
import { heroHighlights, heroSlides } from '../../utils/siteData'

function HeroCarousel() {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length)
    }, 5500)

    return () => window.clearInterval(intervalId)
  }, [])

  const currentSlide = heroSlides[activeSlide]

  return (
    <section className="relative isolate overflow-hidden pt-32 pb-24 text-white sm:pt-36 sm:pb-32">
      <div className="absolute inset-0 -z-20">
        {heroSlides.map((slide, index) => (
          <div
            className={`absolute inset-0 bg-cover bg-no-repeat transition-all duration-700 ${
              activeSlide === index
                ? 'scale-100 opacity-100 brightness-[0.9] saturate-110'
                : 'scale-105 opacity-0 brightness-[0.82] saturate-100'
            }`}
            key={slide.id}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundPosition: slide.imagePosition,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-slate-950/42" />
        <div className="absolute inset-0 bg-[linear-gradient(102deg,rgba(8,12,26,0.86)_6%,rgba(8,12,26,0.55)_34%,rgba(8,12,26,0.18)_66%,rgba(8,12,26,0.32)_100%)]" />
        <div className="absolute inset-y-0 left-0 w-full bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.08),transparent_32%)]" />
      </div>

      <div className="container-shell relative">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="max-w-3xl">
            <div className="rounded-[32px] border border-white/10 bg-slate-950/18 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.18)] backdrop-blur-[3px] sm:p-8 lg:p-9">
              <span className="eyebrow border-white/20 bg-white/10 text-white">
                {currentSlide.eyebrow}
              </span>
              <h1 className="mt-6 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-7xl">
                {currentSlide.title}
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-7 text-slate-100 sm:text-lg">
                {currentSlide.subtitle}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a className="btn-primary" href={currentSlide.ctaPrimary.href}>
                  {currentSlide.ctaPrimary.label}
                  <FaArrowRightLong />
                </a>
                <a className="btn-ghost-dark" href={currentSlide.ctaSecondary.href}>
                  {currentSlide.ctaSecondary.label}
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {currentSlide.chips.map((chip) => (
                  <span
                    className="rounded-full border border-white/[0.14] bg-white/[0.08] px-4 py-2 text-sm text-slate-100 backdrop-blur-sm"
                    key={chip}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:justify-self-end">
            <div className="glass-panel animate-float-soft overflow-hidden p-6 sm:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.28em] text-brand-100">
                    Live journey snapshot
                  </p>
                  <h2 className="mt-3 text-2xl font-semibold text-white">
                    Travel clarity before you even board
                  </h2>
                </div>
                <div className="rounded-2xl border border-white/20 bg-white/10 px-3 py-2 text-xs font-semibold text-white">
                  Auto rotating
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {currentSlide.stats.map((stat) => (
                  <div
                    className="rounded-3xl border border-white/[0.12] bg-white/[0.08] p-5"
                    key={stat.label}
                  >
                    <p className="text-3xl font-semibold text-white">{stat.value}</p>
                    <p className="mt-2 text-sm text-slate-300">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center gap-2">
                {heroSlides.map((slide, index) => (
                  <button
                    aria-label={`Show slide ${index + 1}`}
                    className={`h-2.5 rounded-full transition-all ${
                      activeSlide === index ? 'w-10 bg-white' : 'w-2.5 bg-white/35'
                    }`}
                    key={slide.id}
                    onClick={() => setActiveSlide(index)}
                    type="button"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {heroHighlights.map(({ title, description, icon: Icon }) => (
            <article
              className="rounded-[28px] border border-white/[0.12] bg-white/[0.07] p-6 backdrop-blur-sm"
              key={title}
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-lg text-white">
                <Icon />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-200">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroCarousel
