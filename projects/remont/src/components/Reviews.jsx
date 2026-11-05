import { MessageCircle } from 'lucide-react'
import { data } from '../data'
import SectionHeading from './SectionHeading'

export default function Reviews() {
  const { reviews } = data
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="scroll-mt-20 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <SectionHeading id="reviews-title" eyebrow={reviews.eyebrow} title={reviews.title} subtitle={reviews.notice} />
        <div className="grid gap-5 md:grid-cols-3">
          {reviews.items.map((r, i) => (
            <figure key={i} className="flex flex-col rounded-3xl border-2 border-dashed border-ink/15 bg-paper p-6">
              <MessageCircle className="size-8 text-brand" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-ink/70">{r.text}</blockquote>
              <figcaption className="mt-6 border-t border-ink/10 pt-4 text-sm">
                <span className="block font-semibold">{r.author}</span>
                <span className="text-ink/50">
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
