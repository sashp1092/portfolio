export default function SectionHeading({ id, eyebrow, title, subtitle, center, light }) {
  return (
    <div className={`mb-10 max-w-2xl md:mb-14 ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className={`mb-3 text-xs font-semibold uppercase tracking-[0.25em] ${light ? 'text-blush' : 'text-rose'}`}>{eyebrow}</p>}
      <h2 id={id} className="font-serif text-4xl font-semibold leading-[1.05] text-balance md:text-5xl">
        {title}
      </h2>
      {subtitle && <p className={`mt-4 text-pretty md:text-lg ${light ? 'text-white/75' : 'text-mute'}`}>{subtitle}</p>}
    </div>
  )
}
