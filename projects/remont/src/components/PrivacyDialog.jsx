import { X } from 'lucide-react'
import { data } from '../data'

export default function PrivacyDialog({ dialogRef }) {
  const { privacy } = data
  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="privacy-title"
      className="m-auto w-[calc(100%-2rem)] max-w-xl rounded-3xl bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/50 backdrop:backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
    >
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id="privacy-title" className="font-heading text-xl font-semibold">
            {privacy.title}
          </h2>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-paper"
            aria-label={privacy.close}
          >
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-3 text-ink/70">
          {privacy.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </dialog>
  )
}
