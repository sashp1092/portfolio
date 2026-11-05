import { data } from '../data'
import { icons } from '../ui'

export default function Why() {
  const { why } = data
  return (
    <section aria-labelledby="why-title" className="bg-ink py-16 text-white md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <div className="mb-10 max-w-2xl md:mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">{why.eyebrow}</p>
          <h2 id="why-title" className="font-heading text-2xl font-semibold leading-tight md:text-4xl">
            {why.title}
          </h2>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {why.items.map((item) => {
            const Icon = icons[item.icon]
            return (
              <li key={item.title} className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10 transition hover:bg-white/10">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand text-white">
                  <Icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 font-heading text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{item.text}</p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
