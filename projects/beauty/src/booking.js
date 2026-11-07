// Логика онлайн-записи: дни, свободные окна, проверка выбора.
// Используется и в браузере, и на сервере (api/booking.js) — поэтому сервер
// может перепроверить, что выбранное время действительно свободно.
//
// ДЕМО: занятость мастеров условная (псевдослучайная, но одинаковая при каждой загрузке).
// На сайте клиента сюда подключается реальное расписание (YCLIENTS/DIKIDI/своя база).
import { data } from './data.js'

const { services, masters, booking } = data
const serviceById = Object.fromEntries(services.map((s) => [s.id, s]))
const masterById = Object.fromEntries(masters.map((m) => [m.id, m]))

export const getService = (id) => serviceById[id]
export const getMaster = (id) => masterById[id]
export const ANY = 'any'

export const mastersFor = (serviceId) => {
  const s = serviceById[serviceId]
  return s ? masters.filter((m) => m.categories.includes(s.category)) : masters
}
export const servicesFor = (masterId) => {
  const m = masterById[masterId]
  return m ? services.filter((s) => m.categories.includes(s.category)) : services
}

// ——— Время: всё считаем по Москве (UTC+3, без перехода на летнее время) ———
const MSK_OFFSET = 3 * 3600_000
const DAY = 86_400_000
const WEEKDAYS = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
const WEEKDAYS_FULL = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']
const MONTHS = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

const toMinutes = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}
const toHHMM = (min) => `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`

function mskNow() {
  const d = new Date(Date.now() + MSK_OFFSET) // UTC-методы этой даты дают московское время
  return { iso: d.toISOString().slice(0, 10), minutes: d.getUTCHours() * 60 + d.getUTCMinutes() }
}

// Ближайшие N дней для выбора даты
export function bookingDays() {
  const start = Date.parse(mskNow().iso + 'T00:00:00Z')
  return Array.from({ length: booking.daysAhead }, (_, i) => {
    const d = new Date(start + i * DAY)
    return {
      iso: d.toISOString().slice(0, 10),
      weekday: WEEKDAYS[d.getUTCDay()],
      day: d.getUTCDate(),
      isToday: i === 0,
    }
  })
}

// «среда, 12 ноября»
export function dateLabel(iso) {
  const d = new Date(iso + 'T00:00:00Z')
  return `${WEEKDAYS_FULL[d.getUTCDay()]}, ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`
}

export const endTime = (start, duration) => toHHMM(toMinutes(start) + duration)

// Условная занятость: детерминированный «хеш» от мастера, дня и времени → ~25% ячеек заняты
function isBusy(masterId, iso, minutes) {
  let h = 2166136261
  for (const ch of `${masterId}|${iso}|${minutes}`) h = Math.imul(h ^ ch.charCodeAt(0), 16777619)
  return (h >>> 0) % 100 < 25
}

function masterFree(masterId, iso, start, duration) {
  for (let t = start; t < start + duration; t += booking.slotStep) {
    if (isBusy(masterId, iso, t)) return false
  }
  return true
}

// Свободные времена начала для услуги у мастера (или у любого подходящего мастера)
export function freeSlots(serviceId, masterId, iso) {
  const service = serviceById[serviceId]
  if (!service || !bookingDays().some((d) => d.iso === iso)) return []

  const candidates = masterId === ANY ? mastersFor(serviceId) : [masterById[masterId]].filter((m) => m && m.categories.includes(service.category))
  const open = toMinutes(booking.open)
  const close = toMinutes(booking.close_time)
  const now = mskNow()
  const earliest = iso === now.iso ? now.minutes + booking.leadTime : 0

  const slots = []
  for (let t = open; t + service.duration <= close; t += booking.slotStep) {
    if (t < earliest) continue
    if (candidates.some((m) => masterFree(m.id, iso, t, service.duration))) slots.push(toHHMM(t))
  }
  return slots
}

// Для «любого мастера» — кого именно назначить на выбранное время
export function assignMaster(serviceId, masterId, iso, time) {
  if (masterId !== ANY) return masterById[masterId]
  const service = serviceById[serviceId]
  return mastersFor(serviceId).find((m) => masterFree(m.id, iso, toMinutes(time), service.duration))
}

// Проверка всей записи целиком — на сервере перед отправкой в Telegram
export function validateBooking({ serviceId, masterId, date, time }) {
  const service = serviceById[serviceId]
  if (!service) return null
  if (masterId !== ANY && !masterById[masterId]?.categories.includes(service.category)) return null
  if (!freeSlots(serviceId, masterId, date).includes(time)) return null
  const master = assignMaster(serviceId, masterId, date, time)
  return master ? { service, master, chosenAny: masterId === ANY } : null
}
