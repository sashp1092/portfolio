import { Check } from 'lucide-react'
import { data } from '../data'
import SectionHeading from './SectionHeading'

export default function Pricing() {
  const { prices } = data
  return (
    <section id="prices" aria-labelledby="prices-title" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <SectionHeading id="prices-title" eyebrow={prices.eyebrow} title={prices.title} />
        <div className="grid gap-5 md:grid-cols-3 md:items-stretch">
          {prices.plans.map((plan) => (
            <article
              key={plan.name}
              className={`relative flex flex-col rounded-3xl p-6 transition duration-300 hover:-translate-y-1 md:p-8 ${
                plan.popular
                  ? 'bg-ink text-white shadow-[0_30px_60px_-30px_rgba(26,26,26,0.6)] md:-my-4 md:py-12'
                  : 'border border-ink/10 bg-white shadow-sm hover:shadow-md'
              }`}
            >
              {plan.popular && (
                <span className="absolute -top-3 left-6 rounded-full bg-brand px-4 py-1.5 text-sm font-semibold text-white">
                  {prices.popular}
                </span>
              )}
              <h3 className="font-heading text-xl font-semibold">{plan.name}</h3>
              <p className={`mt-2 text-sm ${plan.popular ? 'text-white/70' : 'text-ink/60'}`}>{plan.description}</p>
              <p className="mt-6">
                <span className={`text-sm ${plan.popular ? 'text-white/70' : 'text-ink/60'}`}>{prices.from} </span>
                <span className="font-heading text-4xl font-semibold">{plan.price}</span>
                <span className={`ml-1 ${plan.popular ? 'text-white/70' : 'text-ink/60'}`}>{prices.perUnit}</span>
              </p>
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex gap-3">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand text-white">
                      <Check className="size-3" strokeWidth={3} aria-hidden="true" />
                    </span>
                    <span className={plan.popular ? 'text-white/90' : 'text-ink/80'}>{f}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#quiz"
                className={`${plan.popular ? 'btn-primary' : 'btn-secondary'} mt-8 w-full`}
              >
                {prices.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
