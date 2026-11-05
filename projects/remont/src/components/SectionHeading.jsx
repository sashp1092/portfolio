export default function SectionHeading({ id, eyebrow, title, subtitle, center }) {
  return (
    <div className={`mb-10 max-w-2xl md:mb-14 ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-brand">{eyebrow}</p>
      )}
      <h2 id={id} className="font-heading text-2xl font-semibold leading-tight text-balance md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-pretty text-ink/70 md:text-lg">{subtitle}</p>}
    </div>
  )
}
