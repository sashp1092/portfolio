import { data } from '../data'
import SectionHeading from './SectionHeading'

export default function Masters({ onBook }) {
  const { masters, masters_section: t } = data
  return (
    <section id="masters" aria-labelledby="masters-title" className="scroll-mt-16 bg-blush/60 py-16 md:scroll-mt-20 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6">
        <SectionHeading id="masters-title" eyebrow={t.eyebrow} title={t.title} subtitle={t.note} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {masters.map((m) => (
            <li key={m.id} className="group flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-[0_20px_50px_-30px_rgba(58,46,42,0.35)]">
              <div className="overflow-hidden">
                <img src={m.image.src} alt={m.image.alt} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-serif text-3xl font-semibold">{m.name}</h3>
                <p className="mt-1 font-medium text-rose-dark">{m.role}</p>
                <p className="mt-1 text-sm text-mute">{m.exp}</p>
                <button type="button" onClick={() => onBook({ masterId: m.id })} className="btn-secondary mt-6 w-full">
                  {t.book}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
