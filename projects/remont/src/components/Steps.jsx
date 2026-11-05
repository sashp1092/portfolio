import { data } from '../data'
import SectionHeading from './SectionHeading'

export default function Steps() {
  const { steps } = data
  return (
    <section id="steps" aria-labelledby="steps-title" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <SectionHeading id="steps-title" eyebrow={steps.eyebrow} title={steps.title} />
        <ol className="grid gap-4 md:grid-cols-5">
          {steps.items.map((s, i) => (
            <li key={s.title} className="relative rounded-3xl bg-paper p-6 transition hover:-translate-y-1">
              <span className="font-heading text-4xl font-semibold text-brand">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-4 font-heading text-base font-semibold leading-snug">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/70">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
