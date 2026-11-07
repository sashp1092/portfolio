import { useState } from 'react'
import { Menu, Phone, X } from 'lucide-react'
import { data } from '../data'
import Logo from './Logo'

export default function Header({ onBook }) {
  const [open, setOpen] = useState(false)
  const { site, nav, hero } = data

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 md:h-20 md:px-6">
        <a href="#top" className="flex min-h-11 items-center" aria-label={`${site.kind} «${site.name}» — на главную`}>
          <Logo />
        </a>

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-mute transition hover:bg-blush hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={site.phoneHref} className="hidden min-h-11 items-center gap-2 px-2 text-sm font-semibold transition hover:text-rose-dark md:inline-flex">
            <Phone className="size-4 text-rose" aria-hidden="true" />
            {site.phone}
          </a>
          <button type="button" onClick={() => onBook()} className="btn-primary hidden min-h-11 px-5 text-sm sm:inline-flex">
            {hero.cta}
          </button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full bg-white shadow-sm lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Мобильная навигация" className="border-t border-line px-4 py-3 lg:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center rounded-xl px-3 font-serif text-xl hover:bg-blush">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={site.phoneHref} className="btn-secondary mt-3 w-full">
            <Phone className="size-4" aria-hidden="true" />
            {site.phone}
          </a>
        </nav>
      )}
    </header>
  )
}
