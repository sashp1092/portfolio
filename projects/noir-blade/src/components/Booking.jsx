import { useState } from 'react'
import { services, site } from '../data'
import TelegramIcon from './TelegramIcon'

export default function Booking() {
  const [sent, setSent] = useState(false)

  function onSubmit(e) {
    e.preventDefault()
    // Демо: заявка никуда не уходит. На сайте клиента — отправка в Telegram через серверный обработчик.
    setSent(true)
    e.target.reset()
  }

  const mapSrc = `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(site.yandexMapsQuery)}&z=16`
  const today = new Date().toISOString().slice(0, 10)

  return (
    <section id="book" className="scroll-mt-16 border-t border-line bg-surface py-24 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row">
        <div className="flex flex-col gap-7 md:flex-1">
          <div className="flex flex-col gap-4">
            <span className="eyebrow">Запись</span>
            <h2 className="font-serif text-4xl font-medium leading-tight md:text-5xl">Забронируйте кресло</h2>
          </div>
          <dl className="flex flex-col gap-7">
            <Info label="Адрес">{site.address}</Info>
            <Info label="Часы работы">{site.hours}</Info>
            <Info label="Контакты">
              <a href={site.phoneHref} className="border-b border-gold text-bone hover:text-gold">
                {site.phone}
              </a>{' '}
              ·{' '}
              <a href={`mailto:${site.email}`} className="border-b border-gold text-bone hover:text-gold">
                {site.email}
              </a>
            </Info>
          </dl>
          <div className="overflow-hidden border border-line">
            <iframe
              src={mapSrc}
              title={`Карта: ${site.address}`}
              loading="lazy"
              className="h-72 w-full grayscale invert-[0.9] hue-rotate-180"
            />
          </div>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-4 md:flex-1">
          <div className="flex flex-col gap-4 md:flex-row">
            <Field label="Имя">
              <input required name="name" autoComplete="name" placeholder="Иван Иванов" className="field" />
            </Field>
            <Field label="Телефон">
              <input required name="phone" type="tel" autoComplete="tel" placeholder="+7 (900) 000-00-00" className="field" />
            </Field>
          </div>
          <Field label="Услуга">
            <select name="service" className="field">
              {services.map((s) => (
                <option key={s.name}>{s.name}</option>
              ))}
            </select>
          </Field>
          <div className="flex flex-col gap-4 md:flex-row">
            <Field label="Дата">
              <input required name="date" type="date" min={today} className="field" />
            </Field>
            <Field label="Время">
              <input required name="time" type="time" className="field" />
            </Field>
          </div>

          {/* 152-ФЗ: согласие на обработку персональных данных */}
          <label className="mt-1 flex items-start gap-3 text-sm text-mute">
            <input required type="checkbox" className="mt-1 h-4 w-4 shrink-0 accent-gold" />
            <span>
              Согласен на обработку персональных данных согласно{' '}
              <a href={site.privacyUrl} className="underline hover:text-gold">
                политике конфиденциальности
              </a>
            </span>
          </label>

          <button type="submit" className="btn mt-2">
            Отправить заявку
          </button>
          {sent && (
            <p role="status" className="text-sm text-gold">
              Спасибо! Мы скоро свяжемся с вами для подтверждения.
            </p>
          )}

          <span className="text-center text-xs uppercase tracking-[0.2em] text-mute">или</span>
          <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <TelegramIcon />
            Написать в Telegram
          </a>
        </form>
      </div>
    </section>
  )
}

function Info({ label, children }) {
  return (
    <div>
      <dt className="mb-1.5 text-xs uppercase tracking-[0.2em] text-gold">{label}</dt>
      <dd className="text-mute">{children}</dd>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="flex flex-1 flex-col gap-2 text-xs uppercase tracking-[0.15em] text-mute">
      {label}
      {children}
    </label>
  )
}
