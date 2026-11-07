import { data } from '../data'

export default function Logo({ className = '' }) {
  return (
    <span className={`flex flex-col leading-none ${className}`}>
      <span className="font-serif text-2xl font-semibold italic">{data.site.name}</span>
      <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-rose">{data.site.kind}</span>
    </span>
  )
}
