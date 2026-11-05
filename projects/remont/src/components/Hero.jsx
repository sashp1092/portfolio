import { ArrowRight, Phone } from 'lucide-react'
import { data } from '../data'
import { icons } from '../ui'

export default function Hero() {
  const { hero, company } = data
  return (
    <section id="top" aria-labelledby="hero-title" className="bg-paper">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-10 md:px-6 md:py-16 lg:grid-cols-2 lg:gap-14 lg:py-24">
        <div className="animate-fade-up">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm">
            <span className="size-2 rounded-full bg-brand" aria-hidden="true" />
            {hero.badge}
          </p>
          <h1 id="hero-title" className="font-heading text-3xl font-semibold leading-[1.15] text-balance sm:text-4xl lg:text-5xl">
            {hero.titleStart} <span className="text-brand">{hero.titleAccent}</span>
          </h1>
          <p className="mt-5 max-w-xl text-pretty text-lg leading-relaxed text-ink/70">{hero.subtitle}</p>

          <ul className="mt-7 grid gap-3 sm:grid-cols-3">
            {hero.benefits.map((b) => {
              const Icon = icons[b.icon]
              return (
                <li key={b.text} className="flex items-center gap-3 rounded-2xl bg-white p-3 shadow-sm">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-semibold leading-snug">{b.text}</span>
                </li>
              )
            })}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#quiz" className={`btn-primary px-5 text-[15px] sm:px-6 sm:text-lg`}>
              {hero.cta}
              <ArrowRight className="size-5" aria-hidden="true" />
            </a>
            <a href={company.phoneHref} className="btn-secondary">
              <Phone className="size-4" aria-hidden="true" />
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        <figure className="relative animate-fade-zoom">
          <img
            src={hero.image.src}
            alt={hero.image.alt}
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[0_30px_60px_-30px_rgba(26,26,26,0.45)] lg:aspect-[4/5]"
            fetchPriority="high"
          />
          <figcaption className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-sm font-medium backdrop-blur">
            {hero.imageCaption}
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
