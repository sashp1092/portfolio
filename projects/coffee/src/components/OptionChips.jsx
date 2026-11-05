// Группа «чипсов»-переключателей (объём, молоко, время). Внутри — обычные radio-кнопки,
// поэтому работает клавиатура и экранные читалки.
export default function OptionChips({ name, legend, options, value, onChange, hideLegend }) {
  return (
    <fieldset>
      <legend className={hideLegend ? 'sr-only' : 'mb-2 text-xs font-semibold uppercase tracking-wider text-mute'}>{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <label
            key={opt.id}
            className={`inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-full border px-3.5 text-sm font-semibold transition has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-leaf ${
              value === opt.id ? 'border-leaf bg-leaf text-white' : 'border-line bg-white hover:border-leaf/50'
            }`}
          >
            <input type="radio" name={name} value={opt.id} checked={value === opt.id} onChange={() => onChange(opt.id)} className="sr-only" />
            {opt.label}
            {opt.extra && <span className={value === opt.id ? 'text-white/75' : 'text-mute'}>{opt.extra}</span>}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
