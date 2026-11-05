import { useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { data } from '../data'
import { readyTime } from '../menu'
import { formatPhone, formatRub } from '../ui'
import OptionChips from './OptionChips'

// Отправка заказа на серверную функцию api/order.js → Telegram владельца.
// При `npm run dev` функции Vercel не запускаются, поэтому локально отправка имитируется.
async function submitOrder(payload) {
  if (import.meta.env.DEV) {
    await new Promise((resolve) => setTimeout(resolve, 700))
    return { orderNo: 100 + Math.floor(Math.random() * 900), readyAt: readyTime(payload.pickup, payload.pickupTime) }
  }
  const res = await fetch('/api/order', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const json = await res.json().catch(() => ({}))
  if (!res.ok || !json.ok) throw new Error(json.error || `HTTP ${res.status}`)
  return json
}

export default function Checkout({ cart, onDone, onPrivacy }) {
  const { order, site } = data
  const [form, setForm] = useState({ pickup: 'asap', pickupTime: '', name: '', phone: '', comment: '', consent: false })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [sendError, setSendError] = useState(false)

  const update = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const validate = () => {
    const next = {}
    if (form.name.trim().length < 2) next.name = order.errors.name
    if (form.phone.replace(/\D/g, '').length !== 11) next.phone = order.errors.phone
    if (form.pickup === 'custom' && !form.pickupTime) next.pickupTime = order.errors.time
    if (!form.consent) next.consent = order.errors.consent
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSending(true)
    setSendError(false)
    try {
      const result = await submitOrder({
        ...form,
        website: e.target.website.value, // ловушка для ботов
        items: cart.lines.map(({ itemId, size, milk, qty }) => ({ itemId, size, milk, qty })),
      })
      cart.clear()
      onDone({ orderNo: result.orderNo, readyAt: result.readyAt })
    } catch {
      setSendError(true)
    } finally {
      setSending(false)
    }
  }

  // Запасной путь: тот же заказ готовым текстом в WhatsApp
  const pickupText =
    form.pickup === 'custom' ? `к ${form.pickupTime || '…'}` : order.pickup.find((p) => p.id === form.pickup).label.toLowerCase()
  const waText = [
    'Здравствуйте! Хочу сделать заказ на самовывоз:',
    ...cart.lines.map((l) => `• ${l.item.name}${l.options ? ` (${l.options})` : ''} × ${l.qty} — ${formatRub(l.total)} ₽`),
    `Итого: ${formatRub(cart.total)} ₽`,
    `Заберу: ${pickupText}`,
  ].join('\n')
  const waHref = `${site.whatsapp}?text=${encodeURIComponent(waText)}`

  const inputCls = (err) =>
    `min-h-12 w-full rounded-xl border bg-white px-4 text-base outline-none transition placeholder:text-mute/60 focus:border-leaf focus:ring-4 focus:ring-leaf/15 ${
      err ? 'border-red-500' : 'border-line'
    }`

  return (
    <form onSubmit={handleSubmit} noValidate className="mt-6 flex flex-col gap-5">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div>
        <OptionChips
          name="pickup"
          legend={order.pickupLabel}
          value={form.pickup}
          onChange={(v) => update('pickup', v)}
          options={order.pickup.map((p) => ({ id: p.id, label: p.label, extra: p.hint }))}
        />
        {form.pickup === 'custom' && (
          <div className="mt-3">
            <label htmlFor="pickup-time" className="mb-1.5 block text-sm font-medium">
              {order.timeLabel}
            </label>
            <input
              id="pickup-time"
              type="time"
              value={form.pickupTime}
              onChange={(e) => update('pickupTime', e.target.value)}
              aria-invalid={!!errors.pickupTime}
              className={`${inputCls(errors.pickupTime)} max-w-40`}
            />
            {errors.pickupTime && <p className="mt-1 text-sm text-red-600">{errors.pickupTime}</p>}
          </div>
        )}
      </div>

      <Field id="order-name" label={order.nameLabel} error={errors.name}>
        <input
          id="order-name"
          autoComplete="name"
          placeholder={order.namePlaceholder}
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'order-name-error' : undefined}
          className={inputCls(errors.name)}
        />
      </Field>

      <Field id="order-phone" label={order.phoneLabel} error={errors.phone}>
        <input
          id="order-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder={order.phonePlaceholder}
          value={form.phone}
          onChange={(e) => update('phone', formatPhone(e.target.value))}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? 'order-phone-error' : undefined}
          className={inputCls(errors.phone)}
        />
      </Field>

      <Field id="order-comment" label={order.commentLabel}>
        <textarea
          id="order-comment"
          rows={2}
          maxLength={300}
          placeholder={order.commentPlaceholder}
          value={form.comment}
          onChange={(e) => update('comment', e.target.value)}
          className={`${inputCls(false)} py-3`}
        />
      </Field>

      <div>
        <div className="flex items-start gap-3">
          <input
            id="order-consent"
            type="checkbox"
            checked={form.consent}
            onChange={(e) => update('consent', e.target.checked)}
            aria-invalid={!!errors.consent}
            aria-describedby={errors.consent ? 'order-consent-error' : undefined}
            className="mt-0.5 size-6 shrink-0 cursor-pointer accent-leaf"
          />
          <label htmlFor="order-consent" className="text-sm leading-relaxed text-mute">
            {order.consentStart}
            <button type="button" onClick={onPrivacy} className="font-medium text-leaf underline underline-offset-2">
              {order.consentLink}
            </button>
          </label>
        </div>
        {errors.consent && (
          <p id="order-consent-error" className="mt-1 text-sm text-red-600">
            {errors.consent}
          </p>
        )}
      </div>

      <p className="rounded-xl bg-leaf/10 px-4 py-3 text-sm font-medium text-leaf">{order.payment}</p>

      <button type="submit" disabled={sending} className="btn-primary w-full text-lg">
        {sending ? order.sending : `${order.submit} · ${formatRub(cart.total)} ₽`}
      </button>
      {sendError && (
        <p role="alert" className="text-sm text-red-600">
          {order.errors.send}
        </p>
      )}

      <p className="text-center text-xs uppercase tracking-widest text-mute">{order.or}</p>
      <a href={waHref} target="_blank" rel="noopener noreferrer" className="btn-secondary">
        <MessageCircle className="size-4" aria-hidden="true" />
        {order.whatsapp}
      </a>
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
