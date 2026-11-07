// Серверная функция Vercel: POST /api/booking → запись в Telegram администратору салона.
// Услуга, мастер и время проверяются ЗДЕСЬ по тем же правилам, что и на сайте (src/booking.js),
// поэтому нельзя записаться на несуществующую услугу или занятое время, подделав запрос.
//
// Переменные окружения (Vercel → Project → Settings → Environments → Production):
//   TELEGRAM_BOT_TOKEN — токен бота от @BotFather
//   TELEGRAM_CHAT_ID   — id чата администратора
// Без них — демо-режим: запись «принимается», но никуда не отправляется.

import { dateLabel, endTime, validateBooking } from '../src/booking.js'

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
  if (body.website) return res.status(200).json({ ok: true })

  const name = String(body.name ?? '').trim()
  const phoneDigits = String(body.phone ?? '').replace(/\D/g, '')
  const booking = validateBooking({
    serviceId: String(body.serviceId ?? ''),
    masterId: String(body.masterId ?? ''),
    date: String(body.date ?? ''),
    time: String(body.time ?? ''),
  })

  if (name.length < 2 || phoneDigits.length !== 11 || body.consent !== true) {
    return res.status(400).json({ ok: false, error: 'Проверьте имя, телефон и согласие' })
  }
  if (!booking) {
    return res.status(409).json({ ok: false, error: 'Это время уже недоступно, выберите другое' })
  }

  const { service, master, chosenAny } = booking
  const comment = String(body.comment ?? '').trim()

  const text = [
    '💅 <b>Новая онлайн-запись</b>',
    '',
    `📅 <b>${dateLabel(body.date)}, ${body.time}–${endTime(body.time, service.duration)}</b>`,
    `✨ ${esc(service.name)} — ${service.from ? 'от ' : ''}${rub(service.price)} ₽`,
    `👩 Мастер: ${esc(master.name)}${chosenAny ? ' (клиент выбрал «любой»)' : ''}`,
    '',
    `👤 ${esc(name)}`,
    `📞 +${phoneDigits}`,
    comment ? `💬 ${esc(comment, 300)}` : null,
    '',
    'Подтвердите запись клиенту ✅',
  ]
    .filter((s) => s !== null)
    .join('\n')

  const result = { ok: true, masterName: master.name, date: body.date, time: body.time }

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) return res.status(200).json({ ...result, demo: true })

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    })
    if (!tg.ok) throw new Error(`Telegram ${tg.status}`)
    return res.status(200).json(result)
  } catch (err) {
    console.error('booking send failed:', err.message)
    return res.status(502).json({ ok: false, error: 'Не удалось отправить запись' })
  }
}
