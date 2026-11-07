import { Clock, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { data } from '../data'

export default function Contacts({ onBook }) {
  const { contacts, site, hero } = data
  const mapSrc = `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(site.mapQuery)}&z=16`
  return (
    <section id="contacts" aria-labelledby="contacts-title" className="scroll-mt-16 py-16 md:scroll-mt-20 md:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 md:px-6 lg:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-rose">{contacts.eyebrow}</p>
          <h2 id="contacts-title" className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
            {contacts.title}
          </h2>
          <address className="mt-8 flex flex-col gap-5 not-italic">
            <Row icon={MapPin} label={contacts.addressLabel}>
              <p className="font-semibold">{site.address}</p>
              <p className="text-sm text-mute">{site.metro}</p>
            </Row>
            <Row icon={Clock} label={contacts.hoursLabel}>
              {site.hours.map((h) => (
                <p key={h} className="font-semibold">
                  {h}
                </p>
              ))}
            </Row>
            <Row icon={Phone} label={contacts.phoneLabel}>
              <a href={site.phoneHref} className="inline-flex min-h-11 items-center font-serif text-2xl font-semibold hover:text-rose-dark">
                {site.phone}
              </a>
            </Row>
          </address>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => onBook()} className="btn-primary">
              {hero.cta}
            </button>
            <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="btn-secondary" aria-label="Telegram">
              <Send className="size-4" aria-hidden="true" />
              Telegram
            </a>
            <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-secondary" aria-label="WhatsApp">
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </a>
          </div>
        </div>
        <div className="min-h-80 overflow-hidden rounded-[2rem] bg-blush">
          <iframe src={mapSrc} title={contacts.mapTitle} loading="lazy" className="size-full min-h-80 border-0 lg:min-h-[460px]" allowFullScreen />
        </div>
      </div>
    </section>
  )
}

function Row({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-4">
      <Icon className="mt-0.5 size-5 shrink-0 text-rose" aria-hidden="true" />
      <div>
        <p className="text-sm text-mute">{label}</p>
        {children}
      </div>
    </div>
  )
}
