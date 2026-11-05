import { Check } from 'lucide-react'
import { icons } from '../ui'

export default function OptionCard({ option, selected, onSelect, name }) {
  const Icon = option.icon ? icons[option.icon] : null
  return (
    <label
      className={`group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border-2 bg-white text-left transition duration-200 hover:-translate-y-0.5 hover:shadow-md has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand ${
        selected ? 'border-brand shadow-md' : 'border-ink/10'
      }`}
    >
      <input
        type="radio"
        name={name}
        value={option.value}
        checked={selected}
        onChange={() => onSelect(option.value)}
        className="sr-only"
      />
      {option.image && (
        <img
          src={option.image.src}
          alt={option.image.alt}
          loading="lazy"
          className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-[1.03]"
        />
      )}
      <span className="flex min-h-16 items-center gap-3 p-4">
        {Icon && (
          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
            <Icon className="size-5" aria-hidden="true" />
          </span>
        )}
        <span className="flex-1">
          <span className="block font-semibold">{option.label}</span>
          {option.hint && <span className="mt-0.5 block text-sm text-ink/60">{option.hint}</span>}
        </span>
        <span
          className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition ${
            selected ? 'border-brand bg-brand text-white' : 'border-ink/20'
          }`}
          aria-hidden="true"
        >
          {selected && <Check className="size-3.5" strokeWidth={3} />}
        </span>
      </span>
    </label>
  )
}
