import { Quote } from 'lucide-react'
import { data } from '../data'
import SectionHeading from './SectionHeading'

export default function Reviews() {
  const { reviews } = data
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-16 py-16 md:scroll-mt-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <SectionHeading id="reviews-title" eyebrow={reviews.eyebrow} title={reviews.title} subtitle={reviews.notice} />
        <div className="grid gap-4 md:grid-cols-3">
          {reviews.items.map((r, i) => (
            <figure key={i} className="flex flex-col rounded-[2rem] border-2 border-dashed border-line bg-white/60 p-7">
              <Quote className="size-8 text-rose" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 font-serif text-xl italic text-mute">{r.text}</blockquote>
              <figcaption className="mt-6 border-t border-line pt-4 text-sm">
                <span className="block font-semibold">{r.author}</span>
                <span className="text-mute">
                  {reviews.sourceLabel} {r.source}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
