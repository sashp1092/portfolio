import { useEffect, useState } from 'react'
import { CircleCheck, ShoppingBag, Trash2, X } from 'lucide-react'
import { data } from '../data'
import { formatRub } from '../ui'
import Checkout from './Checkout'
import Counter from './Counter'

export default function CartDrawer({ open, onClose, cart, onPrivacy }) {
  const { cart: t, order } = data
  const [done, setDone] = useState(null) // { orderNo, readyAt } после успешного заказа

  // Пока корзина открыта: Esc закрывает, страница под ней не прокручивается
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

  const close = () => {
    setDone(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end" role="dialog" aria-modal="true" aria-labelledby="cart-title">
      <button type="button" aria-label={t.close} onClick={close} className="absolute inset-0 bg-ink/50 backdrop-blur-sm" />

      <div className="animate-slide-in relative flex h-full w-full max-w-md flex-col bg-cream shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 id="cart-title" className="font-heading text-xl font-bold">
            {t.title}
          </h2>
          <button type="button" onClick={close} aria-label={t.close} className="inline-flex size-11 items-center justify-center rounded-full bg-white shadow-sm">
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5">
          {done ? (
            <div className="animate-fade-zoom flex flex-col items-center py-10 text-center" role="status">
              <span className="flex size-20 items-center justify-center rounded-full bg-leaf/10 text-leaf">
                <CircleCheck className="size-10" aria-hidden="true" />
              </span>
              <h3 className="mt-6 font-heading text-3xl font-bold">{order.success.title}</h3>
              <dl className="mt-6 grid w-full grid-cols-2 gap-3">
                <div className="rounded-2xl bg-white p-4">
                  <dt className="text-sm text-mute">{order.success.number}</dt>
                  <dd className="font-heading text-3xl font-bold">{done.orderNo}</dd>
                </div>
                <div className="rounded-2xl bg-white p-4">
                  <dt className="text-sm text-mute">{order.success.ready}</dt>
                  <dd className="font-heading text-3xl font-bold text-leaf">{done.readyAt}</dd>
                </div>
              </dl>
              <p className="mt-5 text-mute">{order.success.text}</p>
              <button type="button" onClick={close} className="btn-secondary mt-8">
                {order.success.again}
              </button>
            </div>
          ) : cart.lines.length === 0 ? (
            <div className="flex flex-col items-center py-16 text-center">
              <span className="flex size-20 items-center justify-center rounded-full bg-white text-mute">
                <ShoppingBag className="size-9" aria-hidden="true" />
              </span>
              <p className="mt-6 font-heading text-xl font-bold">{t.empty}</p>
              <p className="mt-2 text-mute">{t.emptyHint}</p>
              <a href="#menu" onClick={close} className="btn-primary mt-8">
                {t.toMenu}
              </a>
            </div>
          ) : (
            <>
              <ul className="flex flex-col gap-3">
                {cart.lines.map((l) => (
                  <li key={l.key} className="flex gap-3 rounded-2xl bg-white p-3">
                    <img src={l.item.image.src} alt="" className="size-20 shrink-0 rounded-xl object-cover" />
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="font-semibold leading-snug">{l.item.name}</p>
                          {l.options && <p className="text-sm text-mute">{l.options}</p>}
                        </div>
                        <button
                          type="button"
                          onClick={() => cart.setQty(l.key, 0)}
                          aria-label={`${t.remove}: ${l.item.name}`}
                          className="-mr-1 -mt-1 inline-flex size-11 shrink-0 items-center justify-center rounded-full text-mute transition hover:bg-cream hover:text-ink"
                        >
                          <Trash2 className="size-4" aria-hidden="true" />
                        </button>
                      </div>
                      <div className="mt-auto flex items-center justify-between gap-2">
                        <Counter size="sm" qty={l.qty} name={l.item.name} onDec={() => cart.setQty(l.key, l.qty - 1)} onInc={() => cart.setQty(l.key, l.qty + 1)} />
                        <span className="font-heading font-bold">{formatRub(l.total)} ₽</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex items-center justify-between rounded-2xl bg-white px-4 py-3">
                <span className="font-semibold">{t.total}</span>
                <span className="font-heading text-2xl font-bold">{formatRub(cart.total)} ₽</span>
              </div>

              <Checkout cart={cart} onDone={setDone} onPrivacy={onPrivacy} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
