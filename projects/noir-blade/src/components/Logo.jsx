import { site } from '../data'

export default function Logo({ className = '' }) {
  return (
    <span className={`whitespace-nowrap font-serif ${className}`}>
      {site.name} <span className="italic text-gold">{site.nameAccent}</span> {site.nameEnd}
    </span>
  )
}
