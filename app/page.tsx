import { company } from '@/lib/site'

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">GPRO Sp. z o.o. · Brzezie</p>
          <h1>
            Rośliny doniczkowe i kwiaty <em>z własnej uprawy.</em>
          </h1>
          <p className="lead">{company.lead}</p>
          <div className="hero-actions">
            <a className="button" href="/oferta">
              Zobacz ofertę
            </a>
            <a className="button button-ghost" href="/galeria">
              Galeria
            </a>
          </div>
        </div>
        <div className="hero-photo">
          <img src="/hero.jpg" alt="Rzędy roślin doniczkowych na polu produkcyjnym, w tle tunele foliowe" />
          <span className="photo-label">Uprawa polowa · Brzezie</span>
        </div>
      </section>

      <section className="about">
        <figure className="about-photo">
          <img src="/galeria/chryzantemy.jpg" alt="Żółte chryzantemy w szklarni GPRO" />
          <figcaption>Chryzantemy z naszej szklarni</figcaption>
        </figure>
        <div className="about-copy">
          <p className="eyebrow">O nas</p>
          <h2>Hurtowa jakość, którą widać w doniczce.</h2>
          <p>
            GPRO Sp. z o.o. zajmuje się produkcją roślin doniczkowych i kwiatów. W ofercie są między
            innymi chryzantemy, bratki, poinsecje i pierwiosnki — przygotowane z myślą o sprzedaży hurtowej.
          </p>
          <p>
            Pracujemy w Brzeziu, przy ul. Źródlanej 37. Rośliny rosną w szklarni i na polu, a do odbiorców
            trafiają jako zdrowy, wyrównany materiał ogrodniczy.
          </p>
        </div>
      </section>

      <section className="points" aria-label="W skrócie">
        <article>
          <span>01</span>
          <h3>Własna produkcja</h3>
          <p>Szklarnia i pole w jednym miejscu. Zdjęcia w galerii pochodzą z naszej uprawy.</p>
        </article>
        <article>
          <span>02</span>
          <h3>Sprzedaż hurtowa</h3>
          <p>Dostarczamy rośliny odbiorcom, którzy potrzebują powtarzalnego materiału na sezon.</p>
        </article>
        <article>
          <span>03</span>
          <h3>Oferta sezonowa</h3>
          <p>Wiosna, jesień i święta: bratki, pierwiosnki, wrzosy, chryzantemy i poinsecje.</p>
        </article>
      </section>
    </>
  )
}
