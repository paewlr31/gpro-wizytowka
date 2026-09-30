'use client'

import { useEffect, useRef, useState } from 'react'
import type { GalleryItem } from '@/lib/site'

export function GalleryView({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (active && !dialog.open) dialog.showModal()
    if (!active && dialog.open) dialog.close()
  }, [active])

  return (
    <>
      <div className="gallery-grid">
        {items.map((item) => (
          <button key={item.src} type="button" className="gallery-card" onClick={() => setActive(item)}>
            <span className="frame">
              <img
                src={item.src}
                alt={item.alt}
                className={item.fit}
                style={{ objectPosition: item.position }}
              />
            </span>
            <span className="caption">
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </span>
          </button>
        ))}
      </div>

      <dialog
        ref={dialogRef}
        className="lightbox"
        aria-label={active?.title ?? 'Podgląd zdjęcia'}
        onClose={() => setActive(null)}
        onClick={(event) => {
          const dialog = dialogRef.current
          if (!dialog) return
          const rect = dialog.getBoundingClientRect()
          const inside =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom
          if (!inside) dialog.close()
        }}
      >
        {active ? (
          <>
            <img src={active.src} alt={active.alt} />
            <div className="lightbox-copy">
              <div>
                <h2>{active.title}</h2>
                <p>{active.description}</p>
              </div>
              <button type="button" className="lightbox-close" onClick={() => dialogRef.current?.close()}>
                Zamknij
              </button>
            </div>
          </>
        ) : null}
      </dialog>
    </>
  )
}
