// Серверная функция Vercel: POST /api/lead → сообщение в Telegram владельцу.
// Работает на сервере Vercel, а не в браузере, поэтому токен бота никто не увидит.
//
// Переменные окружения (Vercel → Project → Settings → Environment Variables):
//   TELEGRAM_BOT_TOKEN — токен бота от @BotFather
//   TELEGRAM_CHAT_ID   — id чата, куда слать заявки
// Если переменные не заданы — демо-режим: заявка никуда не уходит, сайт отвечает «ок».

const LABELS = {
  housing: { new: 'Новостройка', secondary: 'Вторичка' },
  repair: { cosmetic: 'Косметический', capital: 'Капитальный', design: 'Дизайнерский' },
  start: { now: 'Сразу', month: 'В течение месяца', later: 'Пока присматривается' },
  gift: { discount: 'Скидка 10% на работы', designProject: 'Дизайн-проект бесплатно', trash: 'Вывоз мусора бесплатно' },
  contact: { call: 'Звонок', telegram: 'Telegram', whatsapp: 'WhatsApp' },
}

// Экранируем текст, чтобы пользователь не мог «сломать» разметку сообщения
const esc = (v) =>
  String(v ?? '')
    .slice(0, 200)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const label = (group, value) => LABELS[group][value] ?? '—'
const rub = (n) => (Number.isFinite(n) ? Math.round(n).toLocaleString('ru-RU') : '—')

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ ok: false, error: 'Method not allowed' })
  }

  const body = typeof req.body === 'object' && req.body ? req.body : {}

  // Ловушка для ботов: скрытое поле, которое человек не заполняет
  if (body.website) return res.status(200).json({ ok: true })

  const name = String(body.name ?? '').trim()
  const phoneDigits = String(body.phone ?? '').replace(/\D/g, '')
  if (name.length < 2 || phoneDigits.length !== 11 || body.consent !== true) {
    return res.status(400).json({ ok: false, error: 'Проверьте имя, телефон и согласие' })
  }

  const area = Number(body.area)
  const text = [
    '🔔 <b>Новая заявка с сайта</b>',
    '',
    `👤 ${esc(name)}`,
    `📞 +${phoneDigits}`,
    `💬 Связаться: ${label('contact', body.contact)}`,
    '',
    `🏠 ${label('housing', body.housing)} · ${label('repair', body.repair)} · ${Number.isFinite(area) ? area : '—'} м²`,
    `🗓 Начать: ${label('start', body.start)}`,
    `🎁 Подарок: ${label('gift', body.gift)}`,
    `💰 Расчёт: ${rub(Number(body.priceFrom))} – ${rub(Number(body.priceTo))} ₽`,
  ].join('\n')

  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  if (!token || !chatId) {
    return res.status(200).json({ ok: true, demo: true })
  }

  try {
    const tg = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML' }),
    })
    if (!tg.ok) throw new Error(`Telegram ${tg.status}`)
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('lead send failed:', err.message)
    return res.status(502).json({ ok: false, error: 'Не удалось отправить заявку' })
  }
}
