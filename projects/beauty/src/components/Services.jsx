import { useState } from 'react'
import { Clock } from 'lucide-react'
import { data } from '../data'
import { formatDuration, formatRub } from '../ui'
import SectionHeading from './SectionHeading'

export default function Services({ onBook }) {
  const { categories, services, services_section: t } = data
  const [tab, setTab] = useState(categories[0].id)
  const list = services.filter((s) => s.category === tab)

  return (
    <section id="services" aria-labelledby="services-title" className="scroll-mt-16 py-16 md:scroll-mt-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <SectionHeading id="services-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <div role="tablist" aria-label="Категории услуг" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 md:mx-0 md:px-0">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={tab === c.id}
              aria-controls="services-panel"
              onClick={() => setTab(c.id)}
              className={`min-h-11 shrink-0 rounded-full px-5 font-medium transition ${
                tab === c.id ? 'bg-ink text-white' : 'border border-line bg-white hover:border-rose'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <ul id="services-panel" role="tabpanel" key={tab} className="animate-fade-up mt-8 divide-y divide-line border-y border-line">
          {list.map((s) => (
            <li key={s.id} className="group flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <h3 className="font-serif text-2xl font-semibold transition group-hover:text-rose-dark md:text-[28px]">{s.name}</h3>
                <p className="mt-1 text-mute">{s.desc}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-mute">
                  <Clock className="size-4" aria-hidden="true" />
                  {formatDuration(s.duration)}
                </p>
              </div>
              <div className="flex shrink-0 items-center justify-between gap-6 sm:justify-end">
                <p className="font-serif text-2xl font-semibold md:text-[28px]">
                  {s.from && <span className="mr-1 text-base text-mute">{t.from}</span>}
                  {formatRub(s.price)} ₽
                </p>
                <button type="button" onClick={() => onBook({ serviceId: s.id })} className="btn-secondary min-h-11 px-5 text-sm">
                  {t.book}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
