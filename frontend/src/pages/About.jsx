import { Link } from 'react-router-dom'
import PageHero from '../components/common/PageHero'
import SectionHeading from '../components/common/SectionHeading'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import {
  aboutImage,
  achievementCards,
  companyStats,
  missionVision,
  teamMembers,
} from '../utils/siteData'

function About() {
  useDocumentTitle('About SwiftLine | Smarter Bus Travel')

  return (
    <>
      <PageHero
        description="SwiftLine is building a more modern public-facing bus booking experience with better route discovery, clearer travel details, and a stronger sense of passenger trust."
        eyebrow="About SwiftLine"
        primaryAction={{ label: 'Contact our team', to: '/contact' }}
        secondaryAction={{ label: 'Explore routes', href: '/#popular-routes' }}
        stats={companyStats}
        title="We make intercity bus travel feel more reliable, polished, and passenger-first"
      />

      <section className="section-shell pt-4">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <SectionHeading
                description="Our team blends travel operations, digital product thinking, and customer care to build an experience that helps people travel with more confidence."
                eyebrow="Company story"
                title="Designed for the real moments that shape every bus journey"
              />
              <p className="mt-6 text-base leading-8 text-slate-600">
                From finding the right departure to receiving a clean digital ticket,
                we focus on reducing uncertainty at every step. SwiftLine was created
                for travellers who want transparency, speed, and dependable support,
                whether they book for business, family visits, or last-minute escapes.
              </p>
            </div>

            <div className="surface-card overflow-hidden p-3">
              <img
                alt="SwiftLine team and travel operations"
                className="h-[420px] w-full rounded-[24px] object-cover"
                loading="lazy"
                src={aboutImage}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-2">
        <div className="container-shell">
          <div className="grid gap-5 lg:grid-cols-2">
            {missionVision.map((item) => (
              <article className="surface-card p-8 sm:p-10" key={item.title}>
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-700">
                  {item.title}
                </p>
                <p className="mt-5 text-xl leading-8 text-slate-700">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-2">
        <div className="container-shell">
          <SectionHeading
            align="center"
            description="These milestones reflect the scale, trust, and travel consistency we aim to bring to every trip."
            eyebrow="Impact snapshot"
            title="Numbers that show how the platform is growing"
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {companyStats.map((stat) => (
              <article className="surface-card p-6 text-center" key={stat.label}>
                <p className="text-4xl font-semibold text-slate-900">{stat.value}</p>
                <p className="mt-3 text-sm leading-7 text-slate-500">{stat.label}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-2">
        <div className="container-shell">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <SectionHeading
                description="Behind the platform is a cross-functional team focused on operations, passenger experience, and route growth."
                eyebrow="Team and achievements"
                title="The people and progress shaping SwiftLine"
              />

              <div className="mt-8 space-y-4">
                {teamMembers.map((member) => (
                  <article className="surface-card p-6" key={member.name}>
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-brand-500 text-lg font-semibold text-white">
                        {member.name
                          .split(' ')
                          .map((part) => part[0])
                          .join('')
                          .slice(0, 2)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-slate-900">{member.name}</h3>
                        <p className="mt-1 text-sm font-medium text-brand-700">{member.role}</p>
                        <p className="mt-3 text-sm leading-7 text-slate-600">{member.blurb}</p>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid gap-5">
              {achievementCards.map(({ title, description, icon: Icon }) => (
                <article className="surface-card p-8" key={title}>
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-50 text-2xl text-brand-600">
                    <Icon />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-slate-900">{title}</h3>
                  <p className="mt-4 text-base leading-8 text-slate-600">{description}</p>
                </article>
              ))}

              <div className="rounded-[32px] bg-slate-950 p-8 text-white">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand-200">
                  Ready to travel smarter?
                </p>
                <h3 className="mt-5 text-3xl font-semibold text-white">
                  Let us help you shape a better bus journey.
                </h3>
                <p className="mt-4 text-base leading-8 text-slate-300">
                  Reach out for route questions, operator partnerships, or support with
                  upcoming travel plans.
                </p>
                <Link className="btn-primary mt-7" to="/contact">
                  Contact SwiftLine
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
