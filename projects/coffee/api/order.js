// Серверная функция Vercel: POST /api/order → заказ в Telegram владельцу.
// Цены и итог считаются ЗДЕСЬ по меню из src/data.js, а не берутся из браузера,
// поэтому подделать сумму в заказе нельзя.
//
// Переменные окружения (Vercel → Project → Settings → Environments → Production):
//   TELEGRAM_BOT_TOKEN — токен бота от @BotFather
//   TELEGRAM_CHAT_ID   — id чата, куда слать заказы
// Без них — демо-режим: заказ «принимается», но никуда не отправляется.

import { data } from '../src/data.js'
import { readyTime, resolveLine } from '../src/menu.js'

const esc = (v, max = 200) =>
  String(v ?? '')
    .slice(0, max)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const rub = (n) => Math.round(n).toLocaleString('ru-RU')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const body = typeof req.body === 'object' && req.body ? req.body : {}

  // Ловушка для ботов
  if (body.website) return res.status(200).json({ ok: true, orderNo: 0, readyAt: '' })

  const name = String(body.name ?? '').trim()
  const phoneDigits = String(body.phone ?? '').replace(/\D/g, '')
  const readyAt = readyTime(body.pickup, body.pickupTime)
  const rawItems = Array.isArray(body.items) ? body.items.slice(0, 30) : []
  const lines = rawItems.map(resolveLine).filter(Boolean)

  if (name.length < 2 || phoneDigits.length !== 11 || body.consent !== true || !readyAt || lines.length === 0) {
    return res.status(400).json({ ok: false, error: 'Проверьте заказ, имя, телефон и согласие' })
  }

  const total = lines.reduce((sum, l) => sum + l.total, 0)
  const orderNo = 100 + Math.floor(Math.random() * 900)
  const pickup = data.order.pickup.find((p) => p.id === body.pickup)
  const comment = String(body.comment ?? '').trim()

  const text = [
    `☕ <b>Заказ №${orderNo}</b> — самовывоз`,
    '',
    `🕒 Заберёт к <b>${readyAt}</b>${pickup.id === 'custom' ? '' : ` (${pickup.label.toLowerCase()})`}`,
    `👤 ${esc(name)}`,
    `📞 +${phoneDigits}`,
    '',
    ...lines.map((l) => `• ${esc(l.item.name)}${l.options ? ` (${esc(l.options)})` : ''} × ${l.qty} — ${rub(l.total)} ₽`),
    '',
    `💰 <b>Итого: ${rub(total)} ₽</b> · оплата при получении`,
    comment ? `💬 ${esc(comment, 300)}` : null,
  ]
    .filter((s) => s !== null)
    .join('\n')

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    return res.status(200).json({ ok: true, demo: true, orderNo, readyAt })
  }

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    })
    if (!tg.ok) throw new Error(`Telegram ${tg.status}`)
    return res.status(200).json({ ok: true, orderNo, readyAt })
  } catch (err) {
    console.error('order send failed:', err.message)
    return res.status(502).json({ ok: false, error: 'Не удалось отправить заказ' })
  }
}
