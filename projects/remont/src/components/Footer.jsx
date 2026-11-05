import { data } from '../data'

export default function Footer({ onPrivacy }) {
  const { company, footer } = data
  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-4 px-4 py-8 text-sm md:flex-row md:items-center md:justify-between md:px-6">
        <div>
          <p className="font-heading font-semibold">{company.name}</p>
          <p className="text-ink/50">{footer.rights}</p>
        </div>
        <button
          type="button"
          onClick={onPrivacy}
          className="inline-flex min-h-11 items-center self-start text-ink/70 underline underline-offset-2 hover:text-brand md:self-auto"
        >
          {footer.privacy}
        </button>
        <p className="text-ink/50">
          © {new Date().getFullYear()} {company.name}
        </p>
      </div>
    </footer>
  )
}
