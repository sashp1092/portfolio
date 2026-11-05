import { quote } from '../data'
import Section from './Section'

export default function Quote() {
  return (
    <Section>
      <figure className="mx-auto max-w-3xl text-center">
        <blockquote className="font-serif text-[clamp(26px,4vw,40px)] italic leading-snug">«{quote.text}»</blockquote>
        <figcaption className="mt-6 text-[13px] uppercase tracking-[0.2em] text-mute">— {quote.author}</figcaption>
      </figure>
    </Section>
  )
}
