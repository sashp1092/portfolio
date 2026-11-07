import { useEffect, useState } from 'react'
import { ArrowLeft, CalendarCheck, Check, Clock, Users, X } from 'lucide-react'
import { data } from '../data'
import { ANY, dateLabel, endTime, getMaster, getService, mastersFor, servicesFor } from '../booking'
import { formatDuration, formatRub } from '../ui'
import BookingForm from './BookingForm'
import DateTimePicker from './DateTimePicker'

const SERVICE = 0
const MASTER = 1
const TIME = 2
const CONTACTS = 3
const DONE = 4

// Окно записи: услуга → мастер → дата и время → контакты.
// preset — что уже выбрано (нажали «Записаться» у услуги или у мастера).
export default function BookingModal({ open, preset, onClose, onPrivacy }) {
  const t = data.booking
  const [step, setStep] = useState(SERVICE)
  const [choice, setChoice] = useState({ serviceId: null, masterId: null, date: null, time: null })
  const [result, setResult] = useState(null)
  const [tab, setTab] = useState(data.categories[0].id)

  // При каждом открытии начинаем с нужного шага
  useEffect(() => {
    if (!open) return
    const serviceId = preset?.serviceId ?? null
    const masterId = preset?.masterId ?? null
    setChoice({ serviceId, masterId, date: null, time: null })
    setResult(null)
    setStep(serviceId ? MASTER : SERVICE)
    const firstCategory = masterId ? getMaster(masterId).categories[0] : serviceId ? getService(serviceId).category : data.categories[0].id
    setTab(firstCategory)
  }, [open, preset])

  // Esc закрывает, страница под окном не прокручивается
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  const service = choice.serviceId && getService(choice.serviceId)
  const master = choice.masterId && choice.masterId !== ANY ? getMaster(choice.masterId) : null

  const pickService = (id) => {
    // Если выбранный мастер не делает эту услугу — сбрасываем мастера
    const keepMaster = choice.masterId && choice.masterId !== ANY && getMaster(choice.masterId).categories.includes(getService(id).category)
    setChoice({ serviceId: id, masterId: keepMaster ? choice.masterId : null, date: null, time: null })
    setStep(keepMaster ? TIME : MASTER)
  }
  const pickMaster = (id) => {
    setChoice((c) => ({ ...c, masterId: id, date: null, time: null }))
    setStep(TIME)
  }
  const pickTime = (date, time) => {
    setChoice((c) => ({ ...c, date, time }))
    setStep(CONTACTS)
  }

  const availableServices = choice.masterId && choice.masterId !== ANY ? servicesFor(choice.masterId) : data.services
  const tabs = data.categories.filter((c) => availableServices.some((s) => s.category === c.id))

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center md:items-center md:p-6" role="dialog" aria-modal="true" aria-labelledby="booking-title">
      <button type="button" aria-label={t.close} onClick={onClose} className="absolute inset-0 bg-ink/50 backdrop-blur-sm" />

      <div className="animate-sheet-up relative flex max-h-[100dvh] w-full flex-col overflow-hidden rounded-t-[2rem] bg-cream shadow-2xl md:max-h-[90vh] md:max-w-2xl md:rounded-[2rem]">
        {/* Шапка окна: заголовок, шаги, сводка выбранного */}
        <div className="border-b border-line bg-white px-5 pb-4 pt-5 md:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {step > SERVICE && step < DONE && (
                <button type="button" onClick={() => setStep(step - 1)} aria-label={t.back} className="-ml-2 inline-flex size-11 items-center justify-center rounded-full hover:bg-blush">
                  <ArrowLeft className="size-5" aria-hidden="true" />
                </button>
              )}
              <h2 id="booking-title" className="font-serif text-3xl font-semibold">
                {t.title}
              </h2>
            </div>
            <button type="button" onClick={onClose} aria-label={t.close} className="inline-flex size-11 items-center justify-center rounded-full bg-blush">
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>

          {step < DONE && (
            <ol className="mt-4 grid grid-cols-4 gap-2" aria-label="Шаги записи">
              {t.steps.map((label, i) => (
                <li key={label} aria-current={i === step ? 'step' : undefined}>
                  <span className={`block h-1 rounded-full transition ${i <= step ? 'bg-rose' : 'bg-line'}`} />
                  <span className={`mt-1.5 block text-xs ${i === step ? 'font-semibold text-ink' : 'text-mute'}`}>{label}</span>
                </li>
              ))}
            </ol>
          )}

          {step > SERVICE && step < DONE && (
            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              {service && <Chip onClick={() => setStep(SERVICE)}>{service.name}</Chip>}
              {choice.masterId && <Chip onClick={() => setStep(MASTER)}>{master ? master.name : t.anyMaster}</Chip>}
              {choice.time && <Chip onClick={() => setStep(TIME)}>{`${dateLabel(choice.date)}, ${choice.time}`}</Chip>}
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-6 md:px-8">
          {step === SERVICE && (
            <div key="service" className="animate-fade-up">
              {master && <p className="mb-4 text-sm text-mute">Услуги мастера: {master.name}</p>}
              <div role="tablist" aria-label="Категории" className="no-scrollbar -mx-5 mb-4 flex gap-2 overflow-x-auto px-5 md:mx-0 md:px-0">
                {tabs.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    aria-selected={tab === c.id}
                    onClick={() => setTab(c.id)}
                    className={`min-h-11 shrink-0 rounded-full px-4 text-sm font-medium transition ${tab === c.id ? 'bg-ink text-white' : 'border border-line bg-white'}`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>
              <ul className="flex flex-col gap-2">
                {availableServices
                  .filter((s) => s.category === tab)
                  .map((s) => (
                    <li key={s.id}>
                      <OptionButton selected={choice.serviceId === s.id} onClick={() => pickService(s.id)}>
                        <span className="min-w-0 flex-1">
                          <span className="block font-semibold">{s.name}</span>
                          <span className="mt-0.5 flex items-center gap-1.5 text-sm text-mute">
                            <Clock className="size-3.5" aria-hidden="true" />
                            {formatDuration(s.duration)}
                          </span>
                        </span>
                        <span className="shrink-0 font-serif text-xl font-semibold">
                          {s.from && <span className="mr-1 text-sm text-mute">от</span>}
                          {formatRub(s.price)} ₽
                        </span>
                      </OptionButton>
                    </li>
                  ))}
              </ul>
            </div>
          )}

          {step === MASTER && service && (
            <ul key="master" className="animate-fade-up flex flex-col gap-2">
              <li>
                <OptionButton selected={choice.masterId === ANY} onClick={() => pickMaster(ANY)}>
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-full bg-blush text-rose-dark">
                    <Users className="size-6" aria-hidden="true" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-semibold">{t.anyMaster}</span>
                    <span className="text-sm text-mute">{t.anyMasterHint}</span>
                  </span>
                </OptionButton>
              </li>
              {mastersFor(service.id).map((m) => (
                <li key={m.id}>
                  <OptionButton selected={choice.masterId === m.id} onClick={() => pickMaster(m.id)}>
                    <img src={m.image.src} alt="" className="size-14 shrink-0 rounded-full object-cover" />
                    <span className="flex-1">
                      <span className="block font-semibold">{m.name}</span>
                      <span className="text-sm text-mute">
                        {m.role} · {m.exp}
                      </span>
                    </span>
                  </OptionButton>
                </li>
              ))}
            </ul>
          )}

          {step === TIME && service && choice.masterId && (
            <div key="time" className="animate-fade-up">
              <DateTimePicker serviceId={service.id} masterId={choice.masterId} value={choice} onPick={pickTime} />
              <p className="mt-6 text-xs text-mute">{t.demoNote}</p>
            </div>
          )}

          {step === CONTACTS && service && choice.time && (
            <div key="contacts" className="animate-fade-up">
              <Summary service={service} masterName={master ? master.name : t.anyMaster} date={choice.date} time={choice.time} />
              <BookingForm
                choice={choice}
                onPrivacy={onPrivacy}
                onDone={(res) => {
                  setResult(res)
                  setStep(DONE)
                }}
              />
            </div>
          )}

          {step === DONE && result && (
            <div className="animate-fade-zoom flex flex-col items-center py-6 text-center" role="status">
              <span className="flex size-20 items-center justify-center rounded-full bg-blush text-rose-dark">
                <CalendarCheck className="size-9" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-serif text-5xl font-semibold">{t.success.title}</h3>
              <div className="mt-6 w-full">
                <Summary service={service} masterName={result.masterName} date={result.date} time={result.time} />
              </div>
              <p className="mt-2 max-w-sm text-mute">{t.success.text}</p>
              <button type="button" onClick={onClose} className="btn-primary mt-8">
                {t.success.again}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function OptionButton({ selected, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`flex min-h-16 w-full items-center gap-4 rounded-[1.25rem] border-2 bg-white px-4 py-3 text-left transition hover:border-rose/60 ${
        selected ? 'border-rose' : 'border-transparent shadow-sm'
      }`}
    >
      {children}
      {selected && <Check className="size-5 shrink-0 text-rose-dark" aria-hidden="true" />}
    </button>
  )
}

function Chip({ onClick, children }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex min-h-9 items-center rounded-full bg-blush px-3 font-medium text-rose-dark transition hover:bg-rose hover:text-white">
      {children}
    </button>
  )
}

function Summary({ service, masterName, date, time }) {
  return (
    <dl className="grid grid-cols-2 gap-3 rounded-[1.5rem] bg-white p-5 text-left text-sm">
      <div className="col-span-2">
        <dt className="text-mute">Услуга</dt>
        <dd className="font-serif text-xl font-semibold">{service.name}</dd>
      </div>
      <div>
        <dt className="text-mute">Мастер</dt>
        <dd className="font-semibold">{masterName}</dd>
      </div>
      <div>
        <dt className="text-mute">Стоимость</dt>
        <dd className="font-semibold">
          {service.from ? 'от ' : ''}
          {formatRub(service.price)} ₽
        </dd>
      </div>
      <div className="col-span-2">
        <dt className="text-mute">Когда</dt>
        <dd className="font-semibold first-letter:uppercase">
          {dateLabel(date)}, {time}–{endTime(time, service.duration)}
        </dd>
      </div>
    </dl>
  )
}
