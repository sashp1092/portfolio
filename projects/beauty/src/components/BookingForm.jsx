import { useState } from 'react'
import { data } from '../data'
import { assignMaster, getMaster } from '../booking'
import { formatPhone } from '../ui'

// Отправка записи на серверную функцию api/booking.js → Telegram администратора.
// При `npm run dev` функции Vercel не запускаются, поэтому локально отправка имитируется.
async function submitBooking(payload) {
  if (import.meta.env.DEV) {
    await new Promise((resolve) => setTimeout(resolve, 700))
    const master = assignMaster(payload.serviceId, payload.masterId, payload.date, payload.time)
    return { masterName: master?.name ?? data.booking.anyMaster, date: payload.date, time: payload.time }
  }
  const res = await fetch('/api/booking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok || !json.ok) throw new Error(json.error || `HTTP ${res.status}`)
  return json
}

export default function BookingForm({ choice, onDone, onPrivacy }) {
  const t = data.booking
  const [form, setForm] = useState({ name: '', phone: '', comment: '', consent: false })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = t.errors.name
    if (form.phone.replace(/\D/g, '').length !== 11) next.phone = t.errors.phone
    if (!form.consent) next.consent = t.errors.consent
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSending(true)
    setSendError(false)
    try {
      const res = await submitBooking({ ...choice, ...form, website: e.target.website.value })
      onDone({ masterName: res.masterName ?? getMaster(choice.masterId)?.name, date: res.date, time: res.time })
    } catch {
      setSendError(true)
    } finally {
      setSending(false)
    }
  }

  const inputCls = (err) =>
    `min-h-12 w-full rounded-xl border bg-white px-4 text-base outline-none transition placeholder:text-mute/60 focus:border-rose focus:ring-4 focus:ring-rose/15 ${
      err ? 'border-red-500' : 'border-line'
    }`

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-5 flex flex-col gap-4">
      {/* Ловушка для спам-ботов: поле скрыто от людей */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="b-name" label={t.nameLabel} error={errors.name}>
          <input
            id="b-name"
            autoComplete="name"
            placeholder={t.namePlaceholder}
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'b-name-error' : undefined}
            className={inputCls(errors.name)}
          />
        </Field>
        <Field id="b-phone" label={t.phoneLabel} error={errors.phone}>
          <input
            id="b-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={t.phonePlaceholder}
            value={form.phone}
            onChange={(e) => update('phone', formatPhone(e.target.value))}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'b-phone-error' : undefined}
            className={inputCls(errors.phone)}
          />
        </Field>
      </div>

      <Field id="b-comment" label={t.commentLabel}>
        <textarea
          id="b-comment"
          rows={2}
          maxLength={300}
          placeholder={t.commentPlaceholder}
          value={form.comment}
          onChange={(e) => update('comment', e.target.value)}
          className={`${inputCls(false)} py-3`}
        />
      </Field>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="b-consent"
            type="checkbox"
            checked={form.consent}
            onChange={(e) => update('consent', e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? 'b-consent-error' : undefined}
            className="mt-0.5 size-6 shrink-0 cursor-pointer accent-rose-dark"
          />
          <label htmlFor="b-consent" className="text-sm leading-relaxed text-mute">
            {t.consentStart}
            <button type="button" onClick={onPrivacy} className="font-medium text-rose-dark underline underline-offset-2">
              {t.consentLink}
            </button>
          </label>
        </div>
        {errors.consent && (
          <p id="b-consent-error" className="mt-1 text-sm text-red-600">
            {errors.consent}
          </p>
        )}
      </div>

      <p className="rounded-xl bg-blush px-4 py-3 text-sm font-medium text-rose-dark">{t.payment}</p>

      <button type="submit" disabled={sending} className="btn-primary w-full text-lg">
        {sending ? t.sending : t.submit}
      </button>
      {sendError && (
        <p role="alert" className="text-sm text-red-600">
          {t.errors.send}
        </p>
      )}
    </form>
  )
}

function Field({ id, label, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}
