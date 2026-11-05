// Общие помощники интерфейса: иконки по ключу из data.js, форматирование, маска телефона.
import { Clock, Coffee, Croissant, ShoppingBag, Timer, Wallet } from 'lucide-react'

export const icons = {
  timer: Timer,
  wallet: Wallet,
  croissant: Croissant,
  coffee: Coffee,
  clock: Clock,
  bag: ShoppingBag,
}

// 1230 → «1 230» (неразрывный пробел)
export const formatRub = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

// plural(3, ['позиция', 'позиции', 'позиций']) → «позиции»
export function plural(n, [one, few, many]) {
  const n10 = n % 10
  const n100 = n % 100
  if (n10 === 1 && n100 !== 11) return one
  if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return few
  return many
}

// Маска «+7 (900) 123-45-67» прямо во время ввода
export function formatPhone(value) {
  let digits = value.replace(/\D/g, '')
  if (!digits) return ''
  if (digits.startsWith('8')) digits = '7' + digits.slice(1)
  if (!digits.startsWith('7')) digits = '7' + digits
  const p = digits.slice(1, 11)
  let out = '+7'
  if (p.length) out += ` (${p.slice(0, 3)}`
  if (p.length >= 3) out += ')'
  if (p.length > 3) out += ` ${p.slice(3, 6)}`
  if (p.length > 6) out += `-${p.slice(6, 8)}`
  if (p.length > 8) out += `-${p.slice(8, 10)}`
  return out
}
