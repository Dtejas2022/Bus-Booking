import { FaCircleCheck } from 'react-icons/fa6'
import SectionHeading from '../common/SectionHeading'
import { whyChooseImage, whyChoosePoints } from '../../utils/siteData'

function WhyChooseUsSection() {
  return (
    <section className="section-shell">
      <div className="container-shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div className="relative">
            <div className="surface-card overflow-hidden p-3">
              <img
                alt="Modern bus travel experience"
                className="h-[420px] w-full rounded-[24px] object-cover"
                loading="lazy"
                src={whyChooseImage}
              />
            </div>
            <div className="surface-card absolute -bottom-6 right-4 max-w-[230px] p-5 sm:right-8">
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-brand-700">
                Trusted experience
              </p>
              <p className="mt-3 text-3xl font-semibold text-slate-900">96%</p>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                of monitored trips include live updates for passengers before boarding.
              </p>
            </div>
          </div>

          <div>
            <SectionHeading
              description="We combine travel-grade reliability with a polished digital experience that feels more premium, transparent, and passenger-friendly."
              eyebrow="Why choose SwiftLine"
              title="A booking platform built to reduce friction at every stage of the trip"
            />

            <div className="mt-8 space-y-4">
              {whyChoosePoints.map(({ title, description, icon: Icon }) => (
                <article className="surface-card p-6" key={title}>
                  <div className="flex items-start gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-3xl bg-brand-50 text-2xl text-brand-600">
                      <Icon />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
                      <p className="mt-3 text-sm leading-7 text-slate-600">{description}</p>
                      <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-700">
                        <FaCircleCheck />
                        Trusted by frequent travellers
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection
