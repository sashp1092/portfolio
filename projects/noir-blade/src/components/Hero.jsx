import { hero, site } from '../data'
import TelegramIcon from './TelegramIcon'

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[88vh] items-end overflow-hidden">
      <img
        src={hero.image}
        alt={hero.imageAlt}
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover opacity-55 contrast-110 grayscale"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink from-5% to-transparent to-60%" />

      <div className="relative mx-auto w-full max-w-6xl px-6 pb-18 pt-30">
        <span className="eyebrow">{hero.eyebrow}</span>
        <h1 className="mb-6 mt-5 max-w-4xl font-serif text-[clamp(42px,8.5vw,108px)] font-medium leading-[0.98]">
          {hero.titleLine1}
          <br />
          <em className="text-gold">{hero.titleAccent}</em> {hero.titleEnd}
        </h1>
        <p className="mb-9 max-w-md text-[17px] text-mute">{hero.text}</p>
        <div className="flex flex-wrap gap-3">
          <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="btn">
            <TelegramIcon />
            Записаться в Telegram
          </a>
          <a href="#services" className="btn btn-ghost">
            Смотреть услуги
          </a>
        </div>
      </div>
    </section>
  )
}
