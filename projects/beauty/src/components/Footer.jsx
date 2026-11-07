import { data } from '../data'
import Logo from './Logo'

export default function Footer({ onPrivacy }) {
  const { site, footer } = data
  return (
    // pb-24 на телефоне — место под плавающую кнопку записи
    <footer className="border-t border-line pb-24 md:pb-8">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 pt-8 text-sm md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <Logo />
          <p className="mt-2 text-mute">{footer.note}</p>
        </div>
        <button type="button" onClick={onPrivacy} className="inline-flex min-h-11 items-center self-start text-mute underline underline-offset-2 hover:text-rose-dark md:self-auto">
          {footer.privacy}
        </button>
        <p className="text-mute">
          © {new Date().getFullYear()} {site.kind} «{site.name}»
        </p>
      </div>
    </footer>
  )
}
