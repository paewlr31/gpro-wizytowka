'use client'

import { useEffect, useState } from 'react'
import { company } from '@/lib/site'

export function ContactForm() {
  const [nextUrl, setNextUrl] = useState('')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    const url = new URL(window.location.href)
    setSent(url.searchParams.get('wyslano') === '1')
    url.searchParams.set('wyslano', '1')
    url.hash = 'kontakt'
    setNextUrl(url.toString())
  }, [])

  return (
    <form
      className="contact-form"
      action={`https://formsubmit.co/${company.formEmail}`}
      method="POST"
    >
      <h3>Napisz do nas</h3>
      <p className="form-intro">Odpowiemy na temat dostępności i współpracy hurtowej.</p>

      <label>
        Imię i nazwisko
        <input name="name" type="text" autoComplete="name" required maxLength={120} />
      </label>
      <label>
        E-mail
        <input name="email" type="email" autoComplete="email" required maxLength={160} />
      </label>
      <label>
        Telefon
        <input name="phone" type="tel" autoComplete="tel" maxLength={40} />
      </label>
      <label>
        Wiadomość
        <textarea name="message" required maxLength={4000} rows={5} />
      </label>

      <input type="hidden" name="_subject" value="Wiadomość ze strony GPRO" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_captcha" value="false" />
      {nextUrl ? <input type="hidden" name="_next" value={nextUrl} /> : null}
      <input className="honey" type="text" name="_honey" tabIndex={-1} autoComplete="off" />

      <button className="button" type="submit" disabled={!nextUrl}>
        Wyślij wiadomość
      </button>

      {sent ? (
        <p className="form-status ok" role="status">
          Dziękujemy. Wiadomość została wysłana.
        </p>
      ) : (
        <p className="form-intro">
          Pierwsza wiadomość włącza skrzynkę: na {company.formEmail} przyjdzie mail z linkiem
          Activate Form. Kliknij go, potem wyślij formularz jeszcze raz.
        </p>
      )}
    </form>
  )
}
