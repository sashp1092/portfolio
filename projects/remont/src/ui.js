// Общие помощники: иконки по ключу из data.js и форматирование цен.
import { Award, Camera, Clock, FileText, Gift, ShieldCheck, ShoppingCart, Users } from 'lucide-react'

export const icons = {
  fileText: FileText,
  clock: Clock,
  shield: ShieldCheck,
  users: Users,
  cart: ShoppingCart,
  camera: Camera,
  award: Award,
  gift: Gift,
}

// 1043000 → «1 043 000» (с неразрывными пробелами)
export const formatRub = (n) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
export const roundTo = (n, step) => Math.round(n / step) * step
