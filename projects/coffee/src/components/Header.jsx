import { useState } from 'react'
import { Coffee, Menu as MenuIcon, ShoppingBag, X } from 'lucide-react'
import { data } from '../data'

export default function Header({ count, onCart }) {
  const [open, setOpen] = useState(false)
  const { site, nav, cart } = data

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 md:h-20 md:px-6">
        <a href="#top" className="flex min-h-11 items-center gap-2" aria-label={`Кофейня «${site.name}» — на главную`}>
          <span className="flex size-9 items-center justify-center rounded-xl bg-leaf text-white">
            <Coffee className="size-5" aria-hidden="true" />
          </span>
          <span className="font-heading text-xl font-bold">{site.name}</span>
        </a>

        <nav aria-label="Основная навигация" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="inline-flex min-h-11 items-center rounded-full px-4 text-sm font-medium text-mute transition hover:bg-white hover:text-ink">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onCart}
            aria-label={`${cart.open}: ${count}`}
            className="relative inline-flex size-11 items-center justify-center rounded-full bg-white shadow-sm transition hover:bg-leaf hover:text-white"
          >
            <ShoppingBag className="size-5" aria-hidden="true" />
            {count > 0 && (
              // key={count} пересоздаёт бейдж при каждом изменении — так анимация «пульса» запускается заново
              <span key={count} className="animate-pop absolute -right-1 -top-1 flex min-w-5 items-center justify-center rounded-full bg-leaf px-1.5 text-xs font-bold leading-5 text-white">
                {count}
              </span>
            )}
          </button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full bg-white shadow-sm md:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden="true" /> : <MenuIcon className="size-5" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label="Мобильная навигация" className="border-t border-line px-4 py-3 md:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)} className="flex min-h-12 items-center rounded-xl px-3 text-lg font-medium hover:bg-white">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
