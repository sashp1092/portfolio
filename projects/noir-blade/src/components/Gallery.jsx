import { gallery } from '../data'
import Section from './Section'

export default function Gallery() {
  return (
    <Section id="gallery" eyebrow="Портфолио" title="Атмосфера внутри">
      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        {gallery.map((img, i) => (
          <figure
            key={img.src}
            className={`group aspect-[4/3] overflow-hidden border border-line ${i === 0 ? 'md:row-span-2 md:aspect-auto' : ''}`}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0"
            />
          </figure>
        ))}
      </div>
    </Section>
  )
}
