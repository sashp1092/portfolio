import { data } from '../data'

export default function About() {
  const { about } = data
  const [main, ...rest] = about.images
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-16 py-14 md:scroll-mt-20 md:py-20">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-leaf">{about.eyebrow}</p>
          <h2 id="about-title" className="font-heading text-3xl font-bold leading-tight text-balance md:text-4xl">
            {about.title}
          </h2>
          {about.paragraphs.map((p) => (
            <p key={p} className="mt-5 text-pretty text-lg leading-relaxed text-mute">
              {p}
            </p>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <img src={main.src} alt={main.alt} loading="lazy" className="col-span-2 aspect-[16/10] w-full rounded-[1.75rem] object-cover" />
          {rest.map((im) => (
            <img key={im.src} src={im.src} alt={im.alt} loading="lazy" className="aspect-square w-full rounded-[1.75rem] object-cover" />
          ))}
        </div>
      </div>
    </section>
  )
}
