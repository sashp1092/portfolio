import { Plus } from 'lucide-react'
import { data } from '../data'
import SectionHeading from './SectionHeading'

// Аккордеон на нативных <details>/<summary> — работает без JavaScript
export default function Faq() {
  const { faq } = data
  return (
    <section id="faq" aria-labelledby="faq-title" className="scroll-mt-16 bg-blush/60 py-16 md:scroll-mt-20 md:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-8 px-4 md:px-6 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading id="faq-title" eyebrow={faq.eyebrow} title={faq.title} />
        <div className="flex flex-col gap-3">
          {faq.items.map((item) => (
            <details key={item.q} className="group rounded-[1.5rem] bg-white px-6 shadow-sm open:shadow-md">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus className="size-5 shrink-0 text-rose transition group-open:rotate-45" aria-hidden="true" />
              </summary>
              <p className="pb-5 text-mute">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
