import { ArrowRight, MessageCircle, Phone, Send } from 'lucide-react'
import { data } from '../data'

export default function FinalCta() {
  const { finalCta, company } = data
  return (
    <section aria-labelledby="final-title" className="px-4 pb-16 md:px-6 md:pb-24">
      <div className="mx-auto max-w-[1200px] rounded-3xl bg-brand px-6 py-12 text-center text-white md:px-12 md:py-16">
        <h2 id="final-title" className="mx-auto max-w-2xl font-heading text-2xl font-semibold leading-tight text-balance md:text-4xl">
          {finalCta.title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-white/90 md:text-lg">{finalCta.text}</p>
        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="#quiz"
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 py-3 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            {finalCta.cta}
            <ArrowRight className="size-5" aria-hidden="true" />
          </a>
          <a href={company.telegram} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <Send className="size-4" aria-hidden="true" />
            {finalCta.telegram}
          </a>
          <a href={company.whatsapp} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <MessageCircle className="size-4" aria-hidden="true" />
            {finalCta.whatsapp}
          </a>
          <a href={company.phoneHref} className="btn-secondary">
            <Phone className="size-4" aria-hidden="true" />
            {finalCta.call}
          </a>
        </div>
      </div>
    </section>
  )
}
