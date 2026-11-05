import { ShoppingBag } from 'lucide-react'
import { data } from '../data'
import { formatRub, plural } from '../ui'

// Плавающая кнопка корзины: видна, когда в корзине что-то есть
export default function CartBar({ count, total, onOpen }) {
  if (count === 0) return null
  return (
    <button
      type="button"
      onClick={onOpen}
      className="animate-fade-up fixed inset-x-4 bottom-4 z-40 flex min-h-14 items-center justify-between gap-4 rounded-full bg-ink px-6 text-white shadow-[0_20px_40px_-15px_rgba(43,29,20,0.7)] transition hover:bg-leaf md:inset-x-auto md:right-6 md:bottom-6"
    >
      <span className="flex items-center gap-2 font-semibold">
        <ShoppingBag className="size-5" aria-hidden="true" />
        {data.cart.bar} · {count} {plural(count, ['позиция', 'позиции', 'позиций'])}
      </span>
      <span className="font-heading font-bold">{formatRub(total)} ₽</span>
    </button>
  )
}
