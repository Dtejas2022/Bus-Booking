import { FaStar } from 'react-icons/fa6'
import SectionHeading from '../common/SectionHeading'
import { testimonials } from '../../utils/siteData'

function TestimonialsSection() {
  return (
    <section className="section-shell">
      <div className="container-shell">
        <SectionHeading
          align="center"
          description="Travellers come back for the speed, clarity, and peace of mind that a polished booking experience delivers."
          eyebrow="Testimonials"
          title="Passenger feedback that reflects a more confident way to travel"
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article className="surface-card p-6 sm:p-7" key={testimonial.name}>
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <FaStar key={`${testimonial.name}-${index}`} />
                ))}
              </div>
              <p className="mt-5 text-base leading-8 text-slate-700">
                "{testimonial.quote}"
              </p>
              <div className="mt-6 border-t border-slate-100 pt-5">
                <h3 className="text-lg font-semibold text-slate-900">{testimonial.name}</h3>
                <p className="mt-1 text-sm text-slate-500">{testimonial.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
