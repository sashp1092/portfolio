// Корзина: хранит строки { itemId, size, milk, qty } и сохраняет их в localStorage,
// чтобы корзина не пропадала при перезагрузке страницы.
import { useEffect, useMemo, useState } from 'react'
import { resolveLine } from './menu.js'

const STORAGE_KEY = 'penka-cart'

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))
    // Отбрасываем позиции, которых больше нет в меню
    return Array.isArray(saved) ? saved.map(resolveLine).filter(Boolean) : []
  } catch {
    return []
  }
}

export function useCart() {
  const [lines, setLines] = useState(load)

  useEffect(() => {
    const plain = lines.map(({ itemId, size, milk, qty }) => ({ itemId, size, milk, qty }))
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plain))
  }, [lines])

  const add = (cfg) =>
    setLines((ls) => {
      const line = resolveLine({ ...cfg, qty: 1 })
      if (!line) return ls
      const existing = ls.find((l) => l.key === line.key)
      if (existing) return ls.map((l) => (l.key === line.key ? resolveLine({ ...l, qty: l.qty + 1 }) : l))
      return [...ls, line]
    })

  // qty = 0 удаляет строку
  const setQty = (key, qty) =>
    setLines((ls) => (qty <= 0 ? ls.filter((l) => l.key !== key) : ls.map((l) => (l.key === key ? resolveLine({ ...l, qty }) : l))))

  const clear = () => setLines([])

  const { count, total } = useMemo(
    () => lines.reduce((acc, l) => ({ count: acc.count + l.qty, total: acc.total + l.total }), { count: 0, total: 0 }),
    [lines],
  )

  const qtyOf = (key) => lines.find((l) => l.key === key)?.qty ?? 0

  return { lines, add, setQty, clear, count, total, qtyOf }
}
