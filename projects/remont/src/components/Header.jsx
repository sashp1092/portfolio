import { useState } from 'react'
import { Hammer, Menu, Phone, X } from 'lucide-react'
import { data } from '../data'

export default function Header() {
  const [open, setOpen] = useState(false)
  const { company, nav, header } = data

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-white/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 md:h-20 md:px-6">
        <a href="#top" className="flex min-h-11 items-center gap-2" aria-label={`${company.name} — ${header.homeLabel}`}>
          <span className="flex size-9 items-center justify-center rounded-xl bg-brand text-white">
            <Hammer className="size-5" aria-hidden="true" />
          </span>
          <span className="whitespace-nowrap font-heading text-base font-semibold leading-none md:text-lg">{company.name}</span>
        </a>

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="inline-flex min-h-11 items-center rounded-full px-3 text-sm font-medium text-ink/70 transition hover:bg-paper hover:text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={company.phoneHref}
            className="hidden min-h-11 items-center gap-2 px-2 font-semibold transition hover:text-brand sm:inline-flex"
          >
            <Phone className="size-4 text-brand" aria-hidden="true" />
            {company.phone}
          </a>
          <a href="#quiz" className={`btn-primary min-h-11 px-5 text-sm max-md:hidden`}>
            {header.cta}
          </a>
          <a
            href={company.phoneHref}
            className="inline-flex size-11 items-center justify-center rounded-full bg-paper sm:hidden"
            aria-label={`Позвонить ${company.phone}`}
          >
            <Phone className="size-5 text-brand" aria-hidden="true" />
          </a>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full bg-paper lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? header.menuClose : header.menuOpen}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`grid overflow-hidden border-ink/5 transition-[grid-template-rows] duration-300 lg:hidden ${
          open ? 'grid-rows-[1fr] border-t' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0">
          <nav aria-label="Мобильная навигация" className="mx-auto max-w-[1200px] px-4 py-4">
            <ul className="flex flex-col">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    tabIndex={open ? 0 : -1}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center rounded-xl px-3 text-lg font-medium transition hover:bg-paper"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="#quiz"
              tabIndex={open ? 0 : -1}
              onClick={() => setOpen(false)}
              className={`btn-primary mt-3 w-full`}
            >
              {header.cta}
            </a>
          </nav>
        </div>
      </div>
    </header>
  )
}
