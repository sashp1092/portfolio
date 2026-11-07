import { data } from '../data'
import { icons } from '../ui'

export default function Why() {
  return (
    <section aria-label="Почему выбирают нас" className="border-y border-line bg-white">
      <ul className="mx-auto grid max-w-[1200px] gap-8 px-4 py-12 sm:grid-cols-2 md:px-6 lg:grid-cols-4">
        {data.why.map((w) => {
          const Icon = icons[w.icon]
          return (
            <li key={w.title}>
              <span className="flex size-12 items-center justify-center rounded-full bg-blush text-rose-dark">
                <Icon className="size-5" aria-hidden="true" />
              </span>
              <h3 className="mt-4 font-serif text-2xl font-semibold">{w.title}</h3>
              <p className="mt-1 text-mute">{w.text}</p>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
