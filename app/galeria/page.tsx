import type { Metadata } from 'next'
import { GalleryView } from '@/components/gallery-view'
import { gallery } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Galeria',
  description: 'Zdjęcia roślin doniczkowych i kwiatów z produkcji GPRO: chryzantemy, bratki, poinsecje, pierwiosnki i wrzosy.',
}

export default function GalleryPage() {
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">Galeria</p>
        <h1>Rośliny z naszej produkcji.</h1>
        <p className="page-lead">
          Chryzantemy, bratki, pierwiosnki, poinsecje i wrzosy — z szklarni, z pola i ze zdjęć produktowych.
          Kliknij kartę, żeby zobaczyć zdjęcie w całości.
        </p>
      </section>
      <GalleryView items={gallery} />
    </>
  )
}
