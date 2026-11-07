import { data } from '../data'
import SectionHeading from './SectionHeading'

export default function Works() {
  const { works } = data
  return (
    <section id="works" aria-labelledby="works-title" className="scroll-mt-16 py-16 md:scroll-mt-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <SectionHeading id="works-title" eyebrow={works.eyebrow} title={works.title} />
        {/* Мозаика: первое и последнее фото — широкие */}
        <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {works.items.map((im, i) => (
            <figure key={im.src} className={`overflow-hidden rounded-[1.5rem] ${i === 0 || i === works.items.length - 1 ? 'col-span-2' : ''}`}>
              <img src={im.src} alt={im.alt} loading="lazy" className="aspect-[4/3] size-full object-cover transition duration-700 hover:scale-105" />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
