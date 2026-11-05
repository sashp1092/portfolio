import { team } from '../data'
import Section from './Section'

export default function Team() {
  return (
    <Section id="team" eyebrow="Команда" title="Наши барберы">
      {/* gap-px + фон line = тонкие линии между карточками */}
      <div className="grid gap-px border border-line bg-line md:grid-cols-3">
        {team.map((m) => (
          <article key={m.name} className="flex flex-col gap-2.5 bg-ink p-9">
            <div className="mb-3 flex h-14 w-14 items-center justify-center border border-gold font-serif text-xl text-gold">
              {m.initials}
            </div>
            <h3 className="text-xl font-medium">{m.name}</h3>
            <p className="text-sm text-mute">{m.role}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
