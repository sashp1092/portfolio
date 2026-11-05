import { useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { data } from '../data'

export default function BeforeAfter({ item }) {
  const { works } = data
  const [pos, setPos] = useState(50)
  return (
    <article className="overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-sm transition hover:shadow-md">
      <div className="relative aspect-[4/3] select-none overflow-hidden">
        <img src={item.after.src} alt={item.after.alt} loading="lazy" className="absolute inset-0 size-full object-cover" />
        <img
          src={item.before.src}
          alt={item.before.alt}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
        />
        <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/75 px-3 py-1 text-xs font-semibold text-white">
          {works.before}
        </span>
        <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
          {works.after}
        </span>
        <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white" style={{ left: `${pos}%` }} aria-hidden="true">
          <span className="absolute left-1/2 top-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-ink shadow-lg">
            <ArrowLeft className="size-4" />
            <ArrowRight className="size-4" />
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`${works.sliderLabel}: ${item.type}, ${item.area}`}
          className="absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
      </div>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 p-5 text-sm">
        {Object.entries(works.labels).map(([key, label]) => (
          <div key={key}>
            <dt className="text-ink/50">{label}</dt>
            <dd className="font-semibold">{item[key]}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}
