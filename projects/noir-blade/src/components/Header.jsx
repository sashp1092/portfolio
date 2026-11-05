import { navLinks, site } from '../data'
import Logo from './Logo'
import TelegramIcon from './TelegramIcon'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/85 backdrop-blur-md">
      <nav className="mx-auto flex h-[68px] max-w-6xl items-center justify-between gap-4 px-6" aria-label="Основное меню">
        <a href="#top">
          <Logo className="text-xl" />
        </a>

        <div className="hidden gap-8 text-sm text-mute md:flex">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="transition hover:text-bone">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2.5">
          <a
            href={site.telegram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Наш Telegram"
            className="flex h-11 w-11 items-center justify-center border border-line transition hover:border-gold hover:text-gold"
          >
            <TelegramIcon className="h-[18px] w-[18px]" />
          </a>
          <a href="#book" className="btn hidden md:inline-flex">
            Записаться
          </a>
        </div>
      </nav>
    </header>
  )
}
