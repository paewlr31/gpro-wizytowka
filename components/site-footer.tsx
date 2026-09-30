import { ContactForm } from '@/components/contact-form'
import { company } from '@/lib/site'

export function SiteFooter() {
  return (
    <footer className="footer" id="kontakt">
      <div className="footer-inner">
        <p className="eyebrow light">Kontakt</p>
        <h2>Porozmawiajmy o współpracy.</h2>
        <p className="footer-lead">
          Zapytaj o dostępność roślin i warunki sprzedaży hurtowej.
        </p>
        <div className="contact-grid">
          <div>
            <span>Firma</span>
            <p>{company.name}</p>
          </div>
          <div>
            <span>Adres</span>
            <p>
              <a href={company.maps} target="_blank" rel="noopener noreferrer">
                {company.street}
                <br />
                {company.city}
              </a>
            </p>
          </div>
          <div>
            <span>Telefon</span>
            <p>
              <a className="contact-strong" href={company.phoneHref}>
                {company.phone}
              </a>
            </p>
          </div>
          <div>
            <span>E-mail</span>
            <p>
              <a href={company.emailHref}>{company.email}</a>
            </p>
          </div>
        </div>
        <div className="contact-panel">
          <ContactForm />
          <div className="map-card">
            <iframe
              title="Mapa: ul. Źródlana 37, Brzezie"
              src={company.mapEmbed}
              loading="lazy"
            />
            <div className="map-caption">
              <p>
                {company.street}
                <br />
                {company.city}
              </p>
              <a href={company.maps} target="_blank" rel="noopener noreferrer">
                Otwórz w Google Maps
              </a>
            </div>
          </div>
        </div>
        <p className="nip">NIP {company.nip}</p>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {company.name}</span>
          <span>Rośliny ozdobne z Brzezia</span>
        </div>
      </div>
    </footer>
  )
}
