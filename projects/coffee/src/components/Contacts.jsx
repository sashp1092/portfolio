import { Clock, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { data } from '../data'

export default function Contacts() {
  const { contacts, site } = data
  const mapSrc = `https://yandex.ru/map-widget/v1/?text=${encodeURIComponent(site.mapQuery)}&z=16`
  return (
    <section id="contacts" aria-labelledby="contacts-title" className="scroll-mt-16 bg-white py-14 md:scroll-mt-20 md:py-20">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 md:px-6 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-leaf">{contacts.eyebrow}</p>
          <h2 id="contacts-title" className="font-heading text-3xl font-bold leading-tight md:text-4xl">
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
              <a href={site.phoneHref} className="inline-flex min-h-11 items-center font-heading text-xl font-bold hover:text-leaf">
                {site.phone}
              </a>
            </Row>
            <div>
              <p className="mb-2 text-sm text-mute">{contacts.messengersLabel}</p>
              <div className="flex flex-wrap gap-3">
                <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <Send className="size-4" aria-hidden="true" />
                  Telegram
                </a>
                <a href={site.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <MessageCircle className="size-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </div>
          </address>
        </div>
        <div className="min-h-80 overflow-hidden rounded-[1.75rem] bg-cream">
          <iframe src={mapSrc} title={contacts.mapTitle} loading="lazy" className="size-full min-h-80 border-0 lg:min-h-[460px]" allowFullScreen />
        </div>
      </div>
    </section>
  )
}

function Row({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-4">
      <Icon className="mt-0.5 size-5 shrink-0 text-leaf" aria-hidden="true" />
      <div>
        <p className="text-sm text-mute">{label}</p>
        {children}
      </div>
    </div>
  )
}
