import { data } from '../data'
import { icons } from '../ui'
import SectionHeading from './SectionHeading'

export default function HowToOrder() {
  const { how } = data
  return (
    <section id="how" aria-labelledby="how-title" className="scroll-mt-16 bg-white py-14 md:scroll-mt-20 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <SectionHeading id="how-title" eyebrow={how.eyebrow} title={how.title} />
        <ol className="grid gap-4 md:grid-cols-3">
          {how.steps.map((s, i) => {
            const Icon = icons[s.icon]
            return (
              <li key={s.title} className="rounded-[1.75rem] bg-cream p-6">
                <div className="flex items-center justify-between">
                  <span className="flex size-12 items-center justify-center rounded-2xl bg-leaf text-white">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <span className="font-heading text-4xl font-bold text-ink/10">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-5 font-heading text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-mute">{s.text}</p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
