import { data } from '../data'
import SectionHeading from './SectionHeading'
import BeforeAfter from './BeforeAfter'

export default function Works() {
  const { works } = data
  return (
    <section id="works" aria-labelledby="works-title" className="scroll-mt-20 bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <SectionHeading id="works-title" eyebrow={works.eyebrow} title={works.title} subtitle={works.subtitle} />
        <div className="grid gap-5 sm:grid-cols-2">
          {works.items.map((item, i) => (
            <BeforeAfter key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
