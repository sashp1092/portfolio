import { site } from '../data'
import Logo from './Logo'
import TelegramIcon from './TelegramIcon'

export default function Footer() {
  return (
    <footer className="border-t border-line py-8 text-[13px] text-mute">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 md:flex-row md:items-center">
        <Logo className="text-base text-bone" />
        <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 hover:text-gold">
          <TelegramIcon />
          Telegram
        </a>
        <a href={site.privacyUrl} className="hover:text-gold">
          Политика конфиденциальности
        </a>
        <span>
          © {new Date().getFullYear()} Барбершоп {site.fullName}
        </span>
      </div>
    </footer>
  )
}
