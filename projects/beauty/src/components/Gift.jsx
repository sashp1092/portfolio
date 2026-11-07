import { Gift as GiftIcon } from 'lucide-react'
import { data } from '../data'

export default function Gift() {
  const { gift, site } = data
  return (
    <section aria-labelledby="gift-title" className="px-4 md:px-6">
      <div className="mx-auto grid max-w-[1200px] overflow-hidden rounded-[2rem] bg-ink text-white md:grid-cols-2">
        <div className="flex flex-col justify-center p-8 md:p-14">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blush">{gift.eyebrow}</p>
          <h2 id="gift-title" className="font-serif text-4xl font-semibold leading-tight md:text-5xl">
            {gift.title}
          </h2>
          <p className="mt-4 text-pretty text-white/75 md:text-lg">{gift.text}</p>
          <a href={site.telegram} target="_blank" rel="noopener noreferrer" className="btn-light mt-8 self-start">
            <GiftIcon className="size-5" aria-hidden="true" />
            {gift.cta}
          </a>
        </div>
        <img src={gift.image.src} alt={gift.image.alt} loading="lazy" className="aspect-[4/3] size-full object-cover md:aspect-auto" />
      </div>
    </section>
  )
}
