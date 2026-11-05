export default function SectionHeading({ id, eyebrow, title, subtitle, center }) {
  return (
    <div className={`mb-8 max-w-2xl md:mb-12 ${center ? 'mx-auto text-center' : ''}`}>
      {eyebrow && <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-leaf">{eyebrow}</p>}
      <h2 id={id} className="font-heading text-3xl font-bold leading-tight text-balance md:text-4xl">
        {title}
      </h2>
      {subtitle && <p className="mt-4 text-pretty text-mute md:text-lg">{subtitle}</p>}
    </div>
  )
}
