// Логика меню и цен. Используется и в браузере (корзина), и на сервере (api/order.js),
// поэтому цена считается одинаково в обоих местах, а сервер не доверяет суммам из браузера.
import { data } from './data.js'

const { items, milkOptions, categories } = data.menu
const byId = Object.fromEntries(items.map((i) => [i.id, i]))

export const getItem = (id) => byId[id]
export const getCategory = (id) => categories.find((c) => c.id === id)

// Объём по умолчанию — средний (M), если он есть
export const defaultSize = (item) => item.sizes?.[1]?.id ?? item.sizes?.[0]?.id ?? null
export const defaultMilk = (item) => (item.milk ? milkOptions[0].id : null)

// Одна и та же позиция с разными параметрами — разные строки корзины
export const lineKey = ({ itemId, size, milk }) => `${itemId}|${size ?? ''}|${milk ?? ''}`

// Строка корзины → всё, что нужно для показа: позиция, цена за штуку, итог, подпись параметров.
// Неизвестные позиции и параметры отбрасываются (null) — защита от подделанных данных.
export function resolveLine({ itemId, size, milk, qty = 1 }) {
  const item = byId[itemId]
  if (!item) return null

  const sizeObj = item.sizes ? item.sizes.find((s) => s.id === size) : null
  if (item.sizes && !sizeObj) return null

  const milkObj = item.milk ? milkOptions.find((m) => m.id === milk) : null
  if (item.milk && !milkObj) return null

  const count = Math.min(Math.max(Math.trunc(Number(qty)) || 0, 1), 20)
  const unit = (sizeObj?.price ?? item.price) + (milkObj?.price ?? 0)
  const options = [
    sizeObj ? `${sizeObj.id} · ${sizeObj.volume}` : item.volume,
    milkObj && milkObj.price > 0 ? `${milkObj.label.toLowerCase()} молоко` : null,
  ]
    .filter(Boolean)
    .join(', ')

  return {
    key: lineKey({ itemId, size: sizeObj?.id, milk: milkObj?.id }),
    itemId,
    size: sizeObj?.id ?? null,
    milk: milkObj?.id ?? null,
    qty: count,
    item,
    unit,
    total: unit * count,
    options,
  }
}

// Время готовности по московскому времени: «14:35»
export function readyTime(pickupId, customTime) {
  const opt = data.order.pickup.find((p) => p.id === pickupId)
  if (!opt) return null
  if (opt.id === 'custom') return /^([01]\d|2[0-3]):[0-5]\d$/.test(customTime ?? '') ? customTime : null
  return new Date(Date.now() + opt.minutes * 60_000).toLocaleTimeString('ru-RU', {
    timeZone: 'Europe/Moscow',
    hour: '2-digit',
    minute: '2-digit',
  })
}
