import { X } from 'lucide-react'
import { data } from '../data'

// Нативный <dialog>: showModal() показывает его поверх всего, включая открытую корзину
export default function PrivacyDialog({ dialogRef }) {
  const { privacy } = data
  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="privacy-title"
      className="m-auto w-[calc(100%-2rem)] max-w-xl rounded-[1.75rem] bg-white p-0 text-ink shadow-2xl backdrop:bg-ink/50 backdrop:backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && e.currentTarget.close()}
    >
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between gap-4">
          <h2 id="privacy-title" className="font-heading text-xl font-bold">
            {privacy.title}
          </h2>
          <button type="button" onClick={() => dialogRef.current?.close()} aria-label={privacy.close} className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-cream">
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-4 flex flex-col gap-3 text-mute">
          {privacy.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </dialog>
  )
}
