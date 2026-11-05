import { about } from '../data'

export default function About() {
  return (
    <section id="about" className="scroll-mt-16 py-24 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-6 md:flex-row">
        <div className="aspect-[4/5] overflow-hidden border border-line md:flex-1">
          <img src={about.image} alt={about.imageAlt} loading="lazy" className="h-full w-full object-cover grayscale-[0.6]" />
        </div>
        <div className="flex flex-col justify-center gap-5 md:flex-1">
          <span className="eyebrow">{about.eyebrow}</span>
          <h2 className="font-serif text-4xl font-medium leading-tight md:text-5xl">{about.title}</h2>
          {about.paragraphs.map((p) => (
            <p key={p} className="text-mute">
              {p}
            </p>
          ))}
          <span className="font-serif text-2xl italic text-gold">{about.signature}</span>
        </div>
      </div>
    </section>
  )
}
