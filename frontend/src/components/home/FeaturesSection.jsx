import SectionHeading from '../common/SectionHeading'
import { platformFeatures } from '../../utils/siteData'

function FeaturesSection() {
  return (
    <section className="section-shell">
      <div className="container-shell">
        <SectionHeading
          align="center"
          description="Built for travellers who want clear choices, dependable updates, and a smoother road trip planning experience."
          eyebrow="Platform features"
          title="Everything you need for a confident bus booking journey"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {platformFeatures.map(({ title, description, icon: Icon }) => (
            <article
              className="surface-card group p-6 transition duration-300 hover:-translate-y-1 hover:border-brand-100 hover:shadow-[0_28px_70px_rgba(36,92,255,0.12)]"
              key={title}
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-brand-50 text-2xl text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                <Icon />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-900">{title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
