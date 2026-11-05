import { services } from '../data'
import Section from './Section'

export default function Services() {
  return (
    <Section id="services" eyebrow="Меню" title="Услуги и цены">
      <div className="border-t border-line">
        {services.map((s) => (
          <div
            key={s.name}
            className="flex items-baseline justify-between gap-6 border-b border-line py-7 transition-all duration-300 hover:pl-3"
          >
            <div>
              <h3 className="font-serif text-2xl font-medium md:text-[26px]">{s.name}</h3>
              <p className="mt-1 text-sm text-mute">
                {s.desc} — {s.time}
              </p>
            </div>
            <span className="whitespace-nowrap font-serif text-2xl text-gold md:text-[26px]">{s.price}</span>
          </div>
        ))}
      </div>
    </Section>
  )
}
