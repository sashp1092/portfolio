import { Clock, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import { data } from '../data'

export default function Contacts() {
  const { contacts, company } = data
  return (
    <section id="contacts" aria-labelledby="contacts-title" className="scroll-mt-20 bg-paper py-16 md:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 md:px-6 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">{contacts.eyebrow}</p>
          <h2 id="contacts-title" className="font-heading text-2xl font-semibold leading-tight md:text-4xl">
            {contacts.title}
          </h2>
          <address className="mt-8 flex flex-col gap-5 not-italic">
            <div className="flex gap-4">
              <MapPin className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
              <div>
                <p className="text-sm text-ink/50">{contacts.addressLabel}</p>
                <p className="font-semibold">{company.address}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Clock className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
              <div>
                <p className="text-sm text-ink/50">{contacts.hoursLabel}</p>
                {company.hours.map((h) => (
                  <p key={h} className="font-semibold">
                    {h}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
              <div>
                <p className="text-sm text-ink/50">{contacts.phoneLabel}</p>
                <a href={company.phoneHref} className="inline-flex min-h-11 items-center font-heading text-xl font-semibold hover:text-brand">
                  {company.phone}
                </a>
              </div>
            </div>
            <div>
              <p className="mb-2 text-sm text-ink/50">{contacts.messengersLabel}</p>
              <div className="flex flex-wrap gap-3">
                <a href={company.telegram} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <Send className="size-4" aria-hidden="true" />
                  Telegram
                </a>
                <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                  <MessageCircle className="size-4" aria-hidden="true" />
                  WhatsApp
                </a>
              </div>
            </div>
          </address>
        </div>
        <div className="min-h-80 overflow-hidden rounded-3xl bg-white shadow-sm">
          <iframe
            src={company.mapSrc}
            title={contacts.mapTitle}
            loading="lazy"
            className="size-full min-h-80 border-0 lg:min-h-[480px]"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  )
}
