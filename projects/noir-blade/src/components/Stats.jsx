import { stats } from '../data'

export default function Stats() {
  return (
    <div className="border-y border-line">
      <dl className="mx-auto grid max-w-6xl grid-cols-2 px-6 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col-reverse py-8 text-center">
            <dt className="text-xs uppercase tracking-[0.2em] text-mute">{s.label}</dt>
            <dd className="font-serif text-4xl font-medium">{s.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
