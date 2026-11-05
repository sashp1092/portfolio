export default function Section({ id, eyebrow, title, children, className = '' }) {
  return (
    <section id={id} className={`scroll-mt-16 pb-24 md:pb-28 ${className}`}>
      <div className="mx-auto max-w-6xl px-6">
        {title && (
          <div className="mb-12 flex flex-col gap-4 md:mb-14">
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="font-serif text-4xl font-medium leading-tight md:text-5xl">{title}</h2>
          </div>
        )}
        {children}
      </div>
    </section>
  )
}
