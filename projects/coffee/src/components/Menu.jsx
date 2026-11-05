import { data } from '../data'
import { getCategory } from '../menu'
import MenuItem from './MenuItem'
import SectionHeading from './SectionHeading'

export default function Menu({ cart, tab, onTab }) {
  const { menu } = data
  const items = menu.items.filter((i) => i.category === tab)
  const note = getCategory(tab)?.note

  return (
    <section id="menu" aria-labelledby="menu-title" className="scroll-mt-16 py-14 md:scroll-mt-20 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <SectionHeading id="menu-title" eyebrow={menu.eyebrow} title={menu.title} subtitle={menu.subtitle} />

        {/* Вкладки прилипают под шапкой, на телефоне листаются пальцем по горизонтали */}
        <div className="sticky top-16 z-30 -mx-4 bg-cream/95 px-4 py-3 backdrop-blur md:top-20 md:mx-0 md:px-0">
          <div role="tablist" aria-label="Категории меню" className="no-scrollbar flex gap-2 overflow-x-auto">
            {menu.categories.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={tab === c.id}
                aria-controls="menu-panel"
                onClick={() => onTab(c.id)}
                className={`min-h-11 shrink-0 rounded-full px-5 font-semibold transition ${
                  tab === c.id ? 'bg-ink text-white' : 'bg-white text-ink shadow-sm hover:bg-white/60'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {note && <p className="mt-4 rounded-2xl bg-leaf/10 px-4 py-3 text-sm font-medium text-leaf">{note}</p>}

        <div id="menu-panel" role="tabpanel" key={tab} className="animate-fade-up mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <MenuItem key={item.id} item={item} cart={cart} />
          ))}
        </div>
      </div>
    </section>
  )
}
