import { ArrowRight, MapPin } from 'lucide-react'
import { data } from '../data'
import { icons } from '../ui'

export default function Hero() {
  const { hero } = data
  return (
    <section id="top" aria-labelledby="hero-title">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-10 md:px-6 md:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-20">
        <div className="animate-fade-up">
          <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-leaf">{hero.eyebrow}</p>
          <h1 id="hero-title" className="font-heading text-4xl font-bold leading-[1.05] text-balance sm:text-5xl lg:text-6xl">
            {hero.title} <span className="text-leaf">{hero.titleAccent}</span>
          </h1>
          <p className="mt-5 max-w-lg text-pretty text-lg leading-relaxed text-mute">{hero.subtitle}</p>

          <ul className="mt-7 flex flex-wrap gap-2">
            {hero.badges.map((b) => {
              const Icon = icons[b.icon]
              return (
                <li key={b.text} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium shadow-sm">
                  <Icon className="size-4 text-leaf" aria-hidden="true" />
                  {b.text}
                </li>
              )
            })}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#menu" className="btn-primary text-lg">
              {hero.cta}
              <ArrowRight className="size-5" aria-hidden="true" />
            </a>
            <a href="#contacts" className="btn-secondary">
              <MapPin className="size-4" aria-hidden="true" />
              {hero.secondaryCta}
            </a>
          </div>
        </div>

        <figure className="animate-fade-zoom">
          <img
            src={hero.image.src}
            alt={hero.image.alt}
            fetchPriority="high"
            className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-[0_30px_60px_-30px_rgba(43,29,20,0.5)] lg:aspect-[4/5]"
          />
        </figure>
      </div>
    </section>
  )
}
