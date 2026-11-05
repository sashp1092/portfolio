import { useState } from 'react'
import { Plus } from 'lucide-react'
import { data } from '../data'
import { defaultMilk, defaultSize, lineKey, resolveLine } from '../menu'
import { formatRub } from '../ui'
import Counter from './Counter'
import OptionChips from './OptionChips'

export default function MenuItem({ item, cart }) {
  const { menu } = data
  const [size, setSize] = useState(() => defaultSize(item))
  const [milk, setMilk] = useState(() => defaultMilk(item))

  const cfg = { itemId: item.id, size, milk }
  const { unit } = resolveLine(cfg)
  const key = lineKey(cfg)
  const qty = cart.qtyOf(key)

  return (
    <article className="flex flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-[0_10px_30px_-20px_rgba(43,29,20,0.35)]">
      <img src={item.image.src} alt={item.image.alt} loading="lazy" className="aspect-[4/3] w-full object-cover" />
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-heading text-lg font-bold leading-snug">{item.name}</h3>
            <span className="whitespace-nowrap font-heading text-lg font-bold text-leaf">{formatRub(unit)} ₽</span>
          </div>
          <p className="mt-1 text-sm text-mute">
            {item.desc}
            {item.volume && <span className="whitespace-nowrap"> · {item.volume}</span>}
          </p>
        </div>

        {item.sizes && (
          <OptionChips
            name={`${item.id}-size`}
            legend={menu.sizeLabel}
            value={size}
            onChange={setSize}
            options={item.sizes.map((s) => ({ id: s.id, label: s.id, extra: s.volume }))}
          />
        )}
        {item.milk && (
          <OptionChips
            name={`${item.id}-milk`}
            legend={menu.milkLabel}
            value={milk}
            onChange={setMilk}
            options={menu.milkOptions.map((m) => ({ id: m.id, label: m.label, extra: m.price ? `+${m.price} ₽` : '' }))}
          />
        )}

        <div className="mt-auto pt-1">
          {qty === 0 ? (
            <button type="button" onClick={() => cart.add(cfg)} className="btn-primary w-full">
              <Plus className="size-5" aria-hidden="true" />
              {menu.addLabel}
            </button>
          ) : (
            <Counter qty={qty} name={item.name} onDec={() => cart.setQty(key, qty - 1)} onInc={() => cart.add(cfg)} />
          )}
        </div>
      </div>
    </article>
  )
}
