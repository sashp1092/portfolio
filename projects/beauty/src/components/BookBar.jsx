import { CalendarHeart } from 'lucide-react'
import { data } from '../data'

// Плавающая кнопка записи на телефоне — главное действие всегда под пальцем
export default function BookBar({ onBook }) {
  return (
    <div className="fixed inset-x-4 bottom-4 z-30 md:hidden">
      <button type="button" onClick={() => onBook()} className="btn-primary min-h-14 w-full text-lg shadow-[0_20px_40px_-15px_rgba(160,100,90,0.8)]">
        <CalendarHeart className="size-5" aria-hidden="true" />
        {data.hero.cta}
      </button>
    </div>
  )
}
