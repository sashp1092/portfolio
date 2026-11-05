import { ArrowRight } from 'lucide-react'
import { data } from '../data'
import { formatRub } from '../ui'

export default function Breakfasts({ onShow }) {
  const { breakfasts, menu } = data
  const featured = menu.items.filter((i) => i.featured)
  return (
    <section aria-labelledby="breakfasts-title" className="px-4 md:px-6">
      <div className="mx-auto max-w-[1200px] rounded-[2rem] bg-ink px-5 py-12 text-white md:px-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:items-center">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#9ccfb2]">{breakfasts.eyebrow}</p>
            <h2 id="breakfasts-title" className="font-heading text-3xl font-bold leading-tight md:text-4xl">
              {breakfasts.title}
            </h2>
            <p className="mt-4 text-pretty text-white/75 md:text-lg">{breakfasts.text}</p>
            <a href="#menu" onClick={onShow} className="btn-primary mt-8">
              {breakfasts.cta}
              <ArrowRight className="size-5" aria-hidden="true" />
            </a>
          </div>
          <ul className="grid gap-4 sm:grid-cols-3">
            {featured.map((item) => (
              <li key={item.id} className="overflow-hidden rounded-[1.5rem] bg-white/5 ring-1 ring-white/10">
                <img src={item.image.src} alt={item.image.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                <div className="p-4">
                  <p className="font-heading font-bold">{item.name}</p>
                  <p className="mt-1 text-sm text-white/60">{item.desc}</p>
                  <p className="mt-3 font-heading font-bold text-[#9ccfb2]">{formatRub(item.price)} ₽</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
