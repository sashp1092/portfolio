import { useState } from 'react'
import { data } from '../data'
import { formatRub, roundTo } from '../ui'

export default function ResultForm({ answers, onSubmitted, onPrivacy }) {
  const { quiz } = data
  const r = quiz.result
  const repairStep = quiz.steps.find((s) => s.key === 'repair')
  const giftStep = quiz.steps.find((s) => s.key === 'gift')
  const repair = repairStep.options.find((o) => o.value === answers.repair)
  const gift = giftStep.options.find((o) => o.value === answers.gift)

  const priceFrom = roundTo(answers.area * repair.price, 1000)
  const priceTo = roundTo(answers.area * repair.price * 1.25, 1000)

  const [form, setForm] = useState({ name: '', phone: '', contact: 'call', consent: false })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = r.errors.name
    if (form.phone.replace(/\D/g, '').length < 11) next.phone = r.errors.phone
    if (!form.consent) next.consent = r.errors.consent
    setErrors(next)
    return Object.keys(next).length === 0
  }

  // Отправка заявки на серверную функцию api/lead.js → Telegram владельца.
  // При `npm run dev` функции Vercel не запускаются, поэтому локально отправка имитируется.
  const submitLead = async (payload) => {
    if (import.meta.env.DEV) {
      await new Promise((resolve) => setTimeout(resolve, 700))
      return
    }
    const res = await fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSending(true)
    setSendError(false)
    try {
      await submitLead({ ...answers, ...form, website: e.target.website.value, priceFrom, priceTo })
      onSubmitted()
    } catch {
      setSendError(true)
    } finally {
      setSending(false)
    }
  }

  const formatPhone = (value) => {
    let digits = value.replace(/\D/g, '')
    if (digits.startsWith('8')) digits = '7' + digits.slice(1)
    if (!digits.startsWith('7')) digits = '7' + digits
    digits = digits.slice(0, 11)
    const p = digits.slice(1)
    let out = '+7'
    if (p.length) out += ` (${p.slice(0, 3)}`
    if (p.length >= 3) out += ')'
    if (p.length > 3) out += ` ${p.slice(3, 6)}`
    if (p.length > 6) out += `-${p.slice(6, 8)}`
    if (p.length > 8) out += `-${p.slice(8, 10)}`
    return out
  }

  const inputCls = (err) =>
    `min-h-12 w-full rounded-xl border bg-white px-4 text-base transition placeholder:text-ink/40 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15 ${
      err ? 'border-red-500' : 'border-ink/15'
    }`

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <div className="rounded-2xl bg-paper p-5 md:p-6">
        <p className="text-sm font-medium text-ink/60">{r.title}</p>
        <p className="mt-2 font-heading text-2xl font-semibold leading-tight md:text-3xl" aria-live="polite">
          {r.from} {formatRub(priceFrom)} <br className="sm:hidden" />
          {r.to} {formatRub(priceTo)} {r.currency}
        </p>
        <p className="mt-3 text-sm text-ink/70">{r.note}</p>
        <dl className="mt-5 grid gap-2 text-sm">
          <div className="flex justify-between gap-4 border-t border-ink/10 pt-2">
            <dt className="text-ink/60">{r.summaryArea}</dt>
            <dd className="font-semibold">
              {answers.area} {quiz.areaUnit}
            </dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-ink/10 pt-2">
            <dt className="text-ink/60">{r.summaryRepair}</dt>
            <dd className="font-semibold">{repair.label}</dd>
          </div>
          <div className="flex justify-between gap-4 border-t border-ink/10 pt-2">
            <dt className="text-ink/60">{r.summaryGift}</dt>
            <dd className="text-right font-semibold text-brand">{gift.label}</dd>
          </div>
        </dl>
      </div>

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
        <h3 className="font-heading text-lg font-semibold">{r.formTitle}</h3>

        {/* Ловушка для спам-ботов: поле скрыто от людей, боты его заполняют */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

        <div>
          <label htmlFor="lead-name" className="mb-1.5 block text-sm font-medium">
            {r.nameLabel}
          </label>
          <input
            id="lead-name"
            type="text"
            autoComplete="name"
            placeholder={r.namePlaceholder}
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'lead-name-error' : undefined}
            className={inputCls(errors.name)}
          />
          {errors.name && (
            <p id="lead-name-error" className="mt-1 text-sm text-red-600">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="lead-phone" className="mb-1.5 block text-sm font-medium">
            {r.phoneLabel}
          </label>
          <input
            id="lead-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder={r.phonePlaceholder}
            value={form.phone}
            onChange={(e) => update('phone', e.target.value ? formatPhone(e.target.value) : '')}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'lead-phone-error' : undefined}
            className={inputCls(errors.phone)}
          />
          {errors.phone && (
            <p id="lead-phone-error" className="mt-1 text-sm text-red-600">
              {errors.phone}
            </p>
          )}
        </div>

        <fieldset>
          <legend className="mb-1.5 text-sm font-medium">{r.contactLabel}</legend>
          <div className="grid grid-cols-3 gap-2">
            {r.contactOptions.map((opt) => (
              <label
                key={opt.value}
                className={`flex min-h-12 cursor-pointer items-center justify-center rounded-xl border-2 px-2 text-sm font-semibold transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand ${
                  form.contact === opt.value ? 'border-brand bg-brand/5 text-brand' : 'border-ink/10 hover:border-ink/30'
                }`}
              >
                <input
                  type="radio"
                  name="contact"
                  value={opt.value}
                  checked={form.contact === opt.value}
                  onChange={() => update('contact', opt.value)}
                  className="sr-only"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <div className="flex items-start gap-3">
            <input
              id="lead-consent"
              type="checkbox"
              required
              checked={form.consent}
              onChange={(e) => update('consent', e.target.checked)}
              aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? 'lead-consent-error' : undefined}
              className="mt-0.5 size-6 shrink-0 cursor-pointer accent-brand"
            />
            <label htmlFor="lead-consent" className="text-sm leading-relaxed text-ink/70">
              {r.consentStart}
              <button
                type="button"
                onClick={onPrivacy}
                className="font-medium text-brand underline underline-offset-2 hover:text-brand-dark"
              >
                {r.consentLink}
              </button>
            </label>
          </div>
          {errors.consent && (
            <p id="lead-consent-error" className="mt-1 text-sm text-red-600">
              {errors.consent}
            </p>
          )}
        </div>

        <button type="submit" disabled={sending} className={`btn-primary w-full text-base`}>
          {sending ? r.sending : r.submit}
        </button>
        {sendError && (
          <p role="alert" className="text-sm text-red-600">
            {r.errors.send}
          </p>
        )}
      </form>
    </div>
  )
}
