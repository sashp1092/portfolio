import { Minus, Plus } from 'lucide-react'

// Счётчик «− 2 +». name — название позиции для экранных читалок
export default function Counter({ qty, onDec, onInc, name, size = 'md' }) {
  const btn =
    size === 'sm'
      ? 'size-11 rounded-full bg-white text-ink shadow-sm hover:bg-leaf hover:text-white'
      : 'size-12 rounded-full bg-cream text-ink hover:bg-leaf hover:text-white'
  return (
    <div className={`flex items-center justify-between gap-3 ${size === 'sm' ? '' : 'rounded-full bg-cream p-1'}`}>
      <button type="button" onClick={onDec} aria-label={`Убрать одну: ${name}`} className={`inline-flex items-center justify-center transition ${btn}`}>
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <span className="min-w-6 text-center text-lg font-bold" aria-live="polite">
        {qty}
      </span>
      <button type="button" onClick={onInc} aria-label={`Добавить ещё: ${name}`} className={`inline-flex items-center justify-center transition ${btn}`}>
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  )
}
