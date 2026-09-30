import type { Metadata } from 'next'
import { offers } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Oferta i kontakt',
  description: 'Hurtowa oferta roślin doniczkowych i kwiatów GPRO: chryzantemy, bratki, poinsecje, pierwiosnki i wrzosy. Kontakt: Brzezie, ul. Źródlana 37.',
}

export default function OfferPage() {
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">Oferta</p>
        <h1>Rośliny na sezon, prosto od producenta.</h1>
        <p className="page-lead">
          Produkujemy rośliny doniczkowe i kwiaty pod sprzedaż hurtową. Asortyment zmienia się w ciągu roku.
          Poniżej przykłady tego, co wychodzi z naszej uprawy.
        </p>
      </section>

      <section className="offer-grid" aria-label="Przykładowa oferta">
        {offers.map((item) => (
          <article className="offer-card" key={item.title}>
            <div className="frame frame-wide">
              <img
                src={item.image}
                alt={item.alt}
                className={item.fit}
                style={{ objectPosition: item.position }}
              />
            </div>
            <div className="offer-copy">
              <p className="season">{item.season}</p>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="offer-note">
        <p>
          Chcesz poznać aktualną dostępność? Zadzwoń albo wyślij wiadomość formularzem na dole strony.
        </p>
        <a className="button" href="#kontakt">
          Dane kontaktowe
        </a>
      </section>
    </>
  )
}
