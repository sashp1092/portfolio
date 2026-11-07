// Общие помощники интерфейса: иконки по ключу из data.js, цены, маска телефона.
import { Clock, Coffee, ShieldCheck, Sparkles } from 'lucide-react'

export const icons = { shield: ShieldCheck, sparkles: Sparkles, clock: Clock, coffee: Coffee }

// 2800 → «2 800» (неразрывный пробел)
export const formatRub = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')

// 90 → «1 ч 30 мин»
export function formatDuration(min) {
  const h = Math.floor(min / 60)
  const m = min % 60
  return [h ? `${h} ч` : '', m ? `${m} мин` : ''].filter(Boolean).join(' ')
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
