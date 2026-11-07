import { ArrowRight, Check } from 'lucide-react'
import { data } from '../data'

export default function Hero({ onBook }) {
  const { hero } = data
  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* мягкое пятно цвета на фоне */}
      <div className="pointer-events-none absolute -right-40 -top-40 size-[520px] rounded-full bg-blush blur-3xl" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-12 px-4 py-12 md:px-6 md:py-20 lg:grid-cols-[1.05fr_1fr]">
        <div className="animate-fade-up">
          <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-rose">{hero.eyebrow}</p>
          <h1 id="hero-title" className="font-serif text-6xl font-semibold leading-[0.95] sm:text-7xl lg:text-8xl">
            {hero.title}
            <br />
            <em className="font-medium text-rose">{hero.titleAccent}</em>
          </h1>
          <p className="mt-7 max-w-md text-pretty text-lg leading-relaxed text-mute">{hero.subtitle}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={() => onBook()} className="btn-primary text-lg">
              {hero.cta}
              <ArrowRight className="size-5" aria-hidden="true" />
            </button>
            <a href="#services" className="btn-secondary">
              {hero.secondaryCta}
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mute">
            {hero.badges.map((b) => (
              <li key={b} className="inline-flex items-center gap-2">
                <Check className="size-4 text-rose" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </div>

        <div className="animate-fade-zoom relative mx-auto w-full max-w-md lg:max-w-none">
          {/* Арка — типичная форма для бьюти-сайтов */}
          <img
            src={hero.image.src}
            alt={hero.image.alt}
            fetchPriority="high"
            className="aspect-[4/5] w-full rounded-t-full rounded-b-[2rem] object-cover shadow-[0_40px_80px_-40px_rgba(58,46,42,0.5)]"
          />
          <img
            src={hero.smallImage.src}
            alt={hero.smallImage.alt}
            className="absolute -bottom-6 -left-4 aspect-square w-32 rounded-full border-[6px] border-cream object-cover shadow-xl sm:w-40 md:-left-10"
          />
        </div>
      </div>
    </section>
  )
}
