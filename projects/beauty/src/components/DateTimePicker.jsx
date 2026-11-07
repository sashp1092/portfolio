import { useMemo, useState } from 'react'
import { data } from '../data'
import { bookingDays, freeSlots } from '../booking'

// Выбор дня (лента на 2 недели) и свободного времени.
// Дни без свободных окон показываются, но неактивны.
export default function DateTimePicker({ serviceId, masterId, value, onPick }) {
  const t = data.booking
  const days = useMemo(
    () => bookingDays().map((d) => ({ ...d, slots: freeSlots(serviceId, masterId, d.iso) })),
    [serviceId, masterId],
  )
  const firstFree = days.find((d) => d.slots.length)?.iso ?? days[0].iso
  const [date, setDate] = useState(value.date ?? firstFree)
  const slots = days.find((d) => d.iso === date)?.slots ?? []

  return (
    <div>
      <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0" role="radiogroup" aria-label="День">
        {days.map((d) => {
          const active = d.iso === date
          const disabled = d.slots.length === 0
          return (
            <button
              key={d.iso}
              type="button"
              role="radio"
              aria-checked={active}
              disabled={disabled}
              onClick={() => setDate(d.iso)}
              className={`flex w-16 shrink-0 flex-col items-center rounded-[1.25rem] py-3 transition disabled:opacity-35 ${
                active ? 'bg-ink text-white' : 'bg-white hover:bg-blush'
              }`}
            >
              <span className={`text-xs uppercase ${active ? 'text-white/70' : 'text-mute'}`}>{d.isToday ? 'сег' : d.weekday}</span>
              <span className="font-serif text-2xl font-semibold">{d.day}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-6">
        {slots.length ? (
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-6" role="radiogroup" aria-label="Время">
            {slots.map((time) => {
              const active = value.date === date && value.time === time
              return (
                <button
                  key={time}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => onPick(date, time)}
                  className={`min-h-12 rounded-xl text-sm font-semibold transition ${
                    active ? 'bg-rose-dark text-white' : 'border border-line bg-white hover:border-rose'
                  }`}
                >
                  {time}
                </button>
              )
            })}
          </div>
        ) : (
          <p className="rounded-[1.25rem] bg-white p-5 text-mute">{t.noSlots}</p>
        )}
      </div>
    </div>
  )
}
