import { site, telegramBanner } from '../data'
import Section from './Section'
import TelegramIcon from './TelegramIcon'

export default function TelegramBanner() {
  return (
    <Section>
      <div className="flex flex-col items-start gap-6 border border-line bg-gradient-to-br from-surface to-ink px-8 py-10 md:flex-row md:items-center md:justify-between md:p-12">
        <div>
          <span className="eyebrow">Telegram</span>
          <h3 className="mt-3 font-serif text-[clamp(26px,3.5vw,36px)] font-medium leading-tight">{telegramBanner.title}</h3>
          <p className="mt-3 max-w-lg text-mute">{telegramBanner.text}</p>
        </div>
        <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="btn">
          <TelegramIcon />
          {site.telegramHandle}
        </a>
      </div>
    </Section>
  )
}
